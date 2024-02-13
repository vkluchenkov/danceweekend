import isNil from 'lodash/isNil';

export const must = <T>(value: T | null | undefined, message?: string) => {
  if (isNil(value)) {
    throw new Error('Value must be defined' + (message ? `: ${message}` : ''));
  }

  return value;
};
