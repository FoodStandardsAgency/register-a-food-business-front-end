const prettier = require("eslint-plugin-prettier");

module.exports = [
  {
    ignores: ["src/server/static/*", "scripts/*"]
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs"
    },
    files: ["src/**/*.js", "pages_unit_tests/**/*.js"],
    rules: {
      "prettier/prettier": "warn",
      "no-param-reassign": [
        2,
        {
          props: true,
          ignorePropertyModificationsFor: ["req"]
        }
      ]
    },
    plugins: {
      prettier: prettier
    }
  }
];
