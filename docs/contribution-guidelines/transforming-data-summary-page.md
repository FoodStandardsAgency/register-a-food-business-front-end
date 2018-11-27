# Transforming user data for the summary page

To transform a data field to display on the summary table, you must create a function that does the data transformation. You must then call this function in the data-transform service. The output from this function can either over write the existing data field to be transformed, or be used to set a new field.

## Steps:

1.  Create a transformation function that takes in the data fields that need to be transformed as it's arguments.
2.  Set the return of the function to be value of the transformed data field.

```javascript
const transformationFunction = (dataToBeTransformed) => {
transformation code
return transformedData
}
```

3.  Call the transformation function, with the correct arguments, in the `try` of the `transformAnswersForSummary` in the `data-transform.service.js`.
4.  Over write the original data field or set a new data field to be the output of the transformation function.
5.  If needed, delete the original data field. Any fields deleted, will no longer be avaialble in the `transformDataForSubmit function`.
