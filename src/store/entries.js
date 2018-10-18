export const LIST_CONVERSATION_ENTRIES = "entries/LIST_CONVERSATIONS";
export const ADD_CONVERSATION_ENTRY = "entries/ADD_CONVERSATIONS_ENTRY";

const initialState = {
  posts: [
    { id: 0, title: "Title 0", content: "Content 0" },
    { id: 1, title: "Title 1", content: "Content 1" }
  ]
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

export const listConversationEntries = channelId => dispatch => {
  new Promise(resolve => {
    dispatch({
      type: LIST_CONVERSATION_ENTRIES,
      data: initialState.posts
    });
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
