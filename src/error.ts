/**
 * Functional helper for throwing an error.
 * @param {error} e
 * @example
 * when(result.error, _throw);
 */
 export const throw_ = <T>(e: T) => {
  throw e;
};
