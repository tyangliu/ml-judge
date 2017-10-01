import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import {
  REQUEST_DEPRESSION, RECEIVE_DEPRESSION
} from './actions';

function depression(state = {
  results: {},
}, action) {
  switch (action.type) {
    case REQUEST_DEPRESSION:
      return {
        results: {}
      };
    case RECEIVE_DEPRESSION:
      return {...state,
        depression: action.results,
        isFetching: true,
        didInvalidate: false,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  depression,
  routing: routerReducer,
});

export default rootReducer;

