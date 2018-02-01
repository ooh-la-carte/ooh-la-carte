import data from '../MockData';

const changeCurrentPage = page => (
  {
    type: 'CHANGE_PAGE',
    payload: page,
  }
);

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
  console.log('Action: ', selected);
  return {
    type: 'SELECT_EVENT',
    payload: selected,
  };
};

const setSocket = socketID => (
  {
    type: 'SET_SOCKET',
    payload: socketID,
  }
);

const removeSocket = () => (
  {
    type: 'SET_SOCKET',
    payload: '',
  }
);

export { changeCurrentPage, changeSelectedChef, changeSelectedEvent, setSocket, removeSocket };
