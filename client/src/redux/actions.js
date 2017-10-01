import queryString from 'query-string';
import fetch from 'isomorphic-fetch';

export const REQUEST_DEPRESSION = 'REQUEST_DEPRESSION';
export const RECEIVE_DEPRESSION= 'RECEIVE_DEPRESSION';

const url = 'http://5d2f45e7.ngrok.io';

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
