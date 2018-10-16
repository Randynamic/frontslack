export const NEW_ERROR = "messages:errors/NEW";
export const NEW_WARNING = "messages:warning/NEW";
export const CLEAR_MESSAGES = "messages:all/CLEAR";

const initialState = {
  messages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_ERROR:
    case NEW_WARNING:
      return { ...state, messages: [...state.messages, action.data] };
    case CLEAR_MESSAGES:
      return initialState;
    default:
      return { ...state };
  }
};

export const newError = action => dispatch =>
  dispatch({ type: NEW_ERROR, data: action });

export const newWarning = action => dispatch =>
  dispatch({
    type: NEW_WARNING,
    data: action
  });
export const clearMessages = () => dispatch =>
  dispatch({
    type: CLEAR_MESSAGES
  });
