import Axios from 'axios';

const baseUrl = 'https://conduit.productionready.io/api';

export async function getArticles(filter = {}) {
  const url =
    Object.keys(filter).length > 0
      ? `${baseUrl}/articles?${objectToQueryParams(filter)}`
      : `${baseUrl}/articles`;

  const { data } = await Axios.get(url);

  return data;
}

export async function getFeedArticles(filter = {}) {
  const url =
    Object.keys(filter).length > 0
      ? `${baseUrl}/articles/feed?${objectToQueryParams(filter)}`
      : `${baseUrl}/articles/feed`;

  const { data } = await Axios.get(url);

  return data;
}

function objectToQueryParams(object) {
  return Object.entries(object)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}

export async function getTags() {
  const {
    data: { tags },
  } = await Axios.get(`${baseUrl}/tags`);

  return tags;
}

export async function login(email, password) {
  const { data } = await Axios.post(`${baseUrl}/users/login`, {
    user: {
      email,
      password,
    },
  }).catch((x) => x.response);
  return data;
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await Axios.get(`${baseUrl}/user`);
  return user;
}

export async function updateSettings(settings) {
  const { data } = await Axios.put(`${baseUrl}/user`, { user: settings });
  return data;
}

export async function getUser(username) {
  const {
    data: { profile },
  } = await Axios.get(`${baseUrl}/profiles/${username}`);
  return profile;
}

export async function toggleFollowUser(follow, username) {
  const url = `${baseUrl}/profiles/${username}/follow`;

  const request = follow ? Axios.delete(url) : Axios.post(url, {});
  const {
    data: { profile },
  } = await request;

  return profile;
}

/* eslint-disable */
Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});
