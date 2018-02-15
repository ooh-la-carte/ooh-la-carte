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
  } else if (action.type === 'UPDATE_USER_FIELD') {
    const { field, updatedValue } = action.payload;
    const newState = {
      ...state,
      [field]: updatedValue,
    };
    const updatedInfoObj = {
      id: state.id,
      field,
      updatedValue,
    };
    const url = '/api/updateUserDataByField';
    axios.post(url, updatedInfoObj);
    return newState;
  } else if (action.type === 'UPDATE_LAST_PROMPTED') {
    const { field, updatedValue } = action.payload;
    const newState = {
      ...state,
      lastPrompt: updatedValue,
    };
    const updatedInfoObj = {
      id: state.id,
      field,
      updatedValue,
    };
    const url = '/api/updateUserDataByField';
    axios.post(url, updatedInfoObj);
    return newState;
  }
  return state;
};

export default loggedInUserInfo;
