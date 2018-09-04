const { Validator } = require("jsonschema");
const { logEmitter } = require("./logging.service");
const schema = require("./schema");
const {
  combineDate,
  separateBracketsFromBusinessType
} = require("./data-transform.service");

const errorMessages = {
  declaration1: "You must tick all the declarations before continuing",
  declaration2: "You must tick all the declarations before continuing",
  declaration3: "You must tick all the declarations before continuing",
  registration_role: "You must select a role before continuing",
  operator_type: "You must select an operator type before continuing",
  operator_first_name: "Not a valid first name",
  operator_last_name: "Not a valid last name",
  operator_first_line: "Not a valid first line of address",
  operator_street: "Not a valid street name",
  operator_town: "Not a valid town name",
  operator_postcode: "Not a valid postcode",
  operator_postcode_find: "Not a valid postcode",
  establishment_trading_name: "Not a valid establishment trading name",
  operator_primary_number: "Not a valid phone number",
  operator_secondary_number: "Not a valid phone number",
  operator_email: "Not a valid email address",
  contact_representative_name: "Not a valid name",
  contact_representative_role: "Not a valid role",
  contact_representative_number: "Not a valid phone number",
  contact_representative_email: "Not a valid email address",
  operator_company_name: "Not a valid company name",
  operator_company_house_number: "Not a valid Companies House reference number",
  operator_charity_name: "Not a valid charity name",
  operator_charity_number: "Not a valid charity number",
  establishment_primary_number: "Not a valid phone number",
  establishment_secondary_number: "Not a valid phone number",
  establishment_email: "Not a valid email address",
  establishment_type:
    "You must select an establishment address type before continuing",
  establishment_first_line: "Not a valid first line of address",
  establishment_street: "Not a valid street name",
  establishment_town: "Not a valid town name",
  establishment_postcode: "Not a valid postcode",
  establishment_postcode_find: "Not a valid postcode",
  establishment_opening_status:
    "You must select a trading status before continuing",
  establishment_opening_date: "Not a valid opening date",
  customer_type: "You must select an option before continuing",
  import_export_activities: "You must select an option before continuing",
  business_type: "You must select a business type before continuing"
};

const validator = new Validator();

// Set validation rules on validator
validator.attributes.validation = (instance, schema, options, ctx) => {
  if (schema.validation(instance) === false) {
    return errorMessages[ctx.propertyPath.split(".")[1]];
  }
};

const validate = (page, answers) => {
  logEmitter.emit("functionCall", "validation.service", "validate");

  const result = {
    errors: {}
  };

  const answersToValidate = Object.assign({}, answers);

  try {
    if (schema[page]) {
      if (
        page === "/establishment-opening-date-proactive" ||
        page === "/establishment-opening-date-retroactive"
      ) {
        answersToValidate.establishment_opening_date = combineDate(
          answers.day,
          answers.month,
          answers.year
        );
      }

      if (page === "/business-type") {
        answersToValidate.business_type = separateBracketsFromBusinessType(
          answers.business_type
        ).business_type;
      }

      const validatorResult = validator.validate(
        answersToValidate,
        schema[page]
      );
      if (
        validatorResult.schema.properties.directly_import &&
        validatorResult.errors.length > 0
      ) {
        result.errors.import_export_activities =
          errorMessages.import_export_activities;
      }
      if (
        validatorResult.schema.properties.supply_other &&
        validatorResult.errors.length > 0
      ) {
        result.errors.customer_type = errorMessages.customer_type;
      }

      // turn errors into key:value pairs
      validatorResult.errors.forEach(error => {
        const key = error.property.split(".")[1];
        result.errors[key] = error.message;
      });
    } else {
      throw new Error(`Could not find schema for page: ${page}`);
    }
    logEmitter.emit(
      "functionSuccessWith",
      "validation.service",
      "validate",
      `Validation messages: ${JSON.stringify(result.errors)}`
    );
    return result;
  } catch (err) {
    logEmitter.emit("functionFail", "validation.service", "validate", err);
    throw err;
  }
};

module.exports = { validate };
