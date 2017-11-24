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

export const REQUEST_TOKEN_VALIDATE = 'REQUEST_TOKEN_VALIDATE';
export const RECEIVE_TOKEN_VALIDATE = 'RECEIVE_TOKEN_VALIDATE';

export const REQUEST_SUBMIT_CHALLENGE = 'REQUEST_SUBMIT_CHALLENGE';
export const RECEIVE_SUBMIT_CHALLENGE = 'RECEIVE_SUBMIT_CHALLENGE';

const TOKEN_KEY = 'USER_TOKEN';

const url = 'http://138.68.5.174:8962';

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

export function fetchLogout(token) {
  const fullUrl = `${url}/logout`;
  return async dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem(TOKEN_KEY);
    const response = await fetch(fullUrl, {
      method: 'POST',
      body: JSON.stringify({
        token,
      }),
    });
    dispatch(receiveLogout());
  };
}

export function requestTokenValidate(token) {
  return {
    type: REQUEST_TOKEN_VALIDATE,
    token,
  };
}

export function receiveTokenValidate(token) {
  return {
    type: RECEIVE_TOKEN_VALIDATE,
    token,
  };
}

export function retrieveToken() {
  const fullUrl = `${url}/validate_token`;
  const user = localStorage.getItem(TOKEN_KEY);

  return async dispatch => {
    if (!user) {
      return;
    }
    const token = JSON.parse(user);
    dispatch(requestTokenValidate(token));
    const response = await fetch(fullUrl, {
      method: 'POST',
      body: JSON.stringify({
        username: token.username,
        token: token.token,
      }),
    });
    const result = await response.json();
    if (result.is_valid) {
      dispatch(receiveTokenValidate(token));
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  };
}

export function requestSignup(username, email) {
  return {
    type: REQUEST_SIGNUP,
    username,
    email,
  };
}

export function receiveSignup() {
  return {
    type: RECEIVE_SIGNUP,
  };
}

export function fetchSignup(username, email, password) {
  const fullUrl = `${url}/users`;
  return async dispatch => {
    dispatch(requestSignup(username, email));
    const response = await fetch(fullUrl, {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const result = await response.json();
    dispatch(receiveSignup());
  };
}

export function requestSubmitChallenge() {
  return {
    type: REQUEST_SUBMIT_CHALLENGE,
  };
}

export function receiveSubmitChallenge(challengeId, result) {
  return {
    type: RECEIVE_SUBMIT_CHALLENGE,
    challengeId,
    result,
  };
}

export function submitChallenge(challengeId, token, file) {
  const fullUrl = `${url}/challenges/${challengeId}/submissions/${token}`;

  return async dispatch => {
    dispatch(requestSubmitChallenge()); 
    const fileReader = new FileReader();
    if (!fileReader || !file) {
      return;
    }
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = async () => {
      const data = fileReader.result;
      const response = await fetch(fullUrl, {
        method: 'POST',
        body: data,
      });
      const result = await response.json();
      console.log(result);
      dispatch(receiveSubmitChallenge(challengeId, result));
    };
  };  
}

export function requestSubmissions() {
  return {
    type: REQUEST_SUBMISSIONS,
  };
}

export function receiveSubmissions(challengeId, submissions) {
  return {
    type: RECEIVE_SUBMISSIONS,
    challengeId,
    submissions,
  };
}

export function fetchSubmissions(challengeId, token) {
  const fullUrl = `${url}/challenges/${challengeId}/submissions/${token}`;

  return async dispatch => {
    dispatch(requestSubmissions());
    const response = await fetch(fullUrl);    
    const submissions = await response.json();
    dispatch(receiveSubmissions(challengeId, submissions));
  };
}

export function requestLeaderboard() {
  return {
    type: REQUEST_LEADERBOARD,
  };
}

export function receiveLeaderboard(challengeId, leaderboard) {
  return {
    type: RECEIVE_LEADERBOARD,
    challengeId,
    leaderboard,
  };
}

export function fetchLeaderboard(challengeId) {
  const fullUrl = `${url}/challenges/${challengeId}/leaderboard`;

  return async dispatch => {
    dispatch(requestLeaderboard());
    const response = await fetch(fullUrl);
    const leaderboard = await response.json();
    dispatch(receiveLeaderboard(challengeId, leaderboard));
  };
}
