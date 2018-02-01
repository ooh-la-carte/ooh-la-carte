import { combineReducers } from 'redux';
import selectedEventReducer from './selectedEventReducer';
import selectedChefReducer from './selectedChefReducer';
import socketReducer from './socketReducer';

const rootReducer = combineReducers({
  selectedEventReducer,
  selectedChefReducer,
  socketReducer,
});

export default rootReducer;
