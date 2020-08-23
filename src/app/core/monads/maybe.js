import * as R from 'ramda';

export function Just(value) {
  return R.isNil(value) ? Nothing() : { type: 'just', value };
}

export function Nothing() {
  return { type: 'nothing' };
}

export const match = R.curry((justHandler, nothingHandler, maybe) =>
  maybe.type === 'just' ? justHandler(maybe.value) : nothingHandler(),
);
