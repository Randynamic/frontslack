export const GET_TOKEN = "getToken";
export const SET_TOKEN = "setToken";
export const UNSET_TOKEN = "unsetToken";
export const CHECK_TOKEN = "checkTokenAction";

export const getTokenAction = auth_code => {
  return { type: GET_TOKEN, data: auth_code };
};
export const setTokenAction = session_data => {
  localStorage.setItem("session", JSON.stringify(session_data));
  console.log(SET_TOKEN, ".....>>", session_data);
  return { type: SET_TOKEN, data: session_data };
};
export const unsetTokenAction = () => {
  localStorage.removeItem("session");
  console.log(UNSET_TOKEN, ".....>>");
  return { type: UNSET_TOKEN, data: true };
};

const dispatchToken = sessionData => {
  const returnValue = { type: CHECK_TOKEN, data: sessionData };
  console.log("dispatchToken....", returnValue);
  return returnValue;
};

export const checkTokenAction = () => {
  let session_data = null;
  try {
    session_data = JSON.parse(localStorage.getItem("session"));
  } catch (e) {}
  return dispatch => {
    setTimeout(() => {
      dispatch(dispatchToken(session_data));
    }, 500);
  };
};
