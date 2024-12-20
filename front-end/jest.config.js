/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "jsdom",
  preset: "ts-jest", // Adds the default TypeScript setup
  transform: {
    '\\.[jt]sx?$': 'ts-jest',
  },
};
