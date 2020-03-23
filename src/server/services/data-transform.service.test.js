import {
  transformAnswersForSubmit,
  transformAnswersForSummary,
  combineDate,
  separateBracketsFromBusinessType,
  trimUprn,
  trimAnswers
} from "./data-transform.service";

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

    describe("Given that business_type is part of cumulative answers", () => {
      const businessType = {
        business_type: "Example (test)"
      };
      it("should assign business_type and business_type_search_term to the result", () => {
        result = transformAnswersForSummary(businessType);
        expect(result.business_type).toBe("Example");
        expect(result.business_type_search_term).toBe("Test");
      });
    });

    describe("Given that supply_other and supply_directly are part of cumulative answers", () => {
      const supplyBoth = {
        supply_other: "True",
        supply_directly: "True"
      };
      it("Should return a customer_type value of 'End consumer and other businesses'", () => {
        result = transformAnswersForSummary(supplyBoth);
        expect(result.customer_type).toBe("End consumer and other businesses");
      });
    });

    describe("Given that monday to sunday are selected on open-some-days, are part of cumulative answers", () => {
      const someDays = {
        opening_day_monday: "True",
        opening_day_tuesday: "True",
        opening_day_wednesday: "True",
        opening_day_thursday: "True",
        opening_day_friday: "True",
        opening_day_saturday: "True",
        opening_day_sunday: "True"
      };
      it("Should return a open_some_days_summary_table value of 'Every day'", () => {
        result = transformAnswersForSummary(someDays);
        expect(result.open_some_days_summary_table).toBe("Every day");
      });
    });
    describe("Given that opening_days_start is selected on open-days-start", () => {
      const someDays = {
        opening_days_start: "Every day"
      };
      it("Should return a open_some_days_summary_table value of 'Every day'", () => {
        result = transformAnswersForSummary(someDays);
        expect(result.open_some_days_summary_table).toBe("Every day");
      });
    });

    describe("Given that only supply_other is part of cumulative answers", () => {
      const supplyDirectlyOnly = {
        supply_other: "True"
      };

      it("Should return a customer_type value of 'Other businesses'", () => {
        result = transformAnswersForSummary(supplyDirectlyOnly);
        expect(result.customer_type).toBe("Other businesses");
      });
    });

    describe("Given that only supply_directly is part of cumulative answers", () => {
      const supplyDirectlyOnly = {
        supply_directly: "True"
      };

      it("Should return a customer_type value of 'End consumer'", () => {
        result = transformAnswersForSummary(supplyDirectlyOnly);
        expect(result.customer_type).toBe("End consumer");
      });
    });

    describe("given the registration_role is not Representative and operator_type is not passed", () => {
      const registrationRoleOnly = {
        registration_role: "test",
        other_data: "example"
      };

      it("the transformed data contains a field called operator_type that equals the passed registration_role data", () => {
        result = transformAnswersForSummary(registrationRoleOnly);
        expect(result.operator_type).toEqual(
          registrationRoleOnly.registration_role
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
        operator_type: "test",
        other_data: "example"
      };

      it("the transformed data contains a field called operator_type that does not equal the passed registration_role data", () => {
        result = transformAnswersForSummary(registrationRoleAndOperatorType);
        expect(result.operator_type).not.toEqual(
          registrationRoleAndOperatorType.registration_role
        );
      });

      it("the transformed data does not contain a field called registration_role", () => {
        result = transformAnswersForSummary(registrationRoleAndOperatorType);
        expect(result.registration_role).toBe(undefined);
      });

      it("the transformed data contains a field called operator_type that does not equal the original operator_type data", () => {
        result = transformAnswersForSummary(registrationRoleAndOperatorType);
        expect(result.operator_type).not.toEqual(
          registrationRoleAndOperatorType.operator_type
        );
      });

      it("the transformed data contains a field called operator_type that contains the original text plus an additional representative description", () => {
        const operatorTypesArray = ["A person", "A charity", "A company"];

        operatorTypesArray.forEach(operatorType => {
          const data = {
            registration_role: "Representative",
            operator_type: operatorType,
            other_data: "example"
          };

          result = transformAnswersForSummary(data);

          expect(result.operator_type).toBe(
            `${operatorType} (registered by a representative)`
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
          operator_address_line_1: "Allies Computing Ltd",
          operator_address_line_2: "Fox Road",
          operator_address_line_3: "Framingham Pigot",
          operator_town: "Norwich",
          operator_postcode: "NR14 7PZ"
        };

        const cumulativeAnswersOpAddSelected = {
          operator_address_selected: "0"
        };

        it("uses addressLine1 instead of premise as operator_address_line_1", () => {
          const response = transformAnswersForSummary(
            cumulativeAnswersOpAddSelected,
            testAddressLookupsNoPremise
          );
          expect(response.operator_address_line_1).toBe(
            correctResponse.operator_address_line_1
          );
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
          establishment_address_line_1: "Example",
          establishment_address_line_2: "Fox Road",
          establishment_town: "Norwich",
          establishment_postcode: "NR14 7PZ"
        };

        const cumulativeAnswersEstAddSelected = {
          establishment_address_selected: "0"
        };

        it("uses addressLine1 instead of premise as establishment_address_line_1", () => {
          const response = transformAnswersForSummary(
            cumulativeAnswersEstAddSelected,
            testAddressLookupsNoPremise
          );
          expect(response.establishment_address_line_1).toBe(
            correctResponse.establishment_address_line_1
          );
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
          expect(
            transformAnswersForSummary(
              cumulativeAnswersOpAddSelected,
              testAddressLookups
            )
          ).toMatchObject(correctResponse);
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
            expect(
              transformAnswersForSummary(
                cumulativeAnswersOpAddSelectedWithManual,
                testAddressLookups
              )
            ).toMatchObject(manualAddressDataOnly);
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
          expect(
            transformAnswersForSummary(
              cumulativeAnswersEstAddSelected,
              testAddressLookups
            )
          ).toMatchObject(correctResponse);
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
            expect(
              transformAnswersForSummary(
                cumulativeAnswersEstAddSelectedWithManual,
                testAddressLookups
              )
            ).toMatchObject(manualAddressDataOnly);
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
            const response = transformAnswersForSummary(
              cumulativeAnswersEstAddSelected,
              testAddressLookupData
            );
            expect(response.operator_address_line_1).toBe(
              correctResponse.operator_address_line_1
            );
            expect(response.operator_address_line_2).toBe(
              correctResponse.operator_address_line_2
            );
            expect(response.operator_address_line_3).toBe(
              correctResponse.operator_address_line_3
            );
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
            const response = transformAnswersForSummary(
              cumulativeAnswersEstAddSelected,
              testAddressLookupData
            );
            expect(response.operator_address_line_1).toBe(
              correctResponse.operator_address_line_1
            );
            expect(response.operator_address_line_2).toBe(
              correctResponse.operator_address_line_2
            );
            expect(response.operator_address_line_3).toBe(
              correctResponse.operator_address_line_3
            );
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
            const response = transformAnswersForSummary(
              cumulativeAnswersEstAddSelected,
              testAddressLookupData
            );
            expect(response.operator_address_line_1).toBe(
              correctResponse.operator_address_line_1
            );
            expect(response.operator_address_line_2).toBe(
              correctResponse.operator_address_line_2
            );
            expect(response.operator_address_line_3).toBe(
              correctResponse.operator_address_line_3
            );
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
            const response = transformAnswersForSummary(
              cumulativeAnswersEstAddSelected,
              testAddressLookupData
            );
            expect(response.operator_address_line_1).toBe(
              correctResponse.operator_address_line_1
            );
            expect(response.operator_address_line_2).toBe(
              correctResponse.operator_address_line_2
            );
            expect(response.operator_address_line_3).toBe(
              correctResponse.operator_address_line_3
            );
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
            const response = transformAnswersForSummary(
              cumulativeAnswersEstAddSelected,
              testAddressLookupData
            );
            expect(response.establishment_address_line_1).toBe(
              correctResponse.establishment_address_line_1
            );
            expect(response.establishment_address_line_2).toBe(
              correctResponse.establishment_address_line_2
            );
            expect(response.establishment_address_line_3).toBe(
              correctResponse.establishment_address_line_3
            );
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
            const response = transformAnswersForSummary(
              cumulativeAnswersEstAddSelected,
              testAddressLookupData
            );
            expect(response.establishment_address_line_1).toBe(
              correctResponse.establishment_address_line_1
            );
            expect(response.establishment_address_line_2).toBe(
              correctResponse.establishment_address_line_2
            );
            expect(response.establishment_address_line_3).toBe(
              correctResponse.establishment_address_line_3
            );
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
          const response = transformAnswersForSummary(
            cumulativeAnswersEstAddSelected,
            testAddressLookupData
          );
          expect(response.establishment_address_line_1).toBe(
            correctResponse.establishment_address_line_1
          );
          expect(response.establishment_address_line_2).toBe(
            correctResponse.establishment_address_line_2
          );
          expect(response.establishment_address_line_3).toBe(
            correctResponse.establishment_address_line_3
          );
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
          const response = transformAnswersForSummary(
            cumulativeAnswersEstAddSelected,
            testAddressLookupData
          );
          expect(response.establishment_address_line_1).toBe(
            correctResponse.establishment_address_line_1
          );
          expect(response.establishment_address_line_2).toBe(
            correctResponse.establishment_address_line_2
          );
          expect(response.establishment_address_line_3).toBe(
            correctResponse.establishment_address_line_3
          );
        });
      });

      describe("Using the transformBusinessImportExport function", () => {
        let result;

        describe("Given that directly_import, directly_export and no_import_export are part of cumulative answers", () => {
          const cumulativeFullAnswers = {
            directly_import: "True",
            directly_export: "True",
            no_import_export: "True"
          };
          it("Should return a import_export_activities value of 'Directly import and Export'", () => {
            result = transformAnswersForSummary(cumulativeFullAnswers);
            expect(result.import_export_activities).toBe(
              "Directly import and export"
            );
          });
        });
        describe("Given that directly_import and directly_export are part of cumulative answers", () => {
          const cumulativeFullAnswers = {
            directly_import: "True",
            directly_export: "True"
          };
          it("Should return a import_export_activities value of 'Directly import and Export'", () => {
            result = transformAnswersForSummary(cumulativeFullAnswers);
            expect(result.import_export_activities).toBe(
              "Directly import and export"
            );
          });
        });
        describe("Given that directly_import and no_import_export are part of cumulative answers", () => {
          const cumulativeFullAnswers = {
            directly_import: "True",
            no_import_export: "True"
          };
          it("Should return a import_export_activities value of 'Directly import'", () => {
            result = transformAnswersForSummary(cumulativeFullAnswers);
            expect(result.import_export_activities).toBe("Directly import");
          });
        });
        describe("Given that directly_export and no_import_export are part of cumulative answers", () => {
          const cumulativeFullAnswers = {
            directly_export: "True",
            no_import_export: "True"
          };
          it("Should return a import_export_activities value of 'Directly export'", () => {
            result = transformAnswersForSummary(cumulativeFullAnswers);
            expect(result.import_export_activities).toBe("Directly export");
          });
        });
        describe("Given that only directly_export is part of cumulative answers", () => {
          const cumulativeFullAnswers = {
            directly_export: "True"
          };
          it("Should return a import_export_activities value of 'Directly export'", () => {
            result = transformAnswersForSummary(cumulativeFullAnswers);
            expect(result.import_export_activities).toBe("Directly export");
          });
        });
        describe("Given that only directly_import is part of cumulative answers", () => {
          const cumulativeFullAnswers = {
            directly_import: "True"
          };
          it("Should return a import_export_activities value of 'Directly import'", () => {
            result = transformAnswersForSummary(cumulativeFullAnswers);
            expect(result.import_export_activities).toBe("Directly import");
          });
        });
        describe("Given that only no_import_export is part of cumulative answers", () => {
          const cumulativeFullAnswers = {
            no_import_export: "True"
          };
          it("Should return a import_export_activities value of 'None'", () => {
            result = transformAnswersForSummary(cumulativeFullAnswers);
            expect(result.import_export_activities).toBe("None");
          });
        });
        describe("Given that somethig ohter than the allowed combinations of no_import_export, direct_import and direct_export is part of cumulative answers", () => {
          const cumulativeFullAnswers = {
            random: "True"
          };
          it("Should return a import_export_activities value of undefined", () => {
            result = transformAnswersForSummary(cumulativeFullAnswers);
            expect(result.import_export_activities).toBe(undefined);
          });
        });
      });
    });
  });
});

describe("data-transform.service trimUprn()", () => {
  it("Should return empty string when UPRN is not a string or is empty string", () => {
    const badText = [[], {}, null, undefined, ""];

    badText.forEach(text => {
      const result = trimUprn(text);
      expect(result).toBe("");
    });
  });

  it("Should return empty string when UPRN is completely invalid", () => {
    const badText = ["asdasd333333", "dsdfsdfs344", "%f", "--4"];

    badText.forEach(text => {
      const result = trimUprn(text);
      expect(result).toBe("");
    });
  });

  it("Should return UPRN trimmed of trailing non-numeric characters when present", () => {
    let result = trimUprn("12334sdfsd");
    expect(result).toBe("12334");
    result = trimUprn("1233456789-1");
    expect(result).toBe("1233456789");
    result = trimUprn("9999999%%%dd3");
    expect(result).toBe("9999999");
  });

  describe("Should return unaltered UPRN if already valid", () => {
    const valid = ["213456", "789456123", "9998887776"];

    valid.forEach(text => {
      const result = trimUprn(text);
      expect(result).toBe(text);
    });
  });
});

describe("data-transform.service transformAnswersForSubmit()", () => {
  let result;
  const testLcUrl = "some-council-url";

  const testCumulativeAnswers = {
    operator_first_name: "John",
    operator_last_name: "Appleseed",
    operator_primary_number: "01234 567890",
    operator_email: "john@appleseed.com",
    establishment_trading_name: "John's Apples",
    establishment_postcode: "SW12 9RQ",
    supply_directly: true,
    declaration1: "Declaration",
    business_type: "Example (test)",
    opening_days_start: "Every day",
    partners: ["John", "Doe"],
    main_partnership_contact: "John"
  };
  const testAddressLookups = {};

  it("turns flat data into structured data, with the Local Council URL", () => {
    result = transformAnswersForSubmit(
      testLcUrl,
      testCumulativeAnswers,
      testAddressLookups
    );
    expect(
      result.registration.establishment.operator.operator_first_name
    ).toBeDefined();

    expect(result.local_council_url).toBe("some-council-url");
  });
  describe("when opening_days_start is irregular days", () => {
    let result;
    const testLcUrl = "some-council-url";

    const testCumulativeAnswers = {
      opening_days_start: "Irregular days"
    };
    const testAddressLookups = {};

    it("it sets all the days to false", () => {
      result = transformAnswersForSubmit(
        testLcUrl,
        testCumulativeAnswers,
        testAddressLookups
      );
      expect(
        result.registration.establishment.activities.opening_day_monday
      ).toBe(false);
      expect(
        result.registration.establishment.activities.opening_day_tuesday
      ).toBe(false);
      expect(
        result.registration.establishment.activities.opening_day_wednesday
      ).toBe(false);
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
  describe("when opening_days_start is some days", () => {
    let result;
    const testLcUrl = "some-council-url";

    const testCumulativeAnswers = {
      opening_days_start: "Some days",
      opening_day_monday: "Monday",
      opening_day_sunday: "Sunday",
      opening_day_tuesday: "Tuesday",
      opening_day_wednesday: "Wednesday",
      opening_day_thursday: "Thursday",
      opening_day_friday: "Friday",
      opening_day_saturday: "Saturday"
    };
    const testAddressLookups = {};

    it("it sets all the days that exist to true", () => {
      result = transformAnswersForSubmit(
        testLcUrl,
        testCumulativeAnswers,
        testAddressLookups
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

  describe("when opening hours are empty strings", () => {
    let result;
    const testLcUrl = "some-council-url";

    const testCumulativeAnswers = {
      opening_hours_monday: "",
      opening_hours_tuesday: "",
      opening_hours_wednesday: "",
      opening_hours_thursday: "",
      opening_hours_friday: "",
      opening_hours_saturday: "",
      opening_hours_sunday: ""
    };
    const testAddressLookups = {};

    it("it sets them to undefined", () => {
      result = transformAnswersForSubmit(
        testLcUrl,
        testCumulativeAnswers,
        testAddressLookups
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
    let result;
    const testLcUrl = "some-council-url";

    const testCumulativeAnswers = {
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
        testLcUrl,
        testCumulativeAnswers,
        testAddressLookups
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

  describe("when opening_days_start is everyday ", () => {
    let result;
    const testLcUrl = "some-council-url";

    const testCumulativeAnswers = {
      opening_days_start: "Every day"
    };
    const testAddressLookups = {};

    it("it sets all the days to true", () => {
      result = transformAnswersForSubmit(
        testLcUrl,
        testCumulativeAnswers,
        testAddressLookups
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

  it("should only add the data fields it is given", () => {
    result = transformAnswersForSubmit(
      testLcUrl,
      testCumulativeAnswers,
      testAddressLookups
    );
    expect(
      result.registration.establishment.operator.operator_company_name
    ).not.toBeDefined();
  });

  it("should combine data using the summary function", () => {
    const testCumulativeAnswersDate = {
      day: "28",
      month: "03",
      year: "2018",
      operator_first_name: "John",
      operator_last_name: "Appleseed",
      operator_primary_number: "01234 567890",
      operator_email: "john@appleseed.com",
      establishment_trading_name: "John's Apples"
    };
    result = transformAnswersForSubmit(
      testLcUrl,
      testCumulativeAnswersDate,
      testAddressLookups
    );
    expect(
      result.registration.establishment.establishment_details
        .establishment_opening_date
    ).toBe("2018-03-28");
  });

  it("should set primary contact for partners", () => {
    result = transformAnswersForSubmit(
      testLcUrl,
      testCumulativeAnswers,
      testAddressLookups
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
      goodTypes.forEach(text => {
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
      badTypes.forEach(text => {
        result = separateBracketsFromBusinessType(text);
        expect(result.business_type).toBe(text.trim());
        expect(result.business_type_search_term).toBe(undefined);
      });
    });
  });
});
