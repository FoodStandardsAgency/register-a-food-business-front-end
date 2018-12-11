# Adding a new data field

To add a new data field you must update the UI, E2E, and unit tests, create custom validation, and ensure that it is displayed and submitted in the correct format.

## Steps:

1.  Write or update UI and E2E tests for the new data field.
2.  If the new data field requires a new type of validation, see the [Validation](./validation.md) guide.
3.  If there is new in-page logic for the new data field, update the unit tests for the relevant page.
4.  Add the data field to the [schema](../../src/server/services/schema.js).
5.  If the new data field should be displayed on the summary table:

    1.  If the data needs to be manipulated before it is displayed on the summary table, see [Transforming user data for the summary page](./transforming-data-summary-page.md).
    2.  Add the data field to the [SummaryTable component](../../src/components/SummaryTable.js) and add row and data field entries to the [test arrays and objects](../../src/components/SummaryTable.test.js) where necessary.

6.  Add the new data field to the submission data transformation function. For more information, see [Transforming user data for submission](./transforming-data-submission.md).
