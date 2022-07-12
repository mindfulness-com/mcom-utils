import { some, usingAll, waitFor } from "./promise";

const resolve = <T>(value?: T) =>
  new Promise(res => {
    res(value);
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
