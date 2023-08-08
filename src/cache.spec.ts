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

test("can be cleared", () => {
  let testVal = "test response";
  const testFn = jest.fn(() => testVal);
  const cachedFn = cachedFunc(testFn, 5000);

  testVal = "first";
  const first = cachedFn();
  expect(first).toEqual("first");

  testVal = "second";
  const second = cachedFn();
  expect(second).toEqual("first");

  cachedFn.clear();
  testVal = "third";
  const third = cachedFn();
  expect(third).toEqual("third");
});

test("can have individual keys deleted", () => {
  let testVal = "test response";
  const testFn = jest.fn(
    ({ input }: { input: string }) => `${testVal} - ${input}`,
  );
  const cachedFn = cachedFunc(testFn, 5000);

  testVal = "first";
  const firstFoo = cachedFn({ input: "foo" });
  const firstBar = cachedFn({ input: "bar" });
  expect(firstFoo).toEqual("first - foo");
  expect(firstBar).toEqual("first - bar");

  testVal = "second";
  const secondFoo = cachedFn({ input: "foo" });
  const secondBar = cachedFn({ input: "bar" });
  expect(secondFoo).toEqual("first - foo");
  expect(secondBar).toEqual("first - bar");

  cachedFn.delete({ input: "bar" });
  testVal = "third";
  const thirdFoo = cachedFn({ input: "foo" });
  const thirdBar = cachedFn({ input: "bar" });
  expect(thirdFoo).toEqual("first - foo");
  expect(thirdBar).toEqual("third - bar");

  testVal = "fourth";
  const fourthFoo = cachedFn({ input: "foo" });
  const fourthBar = cachedFn({ input: "bar" });
  expect(fourthFoo).toEqual("first - foo");
  expect(fourthBar).toEqual("third - bar");
});
