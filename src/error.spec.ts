import {assertError, throw_} from "./error";
import { Maybe } from "./maybe";


test('throw_ should throw error message', () => {
  expect(() => {
    throw_('error');
  }).toThrow('error');
});

test('undefined should be asserted to an error', () => {
  let error: Maybe<Error>;
  try {
    throw_(undefined);
  } catch(err) {
    error = assertError(err);
  }
  console.log(error)
  expect(error).toBeDefined();
  expect(error?.message).toEqual('non-error of type undefined has been thrown');
})

test('string should be asserted to an error', () => {
  let error: Maybe<Error>;
  try {
    throw_('Some error');
  } catch(err) {
    error = assertError(err);
  }
  expect(error).toBeDefined();
  expect(error?.message).toEqual('Some error');
})

test('object should be asserted to an error', () => {
  let error: Maybe<Error>;
  try {
    throw_({ message: 'Some error' });
  } catch(err) {
    error = assertError(err);
  }
  expect(error).toBeDefined();
  expect(error?.message).toEqual('{"message":"Some error"}');
})