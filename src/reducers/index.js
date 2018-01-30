import { combineReducers } from 'redux';
import currentPage from './currentPage';
import selectedEventReducer from './selectedEventReducer';
import selectedChefReducer from './selectedChefReducer';

const rootReducer = combineReducers({
  currentPage,
  selectedEventReducer,
  selectedChefReducer,
});

export default rootReducer;
