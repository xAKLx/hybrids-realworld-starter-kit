import {
  getTags,
  getArticles,
  getCurrentUser,
  getFeedArticles,
  favoriteArticle,
  unfavoriteArticle,
} from '../services/conduit';
import store from '../store';

export async function loadHome() {
  store.dispatch({
    type: 'LOAD_HOME',
    tags: await getTags(),
  });
}

export async function loadPage(page = 0) {
  store.dispatch({
    type: 'START_LOAD_PAGE',
    page,
  });

  const { articles, articlesCount } = await getArticles({ offset: 20 * page });
  endLoadPage(articles, articlesCount);
}

export async function loadTagPage(tag, page = 0) {
  store.dispatch({
    type: 'START_LOAD_PAGE',
    page,
  });

  const { articles, articlesCount } = await getArticles({ tag, offset: 20 * page });
  endLoadPage(articles, articlesCount);
}

export async function loadFeedPage(page = 0) {
  store.dispatch({
    type: 'START_LOAD_PAGE',
    page,
  });

  const { articles, articlesCount } = await getFeedArticles({ offset: 20 * page });
  endLoadPage(articles, articlesCount);
}

function endLoadPage(articles, count) {
  store.dispatch({
    type: 'LOAD_PAGE',
    articles,
    pageAmount: Math.ceil(count / 20),
  });
}

export async function changeTab(tab) {
  store.dispatch({
    type: 'CHANGE_TAB',
    tab,
  });

  const request =
    tab === 'global'
      ? loadPage
      : tab === 'your feed'
      ? loadFeedPage
      : (page) => loadTagPage(tab.slice(1), page);
  await request(0);
}

export async function loadUser() {
  try {
    store.dispatch({
      type: 'LOGIN',
      user: await getCurrentUser(),
    });
  } catch {
    localStorage.removeItem('token');
  }
}

export async function toggleFavoriteArticle({ favorited, slug }) {
  const request = favorited ? unfavoriteArticle : favoriteArticle;

  store.dispatch({
    type: 'TOGGLE_FAVORITE_ARTICLE',
    updatedArticle: await request(slug),
  });
}
