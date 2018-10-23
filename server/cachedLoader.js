import path from "path";
import fs from "fs";
import React from "react";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import Loadable from "react-loadable";

import Helmet from "react-helmet";

import fetch from "isomorphic-fetch";
import axios from "axios";

import createStore from "../src/store/config";
import App from "../src/components/App";
import manifest from "../build/asset-manifest.json";

import { setCurrentSession, logoutUser } from "../src/store/auth";
import { listConversationEntries } from "../src/store/entries";

export const LIST_CONVERSATION_ENTRIES = "entries/LIST_CONVERSATIONS";
export const ADD_CONVERSATION_ENTRY = "entries/ADD_CONVERSATIONS_ENTRY";
export const TRANSITION_PENDING = "trans/PENDING";
export const TRANSITION_FINISHED = "trans/FINISHED";

// import ReactCC from "react-component-caching";
// const Memcached = require("memcached");
// const cache = new ReactCC.ComponentCache();
// MemCache Specified
// const cache = new Memcached("localhost:5000");

export default async (req, res, next) => {
  const context = {};
  const modules = [];

  const getExtraChunks = () => {
    const extractAssets = (assets, chunks) =>
      Object.keys(assets)
        .filter(asset => chunks.indexOf(asset.replace(".js", "")) > -1)
        .map(key => assets[key]);

    return extractAssets(manifest, modules).map(
      chunk =>
        `<script type="text/javascript" src="/${chunk.replace(
          /^\//,
          ""
        )}"></script>`
    );
  };

  const injectHTML = (data, { html, title, meta, body, scripts, state }) => {
    data = data.replace("<html>", `<html ${html}>`);
    data = data.replace(/<title>.*?<\/title>/g, title);
    data = data.replace("</head>", `${meta}</head>`);
    data = data.replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div><script>window.__PRELOADED_STATE__ = ${state}</script>`
    );
    data = data.replace("</body>", scripts.join("") + "</body>");
    return data;
  };

  const readFile = () => {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.resolve(__dirname, "../build/index.html"),
        "utf8",
        (err, htmlData) => {
          if (err) {
            console.error("Read error", err);
            reject(err);
          }
          resolve(htmlData);
        }
      );
    });
  };

  const getAsyncData = store =>
    new Promise((resolve, reject) => {
      const isAuthorized = store.getState().auth
        ? store.getState().auth.isAuthenticated
        : false;
      const Promise_Menus = new Promise((resolve, reject) => {
        axios(`http://localhost:4000/api/menus`, {
          headers: {
            isAuthorized: isAuthorized
          }
        })
          .then(res => {
            if (res.data.ok) {
              store.dispatch({ type: "ui:nav/MAIN", data: res.data.data });
              return resolve(res.data.data);
            }
            // dispatch error case nav menu
            reject({ e: 1 });
          })
          .catch(e => {
            reject(e);
          });
      });
      const Promise_Conversations = new Promise((resolve, reject) => {
        if ("auth_session" in req.cookies) {
          const sessionData = JSON.parse(req.cookies.auth_session);
          const channelId = "DD3N06ZED";
          const token = sessionData.access_token;
          axios(
            `https://slack.com/api/conversations.history?channel=${channelId}&token=${token}`
          )
            .then(channelHistory => {
              if (channelHistory.data.ok) {
                const channelEntries = channelHistory.data.messages.map(
                  (message, index) => {
                    return {
                      id: message.bot_id,
                      title: `${message.type} @ ${message.ts}`,
                      content: message.text
                    };
                  }
                );
                store.dispatch({
                  type: LIST_CONVERSATION_ENTRIES,
                  data: channelEntries
                });
                store.dispatch({ type: TRANSITION_FINISHED, isLoading: false });
                resolve(channelEntries);
              } else {
                store.dispatch({ type: LIST_CONVERSATION_ENTRIES, data: null });
              }
            })
            .catch(e =>
              store.dispatch({
                type: NEW_ERROR,
                data: {
                  id: "no_channel_data_recieved",
                  type: "error",
                  message:
                    "Something went wrong while retrieving the conversation history."
                }
              })
            );
        } else {
          resolve(null);
        }
      });
      Promise.all([Promise_Menus, Promise_Conversations]).then(result => {
        resolve(result);
      });
    });

  const { store } = createStore(req.url);
  if ("auth_session" in req.cookies) {
    store.dispatch(setCurrentSession(req.cookies.auth_session));
  } else {
    store.dispatch(logoutUser());
  }

  await getAsyncData(store);

  readFile()
    .then(async htmlData => {
      if (context.url) {
        res.writeHead(302, {
          Location: context.url
        });

        res.end();
      } else {
        const RouteMarkup = (
          <Loadable.Capture report={m => modules.push(m)}>
            <Provider store={store}>
              <StaticRouter location={req.url} context={context}>
                <App />
              </StaticRouter>
            </Provider>
          </Loadable.Capture>
        );

        // renderToStaticMarkup for stripping react attrs
        // const renderString = await ReactCC.renderToString(
        //   RouteMarkup,
        //   cache,
        //   10
        // );
        const renderString = renderToString(RouteMarkup);
        const helmet = Helmet.renderStatic();

        const html = injectHTML(htmlData, {
          html: helmet.htmlAttributes.toString(),
          title: helmet.title.toString(),
          meta: helmet.meta.toString(),
          body: renderString,
          scripts: getExtraChunks(),
          state: JSON.stringify(store.getState()).replace(/</g, "\\u003c")
        });
        res.send(html);
      }
    })
    .catch(e => {
      console.log(e);
      res.status(404).end();
    });
};
