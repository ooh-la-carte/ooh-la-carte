import axios from 'axios';

const loggedInUserInfo = (state = {}, action) => {
  if (action.type === 'GET_USER_DATA') {
    return action.payload;
  } else if (action.type === 'UPDATE_CUISINE') {
    const newState = {
      ...state,
      cuisine: {
        ...state.cuisine,
        [action.payload]: !state.cuisine[action.payload],
      },
    };
    const eventObj = {
      id: state.id,
      cuisine: action.payload,
      description: '',
      userCuisines: JSON.stringify(state.cuisine),
    };
    if (!state.cuisine[action.payload]) {
      const url = '/api/user/cuisines';
      axios.post(url, eventObj);
    } else {
      const url = '/api/user/deleteCuisines';
      axios.post(url, eventObj);
    }
    return newState;
  }
  return state;
};

export default loggedInUserInfo;
