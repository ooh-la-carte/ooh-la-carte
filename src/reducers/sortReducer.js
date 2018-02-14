const sortReducer = (state = 'none', action) => {
  if (action.type === 'CHANGE_SORT') {
    return action.payload;
  }
  return state;
};

export default sortReducer;
