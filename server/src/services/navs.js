import axios from "axios";

export const getMainNavMenu = (isAuthorized, store) =>
  new Promise((resolve, reject) => {
    axios(`http://localhost:4000/api/menus`, {
      headers: {
        isAuthorized: isAuthorized
      }
    })
      .then(res => {
        if (res.data.ok) {
          store.dispatch({
            type: "ui:nav/MAIN",
            data: res.data.data
          });
          return resolve(res.data.data);
        }
        // dispatch error case nav menu
        reject({ e: 1 });
      })
      .catch(e => {
        reject(e);
      });
  });
