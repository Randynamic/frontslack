import { combineReducers } from "redux";

import ui from "./ui";
import auth from "./auth";
import profile from "./profile";
import transitions from "./transitions";
import flash from "./flash";
import entries from "./entries";

export default combineReducers({
  ui,
  auth,
  profile,
  transitions,
  flash,
  entries
});
