import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import reducers from './reducers';
import NavBar from './containers/NavBar';
import LandingPage from './components/LandingPage';
import CreateEvent from './components/CreateEvent';
import BrowseEvents from './containers/BrowseEvents';
import BrowseChefs from './containers/BrowseChefs';
import SelectedEvent from './containers/SelectedEvent';
import UserProfile from './containers/UserProfile';
import UserEvents from './containers/UserEvents';
import Settings from './containers/Settings';
import SelectedChef from './containers/SelectedChef';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import ContactInfo from './components/ContactInfo';
import ChatTab from './containers/ChatList';
import Conversation from './containers/conversation';
import Notifications from './containers/notifications';
import LoggedOut from './components/LoggedOut';
import AuthRedirect from './components/AuthRedirect';
import AddToHomescreen from './components/AddToHomescreen';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(<Provider store={createStoreWithMiddleware(reducers)}>
                  <BrowserRouter>
                      <div id='window'>
                        <Route path='/' component={NavBar} />
                        <Route exact path='/' component={LandingPage} />
                        <Route exact path='/loginForm' component={LoginForm} />
                        <Route exact path='/signUpForm' component={SignUpForm} />
                        <Route exact path='/browseEvents' component={BrowseEvents}/>
                        <Route exact path='/selectedEvent' component={SelectedEvent} />
                        <Route exact path='/selectedChef' component={SelectedChef} />
                        <Route exact path='/browseChefs' component={BrowseChefs} />
                        <Route exact path='/createEvent' component={CreateEvent} />
                        <Route exact path='/editEvent' component={CreateEvent} />
                        <Route exact path='/userProfile' component={UserProfile}/>
                        <Route exact path='/auth/google/redirect' component={AuthRedirect}/>
                        <Route exact path='/userEvents' component={UserEvents}/>
                        <Route exact path='/chatList' component={ChatTab} />
                        <Route exact path='/conversation' component={Conversation} />
                        <Route exact path='/settings' component={Settings}/>
                        <Route exact path='/contactInfo' component={ContactInfo}/>
                        <Route exact path='/notifications' component={Notifications}/>
                        <Route exact path='/loggedOut' component={LoggedOut}/>
                        <Route exact path='/addToHomescreen' component={AddToHomescreen}/>
                      </div>
                  </BrowserRouter>
                </Provider>, document.getElementById('app'));

