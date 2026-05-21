# The repository structure

## Root directory files

- `README.md`

  A broad overview of the purpose of this repository.

- `LICENSE`

  The license for this repository.

- `CHANGELOG.md`

  Every change to the repository that affects users should be given a version number and logged in this file. For more information about versioning, see https://semver.org/.

- `package.json`

  The starting point for understanding how to use this repository and what dependencies it has. For more information about NPM and Node, see https://docs.npmjs.com/.

- `package-lock.json`

  Use the `npm` CLI with this repository to install, add, and remove dependencies. The `package-lock.json` file is used and updated automatically.

- `.gitignore`

  A number of files and directories are ignored by `git` either to reduce conflicts and repository size on GitHub, or for security reasons. For more information about this file, see https://help.github.com/articles/ignoring-files/.

- `.env` (not committed)

  Create a `.env` file in the root directory to store environment variables. The `.env` file is included in the `.gitignore` file for security purposes because many environment variables are secrets that should not be committed to an open-source repository.

- `jest.config.js`

  Jest is the main testing library used for this project. The Jest config file references `jest.setup.js`, configures test reporters, defines code coverage rules, and sets up global mocks. For more information about the Jest config file, see https://jestjs.io/docs/en/configuration.html.

- `jest.setup.js`

  Extends Jest's `expect` with accessibility assertions from `jest-axe`.

- `eslint.config.js`

  ESLint is a tool that checks code for simple bad practices and cleanliness, such as unused variables. This file defines the ESLint rules in the flat config format (ESLint v9+). For more information, see https://eslint.org/docs/user-guide/configuring.

- `.prettierignore`

  Prettier is a tool that checks and corrects the formatting of code, such as line indentations and semicolons. This file defines the files that are ignored by Prettier. Prettier configuration itself is in `package.json` under the `"prettier"` key.

- `.snyk`

  Snyk is a tool that scans the repository for security vulnerabilities. This file defines the configuration of Snyk when it is run from the `package.json` script.

- `Dockerfile`

  Defines the Docker image used to run the application. Based on `node:22.14` and uses `docker_init.sh` as its entry point.

- `docker_init.sh`

  Entry point script for the Docker container.

- `.github/workflows/`

  GitHub Actions runs pipelines that build, test, and release the code in this repository. The workflow files in this directory define the CI/CD steps. For more information about configuring GitHub Actions, see https://docs.github.com/en/actions.

- `.github/scripts/`

  Helper scripts used by GitHub Actions workflows, including the `vuln-scanner.js` NPM vulnerability scanner.

## `/pages`

The `/pages` directory contains all website page templates, written as Nunjucks (`.njk`) files. Each file corresponds to a URL slug served under `/new/`. For example, `pages/business-type.njk` is rendered when a user visits `/new/business-type`. For more information about the relationship between Express.js and Nunjucks and how routes are defined, see [The tech stack](./the-tech-stack.md).

There is also `pages/PageTitles.js`, which exports an object mapping page names to their `<title>` tag content.

## `/pages_unit_tests`

The `/pages_unit_tests` directory contains the unit tests for the `/pages` templates. This is the only example where unit tests are in a different directory to the corresponding files — Express.js resolves templates from the `pages/` directory at runtime, so test files must be stored separately.

## `/components`

The `/components` directory contains reusable Nunjucks (`.njk`) component templates that are not directly part of a page, such as the header, footer, back button, and summary table. These are included in page templates using Nunjucks `include` or `macro` syntax.

## `/src`

- `src/__mocks__`

  The `src/__mocks__` directory contains mock functions and dummy datasets that are used in a variety of test files throughout the repository.

- `src/server`

  The `src/server` directory contains all of the Express.js code to run the server-side parts of the application.

  The `./routes`, `./controllers`, `./services`, and `./connectors` directories contain URL routing configuration, business logic, data transformation functions, and external service connections respectively.

  - `server.js`

    The main application file. Sets up Express.js, configures Nunjucks, registers all middleware (session, rate limiting, CSRF, i18n, security headers), and mounts all routers. Also starts the HTTP server listening on the configured port.

  - `routes.js`

    Registers all route modules onto the Express router, mapping URL prefixes to their handlers (e.g. `/continue`, `/new`, `/submit`, `/edit`).

  - `config.js`

    Defines server-side configuration and provides default values for environment variables.

  - `propsGenerator.js`

    Assembles the `props` object that is passed to Nunjucks templates on every `GET` request. Pulls data from `req.session` and adds supplementary values such as the CSRF token.

## `/public`

The `/public` directory contains static assets served directly to the browser, including translation locale files (`public/static/locales/`).

## `/scripts`

The `/scripts` directory contains client-side JavaScript files served to the browser at the `/scripts` route.

## `/docs`

- `docs/contribution-guidelines`

  Step-by-step guides and general information for contributing to this repository. For cross-repository guides and broader project information, see the [Confluence documentation](https://foodstandardsagency.atlassian.net/wiki/spaces/RFB).

- `docs/jsdoc` (not committed)

  Function-level documentation, generated by the `jsdoc` script in `package.json`. Open `index.html` in a browser to view the generated website.

- `docs/LADR`

  LADRs (Lightweight Architecture Decision Records) are concise records of important technical decisions that have been made and the motives behind those decisions.

## Non-committed and other directories

- `/node_modules`

  Third-party packages installed by `npm install`.

- `/coverage`

  Jest outputs coverage information and reports to this directory. Open `/coverage/lcov-report/index.html` in a browser to see visualised coverage data.

- `/reports`

  Jest outputs comprehensive test reports in XML format, consumed by CI pipelines to display test results.

- `/.vscode`

  The Visual Studio Code IDE uses `/.vscode/launch.json` to configure the debugger, which is useful as an alternative to `console.log()`.
