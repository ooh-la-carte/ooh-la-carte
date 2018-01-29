const currentPage = (state = 'Home', action) => {
  console.log(action.payload);
  if (action.type === 'CHANGE_PAGE') {
    return action.payload;
  }
  return state;
};

export default currentPage;
