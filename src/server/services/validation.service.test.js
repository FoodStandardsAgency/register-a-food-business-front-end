jest.mock("./data-transform.service");
const { validate } = require("./validation.service");
const {
  combineDate,
  separateBracketsFromBusinessType,
  trimAnswers,
  transformBusinessTypeForSubmit
} = require("./data-transform.service");

separateBracketsFromBusinessType.mockImplementation(() => ({
  business_type: "Example",
  business_type_search_term: "test"
}));

transformBusinessTypeForSubmit.mockImplementation((businessType) =>
  businessType ? "001" : undefined
);

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
      expect(result.message).toBe("Could not find schema for page: /random-page");
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
    it("should return a error when business type is empty", () => {
      const result = validate("/business-type", {
        business_type: undefined
      });
      expect(result.errors.business_type).toBe("You must select a business type before continuing");
    });
    it("should not return a error when business type is populated", () => {
      const result = validate("/business-type", {
        business_type: "Example (Test)"
      });
      expect(result.errors.business_type).toBe(undefined);
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
        "Enter the establishment opening hours for Tuesday using 24 hour clocks"
      );
      expect(Object.keys(result.errors).length).toBe(1);
    });
    it("should not give error for correct opening hours", () => {
      const result = validate("/opening-hours", {
        opening_hours_monday: "09:00-17:00",
        opening_hours_tuesday: undefined,
        opening_day_friday: "yes"
      });
      expect(result.errors.opening_hours_monday).toBe(undefined);
    });
  });
  describe("When inputting a partners information", () => {
    it("should return an error when the parners name isnt included", () => {
      const result = validate("/partner-name", {
        partners: undefined
      });
      expect(result.errors.partners).toBe(
        "You have entered an invalid number of partners or a duplicate partner name. Please define between 2-5 partners, using initials or middle name to ensure that each entry is unique."
      );
    });
    it("should not return an error when partner name is correctly input", () => {
      const result = validate("/partner-name", {
        partners: "John Blogg",
        partners: "Jane Doe"
      });
      expect(result.errors.partner_name).toBe(undefined);
    });
    it("shoudld not return an error when main partnership contact is input correctly", () => {
      const result = validate("/partner-name", {
        main_partnership_contact: ""
      });
      expect(result.errors.main_partnership_contact).toBe(undefined);
    });
  });
  describe("When inputting a operational secondary number", () => {
    it("should return an error when operational secondary number is not input", () => {
      const result = validate("/operator-contact-details", {
        operator_secondary_number: undefined
      });
      expect(result.errors.operator_secondary_number).toBe("Enter a valid operator phone number");
    });
    it("should not return an error when operational secondary number is input", () => {
      const result = validate("/operator-contact-details", {
        operator_secondary_number: "0123456789"
      });
      expect(result.errors.operator_secondary_number).toBe(undefined);
    });
  });
  describe("When inputting a establishment information", () => {
    it("should return an error when establishment secondary number is not input", () => {
      const result = validate("/establishment-contact-details", {
        establishment_secondary_number: undefined
      });
      expect(result.errors.establishment_secondary_number).toBe(
        "Enter a valid establishment phone number"
      );
    });
    it("should not return an error when establishment secondary number is input", () => {
      const result = validate("/establishment-contact-details", {
        establishment_secondary_number: "0123456789"
      });
      expect(result.errors.establishment_secondary_number).toBe(undefined);
    });
    it("should not return an error when establishment web address is input", () => {
      const result = validate("/establishment-contact-details", {
        establishment_web_address: "test.com"
      });
      expect(result.errors.establishment_web_address).toBe(undefined);
    });
    it("should an error when establishment web address is incorect", () => {
      const result = validate("/establishment-contact-details", {
        establishment_web_address: "not a web address"
      });
      expect(result.errors.establishment_web_address).toBe(
        "Enter a valid establishment web address"
      );
    });
  });
  describe("When given the business other details page", () => {
    it("should not return an error when business other details is under 1500 chars", () => {
      const result = validate("/business-other-details", {
        business_other_details: "normal text"
      });
      expect(result.errors.business_other_details).toBe(undefined);
    });
    it("should return an error when business other details is over 1500 chars", () => {
      const result = validate("/business-other-details", {
        business_other_details: "s".repeat(1501)
      });
      expect(result.errors.business_other_details).toBe(
        "Your message is too long. Please shorten it to less than 1500 characters"
      );
    });
  });
});
