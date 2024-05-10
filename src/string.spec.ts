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
      camelCase: "twoWordsV2",
      capitalCase: "Two Words V2",
      startCase: "Two Words V2",
      titleCase: "Two Words V2",
      dotCase: "two.words.v2",
      kebabCase: "two-words-v2",
      hyphenCase: "two-words-v2",
      noCase: "two words v2",
      pascalCase: "TwoWordsV2",
      pascalSnakeCase: "Two_Words_V2",
      pathCase: "two/words/v2",
      sentenceCase: "Two words v2",
      snakeCase: "two_words_v2",
      trainCase: "Two-Words-V2",
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
  });
});
