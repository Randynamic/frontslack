import Cookies from "js-cookie";
import qs from "query-string";

export const AUTHENTICATE = "auth/AUTHENTICATE";
export const SET_CURRENT_USER = "auth/SET_CURRENT_USER";
export const GET_NEW_CODE = "auth/GET_NEW_CODE";
export const GET_CODE = "auth/GET_CODE";
export const GET_TOKEN = "auth/GET_TOKEN";
// export const SET_APP_CODE = "auth/SET_APP_CODE";

const initialState = {
  isAuthenticated: false,
  currentUser: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      console.log("STATE 1");
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        currentUser: action.currentUser
      };
    case SET_CURRENT_USER:
      console.log("STATE 2");
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.currentUser
      };
    case GET_TOKEN:
      console.log("STATE GET_TOKEN");
      return state;
    case GET_NEW_CODE:
      console.log("STATE GET_NEW_CODE");
      return state;
    case GET_CODE:
      console.log("STATE GET_CODE");
      return state;
    default:
      console.log("STATE 3");
      return state;
  }
};

export const authenticateSession = code => dispatch => {
  console.log("[ authenticateSession ]", code);
  let sessionFromCookie = Cookies.getJSON("auth_session");
  const localCode = Cookies.get("auth_code");
  console.log(localCode, code, code === localCode);
  if (sessionFromCookie && sessionFromCookie.ok) {
    // set authenticated user
    return dispatch({
      type: AUTHENTICATE,
      isAuthenticated: sessionFromCookie.ok,
      currentUser: sessionFromCookie
    });
  } else if (code && localCode && code === localCode) {
    // get new code
    dispatch({ type: GET_NEW_CODE });
    dispatch(redirectToGetCode());
    return;
  } else if (code) {
    // get token
    dispatch({ type: GET_TOKEN });
    dispatch(getToken(code));
    return;
  } else {
    // get code
    dispatch({ type: GET_CODE });
    dispatch(redirectToGetCode());
    return;
  }
};

// export const authenticateSession = () => dispatch => {
//   let sessionFromCookie = Cookies.getJSON("slackapp");
//   let app_code = Cookies.get("app_code");
// if (sessionFromCookie && sessionFromCookie.ok) {
//   return dispatch({ type: AUTHENTICATE, currentUser: sessionFromCookie });
// }
//   console.log("[ authenticateSession ] ", app_code);
//   return dispatch(getToken(app_code));
// };

// export const loginUser = () => dispatch => {
//   new Promise((resolve, reject) => {
//     let sessionFromCookie = Cookies.getJSON("slackapp");
//     let app_code = Cookies.get("app_code");

//     if (sessionFromCookie && sessionFromCookie.ok) {
//       dispatch({
//         type: AUTHENTICATE,
//         authenticated: true,
//         currentUser: sessionFromCookie
//       });
//       console.log("STATE AAA", sessionFromCookie, app_code);
//       resolve(sessionFromCookie);
//       return;
//     } else {
//       console.log("[ loginUser ] ", app_code);
//       dispatch(getToken(app_code));
//       return;
//     }
//   });
// };

// export const logoutUser = () => dispatch =>
//   new Promise(resolve => {
//     dispatch({
//       type: AUTHENTICATE,
//       authenticated: false
//     });

//     dispatch({
//       type: SET_CURRENT_USER,
//       currentUser: {}
//     });

//     Cookies.remove("slackapp");
//     resolve({});
//   });

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
      console.log("[ SESSION RECIEVED ]", result);
      if (!result.ok) {
        // code invalid
        dispatch({ type: GET_NEW_CODE });
        dispatch(redirectToGetCode());
      } else {
        console.log("[ SESSION VALID ]");
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

// export const handleSessionData = sessionData => dispatch => {
//   Cookies.set("slackapp", sessionData);
// };
