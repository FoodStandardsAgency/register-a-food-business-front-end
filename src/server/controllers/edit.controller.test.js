const editController = require("./edit.controller");

let result;

const testPath = {
  "/test-page1": {
    on: true,
    switches: {}
  },
  "/registration-role": {
    on: true,
    switches: {
      "Sole trader": {
        "/operator-name": true
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
  "/business-import-export": {
    on: true,
    switches: {}
  }
};

describe("Edit controller", () => {
  describe("given valid input", () => {
    describe("regardless of whether there are validation errors", () => {
      describe("given the current page has text input fields, with valid answers plus whitespace", () => {
        beforeEach(() => {
          const editModeFirstPage = "/operator-name";
          const currentPage = "/operator-name";
          const cumulativeFullAnswers = {
            example_answer: "value"
          };
          const cumulativeEditAnswers = {
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
            switches
          ];
          result = editController(...args);
        });

        it("should return a combination of the previous and new answers with trimmed whitespace", () => {
          const expectedAnswers = {
            example_answer: "value",
            operator_first_name: "Bob Harry",
            operator_last_name: "Smith"
          };
          expect(result.cumulativeEditAnswers).toEqual(expectedAnswers);
        });
      });

      describe("given the current page has checkboxes, one of which was originally checked but now is not", () => {
        beforeEach(() => {
          const editModeFirstPage = "/business-import-export";
          const currentPage = "/business-import-export";
          const cumulativeFullAnswers = {
            directly_import: "Directly import"
          };
          const cumulativeEditAnswers = {};
          const newAnswers = {
            directly_export: "Directly export"
          };
          const switches = {};

          const args = [
            testPath,
            editModeFirstPage,
            currentPage,
            cumulativeFullAnswers,
            cumulativeEditAnswers,
            newAnswers,
            switches
          ];
          result = editController(...args);
        });

        it("should not return the answers that were previously truthy and are now removed", () => {
          const expectedAnswers = {
            directly_export: "Directly export"
          };
          expect(result.cumulativeEditAnswers).toEqual(expectedAnswers);
        });
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
          switches
        ];
        result = editController(...args);
      });

      it("should return the validation errors", () => {
        expect(Object.keys(result.validatorErrors).length > 0).toBe(true);
      });

      it("should return the redirect route as the current page", () => {
        expect(result.redirectRoute).toBe("/registration-role");
      });
    });

    describe("given that there are NOT validation errors", () => {
      describe("given that the current page is at the end of the edit route", () => {
        beforeEach(() => {
          const editModeFirstPage = "/registration-role";
          const currentPage = "/operator-name";
          const cumulativeFullAnswers = {
            registration_role: "Sole trader"
          };
          const cumulativeEditAnswers = {
            registration_role: "Sole trader"
          };
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
            switches
          ];
          result = editController(...args);
        });

        it("should not return any validation errors", () => {
          expect(Object.keys(result.validatorErrors).length).toBe(0);
        });

        it("should redirect to registration-summary", () => {
          expect(result.redirectRoute).toBe("/registration-summary");
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
            operator_company_house_number: "AA123456"
          };
          const switches = {};

          const args = [
            testPath,
            editModeFirstPage,
            currentPage,
            cumulativeFullAnswers,
            cumulativeEditAnswers,
            newAnswers,
            switches
          ];
          result = editController(...args);
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

  // describe("given invalid input", () => {
  //   const invalidInputs = [
  //     [undefined, {}, { "/index": false }, true, "string"], // invalid paths
  //     [undefined, {}, "not-a-valid-page"], // invalid pages
  //     [undefined, "string", true], // invalid previous answers
  //     [undefined, "string", true], // invalid new answers
  //     [undefined, "string", true] // invalid switches
  //   ];

  //   it("should throw an error", () => {
  //     invalidInputs.forEach(possibleInputsForArg => {
  //       possibleInputsForArg.forEach(inputValue => {
  //         const args = [] // TODO JMB
  //         try {
  //           result = editController(...args);
  //         } catch (err) {
  //           result = err;
  //         }
  //         expect(result instanceof Error).toBe(true);
  //       });
  //     });
  //   });
  // });
});
