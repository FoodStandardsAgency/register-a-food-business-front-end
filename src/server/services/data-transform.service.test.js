import {
  transformAnswersForSubmit,
  transformAnswersForSummary,
  combineDate,
  separateBracketsFromBusinessType
} from "./data-transform.service";

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

    describe("Given that business_other_details is part of cumulative answers", () => {
      it("should return undefined when business_other_details is an empty string", () => {
        const businessOtherDetails = {
          business_other_details: "                "
        };
        result = transformAnswersForSummary(businessOtherDetails);
        expect(result.business_other_details).toBe(undefined);
      });

      it("should return original answer when not an empty string", () => {
        const businessOtherDetails = {
          business_other_details: "I make the best yum yums"
        };
        result = transformAnswersForSummary(businessOtherDetails);
        expect(result.business_other_details).toBe("I make the best yum yums");
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
            street: "Gibbet Hill Road",
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
          operator_first_line: "Allies Computing Ltd",
          operator_street: "Fox Road",
          operator_town: "Norwich",
          operator_postcode: "NR14 7PZ"
        };

        const cumulativeAnswersOpAddSelected = {
          operator_address_selected: "0"
        };

        it("uses addressLine1 instead of premise as operator_first_line", () => {
          const response = transformAnswersForSummary(
            cumulativeAnswersOpAddSelected,
            testAddressLookupsNoPremise
          );
          console.log(response);
          expect(response.operator_first_line).toBe(
            correctResponse.operator_first_line
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
          establishment_first_line: "Example",
          establishment_street: "Fox Road",
          establishment_town: "Norwich",
          establishment_postcode: "NR14 7PZ"
        };

        const cumulativeAnswersEstAddSelected = {
          establishment_address_selected: "0"
        };

        it("uses addressLine1 instead of premise as establishment_first_line", () => {
          const response = transformAnswersForSummary(
            cumulativeAnswersEstAddSelected,
            testAddressLookupsNoPremise
          );
          expect(response.establishment_first_line).toBe(
            correctResponse.establishment_first_line
          );
        });
      });

      describe("given operator_address_selected is in cumulativeAnswers with a value of 1", () => {
        const cumulativeAnswersOpAddSelected = {
          operator_address_selected: "1"
        };

        const correctResponse = {
          operator_first_line: "Room 36, Block 1 Arthur Vick",
          operator_street: "Gibbet Hill Road",
          operator_town: "Norwich",
          operator_postcode: "NR14 7PZ"
        };

        it("returns correctly formatted operator address fields that match the second entry in the address lookup results", () => {
          expect(
            transformAnswersForSummary(
              cumulativeAnswersOpAddSelected,
              testAddressLookups
            )
          ).toMatchObject(correctResponse);
        });

        describe("given that operator_first_line already exists (showing that the manual address page has been filled out)", () => {
          const cumulativeAnswersOpAddSelectedWithManual = {
            operator_address_selected: "1",
            operator_first_line: "Room 36, Block 1 Arthur Vick",
            operator_postcode: "NR14 7PZ"
          };

          const manualAddressDataOnly = {
            operator_first_line: "Room 36, Block 1 Arthur Vick",
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

      describe("given establishment_address_selected is in cumulativeAnswers with a value of 0", () => {
        const cumulativeAnswersEstAddSelected = {
          establishment_address_selected: "0"
        };

        const correctResponse = {
          establishment_first_line: "Example premise line",
          establishment_street: "Example street",
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

        describe("given that establishment_first_line already exists (showing that the manual address page has been filled out)", () => {
          const cumulativeAnswersEstAddSelectedWithManual = {
            establishment_address_selected: "0",
            establishment_first_line: "Example premise line",
            establishment_postcode: "AA11 1AA"
          };

          const manualAddressDataOnly = {
            establishment_first_line: "Example premise line",
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
    });
  });

  describe("Using the transformBusinessImportExport function", () => {
    let result;

    describe("Given that directly_import, directly_export and no_import_export are part of cumulative answers", () => {
      const cumulativeAnswers = {
        directly_import: "True",
        directly_export: "True",
        no_import_export: "True"
      };
      it("Should return a import_export_activities value of 'Directly import and Export'", () => {
        result = transformAnswersForSummary(cumulativeAnswers);
        expect(result.import_export_activities).toBe(
          "Directly import and export"
        );
      });
    });
    describe("Given that directly_import and directly_export are part of cumulative answers", () => {
      const cumulativeAnswers = {
        directly_import: "True",
        directly_export: "True"
      };
      it("Should return a import_export_activities value of 'Directly import and Export'", () => {
        result = transformAnswersForSummary(cumulativeAnswers);
        expect(result.import_export_activities).toBe(
          "Directly import and export"
        );
      });
    });
    describe("Given that directly_import and no_import_export are part of cumulative answers", () => {
      const cumulativeAnswers = {
        directly_import: "True",
        no_import_export: "True"
      };
      it("Should return a import_export_activities value of 'Directly import'", () => {
        result = transformAnswersForSummary(cumulativeAnswers);
        expect(result.import_export_activities).toBe("Directly import");
      });
    });
    describe("Given that directly_export and no_import_export are part of cumulative answers", () => {
      const cumulativeAnswers = {
        directly_export: "True",
        no_import_export: "True"
      };
      it("Should return a import_export_activities value of 'Directly export'", () => {
        result = transformAnswersForSummary(cumulativeAnswers);
        expect(result.import_export_activities).toBe("Directly export");
      });
    });
    describe("Given that only directly_export is part of cumulative answers", () => {
      const cumulativeAnswers = {
        directly_export: "True"
      };
      it("Should return a import_export_activities value of 'Directly export'", () => {
        result = transformAnswersForSummary(cumulativeAnswers);
        expect(result.import_export_activities).toBe("Directly export");
      });
    });
    describe("Given that only directly_import is part of cumulative answers", () => {
      const cumulativeAnswers = {
        directly_import: "True"
      };
      it("Should return a import_export_activities value of 'Directly import'", () => {
        result = transformAnswersForSummary(cumulativeAnswers);
        expect(result.import_export_activities).toBe("Directly import");
      });
    });
    describe("Given that only no_import_export is part of cumulative answers", () => {
      const cumulativeAnswers = {
        no_import_export: "True"
      };
      it("Should return a import_export_activities value of 'None'", () => {
        result = transformAnswersForSummary(cumulativeAnswers);
        expect(result.import_export_activities).toBe("None");
      });
    });
    describe("Given that somethig ohter than the allowed combinations of no_import_export, direct_import and direct_export is part of cumulative answers", () => {
      const cumulativeAnswers = {
        random: "True"
      };
      it("Should return a import_export_activities value of undefined", () => {
        result = transformAnswersForSummary(cumulativeAnswers);
        expect(result.import_export_activities).toBe(undefined);
      });
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
    business_type: "Example (test)"
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
