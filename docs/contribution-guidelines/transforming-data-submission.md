# Transforming user data for submission

All data fields must be transformed into the correct format for submission, even if the data itself does not need to change. Data transformations can either overwrite the original data field or add a new data field.

## Steps:

1.  In the `transformAnswersForSubmit()` function in `data-transform.service`, add all necessary data fields to the correct array, such as the `operator_keys` or `activities_keys` array.
2.  If the data field needs to be transformed in the same way for both the summary page and submission, see the [Transforming user data for the summary page](./transforming-data-summary-page.md) guide. All subsequent steps in this guide can be skipped because the `transformAnswersForSubmit()` function re-uses the `transformAnswersForSummary()` function.
3.  If a **new** data field needs to be created for submission, add the newly created data fields to the `submitData` object. If necessary, delete the original data field.
4.  If the data field value needs to be **transformed** for submission, update the relevant data field in the `submitData` object.
5.  If any data transformation steps are more than a few lines long, consider moving them out of the main function and into their own transformation function, which should then be called by `transformAnswersForSubmit()`:

```javascript
const transformFunctionExample = dataToBeTransformed => {
  // transformation code
  return transformedData;
};
```
