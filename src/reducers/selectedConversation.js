const selectedConversation = (state = {}, action) => {
  if (action.type === 'SELECT_CONVERSATION') {
    return action.payload;
  }
  return state;
};

export default selectedConversation;
