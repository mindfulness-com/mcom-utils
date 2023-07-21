module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  roots: ["<rootDir>/src"],
  testRegex: "(test|spec)\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/jestSetup"],
  automock: false, // make sure automock is off. This is default
};
