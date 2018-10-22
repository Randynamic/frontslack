import { NEW_ERROR } from "./flash";
import axios from "axios";
export const LIST_CONVERSATION_ENTRIES = "entries/LIST_CONVERSATIONS";
export const ADD_CONVERSATION_ENTRY = "entries/ADD_CONVERSATIONS_ENTRY";
export const TRANSITION_PENDING = "trans/PENDING";
export const TRANSITION_FINISHED = "trans/FINISHED";

const initialState = {
  posts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LIST_CONVERSATION_ENTRIES:
      return { ...state, posts: action.data };
    case ADD_CONVERSATION_ENTRY:
      return { ...state, posts: [...state.posts, action.data] };
    default:
      return state;
  }
};

export const listConversationEntries = (channelId, token) => dispatch => {
  return new Promise(resolve => {
    dispatch({
      type: TRANSITION_PENDING,
      isLoading: true
    });
    axios(
      `https://slack.com/api/conversations.history?channel=${channelId}&token=${token}`
    )
      // .then(res => res.json())
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
          // setTimeout(() => {
          dispatch({
            type: LIST_CONVERSATION_ENTRIES,
            data: channelEntries
          });
          dispatch({ type: TRANSITION_FINISHED, isLoading: false });
          resolve(channelEntries);
          // }, 1000);
        } else {
          dispatch({ type: LIST_CONVERSATION_ENTRIES, data: null });
        }
      })
      .catch(e =>
        dispatch({
          type: NEW_ERROR,
          data: {
            id: "no_channel_data_recieved",
            type: "error",
            message:
              "Something went wrong while retrieving the conversation history."
          }
        })
      );
  });
};

export const addConversationEntry = post => dispatch => {
  new Promise(resolve => {
    dispatch({
      type: ADD_CONVERSATION_ENTRY,
      data: {
        id: post.id,
        title: "Title " + post.id,
        content: "Content " + post.id
      }
    });
  });
};
