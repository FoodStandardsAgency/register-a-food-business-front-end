# Adding a new data field

To create a new data field you need create custom validation, update the UI, E2E and unit tests and then ensure it is displayed and submitted in the correct format.

## Steps:

1.  If needed, create a custom validation function for the data field. For more infomation, see [validation](./validation.md)
2.  Write or update UI and E2E tests for the new page. For more information, see [Writing UI and E2E tests](./writing-ui-e2e-tests.md).
3.  If needed, update the unit tests for the page that the field is being added to. For more information, see [Writing unit tests](./writing-unit-tests.md).
4.  Add the data field to the [schema](../../src/server/services/schema.js).
5.  If needed, add the data field to the [summary table](../../src/components/SummaryTable.js) to display it back to the user upon form completion.
6.  Use the `data-transform.service.js` to do any data manipulation to the field for summary. For more information, see [transforming data for summary page](./transforming-data-summary-page)
7.  Use the `data-transform.service.js` to do any data manipulation to the field for submission. For more information, see [transforming data for submission](./transforming-data-submission)
