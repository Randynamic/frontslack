import rootReducers from "../store/reducers/index";

import { createLogger } from "redux-logger";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
// const loggerMiddleware = createLogger();

const logger = store => {
  return next => {
    return action => {
      console.log("[ Middleware > ACTION ]", action);
      const result = next(action);
      console.log("[ Middleware < RESULT ]", result);
      return result;
    };
  };
};

const configureStore = initialState => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducers,
    initialState,
    composeEnhancers(applyMiddleware(logger, thunkMiddleware))
  );
  if (module.hot) {
    module.hot.accept("../store/reducers/index", () => {
      const nextRootReducer = require("../store/reducers/index");
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
};

export default configureStore;
