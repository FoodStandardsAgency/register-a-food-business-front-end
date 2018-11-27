# Transforming user data for submission

All data fields need to be transformed into the desired format for submission. This can be done by directly adding it to the correct section in the `transformAnswersForSubmit function`. Alternatively, you can create a new function that does a data transformation. You must then call this function in the data-transform service. The output from this function can either over write the original data field, or be used to set a new field.

## Steps:

1.  Create a transformation function that takes in the data fields that need to be transformed as it's arguments.
2.  Set the return of the function to be value of the transformed data field.

```javascript
const transformationFunction = (dataToBeTransformed) => {
transformation code
return transformedData
}
```

3.  Over write the original data field or set a new data field to be the output of the transformation function.
4.  If needed, delete the original data field.
5.  Add the over-written oiginal data or the new data field to the correct section (establishment/operator/premise/activities/metadata) in the `transformAnswersForSummary` in the `data-transform.service.js`.
