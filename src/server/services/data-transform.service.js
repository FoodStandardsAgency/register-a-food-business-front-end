/**
 * Functions for running transformations on the answers to get them in the correct format for submit and summary
 * @module services/data-transform
 */

const { logEmitter } = require("./logging.service");
const {
  operatorTypeEnum,
  establishmentTypeEnum,
  waterSupplyEnum,
  businessTypeEnum,
  businessScaleEnum,
  foodTypeEnum,
  processingActivitiesEnum
} = require("@slice-and-dice/register-a-food-business-validation");

const trimAnswers = (cumulativeFullAnswers) => {
  const trimmedAnswers = JSON.parse(JSON.stringify(cumulativeFullAnswers));

  for (let answer in trimmedAnswers) {
    if (typeof trimmedAnswers[answer] === "string") {
      trimmedAnswers[answer] = trimmedAnswers[answer].trim();
    }
  }
  return trimmedAnswers;
};

/**
 * Runs custom validation functions, on specific parts of cumulative answers, to get them in the correct format for the summary table,
 *
 * @param {object} cumulativeFullAnswers An object containing all the answers the user has submitted during the session with duplicates removed
 * @param {object} language The language selected at the point of submission
 * @param {object} addressLookups The object returned by the address look-up service based on the postcode the user inputs
 * @param {string} lcUrl The local councils URL
 *
 * @returns {object} An object containing the set of data in the correct format for the summary page with unnecessary fields deleted
 */
const transformAnswersForSubmit = (cumulativeFullAnswers, language, addressLookups, lcUrl) => {
  logEmitter.emit("functionCall", "data-transform.service", "transformAnswersForSubmit");

  const establishment_details_keys = [
    "establishment_trading_name",
    "establishment_primary_number",
    "establishment_secondary_number",
    "establishment_email",
    "establishment_web_address",
    "establishment_opening_date"
  ];
  const operator_keys = [
    "operator_first_name",
    "operator_last_name",
    "operator_birthdate",
    "operator_address_line_1",
    "operator_address_line_2",
    "operator_address_line_3",
    "operator_first_line",
    "operator_street",
    "operator_town",
    "operator_postcode",
    "operator_uprn",
    "operator_primary_number",
    "operator_secondary_number",
    "operator_email",
    "contact_representative_name",
    "contact_representative_role",
    "contact_representative_number",
    "contact_representative_email",
    "operator_type",
    "operator_company_name",
    "operator_companies_house_number",
    "operator_charity_name",
    "operator_charity_number"
  ];
  const premise_keys = [
    "establishment_type",
    "establishment_address_line_1",
    "establishment_address_line_2",
    "establishment_address_line_3",
    "establishment_first_line",
    "establishment_street",
    "establishment_town",
    "establishment_postcode",
    "establishment_uprn"
  ];
  const activities_keys = [
    "business_scale",
    "food_type",
    "processing_activities",
    "business_type",
    "business_type_search_term",
    "opening_days_irregular",
    "water_supply",
    "business_other_details",
    "opening_day_monday",
    "opening_day_tuesday",
    "opening_day_wednesday",
    "opening_day_thursday",
    "opening_day_friday",
    "opening_day_saturday",
    "opening_day_sunday",
    "opening_hours_monday",
    "opening_hours_tuesday",
    "opening_hours_wednesday",
    "opening_hours_thursday",
    "opening_hours_friday",
    "opening_hours_saturday",
    "opening_hours_sunday"
  ];

  const declaration_keys = ["declaration1", "declaration2", "declaration3", "feedback1"];

  const submitObject = {
    registration: {
      establishment: {
        establishment_details: {},
        operator: {},
        premise: {},
        activities: {}
      },
      declaration: {}
    },
    local_council_url: lcUrl,
    submission_language: language,
    manual_local_authority: false
  };

  const data = Object.assign({}, cumulativeFullAnswers);

  if (data.local_authority) {
    submitObject.manual_local_authority = true;
  }

  delete data.operator_postcode_find;
  delete data.establishment_postcode_find;

  try {
    data.operator_type = combineOperatorTypes(data.operator_type, data.registration_role);
    delete data.registration_role;

    if (data.operator_type == operatorTypeEnum.PARTNERSHIP.key) {
      data.operator_primary_number = data.main_partner_primary_number;
      data.operator_secondary_number = data.main_partner_secondary_number;
      data.operator_email = data.main_partner_email;
    }

    const openingDays = transformOpeningDaysForSubmit(
      data.opening_days_start,
      data.opening_day_monday,
      data.opening_day_tuesday,
      data.opening_day_wednesday,
      data.opening_day_thursday,
      data.opening_day_friday,
      data.opening_day_saturday,
      data.opening_day_sunday
    );

    const openingHours = transformOpeningHoursForSubmit(
      data.opening_hours_monday,
      data.opening_hours_tuesday,
      data.opening_hours_wednesday,
      data.opening_hours_thursday,
      data.opening_hours_friday,
      data.opening_hours_saturday,
      data.opening_hours_sunday
    );

    data.operator_birthdate = combineDate(
      data.operator_birthdate_day,
      data.operator_birthdate_month,
      data.operator_birthdate_year
    );
    delete data.operator_birthdate_day;
    delete data.operator_birthdate_month;
    delete data.operator_birthdate_year;

    data.establishment_opening_date = combineDate(data.day, data.month, data.year);
    delete data.day;
    delete data.month;
    delete data.year;
    delete data.establishment_opening_status;

    data.operator_first_line = data.operator_address_line_1;
    data.operator_street = data.operator_address_line_2;

    if (data.operator_address_selected) {
      if (data.operator_address_line_1) {
        delete data.operator_address_selected;
      } else {
        const operatorAddressLookupData =
          addressLookups.operator_postcode_find[data.operator_address_selected];

        data.operator_address_line_1 = operatorAddressLookupData["addressline1"];

        data.operator_address_line_2 = operatorAddressLookupData["addressline2"];

        data.operator_address_line_3 = operatorAddressLookupData["addressline3"];

        data.operator_first_line =
          operatorAddressLookupData["premise"] || operatorAddressLookupData["addressline1"];

        data.operator_street = operatorAddressLookupData["street"];

        data.operator_town = operatorAddressLookupData["posttown"];

        data.operator_postcode = operatorAddressLookupData["postcode"];

        data.operator_uprn = trimUprn(operatorAddressLookupData["uprn"]);

        if (
          data.operator_address_line_1 === data.operator_street &&
          operatorAddressLookupData["organisation"]
        ) {
          if (!data.operator_address_line_3) {
            data.operator_address_line_3 = data.operator_address_line_2;
            data.operator_address_line_2 = data.operator_address_line_1;
            data.operator_address_line_1 = operatorAddressLookupData["organisation"];
          } else {
            data.operator_address_line_1 =
              operatorAddressLookupData["organisation"] + ", " + data.operator_address_line_1;
          }
        }

        delete data.operator_postcode_find;
        delete data.operator_address_selected;
      }
    }

    data.establishment_first_line = data.establishment_address_line_1;
    data.establishment_street = data.establishment_address_line_2;

    if (data.establishment_address_selected) {
      if (data.establishment_address_line_1) {
        delete data.establishment_address_selected;
      } else {
        const establishmentAddressLookupData =
          addressLookups.establishment_postcode_find[data.establishment_address_selected];

        data.establishment_address_line_1 = establishmentAddressLookupData["addressline1"];

        data.establishment_address_line_2 = establishmentAddressLookupData["addressline2"];

        data.establishment_address_line_3 = establishmentAddressLookupData["addressline3"];

        data.establishment_first_line =
          establishmentAddressLookupData["premise"] ||
          establishmentAddressLookupData["addressline1"];

        data.establishment_street = establishmentAddressLookupData["street"];

        data.establishment_town = establishmentAddressLookupData["posttown"];

        data.establishment_postcode = establishmentAddressLookupData["postcode"];

        data.establishment_uprn = trimUprn(establishmentAddressLookupData["uprn"]);

        if (
          data.establishment_address_line_1 === data.establishment_street &&
          establishmentAddressLookupData["organisation"]
        ) {
          if (!data.establishment_address_line_3) {
            data.establishment_address_line_3 = data.establishment_address_line_2;
            data.establishment_address_line_2 = data.establishment_address_line_1;
            data.establishment_address_line_1 = establishmentAddressLookupData["organisation"];
          } else {
            data.establishment_address_line_1 =
              establishmentAddressLookupData["organisation"] +
              ", " +
              data.establishment_address_line_1;
          }
        }

        delete data.establishment_postcode_find;
        delete data.establishment_address_selected;
      }
    }

    if (data.business_type) {
      const separatedBusinessTypeSearchTerm = separateBracketsFromBusinessType(data.business_type);

      data.business_type = transformBusinessTypeForSubmit(
        separatedBusinessTypeSearchTerm.business_type
      );

      data.business_type_search_term = separatedBusinessTypeSearchTerm.business_type_search_term;
    }

    const submitData = Object.assign({}, data, openingDays, openingHours);

    establishment_details_keys.forEach((key) => {
      if (submitData[key] !== undefined) {
        submitObject.registration.establishment.establishment_details[key] = submitData[key];
      }
    });

    operator_keys.forEach((key) => {
      if (submitData[key] !== undefined) {
        submitObject.registration.establishment.operator[key] = submitData[key];
      }
    });

    premise_keys.forEach((key) => {
      if (submitData[key] !== undefined) {
        submitObject.registration.establishment.premise[key] = submitData[key];
      }
    });

    activities_keys.forEach((key) => {
      if (submitData[key] !== undefined) {
        submitObject.registration.establishment.activities[key] = submitData[key];
      }
    });

    declaration_keys.forEach((key) => {
      if (submitData[key] !== undefined) {
        submitObject.registration.declaration[key] = submitData[key];
      }
    });

    if (submitData.partners) {
      submitObject.registration.establishment.operator.partners = [];
      submitData.partners.forEach((key) => {
        submitObject.registration.establishment.operator.partners.push({
          partner_name: key,
          partner_is_primary_contact: key === submitData.main_partnership_contact
        });
      });
    }

    logEmitter.emit("functionSuccess", "data-transform.service", "transformAnswersForSubmit");

    return submitObject;
  } catch (err) {
    logEmitter.emit("functionFail", "data-transform-service", "transformAnswersForSubmit", err);
    throw err;
  }
};

/**
 * Trims the UPRN field of any non-numeric characters (and any characters to the right of them)
 * This is to account for postcoder API returning values such as 0123456789-1
 *
 * @param {string} uprn The raw UPRN returned from postcode lookup
 *
 * @returns {string} The trimmed UPRN or an empty string if invalid, empty or not defined
 */
const trimUprn = (uprn) => {
  if (typeof uprn === "string" || uprn instanceof String) {
    const regEx = /^(\d+).*/;
    const match = uprn.match(regEx);
    return (match && match[1]) || "";
  }
  return "";
};

/**
 * Runs custom validation functions, on specific parts of cumulative answers, to get them in the correct format for the submission
 *
 * @param {object} cumulativeFullAnswers An object containing all the answers the user has submitted during the session with duplicates removed
 * @param {object} addressLookups The object returned by the address look-up service based on the postcode the user inputs
 * @param {string} lcUrl The local councils URL
 *
 * @returns {object} An object containing the set of data in the correct format for the submittion with unnecessary fields deleted
 */
const transformAnswersForSummary = (cumulativeFullAnswers, addressLookups, lcUrl) => {
  logEmitter.emit("functionCall", "data-transform.service", "transformAnswersForSummary");

  try {
    const data = transformAnswersForSubmit(cumulativeFullAnswers, "", addressLookups, lcUrl);

    let summaryData = Object.assign(
      {},
      data.registration.establishment.establishment_details,
      data.registration.establishment.operator,
      data.registration.establishment.premise,
      data.registration.establishment.activities
    );

    summaryData.summary_opening_days = transformOpeningDaysForSummary(
      summaryData.opening_day_monday,
      summaryData.opening_day_tuesday,
      summaryData.opening_day_wednesday,
      summaryData.opening_day_thursday,
      summaryData.opening_day_friday,
      summaryData.opening_day_saturday,
      summaryData.opening_day_sunday,
      summaryData.opening_days_irregular
    );

    summaryData.partnersData = transformPartnersForSummary(summaryData.partners);

    summaryData = Object.assign(
      summaryData,
      summaryData.summary_opening_days,
      summaryData.partnersData
    );
    delete summaryData.summary_opening_days;

    summaryData.operator_type = transformOperatorTypeForSummary(summaryData.operator_type);
    summaryData.establishment_type = transformEstablishmentTypeForSummary(
      summaryData.establishment_type
    );
    summaryData.business_type = transformBusinessTypeForSummary(summaryData.business_type);
    summaryData.business_scale = transformBusinessScaleForSummary(summaryData.business_scale);
    summaryData.food_type = transformFoodTypeForSummary(summaryData.food_type);
    summaryData.processing_activities = transformProcessingActivitiesForSummary(
      summaryData.processing_activities
    );
    summaryData.water_supply = transformWaterSupplyForSummary(summaryData.water_supply);

    logEmitter.emit("functionSuccess", "data-transform.service", "transformAnswersForSummary");

    return summaryData;
  } catch (err) {
    logEmitter.emit("functionFail", "data-transform-service", "transformAnswersForSummary", err);
    throw err;
  }
};

const transformPartnersForSummary = (partnersObjects) => {
  const partnersData = {};
  if (partnersObjects) {
    partnersData.partners = partnersObjects.map((partner) => partner.partner_name);

    if (partnersObjects.some((partner) => partner.partner_is_primary_contact === true)) {
      partnersData.main_partnership_contact = partnersObjects.filter(
        (partner) => partner.partner_is_primary_contact === true
      )[0].partner_name;
    }
  }
  return partnersData;
};

/**
 * Sets the opening days when the user selects monday - sunday on the "open some days" path
 *
 * @param {string} opening_day_monday String submitted to cumulative answers when user selects open monday
 * @param {string} opening_day_tuesday String submitted to cumulative answers when user selects open tuesday
 * @param {string} opening_day_wednesday String submitted to cumulative answers when user selects open wednesday
 * @param {string} opening_day_thursday String submitted to cumulative answers when user selects open thursday
 * @param {string} opening_day_friday String submitted to cumulative answers when user selects open friday
 * @param {string} opening_day_saturday String submitted to cumulative answers when user selects open saturday
 * @param {string} opening_day_sunnday String submitted to cumulative answers when user selects open sunday
 * @param {string} opening_days_start String submitted to cumulative answers when user selects the radio button can either be everyday/some-days/irregular-days
 *
 * @returns {string} A string returning "Every day" or "null"
 */

const transformOpeningDaysForSummary = (
  openingDayMonday,
  openingDayTuesday,
  openingDayWednesday,
  openingDayThursday,
  openingDayFriday,
  openingDaySaturday,
  openingDaySunday,
  openingDaysIrregular
) => {
  const openingDays = {
    opening_day_monday: openingDayMonday ? "Monday" : false,
    opening_day_tuesday: openingDayTuesday ? "Tuesday" : false,
    opening_day_wednesday: openingDayWednesday ? "Wednesday" : false,
    opening_day_thursday: openingDayThursday ? "Thursday" : false,
    opening_day_friday: openingDayFriday ? "Friday" : false,
    opening_day_saturday: openingDaySaturday ? "Saturday" : false,
    opening_day_sunday: openingDaySunday ? "Sunday" : false
  };
  if (
    openingDays.opening_day_monday &&
    openingDays.opening_day_tuesday &&
    openingDays.opening_day_wednesday &&
    openingDays.opening_day_thursday &&
    openingDays.opening_day_friday &&
    openingDays.opening_day_saturday &&
    openingDays.opening_day_sunday
  ) {
    openingDays.opening_days_start = "Every day";
    openingDays.open_some_days_summary_table = "Every day";
  } else if (Object.values(openingDays).some((day) => day !== false)) {
    openingDays.opening_days_start = "Some days";
  } else if (openingDaysIrregular) {
    openingDays.opening_days_start = "Irregular days";
  }
  return openingDays;
};

/**
 * Sets the opening days to true or false depending on whetehr they are selcted or not. Also sets monday-sunday to true, if opening_days_start is "Every day".
 *
 * @param {string} opening_day_monday String submitted to cumulative answers when user selects open monday
 * @param {string} opening_day_tuesday String submitted to cumulative answers when user selects open tuesday
 * @param {string} opening_day_wednesday String submitted to cumulative answers when user selects open wednesday
 * @param {string} opening_day_thursday String submitted to cumulative answers when user selects open thursday
 * @param {string} opening_day_friday String submitted to cumulative answers when user selects open friday
 * @param {string} opening_day_saturday String submitted to cumulative answers when user selects open saturday
 * @param {string} opening_day_sunnday String submitted to cumulative answers when user selects open sunday
 * @param {string} opening_days_start String submitted to cumulative answers when user selects the radio button can either be everyday/some-days/irregular-days
 *
 * @returns {object} A object containing all monday - sunday set to either true or false
 */
const transformOpeningDaysForSubmit = (
  opening_days_start,
  opening_day_monday,
  opening_day_tuesday,
  opening_day_wednesday,
  opening_day_thursday,
  opening_day_friday,
  opening_day_saturday,
  opening_day_sunday
) => {
  const days = {
    opening_day_monday: false,
    opening_day_tuesday: false,
    opening_day_wednesday: false,
    opening_day_thursday: false,
    opening_day_friday: false,
    opening_day_saturday: false,
    opening_day_sunday: false
  };

  if (opening_days_start === "Every day") {
    for (let day in days) {
      days[day] = true;
    }
  } else {
    opening_day_monday ? (days.opening_day_monday = true) : (days.opening_day_monday = false);
    opening_day_tuesday ? (days.opening_day_tuesday = true) : (days.opening_day_tuesday = false);
    opening_day_wednesday
      ? (days.opening_day_wednesday = true)
      : (days.opening_day_wednesday = false);
    opening_day_thursday ? (days.opening_day_thursday = true) : (days.opening_day_thursday = false);
    opening_day_friday ? (days.opening_day_friday = true) : (days.opening_day_friday = false);
    opening_day_saturday ? (days.opening_day_saturday = true) : (days.opening_day_saturday = false);
    opening_day_sunday ? (days.opening_day_sunday = true) : (days.opening_day_sunday = false);
  }
  return days;
};
/** Transforms opening hours to null so empty fields are not submitted
 *
 * @param {string} opening_hours_monday
 * @param {string} opening_hours_tuesday
 * @param {string} opening_hours_wednesday
 * @param {string} opening_hours_thursday
 * @param {string} opening_hours_friday
 * @param {string} opening_hours_saturday
 * @param {string} opening_hours_sunday
 *
 * @returns {object} An object containing all monday - sunday opening hours set to either original value or null
 */
const transformOpeningHoursForSubmit = (
  opening_hours_monday,
  opening_hours_tuesday,
  opening_hours_wednesday,
  opening_hours_thursday,
  opening_hours_friday,
  opening_hours_saturday,
  opening_hours_sunday
) => {
  return {
    opening_hours_monday: opening_hours_monday ? opening_hours_monday : undefined,
    opening_hours_tuesday: opening_hours_tuesday ? opening_hours_tuesday : undefined,
    opening_hours_wednesday: opening_hours_wednesday ? opening_hours_wednesday : undefined,
    opening_hours_thursday: opening_hours_thursday ? opening_hours_thursday : undefined,
    opening_hours_friday: opening_hours_friday ? opening_hours_friday : undefined,
    opening_hours_saturday: opening_hours_saturday ? opening_hours_saturday : undefined,
    opening_hours_sunday: opening_hours_sunday ? opening_hours_sunday : undefined
  };
};

/**
 * Sets the display text on the summary table in the correct format for when the business is registered by a representative
 * @param {string} operator_type String submitted to cumulative answers when user selects operator can be either person/company/charity
 * @param {string} registration_role String submitted to cumulative answers when user selects registration role can be either sole_trader/representative/partnership
 *
 *
 * @returns {string} A string with the text to be displayed on the summary table
 */

const combineOperatorTypes = (operatorType, registrationRole) => {
  let newOperatorType;

  if (registrationRole) {
    if (registrationRole === "Representative" && operatorType) {
      newOperatorType = operatorType;
    } else if (registrationRole !== "Representative") {
      newOperatorType = registrationRole;
    } else {
      throw new Error(`
      data-transform.service operatorTypeTransform():
      The registration_role value was ${registrationRole}.
      The operator_type value was ${operatorType}.
      This combination of values is not valid.
      `);
    }
  }

  return newOperatorType;
};

const transformEstablishmentTypeForSummary = (establishmentType) => {
  return establishmentType ? establishmentTypeEnum[establishmentType].value.en : null;
};

const transformOperatorTypeForSummary = (operatorType) => {
  return operatorType ? operatorTypeEnum[operatorType].value.en : null;
};

const transformWaterSupplyForSummary = (waterSupply) => {
  return waterSupply ? waterSupplyEnum[waterSupply].value.en : null;
};
//Combines the date to be in the correct format to display on summary table
const combineDate = (day, month, year) => {
  if (day && month && year) {
    return `${year}-${month}-${day}`;
  } else {
    return null;
  }
};
//Formats result of business type look up to display it correctly in the summary table
const separateBracketsFromBusinessType = (text) => {
  let strippedBusinessType = text.trim();
  let strippedSearchTerm = undefined;

  const indexOfOpeningBracket = text.lastIndexOf("(");
  const indexOfClosingBracket = text.lastIndexOf(")");

  if (
    // if brackets both exist
    indexOfOpeningBracket !== -1 &&
    indexOfClosingBracket !== -1 &&
    // if brackets are in the correct order
    indexOfOpeningBracket < indexOfClosingBracket &&
    // if there is no text after the final bracket
    text.substring(indexOfClosingBracket + 1).trim() === ""
  ) {
    const textInBrackets = text.slice(indexOfOpeningBracket, indexOfClosingBracket + 1);

    strippedBusinessType = text.replace(textInBrackets, "").trim();
    strippedSearchTerm = textInBrackets
      .slice(1, -1)
      .replace(/^\w/, (firstLetter) => firstLetter.toUpperCase())
      .trim();
  }

  return {
    business_type: strippedBusinessType,
    business_type_search_term: strippedSearchTerm
  };
};

const transformBusinessTypeForSubmit = (displayName) => {
  const businessTypeKey = Object.keys(businessTypeEnum).find((key) =>
    [businessTypeEnum[key].value.en, businessTypeEnum[key].value.cy].includes(displayName)
  );
  return businessTypeKey ? businessTypeEnum[businessTypeKey].key : "";
};

const transformBusinessTypeForSummary = (id) => {
  return businessTypeEnum[id] ? businessTypeEnum[id].value.en : "";
};

const transformBusinessScaleForSummary = (ids) => {
  return ids?.map((id) => businessScaleEnum[id].value.en);
};

const transformFoodTypeForSummary = (ids) => {
  return ids?.map((id) => (foodTypeEnum[id] ? foodTypeEnum[id].value.en : ""));
};

const transformProcessingActivitiesForSummary = (ids) => {
  return ids?.map((id) =>
    processingActivitiesEnum[id] ? processingActivitiesEnum[id].value.en : ""
  );
};

/**
 * Intialises array from string value. Due to form checkbox data being submitted as string if there is only one value selected,
 * this function will convert the string to an array.
 * @param {any} answer Answer - could be undefined, string or array
 *
 * @returns {string} The new value initialised to an array, it was previously a string
 */

const initialiseArray = (answer) => {
  let newAnswer = answer;
  if (answer && typeof answer === "string") {
    newAnswer = [answer];
  }

  return newAnswer;
};

module.exports = {
  transformAnswersForSummary,
  transformAnswersForSubmit,
  transformBusinessTypeForSubmit,
  combineDate,
  separateBracketsFromBusinessType,
  trimUprn,
  trimAnswers,
  initialiseArray
};
