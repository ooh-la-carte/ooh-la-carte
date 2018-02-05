
const changeSelectedChef = chef => (
  {
    type: 'SELECT_CHEF',
    payload: chef,
  }
);

const changeSelectedEvent = event => (
  {
    type: 'SELECT_EVENT',
    payload: event,
  }
);

const setSocket = socket => (
  {
    type: 'SET_SOCKET',
    payload: socket,
  }
);

const setUserInfo = user => (
  {
    type: 'GET_USER_DATA',
    payload: user,
  }
);

const removeSocket = () => (
  {
    type: 'SET_SOCKET',
    payload: {},
  }
);

const selectConversation = userId => (
  {
    type: 'SELECT_CONVERSATION',
    payload: userId,
  }
);

export {
  changeSelectedChef,
  changeSelectedEvent,
  setSocket,
  removeSocket,
  selectConversation,
  setUserInfo,
};
