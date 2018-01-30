const selectedChefReducer = (state = {}, action) => {
  if (action.type === 'SELECT_CHEF') {
    return action.payload;
  }
  return state;
};

export default selectedChefReducer;
