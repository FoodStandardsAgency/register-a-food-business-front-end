# The tech stack

## Node.js

Node.js is an open-source JavaScript runtime built on Chrome's V8 JavaScript engine. This project requires Node.js `>=22.14.0`. For more information about Node.js, see https://nodejs.org.

## Express.js

Express.js is an open-source library for running server-side processes that listen for HTTP requests to different routes. Express.js runs on Node.js and is the primary server framework for this application. For more information about Express.js, see https://expressjs.com/.

## Nunjucks

Nunjucks is a templating language for JavaScript, maintained by Mozilla. All pages and reusable components in this application are written as Nunjucks (`.njk`) templates that are rendered server-side by Express.js before being sent to the browser.

Nunjucks is configured in [`src/server/server.js`](../../src/server/server.js) to look for templates in the following directories: `pages/`, `components/`, `node_modules/govuk-frontend/dist`, and `node_modules/@ons/design-system/`.

For more information about Nunjucks, see https://mozilla.github.io/nunjucks/.

## GOV.UK Frontend

`govuk-frontend` is the official implementation of the [GOV.UK Design System](https://design-system.service.gov.uk/). It provides ready-made HTML components (as Nunjucks macros), CSS, and JavaScript for building GOV.UK-compliant services.

For more information about `govuk-frontend`, see https://github.com/alphagov/govuk-frontend.

## ONS Design System

The `@ons/design-system` package provides additional UI components from the Office for National Statistics design system, used alongside `govuk-frontend` for certain interface elements.

## SASS

Styling is written in SASS (`.scss` files) located under `src/server/css/`. These are compiled to CSS using the `sass` CLI. The `npm run sass-dev` script compiles SASS in expanded (development) format; `npm run sass-prod` compiles to compressed (production) format.

## i18n

The `i18n` package is used to support Welsh (`cy`) and English (`en`) translations. Translation strings are stored as JSON files in `public/static/locales/`. The active language is determined from the request query string, cookie, or header.

## MongoDB / CosmosDB

User session data is stored in a MongoDB-compatible CosmosDB database on Azure, accessed via `connect-mongo` and Express's `express-session` middleware. The database connection URL is set via the `COSMOSDB_URL` environment variable. When this variable is not set (e.g. in local development), sessions fall back to in-memory storage.

---

## The relationship between Express.js and Nunjucks

Express.js is used to run the server, catch all incoming HTTP requests, and route them to the appropriate router based on the URL path. See [`src/server/routes.js`](../../src/server/routes.js) for the full routing table.

Most routers handle requests using Express.js and vanilla JavaScript alone, such as `continue.route.js`. These routers finish by updating session data and calling `res.redirect()`, forwarding the user to another internal route such as `/new` or `/submit`.

The `/new` router handles GET requests by calling `res.render(pageName, { props })`, which triggers Nunjucks to render the requested `.njk` template from the `pages/` directory, with session-derived `props` injected as template variables via [`PropsGenerator`](../../src/server/propsGenerator.js).

Error pages (`page-not-found.njk`, `internal-server-error.njk`) are rendered by the error handler middleware in [`src/server/middleware/errorHandler.js`](../../src/server/middleware/errorHandler.js).
