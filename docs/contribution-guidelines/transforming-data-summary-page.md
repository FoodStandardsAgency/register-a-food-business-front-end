# Transforming user data for the summary page

To transform a data field to display on the summary table, you must update the `transformAnswersForSummary()` function. Data transformations can either overwrite the original data field or add a new data field.

## Steps:

1.  If a **new** data field needs to be created for submission, add the newly created data fields to the `data` object. If necessary, delete the original data field.
2.  If the data field value needs to be **transformed** for submission, update the relevant data field in the `data` object.
3.  If any data transformation steps are more than a few lines long, consider moving them out of the main function and into their own transformation function, which should then be called by `transformAnswersForSummary()`:

```javascript
const transformFunctionExample = dataToBeTransformed => {
  // transformation code
  return transformedData;
};
```
