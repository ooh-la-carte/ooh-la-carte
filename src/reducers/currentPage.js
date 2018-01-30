const currentPage = (state = 'Home', action) => {
  if (action.type === 'CHANGE_PAGE') {
    return action.payload;
  }
  return state;
};

export default currentPage;
