module.exports = {
  moduleFileExtensions: ['njk', 'ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  //setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  //setupFiles: ["<rootDir>/jest.setup.js"],
  reporters: [
    "default",
    ["jest-junit", { outputName: `./reports/TEST-${process.env.TEST_TYPE}.xml` }]
  ],
  coverageReporters: ["cobertura", "lcov", "json", "text"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  testMatch: [ "**/?(*.)+(spec|test).[tj]s?(x)", "**/?(*.)+(spec|test).njk"],
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/src/__mocks__/styleMock.js",
    "schema.js": "<rootDir>/src/__mocks__/schemaMock.js",
    winston: "<rootDir>/src/__mocks__/winston.js",
    events: "<rootDir>/src/__mocks__/events.js"
  },
  collectCoverageFrom: [
    "src/**/*.js",
    "pages/**/*.js",
    "!**/node_modules/**",
    "!**/jest.config.js",
    "!**/jest.setup.js",
    "!**/next.config.js",
    "!**/coverage/**/*.js",
    "!**/pages/_document.js",
    "!**/services/schema.js",
    "!**/.next/**/*.js",
    "!src/server/index.js",
    "!src/server/config.js",
    "!src/components/index.js",
    "!src/components/NormalizeCSS.js",
    "!src/components/AccessibleAutocompleteCSS.js",
    "!src/components/update-business-types.js",
    "!src/**/*.double.js",
    "!tests/**/*.js",
    "!src/server/routes/*.route.js"
  ],
  testURL: "http://localhost/",
  globals: {
    "nunjucks": {
      "config": {
        "throwOnUndefined": true,
        "trimBlocks": true
      }
    }
  },
  transform: {
    "^.+\\.njk$": "jest-nunjucks"
  }
};
