import { combineReducers } from 'redux';
import selectedEventReducer from './selectedEventReducer';
import selectedChefReducer from './selectedChefReducer';

const rootReducer = combineReducers({
  selectedEventReducer,
  selectedChefReducer,
});

export default rootReducer;
