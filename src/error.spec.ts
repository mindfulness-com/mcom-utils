import {throw_} from "./error";

test('should throw error message', () => {
  expect(() => {
    throw_('error');
  }).toThrow('error');
});
