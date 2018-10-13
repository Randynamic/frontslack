import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducers from "./store/reducers";

import "./styles/index.scss";

const loggerMiddleware = createLogger();

const configureStore = initialState => {
  const store = createStore(
    rootReducers,
    initialState,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
  if (module.hot) {
    module.hot.accept("./store/reducers", () => {
      const nextRootReducer = require("./store/reducers");
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
};

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
