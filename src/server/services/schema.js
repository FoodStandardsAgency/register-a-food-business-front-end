/**
 * Schema specifying the fields on each page and their validation functions
 * @module services/schema
 */

const {
  validateDeclaration,
  validatePostCode,
  validateOptionalString,
  validateName,
  validateRadioButtons,
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
  validateBusinessScale,
  validateFoodType,
  validateProcessingActivities,
  validateBusinessOtherDetails,
  validateOpeningDaysIrregular,
  validatePartners,
  validatePartnerName,
  validateOpeningHours,
  validateMandatoryString,
  validateWebAddress,
  validateTradingNames
} = require("@slice-and-dice/register-a-food-business-validation");

const schema = {
  "/index": {
    type: "object",
    properties: {}
  },
  "/new-or-update-registration": {
    type: "object",
    properties: {
      new_or_update_registration: {
        type: "string",
        validation: validateRadioButtons
      }
    }
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
  "/la-selector": {
    type: "object",
    properties: {
      local_authority: {
        type: "string",
        validation: validateMandatoryString
      }
    }
  },
  "/la-established": {
    type: "object",
    properties: {}
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
      },
      operator_birthdate: {
        type: "string",
        validation: validatePastDate
      }
    }
  },
  "/partner-details": {
    type: "object",
    properties: {
      partner_name: {
        type: "string",
        validation: validatePartnerName
      }
    }
  },
  "/partner-name": {
    type: "object",
    properties: {
      partners: {
        type: "array",
        validation: validatePartners
      }
    }
  },
  "/main-partnership-contact": {
    type: "object",
    properties: {
      main_partnership_contact: {
        type: "string",
        validation: validateRadioButtons
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
      operator_address_line_1: {
        type: "string",
        validation: validateMandatoryString
      },
      operator_address_line_2: {
        type: "string",
        validation: validateOptionalString
      },
      operator_address_line_3: {
        type: "string",
        validation: validateOptionalString
      },
      operator_town: {
        type: "string",
        validation: validateMandatoryString
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
  "/partnership-contact-details": {
    type: "object",
    properties: {
      main_partner_primary_number: {
        type: "string",
        validation: validatePhoneNumber
      },
      main_partner_secondary_number: {
        type: "string",
        validation: validatePhoneNumberOptional
      },
      main_partner_email: {
        type: "string",
        validation: validateEmail
      },
      operator_birthdate: {
        type: "string",
        validation: validatePastDate
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
      operator_companies_house_number: {
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
      },
      establishment_additional_trading_names: {
        type: "array",
        validation: validateTradingNames
      }
    }
  },
  "/establishment-trading-name-details": {
    type: "object",
    properties: {
      trading_name: {
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
      },
      establishment_web_address: {
        type: "string",
        validation: validateWebAddress
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
      establishment_address_line_1: {
        type: "string",
        validation: validateMandatoryString
      },
      establishment_address_line_2: {
        type: "string",
        validation: validateOptionalString
      },
      establishment_address_line_3: {
        type: "string",
        validation: validateOptionalString
      },
      establishment_town: {
        type: "string",
        validation: validateMandatoryString
      },
      establishment_postcode: {
        type: "string",
        validation: validatePostCode
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
  "/business-water-supply": {
    type: "object",
    properties: {
      water_supply: {
        type: "string",
        validation: validateRadioButtons
      }
    }
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
  "/opening-hours": {
    type: "object",
    properties: {
      opening_hours_monday: {
        type: "string",
        validation: validateOpeningHours
      },
      opening_hours_tuesday: {
        type: "string",
        validation: validateOpeningHours
      },
      opening_hours_wednesday: {
        type: "string",
        validation: validateOpeningHours
      },
      opening_hours_thursday: {
        type: "string",
        validation: validateOpeningHours
      },
      opening_hours_friday: {
        type: "string",
        validation: validateOpeningHours
      },
      opening_hours_saturday: {
        type: "string",
        validation: validateOpeningHours
      },
      opening_hours_sunday: {
        type: "string",
        validation: validateOpeningHours
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
  "/business-scale": {
    type: "object",
    properties: {
      business_scale: {
        type: "array",
        validation: validateBusinessScale
      }
    }
  },
  "/food-type": {
    type: "object",
    properties: {
      food_type: {
        type: "array",
        validation: validateFoodType
      }
    }
  },
  "/processing-activities": {
    type: "object",
    properties: {
      processing_activities: {
        type: "array",
        validation: validateProcessingActivities
      }
    }
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
      declaration3: { type: "string", validation: validateDeclaration },
      feedback1: { type: "string", validation: validateDeclaration }
    }
  }
};

module.exports = schema;
