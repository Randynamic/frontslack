import { combineReducers } from "redux";

import ui from "./ui";
import auth from "./auth";
import transitions from "./transitions";
import flash from "./flash";
import entries from "./entries";

export default combineReducers({
  ui,
  auth,
  transitions,
  flash,
  entries
});
