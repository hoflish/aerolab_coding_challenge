// @flow
import CONFIG from '../config/app';
import {loadState} from '../utils/localStorage';

const callApi = (method: "get" | "post", endpoint, data) => {
  const headers = new Headers({
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Authorization": `Bearer ${window.localStorage.getItem("accessToken")}`,
  });

  const fullUrl =
    endpoint.indexOf(CONFIG.API_ROOT) === -1 ? CONFIG.API_ROOT + endpoint : endpoint;

  const request = new Request(fullUrl, {
    method: method,
    headers: headers,
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify(data)
  });

  return fetch(request);
};

export default {
  get(endpoint: string) {
    return callApi("get", endpoint);
  },
  post(endpoint: string, data: any) {
    return callApi("post", endpoint, data);
  }
};
