export const LIST_CONVERSATION_ENTRIES = "entries/LIST_CONVERSATIONS";

const initialState = {
  posts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
        posts: action.data
      };
  }
};

export const listConversationEntries = channelId => dispatch => {
  new Promise(resolve => {
    dispatch({
      type: LIST_CONVERSATION_ENTRIES,
      data: [
        { id: 0, title: "Title 0", content: "Content 0" },
        { id: 1, title: "Title 1", content: "Content 1" }
      ]
    });
  });
};
