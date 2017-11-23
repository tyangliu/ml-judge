import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import XDate from 'xdate';

import {
  REQUEST_CHALLENGES_LIST,
  RECEIVE_CHALLENGES_LIST,

  REQUEST_CHALLENGE,
  RECEIVE_CHALLENGE, 

  REQUEST_SIGNUP,
  RECEIVE_SIGNUP,

  REQUEST_LOGIN,
  RECEIVE_LOGIN,

  REQUEST_LOGOUT,
  RECEIVE_LOGOUT,

  RETRIEVE_TOKEN,
} from './actions';

function challengesList(state = [], action) {
  switch (action.type) {
    case REQUEST_CHALLENGES_LIST:
      return state;
    case RECEIVE_CHALLENGES_LIST:
      action.challengesList.sort((a, b) => {
        const dateA = new XDate(a.date);
        const dateB = new XDate(b.date);
        if (dateA < dateB) {
          return -1;
        } else if (dateA > dateB) {
          return 1;
        } else {
          return 0;
        }
      });

      return action.challengesList;
    default:
      return state;
  }
}

function challenges(state = {}, action) {
  switch (action.type) {
    case REQUEST_CHALLENGE:
      return state;
    case RECEIVE_CHALLENGE:
      return {
        ...state,
        [action.challenge.id]: action.challenge,
      };
    default:
      return state;
  }
}

function leaderboards(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function submissions(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function signup(state = {}, action) {
  switch (action.type) {
    case REQUEST_SIGNUP:
      return {isPending: true};
    case RECEIVE_SIGNUP:
      return {isPending: false};
    default:
      return state;
  }
}

function user(state = null, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return null;
    case RETRIEVE_TOKEN:
    case RECEIVE_LOGIN:
      return action.token;
    case REQUEST_LOGOUT:
    case RECEIVE_LOGOUT:
      return null;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  challengesList,
  challenges,
  leaderboards,
  submissions,
  signup,
  user,
  routing: routerReducer,
});

export default rootReducer;

