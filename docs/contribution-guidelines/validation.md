# Adding validation to a new data field

The front end application uses a custom validation npm package. To add new validation to a data field, you must first update the external package, update the version number in the package.json,write UI and then add to the schema.

## Steps:

1.  Update the validation package with the new validation function needed, see [register-a-food-business validation repository](https://github.com/FoodStandardsAgency/register-a-food-business-validation)
2.  Update the version number of the validation package being used in the `package.json`
3.  Write or update UI and E2E tests for the new page.
4.  Update the schema to add the new data field and it's custom validation function. For more on schema structure, see [JSON schema](https://json-schema.org)

## Related information

* For more information about the validation package, see the [npm package](https://www.npmjs.com/package/@slice-and-dice/register-a-food-business-validation) and the [Github repository](https://github.com/FoodStandardsAgency/register-a-food-business-validation).
