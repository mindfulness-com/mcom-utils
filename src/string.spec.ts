import {
  camelCase,
  capitalCase,
  startCase,
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
