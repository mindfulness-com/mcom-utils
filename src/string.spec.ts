import { camelCase, snakeCase } from "./string";

describe("string", () => {
  describe("case conversion", () => {
    const tests: string[] = [
      "twoWords", // camelCase
      "Two Words", // capitalCase
      "TWO_WORDS", // constantCase
      "two.words", // dotCase
      "two-words", // kebabCase
      "two words", // noCase
      "TwoWords", // pascalCase
      "Two_Words", // pascalSnakeCase
      "two/words", // pathCase
      "Two words", // sentenceCase
      "two_words", // snakeCase
      "Two-Words", // trainCase
    ];

    const doTest = (
      testConversion: (val: string) => string,
      expected: string,
    ) => {
      return () => {
        test.each(tests)(`should convert %p to ${expected}`, async test =>
          expect(testConversion(test)).toBe(expected),
        );
      };
    };

    describe("snakeCase", doTest(snakeCase, "two_words"));
    describe("camelCase", doTest(camelCase, "twoWords"));
  });
});
