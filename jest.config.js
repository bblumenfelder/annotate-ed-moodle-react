/** @type {import('jest').Config} */
export default {
    testEnvironment: "jsdom",
    testMatch: ["**/tests/**/*.test.{ts,tsx}"],
    transform: {
      "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
    },
  };