import Cookies from "js-cookie";

export const AUTHENTICATE = "auth/AUTHENTICATE";
export const SET_CURRENT_USER = "auth/SET_CURRENT_USER";
export const SET_APP_CODE = "auth/SET_APP_CODE";

const initialState = {
  isAuthenticated: false,
  currentUser: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      console.log("STATE 1", {
        ...state,
        isAuthenticated: action.authenticated
      });
      return {
        ...state,
        isAuthenticated: action.authenticated
      };

    case SET_CURRENT_USER:
      console.log("STATE 2", {
        ...state,
        currentUser: action.session
      });
      return {
        ...state,
        currentUser: action.session
      };

    default:
      console.log("STATE 3", action, state);
      return state;
  }
};

export const setCurrentUser = session => dispatch =>
  new Promise(resolve => {
    Cookies.set("slackapp", session);
    dispatch({
      type: SET_CURRENT_USER,
      session
    });
    dispatch({
      type: AUTHENTICATE,
      authenticated: true
    });
    console.log("token callback session saved", session);
    resolve(session);
  });

export const setAppCode = code => dispatch =>
  new Promise(resolve => {
    Cookies.set("app_code", code);
    console.log("\n\n\n\n\n\n234567865432\n", code);
    dispatch(getToken(code));
  });

export const establishCurrentUser = () => dispatch =>
  new Promise(resolve => {
    let userFromCookie = Cookies.getJSON("slackapp");
    if (userFromCookie) {
      // dispatch(setCurrentUser(userFromCookie));
      resolve(userFromCookie);
    } else {
      resolve({});
    }
  });

export const loginUser = () => dispatch => {
  new Promise((resolve, reject) => {
    let sessionFromCookie = Cookies.getJSON("slackapp");
    let app_code = Cookies.get("app_code");
    console.log("check if access_token exists", sessionFromCookie, app_code);
    if (!sessionFromCookie && !app_code) {
      console.log("EEEEEEEEEEEE 1", sessionFromCookie, app_code);
      // setTimeout(() => {
      dispatch(getAuthorization());
      return dispatch(redirectToApp());
      // }, 5000);
    } else if (!app_code) {
      console.log("EEEEEEEEEEEE 2", sessionFromCookie, app_code);
      // setTimeout(() => {
      return dispatch(redirectToApp());
      // }, 5000);
    } else if (!sessionFromCookie) {
      console.log("EEEEEEEEEEEE 3", sessionFromCookie, app_code);
      Cookies.remove("app_code");
      return dispatch(redirectToApp());
    }
    console.log("STATE AAA", sessionFromCookie, app_code);
    dispatch(setCurrentUser(sessionFromCookie));
    resolve(sessionFromCookie);
  });
};

export const logoutUser = () => dispatch =>
  new Promise(resolve => {
    dispatch({
      type: AUTHENTICATE,
      authenticated: false
    });

    dispatch({
      type: SET_CURRENT_USER,
      user: {}
    });

    Cookies.remove("slackapp");
    resolve({});
  });

export const getAuthorization = () => dispatch =>
  new Promise(resolve => {
    dispatch({
      type: AUTHENTICATE,
      authenticated: false
    });

    dispatch({
      type: SET_CURRENT_USER,
      user: {}
    });

    Cookies.remove("slackapp");
    resolve({});
  });

export const redirectToApp = () => dispatch => {
  window.location.href =
    "https://frontmen.slack.com/oauth?client_id=265156972019.453766114196&redirect_uri=&state=&scope=identity.basic&team=&install_redirect=&single_channel=0";
};

export const getToken = code => dispatch => {
  const redirectUrl = "http://localhost:3000/auth/getToken";
  const client_id = "265156972019.453766114196";
  const client_secret = "0b50651557a6545be43add555ba6f830";
  const base = "https://slack.com/api";

  const local_code = Cookies.get("app_code");
  let sessionFromCookie = Cookies.getJSON("slackapp");
  console.log("getoken > ", code, local_code, code === local_code);
  if (code !== local_code || !sessionFromCookie || !sessionFromCookie.ok) {
    const url = `${base}/oauth.access?client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${redirectUrl}`;
    fetch(url)
      .then(results => {
        return results.json();
      })
      .then(result => {
        dispatch(getTokenCallback(result));
      });
  } else {
    return { type: "GET_TOKEN" };
  }
};

export const getTokenCallback = sessionData => dispatch => {
  setTimeout(() => {
    console.log(">>>>>> ", sessionData);
    // Cookies.remove("app_code");
    if (!sessionData.ok) {
      dispatch(redirectToApp());
    } else {
      console.log("1234567890", sessionData);
      dispatch(setCurrentUser(sessionData));
    }
  }, 100);
};
