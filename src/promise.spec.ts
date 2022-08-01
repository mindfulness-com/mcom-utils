import { some, usingAll, waitFor, most } from "./promise";

const resolve = <T>(value?: T) =>
  new Promise(res => {
    res(typeof value === "function" ? value() : value);
  });

const reject = () =>
  new Promise((_, rej) => {
    rej(new Error("An error"));
  });

describe("some", () => {
  test("should return any promises that resovle and ignore errors", async () => {
    expect(await some([resolve("yes"), reject()])).toEqual(["yes", undefined]);
    expect(await some([resolve("yes"), reject(), resolve("man")])).toEqual([
      "yes",
      undefined,
      "man",
    ]);
  });

  test("should throw when none of the promises resolve", async () => {
    let run = false;
    try {
      await some([reject(), reject(), reject()]);
      run = true;
    } catch (err) {
      expect(err).toBeDefined();
    }
    expect(run).toBe(false);
  });

  test("calls error handler with every failed error", async () => {
    const handler = jest.fn();
    let run = false;
    try {
      await some([reject(), reject(), reject()], handler);
      run = true;
    } catch (err) {
      expect(err).toBeDefined();
    }
    expect(run).toBe(false);
    expect(handler).toHaveBeenCalledTimes(3);
  });
});

describe("most", () => {
  test("should return all resolved promises", async () => {
    expect(await most([resolve("yes"), resolve("boo")])).toEqual([
      "yes",
      "boo",
    ]);
  });

  test("reports errors to callback, allowing all resolves to complete, and returns only successful ones", async () => {
    const inner = jest.fn(a => resolve(a));
    const called = <T>(a: T) => () => inner(a);
    const errorHandler = jest.fn();

    expect(
      await most(
        [resolve(called("yes")), reject(), resolve(called("man"))],
        errorHandler,
      ),
    ).toEqual(["yes", "man"]);

    expect(inner).toHaveBeenCalledTimes(2);
    expect(errorHandler).toHaveBeenCalledTimes(1);
  });

  test("calls error handler with every failed error", async () => {
    const handler = jest.fn();

    expect(await most([resolve("yes"), reject(), reject()], handler)).toEqual([
      "yes",
    ]);

    expect(handler).toHaveBeenCalledTimes(2);
  });
});

describe("usingAll", () => {
  test("should return all results", async () => {
    let run = false;
    await usingAll([resolve("ye"), resolve("no")], (a, b) => {
      expect(a).toBe("ye");
      expect(b).toBe("no");
      run = true;
    });
    expect(run).toBe(true);
  });
});

describe("waitFor", () => {
  test("should return result", async () => {
    let run = false;
    await waitFor(resolve("ye"), a => {
      expect(a).toBe("ye");
      run = true;
    });
    expect(run).toBe(true);
  });
});
