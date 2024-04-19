import { logThrough } from "./debug";

describe("debug", () => {
  describe("logThrough", () => {
    test("should return a passed in string value", () => {
      expect(logThrough("value")).toEqual("value");
    });

    test("should return a passed in function value", () => {
      expect(logThrough(() => "value")()).toEqual("value");
    });

    test("should return a passed in async function value", async () => {
      expect(await logThrough(async () => "value")()).toEqual("value");
    });
  });
});
