import axios from "axios";

export const LIST_CONVERSATION_ENTRIES = "entries/LIST_CONVERSATIONS";
export const ADD_CONVERSATION_ENTRY = "entries/ADD_CONVERSATIONS_ENTRY";
export const TRANSITION_PENDING = "trans/PENDING";
export const TRANSITION_FINISHED = "trans/FINISHED";

export const listConversations = (isAuthorized, store, cookies) =>
  new Promise((resolve, reject) => {
    if ("auth_session" in cookies) {
      const sessionData = JSON.parse(cookies.auth_session);
      const channelId = "DD3N06ZED";
      const token = sessionData.access_token;
      axios(
        `https://slack.com/api/conversations.history?channel=${channelId}&token=${token}`
      )
        .then(channelHistory => {
          if (channelHistory.data.ok) {
            const channelEntries = channelHistory.data.messages.map(
              (message, index) => {
                return {
                  id: message.bot_id,
                  title: `${message.type} @ ${message.ts}`,
                  content: message.text
                };
              }
            );
            store.dispatch({
              type: LIST_CONVERSATION_ENTRIES,
              data: channelEntries
            });
            store.dispatch({
              type: TRANSITION_FINISHED,
              isLoading: false
            });
            resolve(channelEntries);
          } else {
            store.dispatch({
              type: LIST_CONVERSATION_ENTRIES,
              data: null
            });
          }
        })
        .catch(e =>
          store.dispatch({
            type: NEW_ERROR,
            data: {
              id: "no_channel_data_recieved",
              type: "error",
              message:
                "Something went wrong while retrieving the conversation history."
            }
          })
        );
    } else {
      resolve(null);
    }
  });
