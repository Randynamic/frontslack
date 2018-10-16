import pekka from "../static/media/images/pekka.jpg";
import arvidsson from "../static/media/images/arvidsson.jpg";

export const SET_CURRENT_PROFILE = "auth/SET_CURRENT_PROFILE";
export const PENDING_CURRENT_PROFILE = "auth/PENDING_CURRENT_PROFILE";
export const TRANSITION_PENDING = "trans/PENDING";
export const TRANSITION_FINISHED = "trans/FINISHED";

const initialState = {
  currentProfile: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PROFILE:
      return {
        ...state,
        currentProfile: action.profile
      };
    default:
      return state;
  }
};

export const getCurrentProfile = id => dispatch =>
  new Promise(resolve => {
    dispatch({
      type: TRANSITION_PENDING,
      isLoading: true
    });

    setTimeout(() => {
      let profile;

      if (id === 1) {
        profile = {
          id,
          name: "Pekka Rinne",
          image: pekka
        };
      } else {
        profile = {
          id,
          name: "Viktor Arvidsson",
          image: arvidsson
        };
      }
      dispatch({
        type: SET_CURRENT_PROFILE,
        profile
      });
      dispatch({
        type: TRANSITION_FINISHED,
        isLoading: false
      });
      resolve(profile);
    }, 3000);
  });

export const removeCurrentProfile = () => dispatch =>
  new Promise(resolve => {
    dispatch({
      type: SET_CURRENT_PROFILE,
      profile: {}
    });

    resolve({});
  });
