const sortReducer = (state = 'None', action) => {
  if (action.type === 'CHANGE_SORT') {
    return action.payload;
  }
  return state;
};

export default sortReducer;
