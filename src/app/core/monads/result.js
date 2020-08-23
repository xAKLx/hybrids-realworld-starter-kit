import * as R from 'ramda';
import { Just, Nothing } from './maybe';

export function OK(value) {
  return {
    type: 'OK',
    value,
  };
}

export function Error(type, value) {
  return {
    type,
    value,
  };
}

export function Err(error) {
  return {
    type: 'Err',
    error,
  };
}

export const match = R.curry((okHandler, errHandler, result) =>
  result.type === 'OK' ? okHandler(result.value) : errHandler(result.error),
);

export const matchError = R.curry((handlers, error) =>
  R.has(error.type, handlers) ? Just(handlers[error.type](error.value)) : Nothing(),
);
