import React from "react";
import ReactDOM from "react-dom";
import App from "../../containers/App";
import { createStore } from "redux";
import { Provider } from "react-redux";

import rootReducers from "../../store/reducers";

it("renders without crashing", () => {
  const store = createStore(rootReducers, {});
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
