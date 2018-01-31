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
import CurrentPageNavBar from './containers/CurrentPageNavBar';
import SelectedEvent from './containers/SelectedEvent';
import UserProfile from './containers/UserProfile';
import UserEvents from './containers/UserEvents';
import Settings from './containers/Settings';
import SelectedChef from './containers/SelectedChef';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(<Provider store={createStoreWithMiddleware(reducers)}>
                  <BrowserRouter>
                      <div id='window'>
                        <Route path='/' component={CurrentPageNavBar} />
                        <Route path='/' component={NavBar} />
                        <Route exact path='/' component={LandingPage} />
                        <Route exact path='/loginForm' component={LoginForm} />
                        <Route exact path='/signUpForm' component={SignUpForm} />
                        <Route exact path='/browseEvents' component={BrowseEvents}/>
                        <Route exact path='/selectedEvent' component={SelectedEvent} />
                        <Route exact path='/selectedChef' component={SelectedChef} />
                        <Route exact path='/browseChefs' component={BrowseChefs} />
                        <Route exact path='/createEvent' component={CreateEvent} />
                        <Route exact path='/userProfile' component={UserProfile}/>
                        <Route exact path='/userEvents' component={UserEvents}/>
                        <Route exact path='/settings' component={Settings}/>
                      </div>
                  </BrowserRouter>
                </Provider>, document.getElementById('app'));

