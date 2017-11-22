import queryString from 'query-string';
import fetch from 'isomorphic-fetch';

export const REQUEST_CHALLENGES_LIST = 'REQUEST_CHALLENGES_LIST';
export const RECEIVE_CHALLENGES_LIST = 'RECEIVE_CHALLENGES_LIST';

export const REQUEST_CHALLENGE = 'REQUEST_CHALLENGE';
export const RECEIVE_CHALLENGE = 'RECEIVE_CHALLENGE';

export const REQUEST_SUBMISSIONS = 'REQUEST_SUBMISSIONS';
export const RECEIVE_SUBMISSIONS = 'RECEIVE_SUBMISSIONS';

export const REQUEST_LEADERBOARD = 'REQUEST_LEADERBOARD';
export const RECEIVE_LEADERBOARD = 'RECEIVE_LEADERBOARD';

export const REQUEST_SIGNUP = 'REQUEST_SIGNUP';
export const RECEIVE_SIGNUP = 'RECEIVE_SIGNUP';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';

export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const RECEIVE_LOGOUT = 'RECEIVE_LOGOUT';

export const REQUEST_SUBMISSION = 'REQUEST_SUBMISSION';
export const RECEIVE_SUBMISSION = 'RECEIVE_SUBMISSION';

const url = 'http://0.0.0.0:8000';

export function requestDepression(reddit, twitter) {
  return {
    type: REQUEST_DEPRESSION,
    reddit,
    twitter,
  };
}

export function receiveDepression(results) {
  return {
    type: RECEIVE_DEPRESSION,
    results,
    receivedAt: Date.now(),
  };
}

export function fetchDepression(reddit, twitter) {
  const paramsStr = queryString.stringify({
    reddit_handler: reddit,
    twitter_handler: twitter,
  }); 
  const fullUrl = `${url}/analyze?${paramsStr}`;

  return async dispatch => {
    dispatch(requestDepression(reddit, twitter));
    const response = await fetch(fullUrl);
    const results = await response.json();
    dispatch(receiveDepression(results));
  };
};
