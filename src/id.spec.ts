import { generate } from "./id";

test("creates new GUID ids", () => {
  const id = generate();
  expect(id).toBeDefined();
  expect(id.length).toBe(36);
});

test("creates unique ids", () => {
  const one = generate();
  const two = generate();
  expect(one).toBeDefined();
  expect(two).toBeDefined();
  expect(one).not.toEqual(two);
});
