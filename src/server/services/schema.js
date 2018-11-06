const {
  validateDeclaration,
  validatePostCode,
  validateFirstLine,
  validateOptionalString,
  validateName,
  validateRadioButtons,
  validateTown,
  validateEstablishmentTradingName,
  validateCharityNumber,
  validateCharityName,
  validatePhoneNumber,
  validatePhoneNumberOptional,
  validateCompaniesHouseNumber,
  validateCompanyName,
  validateEmail,
  validatePastDate,
  validateFutureDate,
  validateBusinessType,
  validateBusinessOtherDetails,
  validateOpeningDaysIrregular
} = require("@slice-and-dice/register-a-food-business-validation");

const schema = {
  "/index": {
    type: "object",
    properties: {}
  },
  "/registration-role": {
    type: "object",
    properties: {
      registration_role: {
        type: "string",
        validation: validateRadioButtons
      }
    }
  },
  "/operator-type": {
    type: "object",
    properties: {
      operator_type: {
        type: "string",
        validation: validateRadioButtons
      }
    }
  },
  "/establishment-address-type": {
    type: "object",
    properties: {
      establishment_type: {
        type: "string",
        validation: validateRadioButtons
      }
    }
  },
  "/operator-name": {
    type: "object",
    properties: {
      operator_first_name: {
        type: "string",
        validation: validateName
      },
      operator_last_name: {
        type: "string",
        validation: validateName
      }
    }
  },
  "/operator-address": {
    type: "object",
    properties: {
      operator_postcode_find: {
        type: "string",
        validation: validatePostCode
      }
    }
  },
  "/operator-address-select": {
    type: "object",
    properties: {
      operator_address_selected: {
        type: "string"
      },
      operator_address_manual: {
        type: "string"
      }
    }
  },
  "/operator-address-manual": {
    type: "object",
    properties: {
      operator_first_line: {
        type: "string",
        validation: validateFirstLine
      },
      operator_street: {
        type: "string",
        validation: validateOptionalString
      },
      operator_town: {
        type: "string",
        validation: validateTown
      },
      operator_postcode: {
        type: "string",
        validation: validatePostCode
      }
    }
  },
  "/operator-contact-details": {
    type: "object",
    properties: {
      operator_primary_number: {
        type: "string",
        validation: validatePhoneNumber
      },
      operator_secondary_number: {
        type: "string",
        validation: validatePhoneNumberOptional
      },
      operator_email: {
        type: "string",
        validation: validateEmail
      }
    }
  },
  "/contact-representative": {
    type: "object",
    properties: {
      contact_representative_name: {
        type: "string",
        validation: validateName
      },
      contact_representative_role: {
        type: "string",
        validation: validateOptionalString
      },
      contact_representative_number: {
        type: "string",
        validation: validatePhoneNumber
      },
      contact_representative_email: {
        type: "string",
        validation: validateEmail
      }
    }
  },
  "/operator-company-details": {
    type: "object",
    properties: {
      operator_company_house_number: {
        type: "string",
        validation: validateCompaniesHouseNumber
      },
      operator_company_name: {
        type: "string",
        validation: validateCompanyName
      }
    }
  },
  "/operator-charity-details": {
    type: "object",
    properties: {
      operator_charity_name: {
        type: "string",
        validation: validateCharityName
      },
      operator_charity_number: {
        type: "string",
        validation: validateCharityNumber
      }
    }
  },
  "/establishment-trading-name": {
    type: "object",
    properties: {
      establishment_trading_name: {
        type: "string",
        validation: validateEstablishmentTradingName
      }
    }
  },
  "/establishment-contact-details": {
    type: "object",
    properties: {
      establishment_primary_number: {
        type: "string",
        validation: validatePhoneNumber
      },
      establishment_secondary_number: {
        type: "string",
        validation: validatePhoneNumberOptional
      },
      establishment_email: {
        type: "string",
        validation: validateEmail
      }
    }
  },
  "/establishment-address": {
    type: "object",
    properties: {
      establishment_postcode_find: {
        type: "string",
        validation: validatePostCode
      }
    }
  },
  "/establishment-address-select": {
    type: "object",
    properties: {
      establishment_address_selected: {
        type: "string"
      },
      establishment_address_manual: {
        type: "string"
      }
    }
  },
  "/establishment-address-manual": {
    type: "object",
    properties: {
      establishment_postcode: {
        type: "string",
        validation: validatePostCode
      },
      establishment_first_line: {
        type: "string",
        validation: validateFirstLine
      },
      establishment_street: {
        type: "string",
        validation: validateOptionalString
      },
      establishment_town: {
        type: "string",
        validation: validateTown
      }
    }
  },
  "/establishment-opening-status": {
    type: "object",
    properties: {
      establishment_opening_status: {
        type: "string",
        validation: validateRadioButtons
      }
    }
  },
  "/establishment-opening-date-proactive": {
    type: "object",
    properties: {
      establishment_opening_date: {
        type: "string",
        validation: validateFutureDate
      }
    }
  },
  "/establishment-opening-date-retroactive": {
    type: "object",
    properties: {
      establishment_opening_date: {
        type: "string",
        validation: validatePastDate
      }
    }
  },
  "/customer-type": {
    type: "object",
    properties: {
      supply_other: {
        type: "string"
      },
      supply_directly: {
        type: "string"
      }
    },
    anyOf: [{ required: ["supply_other"] }, { required: ["supply_directly"] }]
  },
  "/opening-days-some": {
    type: "object",
    properties: {
      opening_day_monday: {
        type: "string"
      },
      opening_day_tuesday: {
        type: "string"
      },
      opening_day_wednesday: {
        type: "string"
      },
      opening_day_thursday: {
        type: "string"
      },
      opening_day_friday: {
        type: "string"
      },
      opening_day_saturday: {
        type: "string"
      },
      opening_day_sunday: {
        type: "string"
      }
    },
    anyOf: [
      { required: ["opening_day_monday"] },
      { required: ["opening_day_tuesday"] },
      { required: ["opening_day_wednesday"] },
      { required: ["opening_day_thursday"] },
      { required: ["opening_day_friday"] },
      { required: ["opening_day_saturday"] },
      { required: ["opening_day_sunday"] }
    ]
  },
  "/opening-days-start": {
    type: "object",
    properties: {
      opening_days_start: {
        type: "string",
        validation: validateRadioButtons
      }
    }
  },
  "/opening-days-irregular": {
    type: "object",
    properties: {
      opening_days_irregular: {
        type: "string",
        validation: validateOpeningDaysIrregular
      }
    }
  },
  "/business-type": {
    type: "object",
    properties: {
      business_type: {
        type: "string",
        validation: validateBusinessType
      }
    }
  },
  "/business-import-export": {
    type: "object",
    properties: {
      directly_import: {
        type: "string"
      },
      directly_export: {
        type: "string"
      },
      no_import_export: {
        type: "string"
      }
    },
    anyOf: [
      { required: ["directly_import"] },
      { required: ["directly_export"] },
      { required: ["no_import_export"] }
    ]
  },
  "/business-other-details": {
    type: "object",
    properties: {
      business_other_details: {
        type: "string",
        validation: validateBusinessOtherDetails
      }
    }
  },
  "/registration-summary": {
    type: "object",
    properties: {}
  },
  "/declaration": {
    type: "object",
    properties: {
      declaration1: { type: "string", validation: validateDeclaration },
      declaration2: { type: "string", validation: validateDeclaration },
      declaration3: { type: "string", validation: validateDeclaration }
    }
  }
};

module.exports = schema;
