# Building, starting, and testing the application

## Preparing the application for the first time

### Prerequisites

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org)

### Steps

1.  Follow the steps for 'Getting started' on the [`register-a-food-business-environment` repository](https://github.com/FoodStandardsAgency/register-a-food-business-environment).
2.  Change directory to this repository (`register-a-food-business`)
3.  Run `npm install`
4.  Populate a `.env` file. The contents of this file must be handed over from existing developers.

## Starting the application in `DEVELOPMENT` mode

`DEVELOPMENT` mode has the following characteristics:

- `npm run dev` starts the localhost server and points at a temporary in-memory build directory
- Pages are automatically built on-demand (when you visit each page in a browser), which takes a few moments
- Pages automatically rebuild and refresh in the browser when you make a change to **React** code
- You must stop and restart the terminal process after making any changes to **non-React** code to see your changes

These characteristics make `DEVELOPMENT` mode suited to multiple trial-and-error visual changes to a small number of pages.

### Steps:

1.  Ensure docker has started and the container "cosmos-db-1" is running
2.  Run `npm run dev`
3.  Open `http://localhost:3000/new/ in a browser

### Steps:

2.  Run `npm start`
3.  Open `http://localhost:3000/new/` in a browser

## Testing the application

The `/package.json` file contains a number of scripts that are used in the GitHub Actions pipelines to test the code in this repository. These scripts can also be run locally to prevent unnecessary pipeline builds, using the following commands:

- `npm test`

  Runs all of the unit tests and provides a coverage report.

- `npm run test:watch`

  Runs all of the unit tests once, then watches for changes to any relevant files and re-runs just those tests.

- `npm run test:integration`

  Runs all of the integration tests between the connectors and local doubles of external services. For more information about integration tests, see https://martinfowler.com/bliki/IntegrationTest.html.

- `npm run test:contract`

  Runs all of the contract tests between the external services and their local doubles. For more information about contract tests, see https://martinfowler.com/bliki/ContractTest.html.

- `npm run test:security`

  Runs the Snyk vulnerability test tool with a "medium" severity threshold. For more information about Snyk, see https://snyk.io.

- `npm run lint`

  Runs the ESLint tool against the repository. For more information about ESLint, see https://eslint.org/.

- `npm run format:verify`

  Runs the Prettier code-formatting tool against the repository. For more information about Prettier, see https://prettier.io/. Formatting issues can often be corrected by running `npm run format`. It is recommended to install the [Prettier code-formatting extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for your chosen IDE, and to enable automatic Prettier formatting on every 'save' if possible.
