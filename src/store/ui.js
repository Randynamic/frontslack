import { NEW_ERROR, CLEAR_MESSAGES } from "./flash";
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
  new Promise(resolve => {
    fetch("http://localhost:5000/api/menus", {
      headers: {
        isAuthorized: isAuthorized
      }
    })
      .then(res => res.json())
      .then(res => {
        dispatch({ type: MAIN_NAV_LINKS, data: res.data });
        dispatch({ type: CLEAR_MESSAGES });
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

export const mainNavLinksError = isAuthorized => dispatch => {
  new Promise(resolve => {
    fetch("http://localhost:5000/api/menus/s", {
      headers: {
        isAuthorized: isAuthorized
      }
    })
      .then(res => res.json())
      .then(res => dispatch({ type: MAIN_NAV_LINKS, data: res.data }))
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
