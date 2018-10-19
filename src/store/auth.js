import Cookies from "js-cookie";

import { NEW_INFO } from "./flash";

export const AUTHENTICATE = "auth/AUTHENTICATE";
export const SET_CURRENT_USER = "auth/SET_CURRENT_USER";
export const GET_NEW_CODE = "auth/GET_NEW_CODE";
export const GET_CODE = "auth/GET_CODE";
export const GET_TOKEN = "auth/GET_TOKEN";
export const TRANSITION_PENDING = "trans/PENDING";
export const TRANSITION_FINISHED = "trans/FINISHED";

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

export const checkSession = () => dispatch => {
  let auth_session = Cookies.getJSON("auth_session");
  if (auth_session && auth_session.ok) {
    dispatch({
      type: AUTHENTICATE,
      isAuthenticated: auth_session.ok,
      currentUser: auth_session
    });
  }
};

export const authenticateSession = code => dispatch => {
  dispatch({
    type: TRANSITION_PENDING,
    isLoading: true
  });
  let auth_session = Cookies.getJSON("auth_session");
  const localCode = Cookies.get("auth_code");
  if (auth_session && auth_session.ok) {
    dispatch({
      type: AUTHENTICATE,
      isAuthenticated: auth_session.ok,
      currentUser: auth_session
    });
    dispatch({
      type: TRANSITION_FINISHED,
      isLoading: false
    });
    return;
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
  try {
    window.location.href =
      "https://frontmen.slack.com/oauth?client_id=265156972019.453766114196&redirect_uri=&state=&scope=channels:history,groups:history,mpim:history,im:history&team=&install_redirect=&single_channel=0";
  } catch (e) {
    console.log(e);
  }
};

export const logoutUser = () => dispatch => {
  Cookies.remove("auth_code");
  Cookies.remove("auth_session");
  dispatch({
    type: AUTHENTICATE,
    isAuthenticated: false,
    currentUser: {}
  });
  dispatch({
    type: NEW_INFO,
    data: { id: 1, message: "Logout Successful", type: "info", autoHide: 5 }
  });
};

export const getToken = code => dispatch => {
  // const PORT = window ? 3000 : process.env.PORT;
  const PORT = 3000;
  const redirectUrl = `http://localhost:${PORT}/auth/getToken`;
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
        dispatch({
          type: TRANSITION_FINISHED,
          isLoading: false
        });
      }
    })
    .catch(e => {
      console.log("[ SESSION REJECTED ]", e);
    });
};
