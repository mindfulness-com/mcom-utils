/**
 * Functional helper for throwing an error.
 * @param {error} e
 * @example
 * when(result.error, _throw);
 */
export const throw_ = <T>(e: T) => {
  throw e;
};

/**
 * As of typescript 4.4.x thrown Errors are of unknown type so this function is used
 * to assert that the error is of the expected type and attempts to convert the error to the expected type.
 * @param {unkown} err - The error to assert.
 * @returns {Error} - The original error if it is of the expected type otherwise the converted error.
 */
export const assertError = (err: unknown): Error => {
  if (err instanceof Error) {
    return err;
  } else if (typeof err === "string") {
    return new Error(err);
  } else if (typeof err === "object") {
    return new Error(JSON.stringify(err));
  }
  return new Error(`non-error of type ${typeof err} has been thrown`);
};
