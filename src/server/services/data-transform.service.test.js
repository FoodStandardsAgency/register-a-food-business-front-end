const {
  transformAnswersForSubmit,
  transformAnswersForSummary,
  combineDate,
  separateBracketsFromBusinessType,
  trimUprn,
  trimAnswers
} = require("./data-transform.service");

const {
  operatorTypeEnum,
  establishmentTypeEnum,
  customerTypeEnum,
  importExportEnum,
  waterSupplyEnum,
  businessTypeEnum
} = require("@slice-and-dice/register-a-food-business-validation");

describe("data-transform.service trimAnswers()", () => {
  let result;
  describe("given answers with white space", () => {
    beforeEach(() => {
      const data = {
        operator_name: "Bob ",
        operator_company_name: "  Trading Name   ",
        operator_email: "  testemail@tester.com"
      };
      result = trimAnswers(data);
    });
    it("should return the answers without whitespace", () => {
      const expectedResult = {
        operator_name: "Bob",
        operator_company_name: "Trading Name",
        operator_email: "testemail@tester.com"
      };
      expect(result).toEqual(expectedResult);
    });
  });
  describe("given an answer without white space", () => {
    const data = {
      operator_name: "Bob",
      operator_company_name: "Trading Name",
      operator_email: "testemail@tester.com"
    };
    beforeEach(() => {
      result = trimAnswers(data);
    });
    it("should return the answer unchanged", () => {
      expect(result).toEqual(data);
    });
  });
});

describe("data-transform.service transformAnswersForSubmit()", () => {
  let result;
  const testLcUrl = "some-council-url";
  const testLanguage = "en";

  const testCumulativeAnswers = {
    operator_first_name: "John",
    operator_last_name: "Appleseed",
    operator_primary_number: "01234 567890",
    operator_email: "john@appleseed.com",
    establishment_trading_name: "John's Apples",
    establishment_postcode: "SW12 9RQ",
    supply_directly: true,
    declaration1: "Declaration",
    opening_days_start: "Every day",
    partners: ["John", "Doe"],
    main_partnership_contact: "John"
  };
  const testAddressLookups = {};

  describe("given a cumulative answers object", () => {
    it("turns flat data into structured data, with the Local Council URL", () => {
      result = transformAnswersForSubmit(
        testCumulativeAnswers,
        testLanguage,
        testAddressLookups,
        testLcUrl
      );
      expect(
        result.registration.establishment.operator.operator_first_name
      ).toBeDefined();

      expect(result.local_council_url).toBe(testLcUrl);
    });

    describe("operator_type", () => {
      describe("given the registration_role is not Representative and operator_type is not passed", () => {
        const registrationRoleOnly = {
          registration_role: "SOLETRADER",
          other_data: "example"
        };

        it("the transformed data contains a field called operator_type that equals the passed registration_role enum", () => {
          result = transformAnswersForSubmit(
            registrationRoleOnly,
            testLanguage,
            testAddressLookups,
            testLcUrl
          );
          expect(
            result.registration.establishment.operator.operator_type
          ).toEqual(
            operatorTypeEnum[registrationRoleOnly.registration_role].key
          );
        });

        it("the transformed data does not contain a field called registration_role", () => {
          result = transformAnswersForSubmit(
            registrationRoleOnly,
            testLanguage,
            testAddressLookups,
            testLcUrl
          );
          expect(
            result.registration.establishment.operator.registration_role
          ).toBe(undefined);
        });
      });

      describe("given the registration_role is Representative and operator_type is passed", () => {
        const registrationRoleAndOperatorType = {
          registration_role: "Representative",
          operator_type: "CHARITY",
          other_data: "example"
        };

        it("the result contains a field called operator_type that equals the operatorTypeEnum using the passed operator_type as the key", () => {
          result = transformAnswersForSubmit(
            registrationRoleAndOperatorType,
            testLanguage,
            testAddressLookups,
            testLcUrl
          );
          expect(
            result.registration.establishment.operator.operator_type
          ).toEqual(
            operatorTypeEnum[registrationRoleAndOperatorType.operator_type].key
          );
        });
      });

      describe("given that registration_role is Representative but operator_type is not passed", () => {
        const data = {
          registration_role: "Representative",
          other_data: "example"
        };

        it("throws an error", () => {
          expect(() =>
            transformAnswersForSubmit(
              data,
              testLanguage,
              testAddressLookups,
              testLcUrl
            )
          ).toThrow(Error);
        });
      });
    });

    describe("business_type", () => {
      const answers = {
        business_type: "Food ordering service (process)"
      };
      it("should assign business_type enum key and business_type_search_term to the result", () => {
        result = transformAnswersForSubmit(
          answers,
          testLanguage,
          testAddressLookups,
          testLcUrl
        );
        expect(result.registration.establishment.activities.business_type).toBe(
          "030"
        );
        expect(
          result.registration.establishment.activities.business_type_search_term
        ).toBe("Process");
      });

      describe("given that business_type is not a defined enum", () => {
        const answers = {
          business_type: "Undefined business type"
        };
        it("should assign an empty string to the result", () => {
          result = transformAnswersForSubmit(
            answers,
            testLanguage,
            testAddressLookups,
            testLcUrl
          );
          expect(
            result.registration.establishment.activities.business_type
          ).toBe("");
        });
      });
    });

    describe("customer_type", () => {
      describe("given supply_other and supply_directly are true", () => {
        const supplyBoth = {
          supply_other: true,
          supply_directly: true
        };
        it("should return customerTypeEnum key: BOTH", () => {
          result = transformAnswersForSubmit(
            supplyBoth,
            testLanguage,
            testAddressLookups,
            testLcUrl
          );
          expect(
            result.registration.establishment.activities.customer_type
          ).toBe(customerTypeEnum.BOTH.key);
        });
      });

      describe("given only supply_other is true", () => {
        const supplyDirectlyOnly = {
          supply_other: true
        };
        it("should return customerTypeEnum key: OTHER_BUSINESSES", () => {
          result = transformAnswersForSubmit(
            supplyDirectlyOnly,
            testLanguage,
            testAddressLookups,
            testLcUrl
          );
          expect(
            result.registration.establishment.activities.customer_type
          ).toBe(customerTypeEnum.OTHER_BUSINESSES.key);
        });
      });

      describe("given only supply_directly is true", () => {
        const supplyDirectlyOnly = {
          supply_directly: true
        };

        it("should return customerTypeEnum key: END_CONSUMER", () => {
          result = transformAnswersForSubmit(
            supplyDirectlyOnly,
            testLanguage,
            testAddressLookups,
            testLcUrl
          );
          expect(
            result.registration.establishment.activities.customer_type
          ).toBe(customerTypeEnum.END_CONSUMER.key);
        });
      });

      describe("given no customer_type is supplied", () => {
        const noCustomerType = {};
        it("should return customer_type: null", () => {
          result = transformAnswersForSubmit(
            noCustomerType,
            testLanguage,
            testAddressLookups,
            testLcUrl
          );
          expect(
            result.registration.establishment.activities.customer_type
          ).toBe(null);
        });
      });
    });

    describe("import_export_activities", () => {
      let result;

      describe("given directly_import, directly_export and no_import_export are true", () => {
        const cumulativeFullAnswers = {
          directly_import: true,
          directly_export: true,
          no_import_export: true
        };
        it("should set import_export_activities to the importExportEnum key: BOTH", () => {
          result = transformAnswersForSubmit(
            cumulativeFullAnswers,
            testLanguage,
            testAddressLookups,
            testLcUrl
          );
          expect(
            result.registration.establishment.activities
              .import_export_activities
          ).toBe(importExportEnum.BOTH.key);
        });
      });
      describe("given directly_import and directly_export are true", () => {
        const cumulativeFullAnswers = {
          directly_import: true,
          directly_export: true
        };
        it("should set import_export_activities to the importExportEnum key: BOTH", () => {
          result = transformAnswersForSubmit(
            cumulativeFullAnswers,
            testLanguage,
            testAddressLookups,
            testLcUrl
          );
          expect(
            result.registration.establishment.activities
              .import_export_activities
          ).toBe(importExportEnum.BOTH.key);
        });
      });
      describe("given directly_import and no_import_export are true", () => {
        const cumulativeFullAnswers = {
          directly_import: true,
          no_import_export: true
        };
        it("should set import_export_activities to the importExportEnum key: IMPORT", () => {
          result = transformAnswersForSubmit(
            cumulativeFullAnswers,
            testLanguage,
            testAddressLookups,
            testLcUrl
          );
          expect(
            result.registration.establishment.activities
              .import_export_activities
          ).toBe(importExportEnum.IMPORT.key);
        });
      });
      describe("given directly_export and no_import_export are true", () => {
        const cumulativeFullAnswers = {
          directly_export: true,
          no_import_export: true
        };
        it("should set import_export_activities to the importExportEnum key: EXPORT", () => {
          result = transformAnswersForSubmit(
            cumulativeFullAnswers,
            testLanguage,
            testAddressLookups,
            testLcUrl
          );
          expect(
            result.registration.establishment.activities
              .import_export_activities
          ).toBe(importExportEnum.EXPORT.key);
        });
      });
      describe("given only directly_export is true", () => {
        const cumulativeFullAnswers = {
          directly_export: true
        };
        it("should set import_export_activities to the importExportEnum key: EXPORT", () => {
          result = transformAnswersForSubmit(
            cumulativeFullAnswers,
            testLanguage,
            testAddressLookups,
            testLcUrl
          );
          expect(
            result.registration.establishment.activities
              .import_export_activities
          ).toBe(importExportEnum.EXPORT.key);
        });
      });
      describe("given only directly_import is true", () => {
        const cumulativeFullAnswers = {
          directly_import: true
        };
        it("should set import_export_activities to the importExportEnum key: IMPORT", () => {
          result = transformAnswersForSubmit(
            cumulativeFullAnswers,
            testLanguage,
            testAddressLookups,
            testLcUrl
          );
          expect(
            result.registration.establishment.activities
              .import_export_activities
          ).toBe(importExportEnum.IMPORT.key);
        });
      });
      describe("given only no_import_export is true", () => {
        const cumulativeFullAnswers = {
          no_import_export: true
        };
        it("should set import_export_activities to the importExportEnum key: NONE", () => {
          result = transformAnswersForSubmit(
            cumulativeFullAnswers,
            testLanguage,
            testAddressLookups,
            testLcUrl
          );
          expect(
            result.registration.establishment.activities
              .import_export_activities
          ).toBe(importExportEnum.NONE.key);
        });
      });
      describe("given all import export options are false", () => {
        const cumulativeFullAnswers = {
          directly_import: false,
          directly_export: false,
          no_import_export: false
        };
        it("should return a import_export_activities value of null", () => {
          result = transformAnswersForSubmit(
            cumulativeFullAnswers,
            testLanguage,
            testAddressLookups,
            testLcUrl
          );
          expect(
            result.registration.establishment.activities
              .import_export_activities
          ).toBe(null);
        });
      });
    });

    describe("opening_days", () => {
      describe("given opening_days_start equals 'Every day'", () => {
        const everyDay = {
          opening_days_start: "Every day"
        };
        it("should set every day to true", () => {
          result = transformAnswersForSubmit(
            everyDay,
            testLanguage,
            testAddressLookups,
            testLcUrl
          );
          expect(
            result.registration.establishment.activities.opening_day_monday
          ).toBe(true);
          expect(
            result.registration.establishment.activities.opening_day_tuesday
          ).toBe(true);
          expect(
            result.registration.establishment.activities.opening_day_wednesday
          ).toBe(true);
          expect(
            result.registration.establishment.activities.opening_day_thursday
          ).toBe(true);
          expect(
            result.registration.establishment.activities.opening_day_friday
          ).toBe(true);
          expect(
            result.registration.establishment.activities.opening_day_saturday
          ).toBe(true);
          expect(
            result.registration.establishment.activities.opening_day_sunday
          ).toBe(true);
        });
      });

      describe("given opening_days_start doesn't equal 'Every day'", () => {
        const someDays = {
          opening_day_monday: "Monday",
          opening_day_tuesday: "Tuesday",
          opening_day_wednesday: "Wednesday"
        };
        it("should set any day passed through to true and the rest to false", () => {
          result = transformAnswersForSubmit(
            someDays,
            testLanguage,
            testAddressLookups,
            testLcUrl
          );
          expect(
            result.registration.establishment.activities.opening_day_monday
          ).toBe(true);
          expect(
            result.registration.establishment.activities.opening_day_tuesday
          ).toBe(true);
          expect(
            result.registration.establishment.activities.opening_day_wednesday
          ).toBe(true);
          expect(
            result.registration.establishment.activities.opening_day_thursday
          ).toBe(false);
          expect(
            result.registration.establishment.activities.opening_day_friday
          ).toBe(false);
          expect(
            result.registration.establishment.activities.opening_day_saturday
          ).toBe(false);
          expect(
            result.registration.establishment.activities.opening_day_sunday
          ).toBe(false);
        });
      });
    });
  });

  describe("opening_hours", () => {
    describe("when opening hours are empty strings", () => {
      const emptyHours = {
        opening_hours_monday: "",
        opening_hours_tuesday: "",
        opening_hours_wednesday: "",
        opening_hours_thursday: "",
        opening_hours_friday: "",
        opening_hours_saturday: "",
        opening_hours_sunday: ""
      };
      it("sets them to undefined", () => {
        result = transformAnswersForSubmit(
          emptyHours,
          testLanguage,
          testAddressLookups,
          testLcUrl
        );
        expect(
          result.registration.establishment.activities.opening_hours_monday
        ).toBe(undefined);
        expect(
          result.registration.establishment.activities.opening_hours_tuesday
        ).toBe(undefined);
        expect(
          result.registration.establishment.activities.opening_hours_wednesday
        ).toBe(undefined);
        expect(
          result.registration.establishment.activities.opening_hours_thursday
        ).toBe(undefined);
        expect(
          result.registration.establishment.activities.opening_hours_friday
        ).toBe(undefined);
        expect(
          result.registration.establishment.activities.opening_hours_saturday
        ).toBe(undefined);
        expect(
          result.registration.establishment.activities.opening_hours_sunday
        ).toBe(undefined);
      });
    });

    describe("when opening hours have truthy strings", () => {
      const truthyHours = {
        opening_hours_monday: "monday",
        opening_hours_tuesday: "tuesday",
        opening_hours_wednesday: "wednesday",
        opening_hours_thursday: "thursday",
        opening_hours_friday: "friday",
        opening_hours_saturday: "saturday",
        opening_hours_sunday: "sunday"
      };
      const testAddressLookups = {};

      it("it keeps the original values", () => {
        result = transformAnswersForSubmit(
          truthyHours,
          testLanguage,
          testAddressLookups,
          testLcUrl
        );
        expect(
          result.registration.establishment.activities.opening_hours_monday
        ).toEqual("monday");
        expect(
          result.registration.establishment.activities.opening_hours_tuesday
        ).toEqual("tuesday");
        expect(
          result.registration.establishment.activities.opening_hours_wednesday
        ).toEqual("wednesday");
        expect(
          result.registration.establishment.activities.opening_hours_thursday
        ).toEqual("thursday");
        expect(
          result.registration.establishment.activities.opening_hours_friday
        ).toEqual("friday");
        expect(
          result.registration.establishment.activities.opening_hours_saturday
        ).toEqual("saturday");
        expect(
          result.registration.establishment.activities.opening_hours_sunday
        ).toEqual("sunday");
      });
    });
  });

  describe("given an addressLookups object with operator_postcode_find and establishment_postcode_find arrays", () => {
    const testAddressLookups = {
      operator_postcode_find: [
        {
          addressline1: "Allies Computing Ltd",
          addressline2: "Manor Farm Barns, Fox Road",
          addressline3: "Framingham Pigot",
          summaryline:
            "Allies Computing Ltd, Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
          organisation: "Allies Computing Ltd",
          buildingname: "Manor Farm Barns",
          premise: "Manor Farm Barns",
          street: "Fox Road",
          dependentlocality: "Framingham Pigot",
          posttown: "Norwich",
          county: "Norfolk",
          postcode: "NR14 7PZ"
        },
        {
          addressline1: "Room 36",
          addressline2: "Block 1 Arthur Vick",
          addressline3: "Gibbet Hill Road",
          summaryline:
            "Room 36, Block 1 Arthur Vick, Gibbet Hill Road, Coventry, West Midlands, CV4 7AL",
          subbuildingname: "Room 36",
          buildingname: "Block 1 Arthur Vick",
          premise: "Room 36, Block 1 Arthur Vick",
          posttown: "Coventry",
          county: "West Midlands",
          postcode: "CV4 7AL"
        }
      ],
      establishment_postcode_find: [
        {
          addressline1: "Example",
          addressline2: "Example line 2",
          addressline3: "Gibbet Hill Road",
          summaryline:
            "Room 36, Block 1 Arthur Vick, Gibbet Hill Road, Coventry, West Midlands, CV4 7AL",
          subbuildingname: "Room 36",
          buildingname: "Block 1 Arthur Vick",
          premise: "Example premise line",
          street: "Example street",
          posttown: "Example town",
          county: "Norfolk",
          postcode: "AA11 1AA"
        },
        {
          addressline1: "Allies Computing Ltd",
          addressline2: "Manor Farm Barns",
          addressline3: "Fox Road",
          addressline4: "Framingham Pigot",
          summaryline:
            "Allies Computing Ltd, Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
          organisation: "Allies Computing Ltd",
          buildingname: "Manor Farm Barns",
          premise: "Manor Farm Barns",
          street: "Fox Road",
          dependentlocality: "Framingham Pigot",
          posttown: "Norwich",
          county: "Norfolk",
          postcode: "NR14 7PZ"
        }
      ]
    };
    describe("when populating tascomi address fields", () => {
      describe("when operator premise does not exist", () => {
        const testAddressLookupsNoPremise = {
          operator_postcode_find: [
            {
              addressline1: "Allies Computing Ltd",
              addressline2: "Manor Farm Barns",
              addressline3: "Fox Road",
              addressline4: "Framingham Pigot",
              summaryline:
                "Allies Computing Ltd, Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
              organisation: "Allies Computing Ltd",
              buildingname: "Manor Farm Barns",
              street: "Fox Road",
              dependentlocality: "Framingham Pigot",
              posttown: "Norwich",
              county: "Norfolk",
              postcode: "NR14 7PZ"
            }
          ],
          establishment_postcode_find: [
            {
              addressline1: "Example",
              addressline2: "Example line 2",
              addressline3: "Gibbet Hill Road",
              summaryline:
                "Room 36, Block 1 Arthur Vick, Gibbet Hill Road, Coventry, West Midlands, CV4 7AL",
              subbuildingname: "Room 36",
              buildingname: "Block 1 Arthur Vick",
              street: "Example street",
              posttown: "Example town",
              county: "Norfolk",
              postcode: "AA11 1AA"
            }
          ]
        };

        const correctResponse = {
          operator_first_line: "Allies Computing Ltd",
          operator_street: "Fox Road",
          operator_town: "Norwich",
          operator_postcode: "NR14 7PZ"
        };

        const cumulativeAnswersOpAddSelected = {
          operator_address_selected: "0"
        };

        it("uses addressLine1 instead of premise as operator_first_line", () => {
          const response = transformAnswersForSubmit(
            cumulativeAnswersOpAddSelected,
            testLanguage,
            testAddressLookupsNoPremise
          );
          expect(
            response.registration.establishment.operator.operator_first_line
          ).toBe(correctResponse.operator_first_line);
        });
      });

      describe("when establishment premise does not exist", () => {
        const testAddressLookupsNoPremise = {
          operator_postcode_find: [
            {
              addressline1: "Allies Computing Ltd",
              addressline2: "Manor Farm Barns",
              addressline3: "Fox Road",
              addressline4: "Framingham Pigot",
              summaryline:
                "Allies Computing Ltd, Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
              organisation: "Allies Computing Ltd",
              buildingname: "Manor Farm Barns",
              street: "Fox Road",
              dependentlocality: "Framingham Pigot",
              posttown: "Norwich",
              county: "Norfolk",
              postcode: "NR14 7PZ"
            }
          ],
          establishment_postcode_find: [
            {
              addressline1: "Example",
              addressline2: "Example line 2",
              addressline3: "Gibbet Hill Road",
              summaryline:
                "Room 36, Block 1 Arthur Vick, Gibbet Hill Road, Coventry, West Midlands, CV4 7AL",
              subbuildingname: "Room 36",
              buildingname: "Block 1 Arthur Vick",
              street: "Example street",
              posttown: "Example town",
              county: "Norfolk",
              postcode: "AA11 1AA"
            }
          ]
        };

        const correctResponse = {
          establishment_first_line: "Example",
          establishment_street: "Fox Road",
          establishment_town: "Norwich",
          establishment_postcode: "NR14 7PZ"
        };

        const cumulativeAnswersEstAddSelected = {
          establishment_address_selected: "0"
        };

        it("uses addressLine1 instead of premise as establishment_address_line_1", () => {
          const response = transformAnswersForSubmit(
            cumulativeAnswersEstAddSelected,
            testLanguage,
            testAddressLookupsNoPremise
          );
          expect(
            response.registration.establishment.premise.establishment_first_line
          ).toBe(correctResponse.establishment_first_line);
        });
      });
    });

    describe("given operator_address_selected is in cumulativeFullAnswers with a value of 1", () => {
      const cumulativeAnswersOpAddSelected = {
        operator_address_selected: "1"
      };

      const correctResponse = {
        operator_address_line_1: "Room 36",
        operator_address_line_2: "Block 1 Arthur Vick",
        operator_address_line_3: "Gibbet Hill Road",
        operator_town: "Coventry",
        operator_postcode: "CV4 7AL"
      };

      it("returns correctly formatted operator address fields that match the second entry in the address lookup results", () => {
        const response = transformAnswersForSubmit(
          cumulativeAnswersOpAddSelected,
          testLanguage,
          testAddressLookups
        );
        expect(response.registration.establishment.operator).toMatchObject(
          correctResponse
        );
      });

      describe("given that operator_address_line_1 already exists (showing that the manual address page has been filled out)", () => {
        const cumulativeAnswersOpAddSelectedWithManual = {
          operator_address_selected: "1",
          operator_address_line_1: "Room 36, Block 1 Arthur Vick",
          operator_postcode: "NR14 7PZ"
        };

        const manualAddressDataOnly = {
          operator_address_line_1: "Room 36, Block 1 Arthur Vick",
          operator_postcode: "NR14 7PZ"
        };

        it("returns the original manual address data and deletes the operator_address_selected value", () => {
          const response = transformAnswersForSubmit(
            cumulativeAnswersOpAddSelectedWithManual,
            testLanguage,
            testAddressLookups
          );
          expect(response.registration.establishment.operator).toMatchObject(
            manualAddressDataOnly
          );
        });
      });
    });

    describe("given establishment_address_selected is in cumulativeFullAnswers with a value of 0", () => {
      const cumulativeAnswersEstAddSelected = {
        establishment_address_selected: "0"
      };

      const correctResponse = {
        establishment_address_line_1: "Example",
        establishment_address_line_2: "Example line 2",
        establishment_address_line_3: "Gibbet Hill Road",
        establishment_town: "Example town",
        establishment_postcode: "AA11 1AA"
      };

      it("returns correctly formatted establishment address fields that match the first entry in the address lookup results", () => {
        const response = transformAnswersForSubmit(
          cumulativeAnswersEstAddSelected,
          testLanguage,
          testAddressLookups
        );
        expect(response.registration.establishment.premise).toMatchObject(
          correctResponse
        );
      });

      describe("given that establishment_address_line_1 already exists (showing that the manual address page has been filled out)", () => {
        const cumulativeAnswersEstAddSelectedWithManual = {
          establishment_address_selected: "0",
          establishment_address_line_1: "Example premise line",
          establishment_postcode: "AA11 1AA"
        };

        const manualAddressDataOnly = {
          establishment_address_line_1: "Example premise line",
          establishment_postcode: "AA11 1AA"
        };

        it("returns the original manual address data and deletes the establishment_address_selected value", () => {
          const response = transformAnswersForSubmit(
            cumulativeAnswersEstAddSelectedWithManual,
            testLanguage,
            testAddressLookups
          );
          expect(response.registration.establishment.premise).toMatchObject(
            manualAddressDataOnly
          );
        });
      });
    });

    describe("when operator address line 1 is the street", () => {
      describe("operator address line 3 is null", () => {
        const cumulativeAnswersEstAddSelected = {
          operator_address_selected: "0"
        };

        const testAddressLookupData = {
          operator_postcode_find: [
            {
              addressline1: "Example Street",
              addressline2: "Example Dependant Locality",
              addressline3: "",
              organisation: "The Organisation",
              street: "Example Street"
            }
          ]
        };
        const correctResponse = {
          operator_address_line_1: "The Organisation",
          operator_address_line_2: "Example Street",
          operator_address_line_3: "Example Dependant Locality"
        };

        it("returns the response with the organisation included as address line 1", () => {
          const response = transformAnswersForSubmit(
            cumulativeAnswersEstAddSelected,
            testLanguage,
            testAddressLookupData
          );
          expect(
            response.registration.establishment.operator.operator_address_line_1
          ).toBe(correctResponse.operator_address_line_1);
          expect(
            response.registration.establishment.operator.operator_address_line_2
          ).toBe(correctResponse.operator_address_line_2);
          expect(
            response.registration.establishment.operator.operator_address_line_3
          ).toBe(correctResponse.operator_address_line_3);
        });
      });

      describe("operator address line 3 is not null and organisation has a value", () => {
        const cumulativeAnswersEstAddSelected = {
          operator_address_selected: "0"
        };

        const testAddressLookupData = {
          operator_postcode_find: [
            {
              addressline1: "Example Street",
              addressline2: "Example District",
              addressline3: "Example Dependant Locality",
              organisation: "The Organisation",
              street: "Example Street"
            }
          ]
        };
        const correctResponse = {
          operator_address_line_1: "The Organisation, Example Street",
          operator_address_line_2: "Example District",
          operator_address_line_3: "Example Dependant Locality"
        };

        it("returns the response with the organisation included in address line 1", () => {
          const response = transformAnswersForSubmit(
            cumulativeAnswersEstAddSelected,
            testLanguage,
            testAddressLookupData
          );
          expect(
            response.registration.establishment.operator.operator_address_line_1
          ).toBe(correctResponse.operator_address_line_1);
          expect(
            response.registration.establishment.operator.operator_address_line_2
          ).toBe(correctResponse.operator_address_line_2);
          expect(
            response.registration.establishment.operator.operator_address_line_3
          ).toBe(correctResponse.operator_address_line_3);
        });
      });

      describe("operator address line 1 is equal to street but organisation is not present", () => {
        const cumulativeAnswersEstAddSelected = {
          operator_address_selected: "0"
        };

        const testAddressLookupData = {
          operator_postcode_find: [
            {
              addressline1: "Example Street",
              addressline2: "Example Town",
              addressline3: "Example Dependant Locality",
              organisation: "",
              street: "Example Street"
            }
          ]
        };
        const correctResponse = {
          operator_address_line_1: "Example Street",
          operator_address_line_2: "Example Town",
          operator_address_line_3: "Example Dependant Locality"
        };

        it("returns the response with the no changes to the address lines", () => {
          const response = transformAnswersForSubmit(
            cumulativeAnswersEstAddSelected,
            testLanguage,
            testAddressLookupData
          );
          expect(
            response.registration.establishment.operator.operator_address_line_1
          ).toBe(correctResponse.operator_address_line_1);
          expect(
            response.registration.establishment.operator.operator_address_line_2
          ).toBe(correctResponse.operator_address_line_2);
          expect(
            response.registration.establishment.operator.operator_address_line_3
          ).toBe(correctResponse.operator_address_line_3);
        });
      });

      describe("operator address line 1 is not equal to street but organisation is present", () => {
        const cumulativeAnswersEstAddSelected = {
          operator_address_selected: "0"
        };

        const testAddressLookupData = {
          operator_postcode_find: [
            {
              addressline1: "Example House",
              addressline2: "Example Street",
              addressline3: "Example Dependant Locality",
              organisation: "The Organisation",
              street: "Example Street"
            }
          ]
        };
        const correctResponse = {
          operator_address_line_1: "Example House",
          operator_address_line_2: "Example Street",
          operator_address_line_3: "Example Dependant Locality"
        };

        it("returns the response with the no changes to the address lines", () => {
          const response = transformAnswersForSubmit(
            cumulativeAnswersEstAddSelected,
            testLanguage,
            testAddressLookupData
          );
          expect(
            response.registration.establishment.operator.operator_address_line_1
          ).toBe(correctResponse.operator_address_line_1);
          expect(
            response.registration.establishment.operator.operator_address_line_2
          ).toBe(correctResponse.operator_address_line_2);
          expect(
            response.registration.establishment.operator.operator_address_line_3
          ).toBe(correctResponse.operator_address_line_3);
        });
      });
    });

    describe("when establishment address line 1 is the street", () => {
      describe("establishment address line 3 is null", () => {
        const cumulativeAnswersEstAddSelected = {
          establishment_address_selected: "0"
        };

        const testAddressLookupData = {
          establishment_postcode_find: [
            {
              addressline1: "Example Street",
              addressline2: "Example Dependant Locality",
              addressline3: "",
              organisation: "The Organisation",
              street: "Example Street"
            }
          ]
        };
        const correctResponse = {
          establishment_address_line_1: "The Organisation",
          establishment_address_line_2: "Example Street",
          establishment_address_line_3: "Example Dependant Locality"
        };

        it("returns the response with the organisation included as address line 1", () => {
          const response = transformAnswersForSubmit(
            cumulativeAnswersEstAddSelected,
            testLanguage,
            testAddressLookupData
          );
          expect(
            response.registration.establishment.premise
              .establishment_address_line_1
          ).toBe(correctResponse.establishment_address_line_1);
          expect(
            response.registration.establishment.premise
              .establishment_address_line_2
          ).toBe(correctResponse.establishment_address_line_2);
          expect(
            response.registration.establishment.premise
              .establishment_address_line_3
          ).toBe(correctResponse.establishment_address_line_3);
        });
      });

      describe("establishment address line 3 is not null", () => {
        const cumulativeAnswersEstAddSelected = {
          establishment_address_selected: "0"
        };

        const testAddressLookupData = {
          establishment_postcode_find: [
            {
              addressline1: "Example Street",
              addressline2: "Example District",
              addressline3: "Example Dependant Locality",
              organisation: "The Organisation",
              street: "Example Street"
            }
          ]
        };
        const correctResponse = {
          establishment_address_line_1: "The Organisation, Example Street",
          establishment_address_line_2: "Example District",
          establishment_address_line_3: "Example Dependant Locality"
        };

        it("returns the response with the organisation included in address line 1", () => {
          const response = transformAnswersForSubmit(
            cumulativeAnswersEstAddSelected,
            testLanguage,
            testAddressLookupData
          );
          expect(
            response.registration.establishment.premise
              .establishment_address_line_1
          ).toBe(correctResponse.establishment_address_line_1);
          expect(
            response.registration.establishment.premise
              .establishment_address_line_2
          ).toBe(correctResponse.establishment_address_line_2);
          expect(
            response.registration.establishment.premise
              .establishment_address_line_3
          ).toBe(correctResponse.establishment_address_line_3);
        });
      });
    });

    describe("establishment address line 1 is equal to street but organisation is not present", () => {
      const cumulativeAnswersEstAddSelected = {
        establishment_address_selected: "0"
      };

      const testAddressLookupData = {
        establishment_postcode_find: [
          {
            addressline1: "Example Street",
            addressline2: "Example Town",
            addressline3: "Example Dependant Locality",
            organisation: "",
            street: "Example Street"
          }
        ]
      };
      const correctResponse = {
        establishment_address_line_1: "Example Street",
        establishment_address_line_2: "Example Town",
        establishment_address_line_3: "Example Dependant Locality"
      };

      it("returns the response with the no changes to the address lines", () => {
        const response = transformAnswersForSubmit(
          cumulativeAnswersEstAddSelected,
          testLanguage,
          testAddressLookupData
        );
        expect(
          response.registration.establishment.premise
            .establishment_address_line_1
        ).toBe(correctResponse.establishment_address_line_1);
        expect(
          response.registration.establishment.premise
            .establishment_address_line_2
        ).toBe(correctResponse.establishment_address_line_2);
        expect(
          response.registration.establishment.premise
            .establishment_address_line_3
        ).toBe(correctResponse.establishment_address_line_3);
      });
    });

    describe("establishment address line 1 is not equal to street but organisation is present", () => {
      const cumulativeAnswersEstAddSelected = {
        establishment_address_selected: "0"
      };

      const testAddressLookupData = {
        establishment_postcode_find: [
          {
            addressline1: "Example House",
            addressline2: "Example Street",
            addressline3: "Example Dependant Locality",
            organisation: "The Organisation",
            street: "Example Street"
          }
        ]
      };
      const correctResponse = {
        establishment_address_line_1: "Example House",
        establishment_address_line_2: "Example Street",
        establishment_address_line_3: "Example Dependant Locality"
      };

      it("returns the response with the no changes to the address lines", () => {
        const response = transformAnswersForSubmit(
          cumulativeAnswersEstAddSelected,
          testLanguage,
          testAddressLookupData
        );
        expect(
          response.registration.establishment.premise
            .establishment_address_line_1
        ).toBe(correctResponse.establishment_address_line_1);
        expect(
          response.registration.establishment.premise
            .establishment_address_line_2
        ).toBe(correctResponse.establishment_address_line_2);
        expect(
          response.registration.establishment.premise
            .establishment_address_line_3
        ).toBe(correctResponse.establishment_address_line_3);
      });
    });
  });

  it("should only add the data fields it is given", () => {
    result = transformAnswersForSubmit(
      testLcUrl,
      testLanguage,
      testCumulativeAnswers,
      testAddressLookups
    );
    expect(
      result.registration.establishment.operator.operator_company_name
    ).not.toBeDefined();
  });

  it("should set primary contact for partners", () => {
    result = transformAnswersForSubmit(
      testCumulativeAnswers,
      testLanguage,
      testAddressLookups,
      testLcUrl
    );
    expect(result.registration.establishment.operator.partners).toHaveLength(2);
    expect(result.registration.establishment.operator.partners).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          partner_name: "John",
          partner_is_primary_contact: true
        })
      ])
    );
    expect(result.registration.establishment.operator.partners).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          partner_name: "Doe",
          partner_is_primary_contact: false
        })
      ])
    );
  });
});

describe("data-transform.service trimUprn()", () => {
  it("should return empty string when UPRN is not a string or is empty string", () => {
    const badText = [[], {}, null, undefined, ""];

    badText.forEach((text) => {
      const result = trimUprn(text);
      expect(result).toBe("");
    });
  });

  it("should return empty string when UPRN is completely invalid", () => {
    const badText = ["asdasd333333", "dsdfsdfs344", "%f", "--4"];

    badText.forEach((text) => {
      const result = trimUprn(text);
      expect(result).toBe("");
    });
  });

  it("should return UPRN trimmed of trailing non-numeric characters when present", () => {
    let result = trimUprn("12334sdfsd");
    expect(result).toBe("12334");
    result = trimUprn("1233456789-1");
    expect(result).toBe("1233456789");
    result = trimUprn("9999999%%%dd3");
    expect(result).toBe("9999999");
  });

  describe("should return unaltered UPRN if already valid", () => {
    const valid = ["213456", "789456123", "9998887776"];

    valid.forEach((text) => {
      const result = trimUprn(text);
      expect(result).toBe(text);
    });
  });
});

describe("data-transform.service transformAnswersForSummary()", () => {
  let result;

  const testCumulativeAnswers = {
    operator_first_name: "John",
    operator_last_name: "Appleseed",
    operator_primary_number: "01234 567890",
    operator_email: "john@appleseed.com",
    establishment_trading_name: "John's Apples"
  };
  describe("given a cumulative answers object", () => {
    it("returns an object", () => {
      result = transformAnswersForSummary(testCumulativeAnswers);
      expect(typeof result).toBe("object");
    });

    describe("operator_type", () => {
      describe("given the registration_role is not Representative and operator_type is not passed", () => {
        const registrationRoleOnly = {
          registration_role: "SOLETRADER",
          other_data: "example"
        };

        it("the transformed data contains a field called operator_type that equals the passed registration_role enum value", () => {
          result = transformAnswersForSummary(registrationRoleOnly);
          expect(result.operator_type).toEqual(
            operatorTypeEnum[registrationRoleOnly.registration_role].value.en
          );
        });

        it("the transformed data does not contain a field called registration_role", () => {
          result = transformAnswersForSummary(registrationRoleOnly);
          expect(result.registration_role).toBe(undefined);
        });
      });

      describe("given the registration_role is Representative and operator_type is passed", () => {
        const registrationRoleAndOperatorType = {
          registration_role: "Representative",
          operator_type: "CHARITY",
          other_data: "example"
        };

        it("the result contains a field called operator_type that equals the operatorTypeEnum value using the passed operator_type as the key", () => {
          result = transformAnswersForSummary(registrationRoleAndOperatorType);
          expect(result.operator_type).toEqual(
            operatorTypeEnum[registrationRoleAndOperatorType.operator_type]
              .value.en
          );
        });

        it("the transformed data contains a field called operator_type that contains operator type text plus an additional representative description", () => {
          const operatorTypesArray = ["PERSON", "CHARITY", "COMPANY"];

          operatorTypesArray.forEach((operatorType) => {
            const data = {
              registration_role: "Representative",
              operator_type: operatorType,
              other_data: "example"
            };

            result = transformAnswersForSummary(data);

            expect(result.operator_type).toBe(
              operatorTypeEnum[operatorType].value.en
            );
            expect(result.operator_type).toContain(
              "(registered by a representative)"
            );
          });
        });
      });

      describe("given that registration_role is Representative but operator_type is not passed", () => {
        const data = {
          registration_role: "Representative",
          other_data: "example"
        };

        it("throws an error", () => {
          expect(() => transformAnswersForSummary(data)).toThrow(Error);
        });
      });
    });

    describe("business_type", () => {
      const answers = {
        business_type: "Food ordering service (process)"
      };
      it("should assign the business_type enum value to the result only", () => {
        result = transformAnswersForSummary(answers);
        expect(result.business_type).toBe(businessTypeEnum["030"].value.en);
      });

      describe("given that business_type is not a defined enum", () => {
        const answers = {
          business_type: "Undefined business type"
        };
        it("should assign an empty string to the result", () => {
          result = transformAnswersForSummary(answers);
          expect(result.business_type).toBe("");
        });
      });
    });

    describe("customer_type", () => {
      describe("given supply_other and supply_directly are true", () => {
        const supplyBoth = {
          supply_other: true,
          supply_directly: true
        };
        it("should return customerTypeEnum value: End consumer and other businesses", () => {
          result = transformAnswersForSummary(supplyBoth);
          expect(result.customer_type).toBe(customerTypeEnum.BOTH.value.en);
        });
      });

      describe("given only supply_other is true", () => {
        const supplyDirectlyOnly = {
          supply_other: true
        };
        it("should return customerTypeEnum key: Other businesses", () => {
          result = transformAnswersForSummary(supplyDirectlyOnly);
          expect(result.customer_type).toBe(
            customerTypeEnum.OTHER_BUSINESSES.value.en
          );
        });
      });

      describe("given only supply_directly is true", () => {
        const supplyDirectlyOnly = {
          supply_directly: true
        };

        it("should return customerTypeEnum key: End consumer", () => {
          result = transformAnswersForSummary(supplyDirectlyOnly);
          expect(result.customer_type).toBe(
            customerTypeEnum.END_CONSUMER.value.en
          );
        });
      });

      describe("given no customer_type is supplied", () => {
        const noCustomerType = {};
        it("should return customer_type: null", () => {
          result = transformAnswersForSummary(noCustomerType);
          expect(result.customer_type).toBe(null);
        });
      });
    });

    describe("import_export_activities", () => {
      let result;

      describe("given directly_import, directly_export and no_import_export are true", () => {
        const cumulativeFullAnswers = {
          directly_import: true,
          directly_export: true,
          no_import_export: true
        };
        it("should set import_export_activities to the importExportEnum value: Directly import and export", () => {
          result = transformAnswersForSummary(cumulativeFullAnswers);
          expect(result.import_export_activities).toBe(
            importExportEnum.BOTH.value.en
          );
        });
      });
      describe("given directly_import and directly_export are true", () => {
        const cumulativeFullAnswers = {
          directly_import: true,
          directly_export: true
        };
        it("should set import_export_activities to the importExportEnum key: Directly import and export", () => {
          result = transformAnswersForSummary(cumulativeFullAnswers);
          expect(result.import_export_activities).toBe(
            importExportEnum.BOTH.value.en
          );
        });
      });
      describe("given directly_import and no_import_export are true", () => {
        const cumulativeFullAnswers = {
          directly_import: true,
          no_import_export: true
        };
        it("should set import_export_activities to the importExportEnum key: Directly import", () => {
          result = transformAnswersForSummary(cumulativeFullAnswers);
          expect(result.import_export_activities).toBe(
            importExportEnum.IMPORT.value.en
          );
        });
      });
      describe("given directly_export and no_import_export are true", () => {
        const cumulativeFullAnswers = {
          directly_export: true,
          no_import_export: true
        };
        it("should set import_export_activities to the importExportEnum key: Directly export", () => {
          result = transformAnswersForSummary(cumulativeFullAnswers);
          expect(result.import_export_activities).toBe(
            importExportEnum.EXPORT.value.en
          );
        });
      });
      describe("given only directly_export is true", () => {
        const cumulativeFullAnswers = {
          directly_export: true
        };
        it("should set import_export_activities to the importExportEnum key: Directly export", () => {
          result = transformAnswersForSummary(cumulativeFullAnswers);
          expect(result.import_export_activities).toBe(
            importExportEnum.EXPORT.value.en
          );
        });
      });
      describe("given only directly_import is true", () => {
        const cumulativeFullAnswers = {
          directly_import: true
        };
        it("should set import_export_activities to the importExportEnum key: Directly import", () => {
          result = transformAnswersForSummary(cumulativeFullAnswers);
          expect(result.import_export_activities).toBe(
            importExportEnum.IMPORT.value.en
          );
        });
      });
      describe("given only no_import_export is true", () => {
        const cumulativeFullAnswers = {
          no_import_export: true
        };
        it("should set import_export_activities to the importExportEnum key: None", () => {
          result = transformAnswersForSummary(cumulativeFullAnswers);
          expect(result.import_export_activities).toBe(
            importExportEnum.NONE.value.en
          );
        });
      });
      describe("given all import export options are false", () => {
        const cumulativeFullAnswers = {
          directly_import: false,
          directly_export: false,
          no_import_export: false
        };
        it("should return a import_export_activities value of null", () => {
          result = transformAnswersForSummary(cumulativeFullAnswers);
          expect(result.import_export_activities).toBe(null);
        });
      });
    });

    describe("opening_day", () => {
      describe("given opening_days_start equals 'Every day'", () => {
        const everyDay = {
          opening_days_start: "Every day"
        };
        it("should set open_some_days_summary_table to 'Every day' and each day to itself", () => {
          result = transformAnswersForSummary(everyDay);
          expect(result.opening_day_monday).toBe("Monday");
          expect(result.opening_day_tuesday).toBe("Tuesday");
          expect(result.opening_day_wednesday).toBe("Wednesday");
          expect(result.opening_day_thursday).toBe("Thursday");
          expect(result.opening_day_friday).toBe("Friday");
          expect(result.opening_day_saturday).toBe("Saturday");
          expect(result.opening_day_sunday).toBe("Sunday");
          expect(result.opening_days_start).toBe("Every day");
          expect(result.open_some_days_summary_table).toBe("Every day");
        });
      });

      describe("given opening_days_start equals 'Some days' but every day is selected", () => {
        const someDays = {
          opening_days_start: "Some days",
          opening_day_monday: "Monday",
          opening_day_tuesday: "Tuesday",
          opening_day_wednesday: "Wednesday",
          opening_day_thursday: "Thursday",
          opening_day_friday: "Friday",
          opening_day_saturday: "Saturday",
          opening_day_sunday: "Sunday"
        };
        it("should set open_some_days_summary_table and opening_days_start to 'Every day' and each day to itself", () => {
          result = transformAnswersForSummary(someDays);
          expect(result.opening_day_monday).toBe("Monday");
          expect(result.opening_day_tuesday).toBe("Tuesday");
          expect(result.opening_day_wednesday).toBe("Wednesday");
          expect(result.opening_day_thursday).toBe("Thursday");
          expect(result.opening_day_friday).toBe("Friday");
          expect(result.opening_day_saturday).toBe("Saturday");
          expect(result.opening_day_sunday).toBe("Sunday");
          expect(result.opening_days_start).toBe("Every day");
          expect(result.open_some_days_summary_table).toBe("Every day");
        });
      });

      describe("given opening_days_start equals 'Some days'", () => {
        const someDays = {
          opening_days_start: "Some days",
          opening_day_monday: "Monday",
          opening_day_tuesday: "Tuesday"
        };
        it("should set each day passed through to itself and the rest to false", () => {
          result = transformAnswersForSummary(someDays);
          expect(result.opening_day_monday).toBe("Monday");
          expect(result.opening_day_tuesday).toBe("Tuesday");
          expect(result.opening_day_wednesday).toBe(false);
          expect(result.opening_day_thursday).toBe(false);
          expect(result.opening_day_friday).toBe(false);
          expect(result.opening_day_saturday).toBe(false);
          expect(result.opening_day_sunday).toBe(false);
          expect(result.opening_days_start).toBe("Some days");
        });
      });

      describe("given opening_days_start equals 'Irregular days'", () => {
        const irregularDays = {
          opening_days_start: "Irregular days",
          opening_days_irregular: "Christmas day"
        };
        it("should set all days to false and return opening_days_irregular unchanged", () => {
          result = transformAnswersForSummary(irregularDays);
          expect(result.opening_day_monday).toBe(false);
          expect(result.opening_day_tuesday).toBe(false);
          expect(result.opening_day_wednesday).toBe(false);
          expect(result.opening_day_thursday).toBe(false);
          expect(result.opening_day_friday).toBe(false);
          expect(result.opening_day_saturday).toBe(false);
          expect(result.opening_day_sunday).toBe(false);
          expect(result.opening_days_irregular).toBe("Christmas day");
        });
      });
    });

    describe("establishment_type", () => {
      describe("establishment_type is defined", () => {
        const establishmentType = {
          establishment_type: "COMMERCIAL"
        };
        it("should return the establishmentTypeEnum value", () => {
          result = transformAnswersForSummary(establishmentType);
          expect(result.establishment_type).toBe(
            establishmentTypeEnum.COMMERCIAL.value.en
          );
        });
      });

      describe("establishment_type is not defined", () => {
        const establishmentType = {};
        it("should return null for establishment_type", () => {
          result = transformAnswersForSummary(establishmentType);
          expect(result.establishment_type).toBe(null);
        });
      });
    });

    describe("water_supply", () => {
      describe("water_supply is defined", () => {
        const waterSupply = {
          water_supply: "PUBLIC"
        };
        it("should return the waterSupplyEnum value", () => {
          result = transformAnswersForSummary(waterSupply);
          expect(result.water_supply).toBe(waterSupplyEnum.PUBLIC.value.en);
        });
      });

      describe("water_supply is not defined", () => {
        const waterSupply = {};
        it("should return null for water_supply", () => {
          result = transformAnswersForSummary(waterSupply);
          expect(result.water_supply).toBe(null);
        });
      });
    });

    describe("partners", () => {
      describe("given partners and main_partnership_contact", () => {
        const partners = {
          partners: ["John", "Doe"],
          main_partnership_contact: "John"
        };
        it("should return them unchanged", () => {
          result = transformAnswersForSummary(partners);
          expect(result.partners).toStrictEqual(partners.partners);
          expect(result.main_partnership_contact).toBe(
            partners.main_partnership_contact
          );
        });
      });
    });
  });
});

describe("data-transform.service combineDate()", () => {
  let result;
  it("combines inputs into single string", () => {
    // Arrange
    const day = "29";
    const month = "03";
    const year = "1993";

    // Act
    result = combineDate(day, month, year);

    // Assert
    expect(result).toBe("1993-03-29");
  });
});

describe("data-transform.service separateBracketsFromBusinessType()", () => {
  let result;

  describe("given a valid input without brackets", () => {
    it("should return the original input text but without any excess spaces", () => {
      // Arrange
      const goodTypes = [
        "Butcher",
        "Fruit and vegetable farm",
        "Example with space at end  "
      ];
      //Act
      goodTypes.forEach((text) => {
        result = separateBracketsFromBusinessType(text);
        expect(result.business_type).toBe(text.trim());
        expect(result.business_type_search_term).toBe(undefined);
      });
    });
  });

  describe("given a valid input with brackets", () => {
    it("should return the input text but without the exact section contained in brackets", () => {
      //Act
      result = separateBracketsFromBusinessType(
        "Butcher (example search term with space after) "
      );
      expect(result.business_type).toBe("Butcher");
      expect(result.business_type_search_term).toBe(
        "Example search term with space after"
      );
    });
  });

  describe("given an invalid input", () => {
    it("should return the original input text but without any excess spaces", () => {
      // Arrange
      const badTypes = [
        "Butcher (valid up until here) but not here",
        "Fruit and vegetable farm (opening but no closing",
        "Brackets but invalid )("
      ];
      //Act
      badTypes.forEach((text) => {
        result = separateBracketsFromBusinessType(text);
        expect(result.business_type).toBe(text.trim());
        expect(result.business_type_search_term).toBe(undefined);
      });
    });
  });
});
