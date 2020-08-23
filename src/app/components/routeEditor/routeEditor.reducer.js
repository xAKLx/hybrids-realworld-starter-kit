import * as R from 'ramda';
import matchAction from '../../core/matchAction';
import { Nothing } from '../../core/monads/maybe';

export default (
  state = { title: '', description: '', body: '', tagList: [], enterTags: '', errors: Nothing() },
  action,
) =>
  matchAction(action, R.always({}), {
    UPDATE_TITLE: ({ title }) => ({ title }),
    UPDATE_DESCRIPTION: ({ description }) => ({ description }),
    UPDATE_BODY: ({ body }) => ({ body }),
    UPDATE_ENTER_TAGS: ({ enterTags }) => ({ enterTags }),
    ADD_TAG: () => ({
      tagList:
        state.tagList |> R.find(R.equals(state.enterTags)) |> R.isNil
          ? [...state.tagList, state.enterTags]
          : state.tagList,
      enterTags: '',
    }),
    DELETE_TAG: ({ tag }) => ({ tagList: state.tagList.filter(R.pipe(R.equals(tag), R.not)) }),
    UPDATE_ERRORS: ({ errors }) => ({ errors }),
  }) |> R.mergeRight(state);
