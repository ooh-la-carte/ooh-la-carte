const selectedConversation = (state = {}, action) => {
  if (action.type === 'SELECT_CONVERSATION') {
    console.log('CONVO ACTION: ', action.payload);
    return action.payload;
  }
  return state;
};

export default selectedConversation;
