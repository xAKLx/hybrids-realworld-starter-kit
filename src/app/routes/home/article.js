import { render, html } from 'hybrids';
import * as R from 'ramda';
import { toggleFavoriteArticle } from '../../actions/home';
import { connect } from '../../core/store';
import { changeLocation } from '../../core/attributes';

export default {
  isUserLoggedIn: connect(({ app }) => app.user !== null),
  article: {},
  favoriteButtonClasses: ({ article: { favorited } }) => ({
    'btn-outline-primary': !favorited,
    'btn-primary': favorited,
    btn: true,
    'btn-sm': true,
    'pull-xs-right': true,
  }),
  render: render(
    ({ article, favoriteButtonClasses, isUserLoggedIn }) => html`
      <div class="article-preview">
        <div class="article-meta">
          <a href="profile.html"><img src="${article.author.image}" /></a>
          <div class="info">
            <a href="#/profile/${article.author.username}" class="author"
              >${article.author.username}
            </a>
            <span class="date">${article.createdAt}</span>
          </div>
          <button
            class="${favoriteButtonClasses}"
            onclick="${() =>
              isUserLoggedIn ? toggleFavoriteArticle(article) : changeLocation('#/login')}"
          >
            <i class="ion-heart"></i> ${article.favoritesCount}
            <!-- TODO change icon when favorited -->
          </button>
        </div>
        <a href="" class="preview-link">
          <h1>${article.title}</h1>
          <p>${article.description}</p>
          <span>Read more...</span>
          <ul class="tag-list">
            ${R.map(renderTag, article.tagList)}
          </ul>
        </a>
      </div>
    `,
    { shadowRoot: false },
  ),
};

function renderTag(tag) {
  return html` <li class="tag-default tag-pill tag-outline">${tag}</li> `;
}
