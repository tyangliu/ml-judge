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

export const RETRIEVE_TOKEN = 'RETRIEVE_TOKEN';

export const REQUEST_SUBMISSION = 'REQUEST_SUBMISSION';
export const RECEIVE_SUBMISSION = 'RECEIVE_SUBMISSION';

const TOKEN_KEY = 'USER_TOKEN';

const url = 'http://0.0.0.0:8000';

export function requestChallengesList() {
  return {
    type: REQUEST_CHALLENGES_LIST,
  };
}

export function receiveChallengesList(challengesList) {
  return {
    type: RECEIVE_CHALLENGES_LIST,
    challengesList,
    receivedAt: Date.now(),
  };
}

export function fetchChallengesList() {
  const fullUrl = `${url}/challenges`;
  return async dispatch => {
    dispatch(requestChallengesList());
    const response = await fetch(fullUrl);
    const challengesList = await response.json();
    dispatch(receiveChallengesList(challengesList));
  };
}

export function requestChallenge(challengeId) {
  return {
    type: REQUEST_CHALLENGE,
    challengeId,
  };
}

export function receiveChallenge(challenge) {
  return {
    type: RECEIVE_CHALLENGE,
    challenge,
  };
}

export function fetchChallenge(challengeId) {
  const fullUrl = `${url}/challenges/${challengeId}`;
  return async dispatch => {
    dispatch(requestChallenge(challengeId));
    const response = await fetch(fullUrl);
    const challenge = await response.json();
    dispatch(receiveChallenge(challenge));
  };
}

export function requestLogin(username) {
  return {
    type: REQUEST_LOGIN,
    username,
  };
}

export function receiveLogin(token) {
  return {
    type: RECEIVE_LOGIN,
    token,
  };
}

export function fetchLogin(username, password) {
  const fullUrl = `${url}/login`;
  return async dispatch => { 
    dispatch(requestLogin(username));
    const response = await fetch(fullUrl, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const token = await response.json();
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    dispatch(receiveLogin(token));
  };
}

export function requestLogout() {
  return {
    type: REQUEST_LOGOUT,
  };
}

export function receiveLogout() {
  return {
    type: RECEIVE_LOGOUT,
  };
}

export function retrieveToken() {
  const user = localStorage.getItem(TOKEN_KEY);
  return {
    type: RETRIEVE_TOKEN,
    token: user && JSON.parse(user),
  };
}

export function fetchLogout(token) {
  const fullUrl = `${url}/logout`;
  return async dispatch => {;
    dispatch(requestLogout());
    localStorage.removeItem(TOKEN_KEY);
    const response = await fetch(fullUrl, {
      method: 'POST',
      body: JSON.stringify({
        token,
      }),
    });
    dispatch(receiveLogout());
  } 
}
