module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  roots: ["<rootDir>/src"],
  testRegex: "(test|spec)\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/jestSetup"],
  automock: false, // make sure automock is off. This is default
  transform: {
    "^.+\\.(t|j)sx?$": ["ts-jest", { useESM: true }],
  },
  extensionsToTreatAsEsm: [".ts"],
  transformIgnorePatterns: ["/node_modules/(?!uuid|nanoid)/"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", // helps Jest resolve TS imports rewritten by tsc
  },
};
