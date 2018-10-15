import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";

import "./styles/index.scss";
import { Provider } from "react-redux";

import configureStore from "./store/config";

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
