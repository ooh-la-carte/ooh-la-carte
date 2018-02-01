import { combineReducers } from 'redux';
import currentPage from './currentPage';
import selectedEventReducer from './selectedEventReducer';
import selectedChefReducer from './selectedChefReducer';
import socketReducer from './socketReducer';

const rootReducer = combineReducers({
  currentPage,
  selectedEventReducer,
  selectedChefReducer,
  socketReducer,
});

export default rootReducer;
