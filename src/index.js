import React from "react";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";
import { ConnectedRouter } from "connected-react-router";
import Loadable from "react-loadable";
import { render, hydrate } from "react-dom";
import { Frontload } from "react-frontload";

import "./styles/index.scss";
import { Provider } from "react-redux";

import createStore from "./store/config";

const { store, history } = createStore();

const Application = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Frontload isServer={false}>
        <App />
      </Frontload>
    </ConnectedRouter>
  </Provider>
);

const root = document.querySelector("#root");

if (root.hasChildNodes() === true) {
  Loadable.preloadReady().then(() => {
    hydrate(Application, root);
  });
} else {
  render(Application, root);
}

serviceWorker.unregister();
