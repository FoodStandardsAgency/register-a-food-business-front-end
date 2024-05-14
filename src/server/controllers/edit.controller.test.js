const { operatorTypeEnum } = require("@slice-and-dice/register-a-food-business-validation");
const editController = require("./edit.controller");

const testPath = {
  "/test-page1": {
    on: true,
    switches: {}
  },
  "/registration-role": {
    on: true,
    switches: {
      SOLETRADER: {
        "/operator-name": true,
        "/test-page2": true
      },
      Representative: {
        "/operator-type": true
      }
    }
  },
  "/operator-name": {
    on: false,
    switches: {}
  },
  "/operator-type": {
    on: false,
    switches: {
      "A charity": { "/operator-charity-details": true },
      "A company": {
        "/operator-company-details": true,
        "/contact-representative": true
      }
    }
  },
  "/test-page2": {
    on: true,
    switches: {}
  },
  "/opening-days-some": {
    on: true,
    switches: {
      opening_day_saturday: {
        "/test-page3": true
      }
    }
  },
  "/operator-charity-details": {
    on: false,
    switches: {}
  },
  "/operator-company-details": {
    on: false,
    switches: {}
  },
  "/contact-representative": {
    on: false,
    switches: {}
  },
  "/test-page3": {
    on: false,
    switches: {}
  }
};

describe("Edit controller: editContinue()", () => {
  let result;

  describe("given valid input", () => {
    describe("regardless of whether there are validation errors", () => {
      describe("given the current page has text input fields, with valid answers plus whitespace", () => {
        beforeEach(() => {
          const editModeFirstPage = "/registration-role";
          const currentPage = "/operator-name";
          const cumulativeFullAnswers = {
            registration_role: operatorTypeEnum.SOLETRADER.key,
            example_answer: "value"
          };
          const cumulativeEditAnswers = {
            registration_role: operatorTypeEnum.SOLETRADER.key,
            example_answer: "value"
          };
          const newAnswers = {
            operator_first_name: "Bob Harry ",
            operator_last_name: "  Smith "
          };
          const switches = {};

          const args = [
            testPath,
            editModeFirstPage,
            currentPage,
            cumulativeFullAnswers,
            cumulativeEditAnswers,
            newAnswers,
            switches,
            {}
          ];
          result = editController.editContinue(...args);
        });

        it("should return a combination of the previous and new answers with trimmed whitespace", () => {
          const expectedAnswers = {
            registration_role: operatorTypeEnum.SOLETRADER.key,
            example_answer: "value",
            operator_first_name: "Bob Harry",
            operator_last_name: "Smith"
          };
          expect(result.cumulativeEditAnswers).toEqual(expectedAnswers);
        });
      });
    });

    describe("given the current page has checkboxes, one of which was originally checked but now is not", () => {
      beforeEach(() => {
        const editModeFirstPage = "/opening-days-some";
        const currentPage = "/opening-days-some";
        const cumulativeFullAnswers = {
          opening_day_monday: "opening_day_monday"
        };
        const cumulativeEditAnswers = undefined;
        const newAnswers = {
          opening_day_saturday: "opening_day_saturday"
        };
        const switches = {};

        const args = [
          testPath,
          editModeFirstPage,
          currentPage,
          cumulativeFullAnswers,
          cumulativeEditAnswers,
          newAnswers,
          switches,
          {}
        ];
        result = editController.editContinue(...args);
      });

      it("should not return the answers that were previously truthy and are now removed", () => {
        const expectedAnswers = {
          opening_day_saturday: "opening_day_saturday"
        };
        expect(result.cumulativeEditAnswers).toEqual(expectedAnswers);
      });
    });

    describe("given that there are validation errors", () => {
      beforeEach(() => {
        const editModeFirstPage = "/registration-role";
        const currentPage = "/registration-role";
        const cumulativeFullAnswers = {};
        const cumulativeEditAnswers = {};
        const newAnswers = {};
        const switches = {};

        const args = [
          testPath,
          editModeFirstPage,
          currentPage,
          cumulativeFullAnswers,
          cumulativeEditAnswers,
          newAnswers,
          switches,
          {}
        ];
        result = editController.editContinue(...args);
      });

      it("should return the validation errors", () => {
        expect(Object.keys(result.validatorErrors).length > 0).toBe(true);
      });

      it("should return the redirect route as the current page", () => {
        expect(result.redirectRoute).toBe("/registration-role");
      });
    });

    describe("given that there are NOT validation errors", () => {
      describe("given that the path has changed", () => {
        beforeEach(() => {
          const editModeFirstPage = "/registration-role";
          const currentPage = "/registration-role";
          const cumulativeFullAnswers = {
            example_answer: "value",
            registration_role: "Representative",
            operator_type: "A charity"
          };
          const cumulativeEditAnswers = {
            registration_role: "Representative",
            operator_type: "A charity"
          };
          const newAnswers = {
            registration_role: operatorTypeEnum.SOLETRADER.key
          };
          const switches = {};

          const args = [
            testPath,
            editModeFirstPage,
            currentPage,
            cumulativeFullAnswers,
            cumulativeEditAnswers,
            newAnswers,
            switches,
            {}
          ];
          result = editController.editContinue(...args);
        });

        it("should not return FULL answers that are associated with inactive pages on the path", () => {
          const expectedFullAnswers = {
            example_answer: "value",
            registration_role: operatorTypeEnum.SOLETRADER.key
          };
          expect(result.cumulativeFullAnswers).toEqual(expectedFullAnswers);
        });

        it("should not return EDIT answers that are associated with inactive pages on the path", () => {
          const expectedEditAnswers = {
            registration_role: operatorTypeEnum.SOLETRADER.key
          };
          expect(result.cumulativeEditAnswers).toEqual(expectedEditAnswers);
        });
      });

      describe("given that the current page is at the end of the edit route", () => {
        beforeEach(() => {
          const editModeFirstPage = "/operator-name";
          const currentPage = "/operator-name";
          const cumulativeFullAnswers = {};
          const cumulativeEditAnswers = {};
          const newAnswers = {
            operator_first_name: "John",
            operator_last_name: "McNugget"
          };
          const switches = {};

          const args = [
            testPath,
            editModeFirstPage,
            currentPage,
            cumulativeFullAnswers,
            cumulativeEditAnswers,
            newAnswers,
            switches,
            {}
          ];
          result = editController.editContinue(...args);
        });

        it("should not return any validation errors", () => {
          expect(Object.keys(result.validatorErrors).length).toBe(0);
        });

        it("should redirect to registration-summary", () => {
          expect(result.redirectRoute).toBe("/registration-summary");
        });

        it("should return an empty cumulativeEditAnswers object", () => {
          expect(result.cumulativeEditAnswers).toEqual({});
        });
      });

      describe("given that the current page is NOT at the end of the edit route", () => {
        beforeEach(() => {
          const editModeFirstPage = "/registration-role";
          const currentPage = "/operator-company-details";
          const cumulativeFullAnswers = {
            registration_role: "Representative",
            operator_type: "A company"
          };
          const cumulativeEditAnswers = {
            registration_role: "Representative",
            operator_type: "A company"
          };
          const newAnswers = {
            operator_company_name: "Nugget Co",
            operator_companies_house_number: "AA123456"
          };
          const switches = {};

          const args = [
            testPath,
            editModeFirstPage,
            currentPage,
            cumulativeFullAnswers,
            cumulativeEditAnswers,
            newAnswers,
            switches,
            {}
          ];
          result = editController.editContinue(...args);
        });

        it("should not return any validation errors", () => {
          expect(Object.keys(result.validatorErrors).length).toBe(0);
        });

        it("should redirect to the next page in the edit route", () => {
          expect(result.redirectRoute).toBe("/contact-representative");
        });
      });
    });
  });
});

describe("Edit controller: editBack()", () => {
  let result;

  describe("given valid input", () => {
    beforeEach(() => {
      const editModeFirstPage = "/registration-role";
      const currentPage = "/operator-company-details";
      const cumulativeFullAnswers = {
        registration_role: "Representative",
        operator_type: "A company"
      };
      const cumulativeEditAnswers = {
        registration_role: "Representative",
        operator_type: "A company"
      };
      const args = [
        testPath,
        editModeFirstPage,
        currentPage,
        cumulativeFullAnswers,
        cumulativeEditAnswers
      ];

      result = editController.editBack(...args);
    });

    it("should return the previous page", () => {
      expect(result).toBe("/operator-type");
    });
  });
});
