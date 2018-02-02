import data from '../MockData';

const changeSelectedChef = (chef) => {
  let selected = {};
  data.chefs.forEach((obj) => {
    if (obj.id === chef) {
      selected = obj;
    }
  });
  return {
    type: 'SELECT_CHEF',
    payload: selected,
  };
};

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

export { changeSelectedChef, changeSelectedEvent, setSocket, removeSocket, selectConversation };
