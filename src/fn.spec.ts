import { wiith, using, composelAsync, until, fallback } from "./fn";
import { Deferred } from "ts-deferred";
import { assertError } from "./error";

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
    const fn1 = jest.fn(() => d1.promise);

    const d2 = new Deferred<string>();
    const fn2 = jest.fn(() => d2.promise);

    const d3 = new Deferred<string>();
    const fn3 = jest.fn(() => d3.promise);

    const fn = composelAsync(fn1, fn2, fn3);
    const waiting = fn("nothing");

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

describe("until", () => {
  test("falls back to last non-undefined value", async () => {
    expect(
      await until(
        () => undefined,
        () => 2,
        () => 1,
      ),
    ).toBe(2);

    expect(
      await until(
        () => 2,
        () => 1,
      ),
    ).toBe(2);

    expect(
      await until(
        () => undefined,
        () => undefined,
        () => 2,
        () => 1,
      ),
    ).toBe(2);
  });

  test("supports promise chaining", async () => {
    expect(
      await until(
        () => undefined,
        async () => 2,
        () => 1,
      ),
    ).toBe(2);

    expect(
      await until(
        async () => undefined,
        async () => undefined,
        async () => 2,
        () => 1,
      ),
    ).toBe(2);
  });

  test("throws errors correctly", async () => {
    let error;
    try {
      await until(
        () => undefined,
        () => {
          throw new Error("Failed");
        },
      );
    } catch (err) {
      error = assertError(err);
    }
    expect(error).toBeDefined();
    expect(error?.message).toEqual("Failed");
  });
});

describe("fallback", () => {
  test("behaves correctly for numbers", () => {
    expect(
      fallback(
        () => undefined,
        () => 0,
        () => 7,
      ),
    ).toBe(0);

    expect(
      fallback(
        () => undefined,
        () => 7,
      ),
    ).toBe(7);

    expect(
      fallback(
        () => undefined,
        () => -7,
        () => 7,
      ),
    ).toBe(-7);
  });

  test("behaves correctly for bools", () => {
    expect(
      fallback(
        () => undefined,
        () => false,
        () => true,
      ),
    ).toBe(false);

    expect(
      fallback(
        () => undefined,
        () => true,
      ),
    ).toBe(true);
  });
});
