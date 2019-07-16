/**
 * Functions for running validation on the new answers from each page, and the corresponding error messages
 * @module services/validation
 */

const { Validator } = require("jsonschema");
const { logEmitter } = require("./logging.service");
const schema = require("./schema");
const {
  combineDate,
  separateBracketsFromBusinessType
} = require("./data-transform.service");
const { MAX_PARTNERS } = require("../config");

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
  import_export_activities: "You must select valid option(s) before continuing",
  business_type: "You must select a business type before continuing",
  water_supply: "You must select and option before continuing",
  business_other_details:
    "Your message is too long. Please shorten it to less than 1500 characters",
  opening_days_start: "Please select which days this establishment is open",
  opening_days_irregular: "Please describe when this establishment is open",
  opening_days_some: "Please select which days this establishment is open",
  partner_name: "Not a valid name",
  partners: `Please define between 2-${MAX_PARTNERS} partners`,
  main_partnership_contact:
    "You must select the main partnership contact before continuing",
  opening_hours_monday: "Not valid opening hours on Monday",
  opening_hours_tuesday: "Not valid opening hours on Tuesday",
  opening_hours_wednesday: "Not valid opening hours on Wednesday",
  opening_hours_thursday: "Not valid opening hours on Thursday",
  opening_hours_friday: "Not valid opening hours on Friday",
  opening_hours_saturday: "Not valid opening hours on Saturday",
  opening_hours_sunday: "Not valid opening hours on Sunday"
};

const validator = new Validator();

// Set validation rules on validator
validator.attributes.validation = (instance, schema, options, ctx) => {
  if (schema.validation(instance) === false) {
    return errorMessages[ctx.propertyPath.split(".")[1]];
  }
};

/**
 * Runs the jsonschema validator package, with custom rules, against the new answers on the given page
 *
 * @param {string} page The 'originator' page that the user has come from
 * @param {object} answers An object containing only the answers given on the most recent page
 *
 * @returns {object} An errors object containing one entry per validation error
 */
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

      if (validatorResult.errors.length > 0 && page === "/opening-hours") {
        // ignore errors for fields not requiring validation
        validatorResult.errors = validatorResult.errors.filter(error =>
          Object.keys(answersToValidate).includes(error.property.split(".")[1])
        );
      }

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

      if (
        validatorResult.schema.properties.opening_day_monday &&
        validatorResult.errors.length > 0
      ) {
        result.errors.opening_days_some = errorMessages.opening_days_some;
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
