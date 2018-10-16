import { combineReducers } from "redux";

import auth from "./auth";
import profile from "./profile";
import transitions from "./transitions";
import flashMessages from "./flashMessages";

export default combineReducers({
  auth,
  profile,
  transitions,
  flashMessages
});
