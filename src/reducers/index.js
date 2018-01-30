import { combineReducers } from 'redux';
import currentPage from './currentPage';
import selectedEventReducer from './selectedEvent';

const rootReducer = combineReducers({
  currentPage,
  selectedEventReducer,
});

export default rootReducer;
