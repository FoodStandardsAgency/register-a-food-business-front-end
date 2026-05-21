# Building, starting, and testing the application

## Preparing the application for the first time

### Prerequisites

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org) `>=22.14.0`

### Steps

1.  Follow the steps for 'Getting started' on the [`register-a-food-business-environment` repository](https://github.com/FoodStandardsAgency/register-a-food-business-environment).
2.  Change directory to this repository.
3.  Run `npm install`.
4.  Populate a `.env` file. The contents of this file must be handed over from existing developers.
5.  Compile the SASS stylesheets by running `npm run sass-dev`.

## Starting the application in development mode

The `npm run dev` script compiles SASS and starts the Express.js server. The server uses `nodemon`, which watches the `pages/`, `src/`, and any `.js`, `.json`, and `.njk` files — it will automatically restart when changes are detected.

### Steps

1.  Ensure Docker has started and any required containers are running (see the [environment repository](https://github.com/FoodStandardsAgency/register-a-food-business-environment)).
2.  Run `npm run dev`
3.  Open `http://localhost:3000/new/` in a browser.

## Starting the application in production mode

1.  Run `npm start`
2.  Open `http://localhost:3000/new/` in a browser.

## Testing the application

The `package.json` file contains a number of scripts that are used in the GitHub Actions pipelines to test the code in this repository. These scripts can also be run locally to prevent unnecessary pipeline builds, using the following commands:

- `npm test`

  Runs all of the unit tests (including Nunjucks template tests) and provides a coverage report.

- `npm run test:ci`

  Runs all of the unit tests in CI mode with up to 4 parallel workers and outputs a JUnit XML report to `./reports/`.

- `npm run test:watch`

  Runs all of the unit tests once, then watches for changes to any relevant files and re-runs just those tests.

- `npm run test:debug`

  Starts Jest with the Node.js inspector enabled, so tests can be debugged using a tool such as `chrome://inspect`.

- `npm run test:security`

  Runs the Snyk vulnerability test tool with a "medium" severity threshold. For more information about Snyk, see https://snyk.io.

- `npm run lint`

  Runs the ESLint tool against the repository. For more information about ESLint, see https://eslint.org/.

- `npm run lint:fix`

  Runs ESLint and automatically fixes any fixable issues.

- `npm run format:verify`

  Runs the Prettier code-formatting tool against the repository. For more information about Prettier, see https://prettier.io/. Formatting issues can often be corrected by running `npm run format`. It is recommended to install the [Prettier code-formatting extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for your chosen IDE, and to enable automatic Prettier formatting on every 'save' if possible.
