import { GET_TOKEN } from "../actions/Auth";

export default (state = [], action) => {
  switch (action.type) {
    case GET_TOKEN:
      return {
        tokenData: {
          a: 1
        }
      };
    default:
      return state;
  }
};
