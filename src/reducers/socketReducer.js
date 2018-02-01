const socketReducer = (state = {}, action) => {
  if (action.type === 'SET_SOCKET') {
    return action.payload;
  }
  return state;
};

export default socketReducer;
