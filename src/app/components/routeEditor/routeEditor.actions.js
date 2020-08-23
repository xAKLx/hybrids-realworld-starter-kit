import store from '../../store';
import * as R from 'ramda';
import { createArticle } from '../../services/conduit';
import * as Result from '../../core/monads/result';
import { Just } from '../../core/monads/maybe';

export function updateField(field) {
  const actionField = {
    title: 'TITLE',
    description: 'DESCRIPTION',
    body: 'BODY',
    enterTags: 'ENTER_TAGS',
  };
  return (value) => {
    const action = {
      type: `UPDATE_${actionField[field]}`,
    };
    store.dispatch(R.assoc(field, value, action));
  };
}

export function addTag() {
  store.dispatch({
    type: 'ADD_TAG',
  });
}

export function deleteTag(tag) {
  store.dispatch({
    type: 'DELETE_TAG',
    tag,
  });
}

export async function publishArticle() {
  const {
    editor: { title, description, body, tagList },
  } = store.getState();

  (await createArticle({ title, description, body, tagList }))
    |> Result.match(
      () => console.log('ok'),
      Result.matchError({
        '422': ({ errors }) =>
          store.dispatch({
            type: 'UPDATE_ERRORS',
            errors: Just(errors),
          }),
      }),
    );
}
