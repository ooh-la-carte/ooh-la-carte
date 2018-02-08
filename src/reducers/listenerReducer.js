const listenerReducer = (state = false, action) => {
  if (action.type === 'LISTENER_ON') {
    return action.payload;
  }
  return state;
};

export default listenerReducer;
