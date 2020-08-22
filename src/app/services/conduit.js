import Axios from 'axios';

export async function getArticles(filter = {}) {
  const url =
    Object.keys(filter).length > 0 ? `articles?${objectToQueryParams(filter)}` : `articles`;

  const { data } = await Axios.get(url);

  return data;
}

export async function getFeedArticles(filter = {}) {
  const url =
    Object.keys(filter).length > 0
      ? `articles/feed?${objectToQueryParams(filter)}`
      : `articles/feed`;

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
  } = await Axios.get(`tags`);

  return tags;
}

export async function login(email, password) {
  const { data } = await Axios.post(`users/login`, {
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
  } = await Axios.get(`user`);
  return user;
}

export async function updateSettings(settings) {
  const { data } = await Axios.put(`user`, { user: settings });
  return data;
}

export async function getUser(username) {
  const {
    data: { profile },
  } = await Axios.get(`profiles/${username}`);
  return profile;
}

export async function toggleFollowUser(follow, username) {
  const url = `profiles/${username}/follow`;

  const request = follow ? Axios.delete(url) : Axios.post(url, {});
  const {
    data: { profile },
  } = await request;

  return profile;
}

export async function favoriteArticle(slug) {
  const {
    data: { article },
  } = await Axios.post(`articles/${slug}/favorite`);
  return article;
}

export async function unfavoriteArticle(slug) {
  const {
    data: { article },
  } = await Axios.delete(`articles/${slug}/favorite`);
  return article;
}

/* eslint-disable */
Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  config.baseURL = 'https://conduit.productionready.io/api/';

  return config;
});
