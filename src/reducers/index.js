import { combineReducers } from 'redux';
import selectedEventReducer from './selectedEventReducer';
import selectedChefReducer from './selectedChefReducer';
import socketReducer from './socketReducer';
import loggedInUserInfo from './loggedInUserInfo';
import selectedConversation from './selectedConversation';
import listenerReducer from './listenerReducer';
import sortReducer from './sortReducer';

const rootReducer = combineReducers({
  selectedChefReducer,
  selectedConversation,
  selectedEventReducer,
  socketReducer,
  loggedInUserInfo,
  listenerReducer,
  sortReducer,
});

export default rootReducer;
