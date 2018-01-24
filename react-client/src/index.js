import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter, Route } from 'react-router-dom';
import reducers from './reducers';
import App from './components/App';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(<Provider store={createStoreWithMiddleware(reducers)}>
                  <BrowserRouter>
                    <MuiThemeProvider>
                      <div>
                        <Route exact path="/" component={App} />
                      </div>
                    </MuiThemeProvider>
                  </BrowserRouter>
                </Provider>, document.getElementById('app'));

