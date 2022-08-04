/**
 * Functional helper for throwing an error.
 * @param {error} e
 * @example
 * when(result.error, _throw);
 */
export declare const throw_: <T>(e: T) => never;
/**
 * As of typescript 4.4.x thrown Errors are of unknown type so this function is used
 * to assert that the error is of the expected type and attempts to convert the error to the expected type.
 * @param {unkown} err - The error to assert.
 * @returns {Error} - The original error if it is of the expected type otherwise the converted error.
 */
export declare const assertError: (err: unknown) => Error;
