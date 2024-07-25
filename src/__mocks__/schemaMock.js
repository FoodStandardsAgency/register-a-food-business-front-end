const {
  validateDeclaration,
  validatePostCode,
  validateoptionalString,
  validateName,
  validateTown,
  validateEstablishmentTradingName,
  validatePhoneNumber,
  validatePhoneNumberOptional,
  validateEmail,
  validateMandatoryString
} = require("@slice-and-dice/register-a-food-business-validation");

const schema = {
  "/example-page-not-in-path": {
    type: "object",
    properties: {
      example_exists_in_schema_but_not_in_path: {
        type: "string",
        validation: validateName
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
  "/establishment-trading-name": {
    type: "object",
    properties: {
      establishment_trading_name: {
        type: "string",
        validation: validateEstablishmentTradingName
      }
    }
  },
  "/establishment-address": {
    type: "object",
    properties: {
      establishment_postcode: {
        type: "string",
        validation: validatePostCode
      },
      establishment_address_line_1: {
        type: "string",
        validation: validateMandatoryString
      },
      establishment_address_line_2: {
        type: "string",
        validation: validateoptionalString
      },
      establishment_town: {
        type: "string",
        validation: validateTown
      }
    }
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
