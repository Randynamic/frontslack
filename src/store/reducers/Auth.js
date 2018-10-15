import {
  GET_TOKEN,
  SET_TOKEN,
  UNSET_TOKEN,
  CHECK_TOKEN
} from "../actions/Auth";

export default (state = [], action) => {
  switch (action.type) {
    case GET_TOKEN:
      return {
        ...state,
        auth_code: action.data,
        session_data: null
      };
    case SET_TOKEN:
      return {
        ...state,
        session_data: action.data
      };
    case UNSET_TOKEN:
      const newState = {};
      Object.keys(state)
        .filter(stateItemKey => stateItemKey !== "session_data")
        .map(key => {
          return (newState[key] = state[key]);
        });
      return newState;
    case CHECK_TOKEN:
      return {
        ...state,
        session_data: action.data
      };
    default:
      return state;
  }
};
