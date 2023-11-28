import { toQueryParams, toQueryString, baseUrl, addQueryParam } from "./url";

describe("url", () => {
  describe("toQueryParams", () => {
    test("doesn't prepends ? to query params", () => {
      expect(toQueryParams({ a: "a" })).not.toMatch(/^\?/);
    });
  });

  describe("toQueryString", () => {
    test("prepends ? to query string", () => {
      expect(toQueryString({ a: "a" })).toMatch(/^\?/);
    });

    test("formats correctly", () => {
      expect(toQueryString({ a: "a" })).toEqual("?a=a");
      expect(toQueryString({ a: "a", b: 2, c: false })).toEqual(
        "?a=a&b=2&c=false",
      );
    });

    test("escapes url parameters", () => {
      expect(toQueryString({ a: "a" })).toEqual("?a=a");
      expect(toQueryString({ a: "name@mindfulness.com" })).toEqual(
        "?a=name%40mindfulness.com",
      );
    });

    test("escapes + emails correctly", () => {
      expect(toQueryString({ e: "s+@mindfulness.com" })).toEqual(
        "?e=s%2B%40mindfulness.com",
      );
    });

    test("formats arrays correctly", () => {
      expect(toQueryString({ a: "a" })).toEqual("?a=a");
      expect(
        toQueryString({ a: ["a1", "a2"], b: [1, 2], c: [true, false] }),
      ).toEqual("?a=a1&a=a2&b=1&b=2&c=true&c=false");
    });
  });

  describe("baseUrl", () => {
    test("excludes query params", () => {
      expect(baseUrl("https://mindfulness.com/another?query=true")).toEqual(
        "https://mindfulness.com/another",
      );
    });

    test("excludes hash", () => {
      expect(baseUrl("https://mindfulness.com/another#modal")).toEqual(
        "https://mindfulness.com/another",
      );
    });

    test("works on nested routes", () => {
      expect(baseUrl("https://mindfulness.com/another/route#modal")).toEqual(
        "https://mindfulness.com/another/route",
      );
    });

    test("keeps final slash", () => {
      expect(baseUrl("https://mindfulness.com/#modal")).toEqual(
        "https://mindfulness.com/",
      );
    });
  });

  describe("addQueryParam", () => {
    test("it adds a query param when none exist", () => {
      expect(addQueryParam("https://mindfulness.com", { test: "a" })).toEqual(
        "https://mindfulness.com?test=a",
      );
    });

    test("it adds a query param when one already exists", () => {
      expect(
        addQueryParam("https://mindfulness.com?another=true", { test: "a" }),
      ).toEqual("https://mindfulness.com?another=true&test=a");
    });
  });
});
