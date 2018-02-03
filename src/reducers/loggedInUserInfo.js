const loggedInUserInfo = (state = {}, action) => {
  if (action.type === 'GET_USER_DATA') {
    return action.payload;
  }
  return state;
};

export default loggedInUserInfo;
