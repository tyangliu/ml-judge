import React from 'react';

import {Route} from 'react-router-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import thunkMiddleware from 'redux-thunk';
import {ConnectedRouter, routerMiddleware, push} from 'react-router-redux';

import App from './app.jsx';
import rootReducer from './redux/reducers';

const history = createHistory();

const store = createStore(
  rootReducer,
  applyMiddleware(
    routerMiddleware(history),
    thunkMiddleware,
  ),
);

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Route component={App}/>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
