import { cachedFunc } from "./cache";

test("caches a function call", () => {
  const testFn = jest.fn((input: string) => input + "+1");
  const cachedFn = cachedFunc(testFn, 1000);
  cachedFn("a");
  cachedFn("a");
  expect(testFn).toHaveBeenCalledTimes(1);

  cachedFn("b");
  expect(testFn).toHaveBeenCalledTimes(2);
});

test("caches an array function call", () => {
  const testFn = jest.fn((inputs: string[]) => [...inputs, "+1"]);
  const cachedFn = cachedFunc(testFn, 1000);
  cachedFn(["a"]);
  cachedFn(["a"]);
  expect(testFn).toHaveBeenCalledTimes(1);

  cachedFn(["a", "b"]);
  expect(testFn).toHaveBeenCalledTimes(2);
});

test("caches promise results function call", async () => {
  const testFn = jest.fn(async (input: string) => input + "+1");
  const cachedFn = cachedFunc(testFn, 1000);
  await cachedFn("a");
  await cachedFn("a");
  expect(testFn).toHaveBeenCalledTimes(1);

  await cachedFn("b");
  expect(testFn).toHaveBeenCalledTimes(2);
});

test("caches promise array function call", async () => {
  const testFn = jest.fn(async (inputs: string[]) => [...inputs, "+1"]);
  const cachedFn = cachedFunc(testFn, 1000);
  await cachedFn(["a"]);
  await cachedFn(["a"]);
  expect(testFn).toHaveBeenCalledTimes(1);

  await cachedFn(["a", "b"]);
  expect(testFn).toHaveBeenCalledTimes(2);
});
