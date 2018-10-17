import React from "react";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { ConnectedRouter } from "connected-react-router";
import Loadable from "react-loadable";
import { render, hydrate } from "react-dom";
import { Frontload } from "react-frontload";

import { Provider } from "react-redux";

import createStore from "./store/config";

import "./styles/index.scss";
import "../node_modules/normalize.css/normalize.css";
import "../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";

const { store, history } = createStore();

const Application = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Frontload noServerRender={true}>
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
