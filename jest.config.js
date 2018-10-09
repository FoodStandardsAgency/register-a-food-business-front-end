module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  reporters: [
    "default",
    ["jest-junit", { output: `./reports/TEST-${process.env.TEST_TYPE}.xml` }]
  ],
  coverageReporters: ["cobertura", "lcov", "json", "text"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/src/__mocks__/styleMock.js",
    "schema.js": "<rootDir>/src/__mocks__/schemaMock.js",
    "logging.service": "<rootDir>/src/__mocks__/logging.service.js",
    "statusEmitter.service": "<rootDir>/src/__mocks__/statusEmitter.service.js"
  },
  collectCoverageFrom: [
    "src/**/*.{js}",
    "pages/**/*.{js}",
    "!**/node_modules/**",
    "!**/jest.config.js",
    "!**/jest.setup.js",
    "!**/next.config.js",
    "!**/coverage/**/*.{js}",
    "!**/pages/_document.js",
    "!**/services/schema.js",
    "!**/.next/**/*.{js}",
    "!**/vars.js",
    "!src/server/index.js",
    "!src/server/config.js",
    "!src/components/index.js",
    "!src/components/NormalizeCSS.js",
    "!src/components/AccessibleAutocompleteCSS.js",
    "!src/**/*.double.js",
    "!tests/**/*.js"
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: -10
    }
  },
  testURL: "http://localhost/"
};
