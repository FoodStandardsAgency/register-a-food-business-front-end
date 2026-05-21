# Creating a new page

The front end application is built using Express.js with Nunjucks server-side templating. To create a new page, you write a Nunjucks template, write unit tests for it, and add the new page to the form path.

## Steps

1.  Write unit tests for the new page in the `/pages_unit_tests` directory. See [Building, starting, and testing the application](./building-starting-testing-the-app.md) for how to run tests.
2.  Create a new `.njk` file in the `/pages` directory with a filename matching the page's URL slug (e.g. `business-type.njk` is served at `/new/business-type`).
3.  Write the Nunjucks template. Extend `layout.njk`, import any GOV.UK Frontend macros you need at the top of the file, and use the `postForm` and `processedErrorSummary` components for form wrapping and error handling. Refer to an existing page such as [`pages/operator-name.njk`](../../pages/operator-name.njk) as a structural reference.

4.  If a data field is required on the new page, see [Adding a new data field](./adding-a-new-data-field.md).
5.  Add the page to the form path. For more information, see [The dynamic form path](./the-dynamic-form-path.md).

## Related information

* For GOV.UK Frontend component macros and documentation, see the [GOV.UK Design System](https://design-system.service.gov.uk/) and the [govuk-frontend GitHub repository](https://github.com/alphagov/govuk-frontend).
* For Nunjucks syntax and templating features, see the [Nunjucks documentation](https://mozilla.github.io/nunjucks/).
* Page unit tests use [jest-nunjucks](https://www.npmjs.com/package/jest-nunjucks) to render `.njk` templates in Jest. See existing tests in `/pages_unit_tests` for examples.
* The `/pages_unit_tests` directory is kept separate from `/pages` so that test files are not picked up by Express's template resolution at runtime.
