const { validate } = require("./validation.service");
const {
  combineDate,
  separateBracketsFromBusinessType
} = require("./data-transform.service");
jest.mock("./data-transform.service");

separateBracketsFromBusinessType.mockImplementation(() => ({
  business_type: "Example",
  business_type_search_term: "test"
}));

describe("validator.service validate()", () => {
  describe("Given a correctly formatted input", () => {
    it("returns default errors object", () => {
      const result = validate("/declaration", {
        declaration1: "This is a truthy value",
        declaration2: "This is a truthy value",
        declaration3: "This is a truthy value"
      });
      expect(result).toEqual({ errors: {} });
    });
  });

  describe("Given an incorrectly formatted input", () => {
    it("returns a string for each key that was incorrect or missing", () => {
      const result = validate("/declaration", {
        declaration1: undefined
      });
      expect(typeof result.errors.declaration1).toBe("string");
      expect(typeof result.errors.declaration2).toBe("string");
      expect(typeof result.errors.declaration3).toBe("string");
    });
  });

  describe("When given a page that doesn't exist in the schema", () => {
    it("should return an error", () => {
      // Arrange
      const page = "/random-page";
      let result;
      // Act
      try {
        result = validate(page, {
          randomFields: "blah"
        });
      } catch (err) {
        result = err;
      }

      // Assert
      expect(result.message).toBe(
        "Could not find schema for page: /random-page"
      );
    });
  });

  describe("When given a page that doesn't need to be validated", () => {
    it("should do nothing", () => {
      // Arrange
      const page = "/index";

      // Act
      const result = validate(page, {
        randomFields: "blah"
      });

      // Assert
      expect(result).toEqual({ errors: {} });
    });
  });

  describe("When given the customer type page with invalid data", () => {
    it("should return the customer type error", () => {
      const result = validate("/customer-type", {
        supply_other: undefined,
        supply_directly: undefined
      });

      expect(result.errors.customer_type).toBe(
        "You must select a customer type before continuing"
      );
    });
  });

  describe("When given on the opening day some page with invalid data", () => {
    it("should return the opening day some error", () => {
      const result = validate("/opening-days-some", {
        opening_day_monday: undefined,
        opening_day_tuesday: undefined,
        opening_day_wednesday: undefined,
        opening_day_thursday: undefined,
        opening_day_friday: undefined,
        opening_day_saturday: undefined,
        opening_day_sunday: undefined
      });

      expect(result.errors.opening_days_some).toBe(
        "Please select which days this establishment is open"
      );
    });
  });

  describe("When given the business-import-export page with invalid data", () => {
    it("should return the business-import-export error when no option is selected", () => {
      const result = validate("/business-import-export", {
        directly_import: undefined,
        directly_export: undefined,
        no_import_export: undefined
      });

      expect(result.errors.import_export_activities).toBe(
        "You must select a valid import or export option(s) before continuing"
      );
    });
    it("should return the business-import-export error when contradicting options are selected", () => {
      const result = validate("/business-import-export", {
        directly_import: "Truthy value",
        directly_export: undefined,
        no_import_export: "Truthy value"
      });

      expect(result.errors.import_export_activities).toBe(
        "You must select a valid import or export option(s) before continuing"
      );
    });
    it("should not return an error if only 'no_import/export' option is selected", () => {
      const result = validate("/business-import-export", {
        directly_import: undefined,
        directly_export: undefined,
        no_import_export: "Truthy value"
      });

      expect(result.errors.import_export_activities).toBe(undefined);
    });
    it("should not return an error if one of 'directly import' or 'directly export' is selected", () => {
      const result_import_selected = validate("/business-import-export", {
        directly_import: "Truthy value",
        directly_export: undefined,
        no_import_export: undefined
      });
      const result_export_selected = validate("/business-import-export", {
        directly_import: undefined,
        directly_export: "Truthy value",
        no_import_export: undefined
      });

      expect(result_import_selected.errors.import_export_activities).toBe(
        undefined
      );
      expect(result_export_selected.errors.import_export_activities).toBe(
        undefined
      );
    });
    it("should not return an error if both 'directly import' and 'directly export' are selected", () => {
      const result = validate("/business-import-export", {
        directly_import: "Truthy value",
        directly_export: "Truthy value",
        no_import_export: undefined
      });

      expect(result.errors.import_export_activities).toBe(undefined);
    });
  });

  describe("When given an opening date page", () => {
    describe("proactive to validate", () => {
      it("should combine the date before validating", () => {
        validate("/establishment-opening-date-proactive", {
          day: "29",
          month: "03",
          year: "2018"
        });
        expect(combineDate).toHaveBeenCalled();
      });
    });

    describe("retroactive to validate", () => {
      it("should combine the date before validating", () => {
        validate("/establishment-opening-date-retroactive", {
          day: "29",
          month: "03",
          year: "2018"
        });
        expect(combineDate).toHaveBeenCalled();
      });
    });
  });

  describe("When given the business-type page", () => {
    it("should remove any brackets from valid input before validating", () => {
      validate("/business-type", {
        business_type: "Example (Test)"
      });
      expect(separateBracketsFromBusinessType).toHaveBeenCalled();
    });
  });

  describe("When given the opening hours page", () => {
    it("should filter out fields not requiring validation", () => {
      const result = validate("/opening-hours", {
        opening_hours_monday: "09:00-17:00",
        opening_hours_tuesday: undefined,
        opening_day_friday: "yes"
      });
      expect(result.errors.opening_hours_tuesday).toBe(
        "Invalid opening hours on Tuesday"
      );
      expect(Object.keys(result.errors).length).toBe(1);
    });
  });
});
