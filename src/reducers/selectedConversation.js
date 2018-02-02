const selectedConversation = (state = {}, action) => {
  if (action.type === 'SELECT_CONVERSATION') {
    console.log(action.payload);
    return action.payload;
  }
  return state;
};

export default selectedConversation;
