import { html, define, render } from 'hybrids';
import { connect } from '../../core/store';
import { onInputAction, onKeyPress } from '../../core/attributes';
import { updateField, addTag, deleteTag, publishArticle } from './routeEditor.actions';
import * as R from 'ramda';
import { match } from '../../core/monads/maybe';

export const routeEditor = {
  editor: connect(({ editor }) => editor),
  render: render(
    ({ editor: { title, description, body, enterTags, tagList, errors } }) => html`<div
      class="editor-page"
    >
      <div class="container page">
        <div class="row">
          <div class="col-md-10 offset-md-1 col-xs-12">
            ${renderListOfErrors(errors)}
            <form>
              <fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Article Title"
                    value="${title}"
                    oninput="${onInputAction(updateField('title'))}"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="What's this article about?"
                    value="${description}"
                    oninput="${onInputAction(updateField('description'))}"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    class="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    value="${body}"
                    oninput="${onInputAction(updateField('body'))}"
                  ></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter tags"
                    value="${enterTags}"
                    oninput="${onInputAction(updateField('enterTags'))}"
                    onkeypress="${onKeyPress(R.ifElse(R.equals('Enter'), addTag, R.F))}"
                  />
                  <div class="tag-list">${tagList.map(renderTag)}</div>
                </fieldset>
                <button
                  class="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  onclick="${publishArticle}"
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>`,
    { shadowRoot: false },
  ),
};

function renderTag(tag) {
  return html`<span class="tag-default tag-pill"
    ><i class="ion-close-round" onclick="${() => deleteTag(tag)}"></i>${tag}</span
  >`;
}

function renderListOfErrors(errors) {
  return (
    errors
    |> match(
      (errors) =>
        html`<ul class="error-messages">
          ${Object.entries(errors).map(([key, value]) =>
            value.map((message) => html`<li>${key} ${message}</li>`),
          ) |> R.flatten}
        </ul>`,
      () => '',
    )
  );
}

define('route-editor', routeEditor); /* eslint-disable-line */
