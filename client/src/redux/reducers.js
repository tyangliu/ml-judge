import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import XDate from 'xdate';

import {
  REQUEST_CHALLENGES_LIST,
  RECEIVE_CHALLENGES_LIST,

  REQUEST_CHALLENGE,
  RECEIVE_CHALLENGE, 

  REQUEST_SUBMIT_CHALLENGE,
  RECEIVE_SUBMIT_CHALLENGE,

  REQUEST_SUBMISSIONS,
  RECEIVE_SUBMISSIONS,

  REQUEST_LEADERBOARD,
  RECEIVE_LEADERBOARD,

  REQUEST_SIGNUP,
  RECEIVE_SIGNUP,

  REQUEST_LOGIN,
  RECEIVE_LOGIN,

  REQUEST_LOGOUT,
  RECEIVE_LOGOUT,

  REQUEST_TOKEN_VALIDATE,
  RECEIVE_TOKEN_VALIDATE,
} from './actions';

const dateComparator = (a, b, key) => { 
  const dateA = new XDate(a[key]);
  const dateB = new XDate(b[key]);
  if (dateA < dateB) {
    return 1;
  } else if (dateA > dateB) {
    return -1;
  } else {
    return 0;
  }
}

function challengesList(state = [], action) {
  switch (action.type) {
    case REQUEST_CHALLENGES_LIST:
      return state;
    case RECEIVE_CHALLENGES_LIST:
      action.challengesList.sort((a, b) => dateComparator(a, b, 'date'));
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
    case REQUEST_LEADERBOARD:
      return state;
    case RECEIVE_LEADERBOARD:
      return {
        ...state,
        [action.challengeId]: action.leaderboard,
      };
    default:
      return state;
  }
}

function submissions(state = {}, action) {
  switch (action.type) {
    case REQUEST_SUBMISSIONS:
      return state;
    case RECEIVE_SUBMISSIONS:
      action.submissions.sort((a, b) => dateComparator(a, b, 'created_at'));
      return {
        ...state,
        [action.challengeId]: action.submissions,
      };
    case RECEIVE_SUBMIT_CHALLENGE:
      const submissions = [...(state[action.challengeId] || []), action.result];
      submissions.sort((a, b) => dateComparator(a, b, 'created_at'));
      return {
        ...state,
        [action.challengeId]: submissions,
      };
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
    case REQUEST_LOGOUT:
    case RECEIVE_LOGOUT:
    case REQUEST_TOKEN_VALIDATE:
      return null;
    case RECEIVE_TOKEN_VALIDATE:
    case RECEIVE_LOGIN:
      return action.token;
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

