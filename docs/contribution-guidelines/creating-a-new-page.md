# Creating a new page

The front end application is built using the Next.js framework, which is based on React. To create a new page, you must write UI and unit tests to describe what the page should do, use React/Next.js code and GOV.UK React components to create that content, then add the new page to the form path.

## Steps:

1.  Write or update UI and E2E tests for the new page. For more information, see [Writing UI and E2E tests](./writing-ui-e2e-tests.md).
2.  Write unit tests for the new page. For more information, see [Writing unit tests](./writing-unit-tests.md).
3.  Create a new `.js` file in the `/pages` directory.
4.  Write React code in the new `.js` file. See below for more information.
5.  If a data field is required on the new page, see [Adding a new data field](./adding-a-new-data-field.md).
6.  Add the page to the form path. For more information, see [Changing the form order](./changing-the-form-order.md)

## Related information

* To learn more about creating page content and using components, see the [official Next.js tutorials](https://nextjs.org/learn/) and [React documentation](https://reactjs.org/docs/getting-started.html).
* For more information about the GOV.UK React components library, see the [GitHub repository](https://github.com/govuk-react/govuk-react) and the [Storybook of examples](https://ukhomeoffice.github.io/govuk-react).
