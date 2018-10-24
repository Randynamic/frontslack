import { getMainNavMenu } from "../services/navs";
import { listConversations } from "../services/conversations";

export const getAsyncData = (req, store) =>
  new Promise((resolve, reject) => {
    const isAuthorized = store.getState().auth
      ? store.getState().auth.isAuthenticated
      : false;

    /**
     * LIST OF SERVICES THAT NEEDS TO BE PRELOADED FOR RENDERING
     */
    const Promise_Menus = getMainNavMenu(isAuthorized, store);
    const Promise_Conversations = listConversations(
      isAuthorized,
      store,
      req.cookies
    );

    Promise.all([Promise_Menus, Promise_Conversations]).then(result => {
      resolve(result);
    });
  });
