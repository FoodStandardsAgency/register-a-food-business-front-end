const {
  validateDeclaration,
  validatePostCode,
  validateFirstLine,
  validateOptionalString,
  validateName,
  validateTown,
  validateEstablishmentTradingName,
  validatePhoneNumber,
  validatePhoneNumberOptional,
  validateEmail,
  validateRadioButtons,
  validateCompanyName,
  validateCompaniesHouseNumber,
  validateCharityName,
  validateCharityNumber,
  validateCustomerType,
  validateBusinessType,
  validateDate,
  validateImportExportActivities
} = require("@slice-and-dice/register-a-food-business-validation");

const { Validator } = require("jsonschema");
const moment = require("moment");
const validator = new Validator();

// Set validation rules on validator
validator.attributes.validation = (instance, schema, options, ctx) => {
  if (instance !== undefined) {
    if (schema.validation(instance) === false) {
      return "error message";
    }
  }
};
const schema = {
  registration: {
    type: "object",
    properties: {
      establishment: {
        type: "object",
        properties: {
          establishment_details: {
            type: "object",
            properties: {
              establishment_trading_name: {
                type: "string",
                validation: validateEstablishmentTradingName
              },
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
              establishment_opening_date: {
                type: "string",
                validation: validateDate
              }
            },
            required: [
              "establishment_trading_name",
              "establishment_primary_number",
              "establishment_email",
              "establishment_opening_date"
            ]
          },
          operator: {
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
              operator_postcode: {
                type: "string",
                validation: validatePostCode
              },
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
              },
              contact_representative_number: {
                type: "string",
                validation: validatePhoneNumber
              },
              contact_representative_email: {
                type: "string",
                validation: validateEmail
              },
              operator_type: {
                type: "string",
                validation: validateRadioButtons
              },
              operator_company_name: {
                type: "string",
                validation: validateCompanyName
              },
              operator_company_house_number: {
                type: "string",
                validation: validateCompaniesHouseNumber
              },
              operator_charity_name: {
                type: "string",
                validation: validateCharityName
              },
              operator_charity_number: {
                type: "string",
                validation: validateCharityNumber
              }
            },
            required: [
              "operator_type",
              "operator_postcode",
              "operator_first_line"
            ],
            allOf: [
              {
                oneOf: [
                  {
                    required: [
                      "operator_company_name",
                      "operator_company_house_number"
                    ]
                  },
                  { required: ["operator_charity_name"] },
                  { required: ["operator_first_name", "operator_last_name"] }
                ]
              },
              {
                oneOf: [
                  {
                    required: ["operator_primary_number", "operator_email"]
                  },
                  {
                    required: [
                      "contact_representative_email",
                      "contact_representative_number"
                    ]
                  }
                ]
              }
            ]
          },
          premise: {
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
              },
              establishment_type: {
                type: "string",
                validation: validateRadioButtons
              }
            },
            required: [
              "establishment_postcode",
              "establishment_first_line",
              "establishment_type"
            ]
          },
          activities: {
            type: "object",
            properties: {
              customer_type: {
                type: "string",
                validation: validateCustomerType
              },
              business_type: {
                type: "string",
                validation: validateBusinessType
              },
              business_type_search_term: {
                type: "string",
                validation: validateFirstLine
              },
              import_export_activities: {
                type: "string",
                validation: validateImportExportActivities
              }
            },
            required: [
              "customer_type",
              "business_type",
              "import_export_activities"
            ]
          }
        },
        required: ["establishment_details", "operator", "premise", "activities"]
      },
      metadata: {
        type: "object",
        properties: {
          declaration1: { type: "string", validation: validateDeclaration },
          declaration2: { type: "string", validation: validateDeclaration },
          declaration3: { type: "string", validation: validateDeclaration }
        },
        required: ["declaration1", "declaration2", "declaration3"]
      }
    },
    required: ["establishment", "metadata"]
  },
  local_council_url: { type: "string" }
};

const registrationDouble = body => {
  const objectBody = JSON.parse(body);
  const validatorResult = validator.validate(
    objectBody.registration,
    schema.registration
  );
  if (validatorResult.errors.length) {
    return {
      status: 400,
      json: () => ({
        errorCode: "3",
        developerMessage:
          "Validation error, check request body vs validation schema",
        userMessages: [
          {
            property:
              "instance.establishment.establishment_details.establishment_email",
            message: "Invalid operator email"
          }
        ]
      })
    };
  } else {
    const lcConfigCombined = {
      hygieneAndStandards: {
        _id: 8015,
        local_council: "City of Cardiff Council",
        local_council_email: "both@example.com",
        local_council_notify_emails: ["both@example.com"],
        local_council_url: "cardiff"
      }
    };

    const lcConfigSplit = {
      hygiene: {
        code: 4221,
        local_council: "West Dorset District Council",
        local_council_notify_emails: ["hygiene@example.com"],
        local_council_email: "hygiene@example.com"
      },
      standards: {
        code: 4226,
        local_council: "Dorset County Council",
        local_council_notify_emails: ["standards@example.com"],
        local_council_email: "standards@example.com"
      }
    };

    const lcEmailCombined = {
      hygieneAndStandards: {
        success: true,
        recipient: "both@example.com"
      }
    };

    const lcEmailSplit = {
      hygiene: {
        success: true,
        recipient: "hygiene@example.com"
      },
      standards: {
        success: true,
        recipient: "standards@example.com"
      }
    };

    let lcConfig;
    let lcEmail;

    if (
      objectBody.local_council_url === "cardiff" ||
      objectBody.local_council_url === "mid-and-east-antrim" ||
      objectBody.local_council_url === "purbeck"
    ) {
      lcConfig = lcConfigCombined;
      lcEmail = lcEmailCombined;
    } else if (objectBody.local_council_url === "west-dorset") {
      lcConfig = lcConfigSplit;
      lcEmail = lcEmailSplit;
    } else {
      throw new Error(
        `registration.double: the council "${
          objectBody.local_council_url
        }" is not supported by the double.`
      );
    }

    return {
      json: () => ({
        regId: 1,
        establishmentId: 1,
        operatorId: 1,
        activitiesId: 1,
        premiseId: 1,
        metadataId: 1,
        reg_submission_date: moment().format("YYYY-MM-DD"),
        "fsa-rn": "12486-sdmbf",
        tascomiResponse: {
          id: "25",
          online_reference: "0000025"
        },
        emailFbo: {
          success: true,
          recipient: "fsatestemail.valid@gmail.com"
        },
        email_lc: lcEmail,
        lcConfig: lcConfig
      }),
      status: 200
    };
  }
};

module.exports = { registrationDouble };
