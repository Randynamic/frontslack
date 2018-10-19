import { NEW_ERROR } from "./flash";
export const MAIN_NAV_LINKS = "ui:nav/MAIN";

const initialState = {
  links: {
    privateLinks: [],
    publicLinks: []
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MAIN_NAV_LINKS:
      return {
        ...state,
        links: action.data
      };
    default:
      return state;
  }
};

export const mainNavLinks = isAuthorized => dispatch => {
  let PORT = process.env.PORT;
  try {
    PORT = window ? 5000 : process.env.PORT;
  } catch (e) {
    PORT = process.env.PORT;
  }
  new Promise(resolve => {
    fetch(`http://localhost:${PORT}/api/menus`, {
      headers: {
        isAuthorized: isAuthorized
      }
    })
      .then(res => res.json())
      .then(res => {
        dispatch({ type: MAIN_NAV_LINKS, data: res.data });
      })
      .catch(e =>
        dispatch({
          type: NEW_ERROR,
          data: {
            id: "no_menus_recieved",
            type: "error",
            message: "Please reload to retrieve the menus"
          }
        })
      );
  });
};
