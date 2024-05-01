import { BASE_URL } from "./constants";

const checkResponse =  (response) => {
  if (response.ok) {
    return response.json();
  }
  return response.json().then((err) => Promise.reject(err));
}

export const request = (endpoint, options) => {
  const url = `${BASE_URL}${endpoint.startsWith('/') ? '': '/'}${endpoint}`;
  return fetch(url, options).then(checkResponse);
}

export const refreshToken = () => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

export const fetchWithRefresh = async (url, options) => {
  try {
    return await request(url, options);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      return await request(url, options);
    } else {
      return Promise.reject(err);
    }
  }
};