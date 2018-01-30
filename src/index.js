import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import reducers from './reducers';
import NavBar from './containers/NavBar';
import LandingPage from './components/LandingPage';
import BrowseEvents from './containers/BrowseEvents';
import BrowseChefs from './containers/BrowseChefs';
import CurrentPageNavBar from './containers/CurrentPageNavBar';
import UserProfile from './containers/UserProfile';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(<Provider store={createStoreWithMiddleware(reducers)}>
                  <BrowserRouter>
                      <div id='window'>
                        <Route path='/' component={CurrentPageNavBar} />
                        <Route path='/' component={NavBar} />
                        <Route exact path='/' component={LandingPage} />
                        <Route exact path='/browseEvents' component={BrowseEvents}/>
                        <Route exact path='/browseChefs' component={BrowseChefs} />
                        <Route exact path='/userProfile' component={UserProfile}/>
                      </div>
                  </BrowserRouter>
                </Provider>, document.getElementById('app'));

