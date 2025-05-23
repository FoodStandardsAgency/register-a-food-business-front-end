/**
 * Functions for running validation on the new answers from each page, and the corresponding error messages
 * @module services/validation
 */

const { Validator } = require("jsonschema");
const { logEmitter } = require("./logging.service");
const schema = require("./schema");
const {
  combineDate,
  transformBusinessTypeForSubmit,
  separateBracketsFromBusinessType
} = require("./data-transform.service");
const { validatePartners } = require("@slice-and-dice/register-a-food-business-validation");

const errorMessages = {
  local_authority: "You must select a local authority before continuing",
  declaration1: "You must tick all the declarations before continuing",
  declaration2: "You must tick all the declarations before continuing",
  declaration3: "You must tick all the declarations before continuing",
  registration_role: "You must select a role before continuing",
  operator_type: "You must select an operator type before continuing",
  operator_first_name: "Enter a valid first name",
  operator_last_name: "Enter a valid last name",
  operator_birthdate: "Enter a valid birthdate",
  operator_town: "Enter a valid town name",
  operator_address_line_1: "Enter a valid first line of address",
  operator_address_line_2: "Enter a valid second line of address",
  operator_address_line_3: "Enter a valid third line of address",
  operator_postcode: "Enter a valid postcode",
  operator_postcode_find: "Not a valid postcode",
  establishment_trading_name: "Enter a valid establishment trading name",
  trading_name: "Enter a valid establishment trading name",
  establishment_additional_trading_names:
    "You have entered an invalid number of additional trading names or a duplicate trading name. Please define up to 10 additional trading names and ensure that each entry is unique.",
  operator_primary_number: "Enter a valid operator phone number",
  operator_secondary_number: "Enter a valid operator phone number",
  main_partner_primary_number: "Enter a valid operator phone number",
  main_partner_secondary_number: "Enter a valid operator phone number",
  operator_email: "Enter a valid operator email address",
  main_partner_email: "Enter a valid operator email address",
  contact_representative_name: "Enter a valid representative name",
  contact_representative_role: "Enter a valid representative role",
  contact_representative_number: "Enter a valid representative phone number",
  contact_representative_email: "Enter a valid representative email address",
  operator_company_name: "Enter a valid company name",
  operator_companies_house_number: "Enter a valid Companies House reference number",
  operator_charity_name: "Enter a valid charity, organisation or trust name",
  operator_charity_number: "Enter a valid charity number",
  establishment_primary_number: "Enter a valid establishment phone number",
  establishment_secondary_number: "Enter a valid establishment phone number",
  establishment_email: "Enter a valid establishment email address",
  establishment_web_address: "Enter a valid establishment web address",
  establishment_type: "You must select an establishment address type before continuing",
  establishment_town: "Enter a valid town name",
  establishment_address_line_1: "Enter a valid first line of address",
  establishment_address_line_2: "Enter a valid second line of address",
  establishment_address_line_3: "Enter a valid third line of address",
  establishment_postcode: "Enter a valid postcode",
  establishment_postcode_find: "Not a valid postcode",
  establishment_opening_status: "You must select a trading status before continuing",
  establishment_opening_date: "Enter a valid opening date",
  business_type: "You must select a business type before continuing",
  business_scale: "Please select all options that apply to your business",
  food_type: "Please select all options that apply to your business",
  processing_activities: "Please select all options that apply to your business",
  water_supply: "You must select a water supply type before continuing",
  business_other_details:
    "Your message is too long. Please shorten it to less than 1500 characters",
  opening_days_start: "Please select which days this establishment is open",
  opening_days_irregular: "Please describe when this establishment is open",
  opening_days_some: "Please select which days this establishment is open",
  partner_name: "Enter a valid partner name",
  partners: `You have entered an invalid number of partners or a duplicate partner name. Please define between 2-5 partners, using initials or middle name to ensure that each entry is unique.`,
  main_partnership_contact: "You must select the main partnership contact before continuing",
  main_partnership_contact_deleted: "Main partnership contact is not in the list of partners",
  opening_hours_monday: "Enter the establishment opening hours for Monday using 24 hour clocks",
  opening_hours_tuesday: "Enter the establishment opening hours for Tuesday using 24 hour clocks",
  opening_hours_wednesday:
    "Enter the establishment opening hours for Wednesday using 24 hour clocks",
  opening_hours_thursday: "Enter the establishment opening hours for Thursday using 24 hour clocks",
  opening_hours_friday: "Enter the establishment opening hours for Friday using 24 hour clocks",
  opening_hours_saturday: "Enter the establishment opening hours for Saturday using 24 hour clocks",
  opening_hours_sunday: "Enter the establishment opening hours for Sunday using 24 hour clocks",
  new_or_update_registration: "You must select an option before continuing"
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
      if (page === "/operator-name" || page === "/partnership-contact-details") {
        answersToValidate.operator_birthdate = combineDate(
          answers.operator_birthdate_day,
          answers.operator_birthdate_month,
          answers.operator_birthdate_year
        );
      }

      if (page === "/business-type") {
        if (answers.business_type) {
          const businessTypeNoBrackets = separateBracketsFromBusinessType(
            answers.business_type
          ).business_type;
          answersToValidate.business_type = transformBusinessTypeForSubmit(businessTypeNoBrackets);
        } else {
          answersToValidate.business_type = "";
        }
      }

      const validatorResult = validator.validate(answersToValidate, schema[page]);

      if (validatorResult.errors.length > 0 && page === "/opening-hours") {
        // ignore errors for fields not requiring validation
        validatorResult.errors = validatorResult.errors.filter((error) =>
          Object.keys(answersToValidate).includes(error.property.split(".")[1])
        );
      }
      if (
        validatorResult.schema.properties.opening_day_monday &&
        validatorResult.errors.length > 0
      ) {
        result.errors.opening_days_some = errorMessages.opening_days_some;
      }

      // turn errors into key:value pairs
      validatorResult.errors.forEach((error) => {
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

/**
 * Runs the jsonschema validator package against answers from active pages
 *
 * @param {Array<string>} pages Pages on active path
 * @param {object} cumulativeFullAnswers All answers provided by the user as part of registration process
 *
 * @returns {object} An errors object containing one entry per validation error
 */
const revalidateAllAnswers = (pages, cumulativeFullAnswers) => {
  logEmitter.emit("functionCall", "validation.service", "revalidateAllAnswers");

  const result = {
    errors: {}
  };
  pages.forEach((page) => {
    if (page === "/partner-name") {
      if (!validatePartners(cumulativeFullAnswers.partners)) {
        Object.assign(result.errors, {
          partners: errorMessages.partners
        });
      }
      if (
        !cumulativeFullAnswers.partners.includes(cumulativeFullAnswers["main_partnership_contact"])
      ) {
        Object.assign(result.errors, {
          main_partnership_contact: errorMessages.main_partnership_contact_deleted
        });
      }
    } else if (page === "/operator-contact-details") {
      const answersToValidate = cumulativeFullAnswers;
      if (answersToValidate["operator_secondary_number"] == null) {
        Object.assign(result.errors, validate(page, answersToValidate).errors);
        delete result.errors.operator_secondary_number;
      } else {
        Object.assign(result.errors, validate(page, answersToValidate).errors);
      }
    } else if (page === "/establishment-contact-details") {
      const answersToValidate = cumulativeFullAnswers;
      if (answersToValidate["establishment_secondary_number"] == null) {
        Object.assign(result.errors, validate(page, answersToValidate).errors);
        delete result.errors.establishment_secondary_number;
      } else {
        Object.assign(result.errors, validate(page, answersToValidate).errors);
      }
      if (answersToValidate["establishment_web_address"] == null) {
        Object.assign(result.errors, validate(page, answersToValidate).errors);
        delete result.errors.establishment_web_address;
      } else {
        Object.assign(result.errors, validate(page, answersToValidate).errors);
      }
    } else if (page === "/opening-hours") {
      const answersToValidate = cumulativeFullAnswers;
      const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
      days.forEach((day) => {
        if (
          cumulativeFullAnswers["opening_days_start"] === "Every day" ||
          cumulativeFullAnswers[`opening_day_${day}`]
        ) {
          Object.assign(answersToValidate, {
            [`opening_hours_${day}`]: cumulativeFullAnswers[`opening_hours_${day}`] || ""
          });
        }
      });
      Object.assign(result.errors, validate(page, answersToValidate).errors);
    } else if (page === "/business-other-details") {
      if (cumulativeFullAnswers["business_other_details"] != null) {
        Object.assign(result.errors, validate(page, cumulativeFullAnswers).errors);
      }
    } else {
      Object.assign(result.errors, validate(page, cumulativeFullAnswers).errors);
    }
  });
  logEmitter.emit("functionSuccess", "validation.service", "revalidateAllAnswers");
  return result;
};

module.exports = { validate, revalidateAllAnswers };
