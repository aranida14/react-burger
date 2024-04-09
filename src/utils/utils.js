import { BASE_URL } from "./constants";

const checkResponse =  (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка ${response.status}`);
}

export const request = (endpoint, options) => {
  const url = `${BASE_URL}${endpoint.startsWith('/') ? '': '/'}${endpoint}`;
  return fetch(url, options).then(checkResponse);
}