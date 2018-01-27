import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter, Route } from 'react-router-dom';
import reducers from './reducers';
import NavBar from './containers/NavBar';
import LandingPage from './components/LandingPage';
import BrowseEvents from './containers/BrowseEvents';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(<Provider store={createStoreWithMiddleware(reducers)}>
                  <BrowserRouter>
                    <MuiThemeProvider>
                      <div id='window'>
                        <Route path='/' component={NavBar} />
                        <Route exact path='/' component={LandingPage} />
                        <Route exact path='/browseEvents' component={BrowseEvents}/>
                      </div>
                    </MuiThemeProvider>
                  </BrowserRouter>
                </Provider>, document.getElementById('app'));

