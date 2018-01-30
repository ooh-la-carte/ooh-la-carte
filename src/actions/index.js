import data from '../MockData';

const changeCurrentPage = page => (
  {
    type: 'CHANGE_PAGE',
    payload: page,
  }
);

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

export { changeCurrentPage, changeSelectedEvent };
