import data from '../MockData';

const changeSelectedChef = chef => (
  {
    type: 'SELECT_CHEF',
    payload: chef,
  }
);

const changeSelectedEvent = (event) => {
  let selected = {};
  data.events.forEach((obj) => {
    if (obj.id === event) {
      selected = obj;
    }
  });
  return {
    type: 'SELECT_EVENT',
    payload: selected,
  };
};

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
