const transformAnswersForSummary = (cumulativeAnswers, addressLookups) => {
  const data = Object.assign({}, cumulativeAnswers);

  data.operator_type = combineOperatorTypes(
    data.operator_type,
    data.registration_role
  );

  delete data.registration_role;

  data.customer_type = transformCustomerType(
    data.supply_directly,
    data.supply_other
  );
  delete data.supply_directly;
  delete data.supply_other;

  data.import_export_activities = transformBusinessImportExport(
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

  if (data.operator_address_selected) {
    if (data.operator_first_line) {
      delete data.operator_address_selected;
    } else {
      const operatorAddressLookupData =
        addressLookups.operator_postcode_find[data.operator_address_selected];

      data.operator_first_line = operatorAddressLookupData["premise"];

      data.operator_street = operatorAddressLookupData["street"];

      data.operator_town = operatorAddressLookupData["posttown"];

      data.operator_postcode = operatorAddressLookupData["postcode"];

      delete data.operator_postcode_find;
      delete data.operator_address_selected;
    }
  }

  if (data.establishment_address_selected) {
    if (data.establishment_first_line) {
      delete data.establishment_address_selected;
    } else {
      const establishmentAddressLookupData =
        addressLookups.establishment_postcode_find[
          data.establishment_address_selected
        ];

      data.establishment_first_line = establishmentAddressLookupData["premise"];

      data.establishment_street = establishmentAddressLookupData["street"];

      data.establishment_town = establishmentAddressLookupData["posttown"];

      data.establishment_postcode = establishmentAddressLookupData["postcode"];

      delete data.establishment_postcode_find;
      delete data.establishment_address_selected;
    }
  }

  if (data.business_type) {
    const separatedBusinessTypeSearchTerm = separateBracketsFromBusinessType(
      data.business_type
    );

    data.business_type = separatedBusinessTypeSearchTerm.business_type;

    data.business_type_search_term =
      separatedBusinessTypeSearchTerm.business_type_search_term;
  }

  return data;
};

const transformAnswersForSubmit = (
  lcUrl,
  cumulativeAnswers,
  addressLookups
) => {
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
    "operator_postcode",
    "operator_first_line",
    "operator_street",
    "operator_town",
    "operator_primary_number",
    "operator_secondary_number",
    "operator_email",
    "contact_representative_number",
    "contact_representative_email",
    "operator_type",
    "operator_company_name",
    "operator_company_house_number",
    "operator_charity_name",
    "operator_charity_number"
  ];
  const premise_keys = [
    "establishment_postcode",
    "establishment_first_line",
    "establishment_street",
    "establishment_town",
    "establishment_type"
  ];
  const activities_keys = [
    "customer_type",
    "business_type",
    "business_type_search_term",
    "import_export_activities"
  ];
  const metadata_keys = ["declaration1", "declaration2", "declaration3"];
  const submitObject = {
    registration: {
      establishment: {
        establishment_details: {},
        operator: {},
        premise: {},
        activities: {}
      },
      metadata: {}
    },
    local_council_url: lcUrl
  };

  const data = transformAnswersForSummary(cumulativeAnswers, addressLookups);

  establishment_details_keys.forEach(key => {
    if (data[key]) {
      submitObject.registration.establishment.establishment_details[key] =
        data[key];
    }
  });

  operator_keys.forEach(key => {
    if (data[key]) {
      submitObject.registration.establishment.operator[key] = data[key];
    }
  });

  premise_keys.forEach(key => {
    if (data[key]) {
      submitObject.registration.establishment.premise[key] = data[key];
    }
  });

  activities_keys.forEach(key => {
    if (data[key]) {
      submitObject.registration.establishment.activities[key] = data[key];
    }
  });

  metadata_keys.forEach(key => {
    if (data[key]) {
      submitObject.registration.metadata[key] = data[key];
    }
  });

  return submitObject;
};

const transformBusinessImportExport = (
  directly_import,
  directly_export,
  no_import_export
) => {
  if (directly_import && directly_export && no_import_export) {
    return "Directly import and export";
  } else if (directly_import && no_import_export) {
    return "Directly import";
  } else if (directly_export && no_import_export) {
    return "Directly export";
  } else if (directly_import && directly_export) {
    return "Directly import and export";
  } else if (directly_import) {
    return "Directly import";
  } else if (directly_export) {
    return "Directly export";
  } else if (no_import_export) {
    return "None";
  } else {
    return undefined;
  }
};

const transformCustomerType = (supply_directly, supply_other) => {
  if (supply_directly && supply_other) {
    return "End consumer and other businesses";
  } else if (supply_directly) {
    return "End consumer";
  } else if (supply_other) {
    return "Other businesses";
  } else {
    return undefined;
  }
};

const combineOperatorTypes = (operator_type, registration_role) => {
  let newOperatorType;

  if (registration_role) {
    if (registration_role === "Representative" && operator_type) {
      newOperatorType = `${operator_type} (registered by a representative)`;
    } else if (registration_role !== "Representative") {
      newOperatorType = registration_role;
    } else {
      throw new Error(`
      data-transform.service.js operatorTypeTransform():
      The registration_role value was ${registration_role}.
      The operator_type value was ${operator_type}.
      This combination of values is not valid.
      `);
    }
  }

  return newOperatorType;
};

const combineDate = (day, month, year) => `${year}-${month}-${day}`;

const separateBracketsFromBusinessType = text => {
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
      .replace(/^\w/, firstLetter => firstLetter.toUpperCase())
      .trim();
  }

  return {
    business_type: strippedBusinessType,
    business_type_search_term: strippedSearchTerm
  };
};

module.exports = {
  transformAnswersForSummary,
  transformAnswersForSubmit,
  combineDate,
  separateBracketsFromBusinessType
};
