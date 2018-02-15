const menuReducer = (state = [], action) => {
  if (action.type === 'SET_MENU') {
    return action.payload;
  }
  return state;
};

export default menuReducer;
