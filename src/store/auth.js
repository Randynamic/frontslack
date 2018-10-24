import Cookies from "js-cookie";
import axios from "axios";

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

export const authenticateSession = code => async dispatch => {
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
    return auth_session;
  } else if (code && localCode && code === localCode) {
    dispatch({ type: GET_NEW_CODE });
    dispatch(redirectToGetCode());
    return false;
  } else if (code) {
    return new Promise((resolve, reject) => {
      axios(`http://localhost:4000/api/auth/getToken?code=${code}`)
        .then(result => {
          if (!result.data.ok) {
            dispatch({ type: GET_NEW_CODE });
            dispatch(redirectToGetCode());
            reject(result.data);
          } else {
            Cookies.set("auth_session", result.data);
            dispatch(setCurrentSession(result.data));
            dispatch({
              type: TRANSITION_FINISHED,
              isLoading: false
            });
            resolve(result.data);
          }
        })
        .catch(e => {
          reject(e.data);
        });
    });
  } else {
    dispatch({ type: GET_CODE });
    dispatch(redirectToGetCode());
    return false;
  }
};

export const redirectToGetCode = () => dispatch => {
  if (typeof navigator !== "undefined") {
    var script = document.createElement("script");
    script.innerHTML = `window.location.href =
    			"https://frontmen.slack.com/oauth?client_id=265156972019.453766114196&redirect_uri=&state=&scope=channels:history,groups:history,mpim:history,im:history&team=&install_redirect=&single_channel=0";`;
    document.head.appendChild(script);
  }
};

export const setCurrentSession = session => dispatch => {
  dispatch({ type: SET_CURRENT_USER, currentUser: session });
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
