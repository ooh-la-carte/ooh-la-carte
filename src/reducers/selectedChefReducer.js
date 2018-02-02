const selectedChefReducer = (state = {}, action) => {
  if (action.type === 'SELECT_CHEF') {
    console.log(action.payload);
    return action.payload;
  }
  return state;
};

export default selectedChefReducer;
