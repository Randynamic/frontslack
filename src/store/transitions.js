export const TRANSITION_PENDING = "trans/PENDING";
export const TRANSITION_FINISHED = "trans/FINISHED";

const initialState = {
  isLoading: false,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TRANSITION_PENDING:
      return {
        ...state,
        isLoading: true
      };

    case TRANSITION_FINISHED:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

// export const transition_state = (transitionState, payload) => dispatch => {
//   dispatch({
//     type: transitionState,
//     payload
//   });
// };
