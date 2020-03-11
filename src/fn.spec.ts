import { wiith, using, composelAsync } from "./fn";
import { Deferred } from "ts-deferred";

test("should run wiith function using arge generator func", () => {
  const mock = jest.fn();
  wiith(mock, () => ["a", 1]);
  expect(mock).toHaveBeenCalledWith("a", 1);
});

test("should run wiith function using arge generator func", () => {
  const mock = jest.fn();
  using(["a", 1], mock);
  expect(mock).toHaveBeenCalledWith("a", 1);
});

describe("composelAsync", () => {
  test("should compose promise functions", async () => {
    const fn1 = jest.fn(() => Promise.resolve("1"));
    const fn2 = jest.fn(() => Promise.resolve("2"));
    const fn3 = jest.fn(() => Promise.resolve("3"));
    expect(await composelAsync(fn1, fn2, fn3)("nothing")).toBe("3");
  });

  test("should wait for each value response", async () => {
    const d1 = new Deferred<string>();
    const fn1 = jest.fn(async () => d1.promise);

    const d2 = new Deferred<string>();
    const fn2 = jest.fn(async () => d2.promise);

    const d3 = new Deferred<string>();
    const fn3 = jest.fn(async () => d3.promise);

    const waiting = composelAsync(fn1, fn2, fn3)("nothing");

    // Let above first promise resolve
    await new Promise(r => setTimeout(r, 10));

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).not.toHaveBeenCalledTimes(1);
    expect(fn3).not.toHaveBeenCalledTimes(1);

    d1.resolve("1");
    // Let promise loop run
    await new Promise(r => setTimeout(r, 10));

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn3).not.toHaveBeenCalledTimes(1);

    d2.resolve("2");
    // Let promise loop run
    await new Promise(r => setTimeout(r, 10));

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn3).toHaveBeenCalledTimes(1);

    d3.resolve("3");
    // Let promise loop run
    await d3.promise;

    expect(await waiting).toBe("3");
  });
});
