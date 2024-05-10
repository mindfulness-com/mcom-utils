import {
  camelCase,
  capitalCase,
  startCase,
  titleCase,
  dotCase,
  kebabCase,
  hyphenCase,
  noCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase,
} from "./string";

describe("string", () => {
  describe("case conversion", () => {
    const testValues = {
      camelCase: "twoWords",
      capitalCase: "Two Words",
      startCase: "Two Words",
      titleCase: "Two Words",
      dotCase: "two.words",
      kebabCase: "two-words",
      hyphenCase: "two-words",
      noCase: "two words",
      pascalCase: "TwoWords",
      pascalSnakeCase: "Two_Words",
      pathCase: "two/words",
      sentenceCase: "Two words",
      snakeCase: "two_words",
      trainCase: "Two-Words",
    };

    const doTest = (
      testConversion: (val: string) => string,
      expected: string,
    ) => {
      return () => {
        test.each(Object.values(testValues))(
          `should convert %p to ${expected}`,
          async test => expect(testConversion(test)).toBe(expected),
        );
      };
    };

    describe("camelCase", doTest(camelCase, testValues.camelCase));
    describe("capitalCase", doTest(capitalCase, testValues.capitalCase));
    describe("startCase", doTest(startCase, testValues.startCase));
    describe("titleCase", doTest(titleCase, testValues.titleCase));
    describe("dotCase", doTest(dotCase, testValues.dotCase));
    describe("kebabCase", doTest(kebabCase, testValues.kebabCase));
    describe("hyphenCase", doTest(hyphenCase, testValues.hyphenCase));
    describe("noCase", doTest(noCase, testValues.noCase));
    describe("pascalCase", doTest(pascalCase, testValues.pascalCase));
    describe("pathCase", doTest(pathCase, testValues.pathCase));
    describe("sentenceCase", doTest(sentenceCase, testValues.sentenceCase));
    describe("snakeCase", doTest(snakeCase, testValues.snakeCase));

    describe("numbers in case change functions should not be interpreted as starting new words", () => {
      test("camelCase", () => {
        expect(camelCase("two words V2")).toBe("twoWordsV2");
      });
      test("capitalCase", () => {
        expect(capitalCase("two words V2")).toBe("Two Words V2");
      });
      test("startCase", () => {
        expect(startCase("two words V2")).toBe("Two Words V2");
      });
      test("titleCase", () => {
        expect(titleCase("two words V2")).toBe("Two Words V2");
      });
      test("dotCase", () => {
        expect(dotCase("two words V2")).toBe("two.words.v2");
      });
      test("kebabCase", () => {
        expect(kebabCase("two words V2")).toBe("two-words-v2");
      });
      test("hyphenCase", () => {
        expect(hyphenCase("two words V2")).toBe("two-words-v2");
      });
      test("noCase", () => {
        expect(noCase("two words V2")).toBe("two words v2");
      });
      test("pascalCase", () => {
        expect(pascalCase("two words V2")).toBe("TwoWordsV2");
      });
      test("pathCase", () => {
        expect(pathCase("two words V2")).toBe("two/words/v2");
      });
      test("sentenceCase", () => {
        expect(sentenceCase("two words V2")).toBe("Two words v2");
      });
      test("snakeCase", () => {
        expect(snakeCase("two words V2")).toBe("two_words_v2");
      });
    });
  });
});
