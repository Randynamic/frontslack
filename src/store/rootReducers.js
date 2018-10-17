import { combineReducers } from "redux";

import auth from "./auth";
import profile from "./profile";
import transitions from "./transitions";
import flash from "./flash";
import entries from "./entries";

export default combineReducers({
  auth,
  profile,
  transitions,
  flash,
  entries
});
