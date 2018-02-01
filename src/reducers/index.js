import { combineReducers } from 'redux';
import selectedEventReducer from './selectedEventReducer';
import selectedChefReducer from './selectedChefReducer';
import socketReducer from './socketReducer';
import selectedConversation from './selectedConversation';

const rootReducer = combineReducers({
  selectedEventReducer,
  selectedChefReducer,
  socketReducer,
  selectedConversation,
});

export default rootReducer;
