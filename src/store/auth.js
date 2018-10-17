import Cookies from "js-cookie";

export const AUTHENTICATE = "auth/AUTHENTICATE";
export const SET_CURRENT_USER = "auth/SET_CURRENT_USER";
export const GET_NEW_CODE = "auth/GET_NEW_CODE";
export const GET_CODE = "auth/GET_CODE";
export const GET_TOKEN = "auth/GET_TOKEN";

const initialState = {
  isAuthenticated: false,
  currentUser: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        currentUser: action.currentUser
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.currentUser
      };
    case GET_TOKEN:
    case GET_NEW_CODE:
    case GET_CODE:
    default:
      return state;
  }
};

export const authenticateSession = code => dispatch => {
  let auth_session = Cookies.getJSON("auth_session");
  const localCode = Cookies.get("auth_code");
  if (auth_session && auth_session.ok) {
    return dispatch({
      type: AUTHENTICATE,
      isAuthenticated: auth_session.ok,
      currentUser: auth_session
    });
  } else if (code && localCode && code === localCode) {
    dispatch({ type: GET_NEW_CODE });
    dispatch(redirectToGetCode());
    return;
  } else if (code) {
    dispatch({ type: GET_TOKEN });
    dispatch(getToken(code));
    return;
  } else {
    dispatch({ type: GET_CODE });
    dispatch(redirectToGetCode());
    return;
  }
};

export const redirectToGetCode = () => dispatch => {
  window.location.href =
    "https://frontmen.slack.com/oauth?client_id=265156972019.453766114196&redirect_uri=&state=&scope=identity.basic&team=&install_redirect=&single_channel=0";
};

export const logoutUser = () => dispatch => {
  Cookies.remove("auth_code");
  Cookies.remove("auth_session");
  dispatch({
    type: AUTHENTICATE,
    isAuthenticated: false,
    currentUser: {}
  });
};

export const getToken = code => dispatch => {
  const redirectUrl = "http://localhost:3000/auth/getToken";
  const client_id = "265156972019.453766114196";
  const client_secret = "0b50651557a6545be43add555ba6f830";
  const base = "https://slack.com/api";

  const url = `${base}/oauth.access?client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${redirectUrl}`;
  return fetch(url)
    .then(results => {
      return results.json();
    })
    .then(result => {
      if (!result.ok) {
        dispatch({ type: GET_NEW_CODE });
        dispatch(redirectToGetCode());
      } else {
        Cookies.set("auth_session", result);
        dispatch({
          type: SET_CURRENT_USER,
          currentUser: result
        });
      }
    })
    .catch(e => {
      console.log("[ SESSION REJECTED ]", e);
    });
};
