import rootReducers from "../store/reducers/index";

import { createLogger } from "redux-logger";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
// const loggerMiddleware = createLogger();

const logger = store => next => action => {
  // console.log("[ Middleware > ACTION ]", action);
  const result = next(action);
  // console.log("[ Middleware < RESULT ]", result, store.getState());
  return result;
};

const authMiddleware = store => next => action => {
  // if (typeof action.types === "undefined" || typeof action.url === "undefined")
  //   return next(action);

  next({ type: "PENDING", isPending: true });
  let session_data = null;
  try {
    session_data = JSON.parse(localStorage.getItem("session"));
  } catch (error) {}
  setTimeout(() => {
    if (session_data && session_data.ok) {
      next({ type: "FINISHED", isPending: false, body: { a: 1 } });
    } else {
      next({ type: "FAILED", isPending: false });
    }
  }, 500);
  return;
};

const configureStore = initialState => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducers,
    initialState,
    composeEnhancers(applyMiddleware(authMiddleware, logger, thunkMiddleware))
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
