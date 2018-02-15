import { combineReducers } from 'redux';
import selectedEventReducer from './selectedEventReducer';
import selectedChefReducer from './selectedChefReducer';
import socketReducer from './socketReducer';
import loggedInUserInfo from './loggedInUserInfo';
import selectedConversation from './selectedConversation';
import listenerReducer from './listenerReducer';
import sortReducer from './sortReducer';
import menuReducer from './menuReducer';

const rootReducer = combineReducers({
  selectedChefReducer,
  selectedConversation,
  selectedEventReducer,
  socketReducer,
  loggedInUserInfo,
  listenerReducer,
  sortReducer,
  menuReducer,
});

export default rootReducer;
