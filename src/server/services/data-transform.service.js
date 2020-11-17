/**
 * Functions for running transformations on the answers to get them in the correct format for submit and summary
 * @module services/data-transform
 */
const businessTypesJSON = require("../../components/business-type-transformed-en.json");

const { logEmitter } = require("./logging.service");
const {
  RegistrationRoleEnum,
  EstablishmentTypeEnum,
  CustomerTypeEnum,
  OpeningDaysEnum,
  ImportExportActivitiesEnum,
  OperatorTypeEnum,
  WaterSupplyEnum
} = require("../../enums");

const trimAnswers = (cumulativeFullAnswers) => {
  const trimmedAnswers = JSON.parse(JSON.stringify(cumulativeFullAnswers));

  for (let answer in trimmedAnswers) {
    trimmedAnswers[answer] = trimmedAnswers[answer].trim();
  }
  return trimmedAnswers;
};

/**
 * Runs custom validation functions, on specific parts of cumulative answers, to get them in the correct format for the summary table,
 *
 * @param {object} cumulativeFullAnswers An object containing all the answers the user has submitted during the session with duplicates removed
 * @param {object} addressLookups The object returned by the address look-up service based on the postcode the user inputs
 *
 * @returns {object} An object containing the set of data in the correct format for the summary page with unnecessary fields deleted
 */
const transformAnswersForSubmit = (
  cumulativeFullAnswers,
  addressLookups,
  lcUrl
) => {
  logEmitter.emit(
    "functionCall",
    "data-transform.service",
    "transformAnswersForSubmit"
  );

  const establishment_details_keys = [
    "establishment_trading_name",
    "establishment_primary_number",
    "establishment_secondary_number",
    "establishment_email",
    "establishment_opening_date"
  ];
  const operator_keys = [
    "operator_first_name",
    "operator_last_name",
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
    "customer_type",
    "business_type",
    "business_type_search_term",
    "import_export_activities",
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

  const declaration_keys = [
    "declaration1",
    "declaration2",
    "declaration3",
    "feedback1"
  ];

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
    local_council_url: lcUrl
  };

  const data = Object.assign({}, cumulativeFullAnswers);

  delete data.operator_postcode_find;
  delete data.establishment_postcode_find;

  try {
    data.operator_type = combineOperatorTypes(
      data.operator_type,
      data.registration_role
    );
    delete data.registration_role;

    data.customer_type = tranformCustomerTypeForSubmit(
      data.supply_directly,
      data.supply_other
    );
    delete data.supply_directly;
    delete data.supply_other;

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

    data.import_export_activities = transformBusinessImportExportForSubmit(
      data.directly_import,
      data.directly_export,
      data.no_import_export
    );
    delete data.directly_import;
    delete data.directly_export;
    delete data.no_import_export;

    data.establishment_opening_date = combineDate(
      data.day,
      data.month,
      data.year
    );
    delete data.day;
    delete data.month;
    delete data.year;
    delete data.establishment_opening_status;

    // Populate tascomi fields for manual address entry
    data.operator_first_line = data.operator_address_line_1;
    data.operator_street = data.operator_address_line_2;

    if (data.operator_address_selected) {
      if (data.operator_address_line_1) {
        delete data.operator_address_selected;
      } else {
        const operatorAddressLookupData =
          addressLookups.operator_postcode_find[data.operator_address_selected];

        data.operator_address_line_1 =
          operatorAddressLookupData["addressline1"];

        data.operator_address_line_2 =
          operatorAddressLookupData["addressline2"];

        data.operator_address_line_3 =
          operatorAddressLookupData["addressline3"];

        data.operator_first_line =
          operatorAddressLookupData["premise"] ||
          operatorAddressLookupData["addressline1"];

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
            data.operator_address_line_1 =
              operatorAddressLookupData["organisation"];
          } else {
            data.operator_address_line_1 =
              operatorAddressLookupData["organisation"] +
              ", " +
              data.operator_address_line_1;
          }
        }

        delete data.operator_postcode_find;
        delete data.operator_address_selected;
      }
    }

    // Populate tascomi fields for manual address entry
    data.establishment_first_line = data.establishment_address_line_1;
    data.establishment_street = data.establishment_address_line_2;

    if (data.establishment_address_selected) {
      if (data.establishment_address_line_1) {
        delete data.establishment_address_selected;
      } else {
        const establishmentAddressLookupData =
          addressLookups.establishment_postcode_find[
            data.establishment_address_selected
          ];

        data.establishment_address_line_1 =
          establishmentAddressLookupData["addressline1"];

        data.establishment_address_line_2 =
          establishmentAddressLookupData["addressline2"];

        data.establishment_address_line_3 =
          establishmentAddressLookupData["addressline3"];

        data.establishment_first_line =
          establishmentAddressLookupData["premise"] ||
          establishmentAddressLookupData["addressline1"];

        data.establishment_street = establishmentAddressLookupData["street"];

        data.establishment_town = establishmentAddressLookupData["posttown"];

        data.establishment_postcode =
          establishmentAddressLookupData["postcode"];

        data.establishment_uprn = trimUprn(
          establishmentAddressLookupData["uprn"]
        );

        if (
          data.establishment_address_line_1 === data.establishment_street &&
          establishmentAddressLookupData["organisation"]
        ) {
          if (!data.establishment_address_line_3) {
            data.establishment_address_line_3 =
              data.establishment_address_line_2;
            data.establishment_address_line_2 =
              data.establishment_address_line_1;
            data.establishment_address_line_1 =
              establishmentAddressLookupData["organisation"];
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
      const separatedBusinessTypeSearchTerm = separateBracketsFromBusinessType(
        data.business_type
      );

      data.business_type = transformBusinessTypeForSubmit(
        separatedBusinessTypeSearchTerm.business_type
      );

      data.business_type_search_term =
        separatedBusinessTypeSearchTerm.business_type_search_term;
    }

    const submitData = Object.assign({}, data, openingDays, openingHours);

    establishment_details_keys.forEach((key) => {
      if (submitData[key] !== undefined) {
        submitObject.registration.establishment.establishment_details[key] =
          submitData[key];
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
        submitObject.registration.establishment.activities[key] =
          submitData[key];
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
          partner_is_primary_contact:
            key === submitData.main_partnership_contact
        });
      });
    }

    logEmitter.emit(
      "functionSuccess",
      "data-transform.service",
      "transformAnswersForSubmit"
    );

    return submitObject;
  } catch (err) {
    logEmitter.emit(
      "functionFail",
      "data-transform-service",
      "transformAnswersForSubmit",
      err
    );
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
const transformAnswersForSummary = (
  cumulativeFullAnswers,
  addressLookups,
  lcUrl
) => {
  logEmitter.emit(
    "functionCall",
    "data-transform.service",
    "transformAnswersForSummary"
  );

  try {
    const data = transformAnswersForSubmit(
      cumulativeFullAnswers,
      addressLookups,
      lcUrl
    );

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

    summaryData.partnersData = transformPartnersForSummary(
      summaryData.partners
    );

    summaryData = Object.assign(
      summaryData,
      summaryData.summary_opening_days,
      summaryData.partnersData
    );
    delete summaryData.summary_opening_days;

    summaryData.operator_type = transformOperatorTypeForSummary(
      summaryData.operator_type
    );
    summaryData.establishment_type = transformEstablishmentTypeForSummary(
      summaryData.establishment_type
    );
    summaryData.customer_type = transformCustomerTypeForSummary(
      summaryData.customer_type
    );
    summaryData.business_type = transformBusinessTypeForSummary(
      summaryData.business_type
    );
    summaryData.import_export_activities = transformBusinessImportExportForSummary(
      summaryData.import_export_activities
    );
    summaryData.water_supply = transformWaterSupplyForSummary(
      summaryData.water_supply
    );

    logEmitter.emit(
      "functionSuccess",
      "data-transform.service",
      "transformAnswersForSummary"
    );

    return summaryData;
  } catch (err) {
    logEmitter.emit(
      "functionFail",
      "data-transform-service",
      "transformAnswersForSummary",
      err
    );
    throw err;
  }
};

const transformPartnersForSummary = (partnersObjects) => {
  let partnersData = {};
  if (partnersObjects) {
    partnersData.partners = partnersObjects.map(
      (partner) => partner.partner_name
    );

    if (
      partnersObjects.some(
        (partner) => partner.partner_is_primary_contact === true
      )
    ) {
      partnersData.main_partnership_contact = partnersObjects.filter(
        (partner) => partner.partner_is_primary_contact === true
      )[0].partner_name;
    }
  }
  return partnersData;
};
/**
 * Combines the answers submitted for the import/export activities to ignore the "no import or export" option when it is selected with one of the other options
 *
 * @param {string} directly_import String submitted to cumulative answers when user selects directly imports
 * @param {string} directly_export String submitted to cumulative answers when user selects directly exports
 * @param {string} no_import_export String submitted to cumulative answers when user selects no imports or exports
 *
 * @returns {string} A string displaying the correct answer for import/export activities for the summary page
 */
const transformBusinessImportExportForSubmit = (
  directly_import,
  directly_export,
  no_import_export
) => {
  if (directly_import && directly_export) {
    return ImportExportActivitiesEnum.BOTH.key;
  } else if (directly_import) {
    return ImportExportActivitiesEnum.IMPORT.key;
  } else if (directly_export) {
    return ImportExportActivitiesEnum.EXPORT.key;
  } else if (no_import_export) {
    return ImportExportActivitiesEnum.NONE.key;
  } else {
    return undefined;
  }
};

const transformBusinessImportExportForSummary = (import_export_activities) => {
  if (import_export_activities) {
    return ImportExportActivitiesEnum[import_export_activities].value;
  }
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
 * @returns {string} A string returning "Every day" or "undefined"
 */

const transformOpeningDaysForSummary = (
  opening_day_monday,
  opening_day_tuesday,
  opening_day_wednesday,
  opening_day_thursday,
  opening_day_friday,
  opening_day_saturday,
  opening_day_sunday,
  opening_days_irregular
) => {
  let opening_days = {};
  opening_days.opening_day_monday = opening_day_monday;
  opening_days.opening_day_tuesday = opening_day_tuesday;
  opening_days.opening_day_wednesday = opening_day_wednesday;
  opening_days.opening_day_thursday = opening_day_thursday;
  opening_days.opening_day_friday = opening_day_friday;
  opening_days.opening_day_saturday = opening_day_saturday;
  opening_days.opening_day_sunday = opening_day_sunday;
  for (let day in opening_days) {
    opening_days[day] = opening_days[day] ? OpeningDaysEnum[day].value : false;
  }
  if (
    opening_days.opening_day_monday &&
    opening_days.opening_day_tuesday &&
    opening_days.opening_day_wednesday &&
    opening_days.opening_day_thursday &&
    opening_days.opening_day_friday &&
    opening_days.opening_day_saturday &&
    opening_days.opening_day_sunday
  ) {
    opening_days.opening_days_start = "Every day";
    opening_days.open_some_days_summary_table = "Every day";
  } else if (Object.values(opening_days).some((day) => day !== false)) {
    opening_days.opening_days_start = "Some days";
  } else if (opening_days_irregular) {
    opening_days.opening_days_start = "Irregular days";
  }
  return opening_days;
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
    opening_day_monday
      ? (days.opening_day_monday = true)
      : (days.opening_day_monday = false);
    opening_day_tuesday
      ? (days.opening_day_tuesday = true)
      : (days.opening_day_tuesday = false);
    opening_day_wednesday
      ? (days.opening_day_wednesday = true)
      : (days.opening_day_wednesday = false);
    opening_day_thursday
      ? (days.opening_day_thursday = true)
      : (days.opening_day_thursday = false);
    opening_day_friday
      ? (days.opening_day_friday = true)
      : (days.opening_day_friday = false);
    opening_day_saturday
      ? (days.opening_day_saturday = true)
      : (days.opening_day_saturday = false);
    opening_day_sunday
      ? (days.opening_day_sunday = true)
      : (days.opening_day_sunday = false);
  }
  return days;
};
/** Transforms opening hours to undefined so empty fields are not submitted
 *
 * @param {string} opening_hours_monday
 * @param {string} opening_hours_tuesday
 * @param {string} opening_hours_wednesday
 * @param {string} opening_hours_thursday
 * @param {string} opening_hours_friday
 * @param {string} opening_hours_saturday
 * @param {string} opening_hours_sunday
 *
 * @returns {object} An object containing all monday - sunday opening hours set to either original value or undefined
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
    opening_hours_monday: opening_hours_monday
      ? opening_hours_monday
      : undefined,
    opening_hours_tuesday: opening_hours_tuesday
      ? opening_hours_tuesday
      : undefined,
    opening_hours_wednesday: opening_hours_wednesday
      ? opening_hours_wednesday
      : undefined,
    opening_hours_thursday: opening_hours_thursday
      ? opening_hours_thursday
      : undefined,
    opening_hours_friday: opening_hours_friday
      ? opening_hours_friday
      : undefined,
    opening_hours_saturday: opening_hours_saturday
      ? opening_hours_saturday
      : undefined,
    opening_hours_sunday: opening_hours_sunday
      ? opening_hours_sunday
      : undefined
  };
};

/**
 * Sets the display text on the summary table for when the user selects whether they supply_directly or supply_other or both
 * @param {string} supply_directly String submitted to cumulative answers when user selects supply directly
 * @param {string} supply_other String submitted to cumulative answers when user selects supply other
 *
 *
 * @returns {string} A string with the text to be displayed on the summary table
 */

const tranformCustomerTypeForSubmit = (supply_directly, supply_other) => {
  if (supply_directly && supply_other) {
    return CustomerTypeEnum.BOTH.key;
  } else if (supply_directly) {
    return CustomerTypeEnum.END_CONSUMER.key;
  } else if (supply_other) {
    return CustomerTypeEnum.OTHER_BUSINESSES.key;
  } else {
    return undefined;
  }
};

const transformCustomerTypeForSummary = (customer_type) => {
  if (customer_type) {
    return CustomerTypeEnum[customer_type].value;
  }
};

/**
 * Sets the display text on the summary table in the correct format for when the business is registered by a representative
 * @param {string} operator_type String submitted to cumulative answers when user selects operator can be either person/company/charity
 * @param {string} registration_role String submitted to cumulative answers when user selects registration role can be either sole_trader/representative/partnership
 *
 *
 * @returns {string} A string with the text to be displayed on the summary table
 */

const combineOperatorTypes = (operator_type, registration_role) => {
  let newOperatorType;

  if (registration_role) {
    if (
      registration_role === RegistrationRoleEnum.REPRESENTATIVE.key &&
      operator_type
    ) {
      newOperatorType = operator_type;
    } else if (registration_role !== RegistrationRoleEnum.REPRESENTATIVE.key) {
      newOperatorType = registration_role;
    } else {
      throw new Error(`
      data-transform.service operatorTypeTransform():
      The registration_role value was ${registration_role}.
      The operator_type value was ${operator_type}.
      This combination of values is not valid.
      `);
    }
  }

  return newOperatorType;
};

const transformEstablishmentTypeForSummary = (establishment_type) => {
  if (establishment_type) {
    return EstablishmentTypeEnum[establishment_type].value;
  }
};

const transformOperatorTypeForSummary = (operator_type) => {
  if (operator_type) {
    return OperatorTypeEnum[operator_type].value;
  }
};

const transformWaterSupplyForSummary = (water_supply) => {
  if (water_supply) {
    return WaterSupplyEnum[water_supply].value;
  }
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
    const textInBrackets = text.slice(
      indexOfOpeningBracket,
      indexOfClosingBracket + 1
    );

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
  const businessTypesArray = JSON.parse(JSON.stringify(businessTypesJSON));
  for (var obj = 0; obj < businessTypesArray.length; obj++) {
    if (businessTypesArray[obj].displayName === displayName) {
      return businessTypesArray[obj].id;
    }
  }
};

const transformBusinessTypeForSummary = (id) => {
  const businessTypesArray = JSON.parse(JSON.stringify(businessTypesJSON));
  for (var obj = 0; obj < businessTypesArray.length; obj++) {
    if (businessTypesArray[obj].id === id) {
      return businessTypesArray[obj].displayName;
    }
  }
};

module.exports = {
  transformAnswersForSummary,
  transformAnswersForSubmit,
  combineDate,
  separateBracketsFromBusinessType,
  trimUprn,
  trimAnswers
};
