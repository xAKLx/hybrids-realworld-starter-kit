import { render, html } from 'hybrids';
import { loadPage, changeTab, loadTagPage, loadFeedPage } from '../../actions/home';
import { connect } from '../../core/store';
import { onPageLinkClickAction } from '../../components/articleList/articleListAttributes';
import * as R from 'ramda';

export default {
  home: connect(({ home }) => home),
  app: connect(({ app }) => app),
  yourFeedClasses: ({ app: { user }, home: { tab } }) => ({
    'nav-link': true,
    disabled: R.isNil(user),
    active: tab === 'your feed',
  }),
  render: render(
    ({ home: { tags, articles, tab }, yourFeedClasses }) => html`
      <div class="home-page">
        <div class="banner">
          <div class="container">
            <h1 class="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div class="container page">
          <div class="row">
            <div class="col-md-9">
              <div class="feed-toggle">
                <ul class="nav nav-pills outline-active">
                  <li class="nav-item">
                    <a
                      href="#/"
                      class="${yourFeedClasses}"
                      href=""
                      onclick="${() => (!yourFeedClasses.disabled ? changeTab('your feed') : null)}"
                      >Your Feed</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      href="#/"
                      class="nav-link${tab === 'global' ? ' active' : ''}"
                      onclick="${() => changeTab('global')}"
                      >Global Feed</a
                    >
                  </li>
                  ${!tab.startsWith('#')
                    ? ''
                    : html`
                        <li class="nav-item">
                          <a href="#/" class="nav-link active" onclick="${() => changeTab(tab)}"
                            >${tab}</a
                          >
                        </li>
                      `}
                </ul>
              </div>

              <article-list
                articles="${articles}"
                onPageLinkClick="${onPageLinkClickAction((index) =>
                  tab === 'global'
                    ? loadPage(index)
                    : tab === 'your feed'
                    ? loadFeedPage(index)
                    : loadTagPage(index),
                )}"
              ></article-list>
            </div>

            <div class="col-md-3"><home-sidebar tags="${tags}"></home-sidebar></div>
          </div>
        </div>
      </div>
    `,
    { shadowRoot: false },
  ),
};
