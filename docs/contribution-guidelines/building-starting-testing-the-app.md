# Building, starting, and testing the application

## Preparing the application for the first time

### Prerequisites

* [Docker](https://www.docker.com/)
* [Node.js](https://nodejs.org)
* [Yarn](https://yarnpkg.com)

### Steps

1.  Follow the steps for 'Getting started' on the [`register-a-food-business-environment` repository](https://github.com/FoodStandardsAgency/register-a-food-business-environment).
3.  Change directory to this repository (`register-a-food-business`)
4.  Run `yarn`
5.  Populate a `.env` file. The contents of this file must be handed over from existing developers.

## Starting the application in `DEVELOPMENT` mode

`DEVELOPMENT` mode has the following characteristics:

* `yarn dev` starts the localhost server and points at a temporary in-memory build directory
* Pages are automatically built on-demand (when you visit each page in a browser), which takes a few moments
* Pages automatically rebuild and refresh in the browser when you make a change to **React** code
* You must stop and restart the terminal process after making any changes to **non-React** code to see your changes

These characteristics make `DEVELOPMENT` mode suited to multiple trial-and-error visual changes to a small number of pages.

### Steps:

1.  Run `yarn dev`
2.  Open `http://localhost:3000/new/<local-council-url>` in a browser

## Building and starting the application in `PRODUCTION` mode

`PRODUCTION` mode has the following characteristics:

* The `yarn build` and `yarn start` commands are separate
* `yarn build` builds the front-end React code to the `/.next` directory, which takes too long to run regularly
* `yarn start` starts the localhost server and points at the `/.next` build directory
* Pages do **not** automatically rebuild or refresh in the browser when you make changes to the code
* You must stop and restart the `yarn start` process after making any changes to code
* `yarn build` only needs to be re-run after changes are made to front-end React code.

These characteristics make `PRODUCTION` mode suited to:

* Running the application on any hosted, non-local environment (dev, test, staging, prod)
* Changes to Express and server-side code
* Running UI and E2E tests against a local environment
* Scenarios that require you to look at lots of pages

### Steps:

1.  Run `yarn build`
2.  Run `yarn start`
3.  Open `http://localhost:3000/new/<local-council-url>` in a browser

## Testing the application

The `/package.json` file contains a number of scripts that are used in the Azure devOps pipelines to test the code in this repository. These scripts can also be run locally to prevent unnecessary pipeline builds, using the following commands:

* `yarn test`

  Runs all of the unit tests and provides a coverage report.

* `yarn test:watch`

  Runs all of the unit tests once, then watches for changes to any relevant files and re-runs just those tests.

* `yarn test:integration`

  Runs all of the integration tests between the connectors and local doubles of external services. For more information about integration tests, see https://martinfowler.com/bliki/IntegrationTest.html.

* `yarn test:contract`

  Runs all of the contract tests between the external services and their local doubles. For more information about contract tests, see https://martinfowler.com/bliki/ContractTest.html.

* `yarn test:security`

  Runs the Snyk vulnerability test tool with a "medium" severity threshold. For more information about Snyk, see https://snyk.io.

* `yarn lint`

  Runs the ESLint tool against the repository. For more information about ESLint, see https://eslint.org/.

* `yarn format:verify`

  Runs the Prettier code-formatting tool against the repository. For more information about Prettier, see https://prettier.io/. Formatting issues can often be corrected by running `yarn format`. It is recommended to install the [Prettier code-formatting extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for your chosen IDE, and to enable automatic Prettier formatting on every 'save' if possible.
