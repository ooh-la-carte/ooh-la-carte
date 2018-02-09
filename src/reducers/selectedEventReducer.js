import axios from 'axios';

const selectedEventReducer = (state = {}, action) => {
  if (action.type === 'SELECT_EVENT') {
    return action.payload;
  } else if (action.type === 'UPDATE_EVENT_RATING') {
    const eventRatingObj = {
      rating: action.payload,
      eventId: state.id,
      chefId: state.chef_id,
    };
    const newState = {
      ...state,
      rating: action.payload,
    };
    axios.post('/api/updateEventRating', eventRatingObj);

    return newState;
  }
  return state;
};

export default selectedEventReducer;
