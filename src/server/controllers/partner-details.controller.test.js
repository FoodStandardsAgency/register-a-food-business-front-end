jest.mock("../services/validation.service");
jest.mock("../services/logging.service");
jest.mock("../config");

const { validate } = require("../services/validation.service");
const {
  partnerDetailsSave,
  partnerDetailsContinue,
  partnerDetailsDelete
} = require("./partner-details.controller");

const currentPage = "/current";
const council = "cardiff";
let editMode;

describe("Partner-details controller: partnerDetailsSave()", () => {
  describe("Without edit mode", () => {
    beforeEach(() => {
      editMode = false;
    });
    describe("When given valid submission data on save adding new partner", () => {
      let response;
      beforeEach(async () => {
        validate.mockImplementation(() => ({
          errors: {}
        }));

        try {
          response = await partnerDetailsSave(
            currentPage,
            { partners: ["partner one"] },
            { partner_name: "partner two" },
            council,
            editMode
          );
        } catch (err) {
          response = err;
        }
      });

      it("Should set redirectRoute back to partner-name", () => {
        expect(response.redirectRoute).toBe("/new/cardiff/partner-name");
      });
      it("Should return cumulativeFullAnswers including the previous answers and the new partner", () => {
        expect(response.cumulativeFullAnswers).toEqual({
          partners: ["partner one", "partner two"]
        });
      });

      it("Should return empty validatorErrors", () => {
        expect(response.validatorErrors).toEqual({});
      });
    });
    describe("When given valid submission data on save changing existing partner", () => {
      let response;
      beforeEach(async () => {
        validate.mockImplementation(() => ({
          errors: {}
        }));

        try {
          response = await partnerDetailsSave(
            currentPage,
            { partners: ["partner one", "partner two"] },
            { partner_name: "partner new name", index: 0 },
            council,
            editMode
          );
        } catch (err) {
          response = err;
        }
      });

      it("Should set redirectRoute back to partner-name", () => {
        expect(response.redirectRoute).toBe("/new/cardiff/partner-name");
      });
      it("Should return cumulativeFullAnswers including the previous answers and the new partner", () => {
        expect(response.cumulativeFullAnswers).toEqual({
          partners: ["partner new name", "partner two"]
        });
      });

      it("Should return empty validatorErrors", () => {
        expect(response.validatorErrors).toEqual({});
      });
    });

    describe("When given too many partners on save", () => {
      let response;
      beforeEach(async () => {
        validate.mockImplementation(() => ({
          errors: {}
        }));

        try {
          response = await partnerDetailsSave(
            currentPage,
            {
              partners: [
                "partner 1",
                "partner 2",
                "partner 3",
                "partner 4",
                "partner 5"
              ]
            },
            { partner_name: "partner 6" },
            council,
            editMode
          );
        } catch (err) {
          response = err;
        }
      });

      it("Should set redirectRoute back to partner-name", () => {
        expect(response.redirectRoute).toBe("/new/cardiff/partner-name");
      });
      it("Should return cumulativeFullAnswers including the previous answers without the new partner", () => {
        expect(response.cumulativeFullAnswers).toEqual({
          partners: [
            "partner 1",
            "partner 2",
            "partner 3",
            "partner 4",
            "partner 5"
          ]
        });
      });

      it("Should return empty validatorErrors", () => {
        expect(response.validatorErrors).toEqual({});
      });
    });

    describe("When given invalid submission data on save", () => {
      let response;
      beforeEach(async () => {
        validate.mockImplementation(() => ({
          errors: { example: "error" }
        }));

        try {
          response = await partnerDetailsSave(
            currentPage,
            { partners: ["partner one"] },
            { targetPartner: null },
            council,
            editMode
          );
        } catch (err) {
          response = err;
        }
      });

      it("Should set redirectRoute back to the same page", () => {
        expect(response.redirectRoute).toBe("/partnership/current");
      });

      it("Should return non empty validatorErrors", () => {
        expect(response.validatorErrors).toEqual({ example: "error" });
      });

      it("Should return cumulativeFullAnswers", () => {
        expect(response.cumulativeFullAnswers).toEqual({
          partners: ["partner one"]
        });
      });
    });
    describe("When given invalid submission data on update", () => {
      let response;
      beforeEach(async () => {
        validate.mockImplementation(() => ({
          errors: { example: "error" }
        }));

        try {
          response = await partnerDetailsSave(
            currentPage,
            { partners: ["partner one"] },
            { partner_name: "", index: 0 },
            council,
            editMode
          );
        } catch (err) {
          response = err;
        }
      });

      it("Should set redirectRoute back to the same page", () => {
        expect(response.redirectRoute).toBe("/partnership/current?id=0");
      });

      it("Should return non empty validatorErrors", () => {
        expect(response.validatorErrors).toEqual({ example: "error" });
      });

      it("Should return cumulativeFullAnswers", () => {
        expect(response.cumulativeFullAnswers).toEqual({
          partners: ["partner one"]
        });
      });
    });
    describe("When given valid submission data with extra whitespace on save adding new partner", () => {
      let response;
      beforeEach(async () => {
        validate.mockImplementation(() => ({
          errors: {}
        }));

        try {
          response = await partnerDetailsSave(
            currentPage,
            { partners: ["partner one"] },
            { partner_name: "  partner two  " },
            council,
            editMode
          );
        } catch (err) {
          response = err;
        }
      });

      it("Should set redirectRoute back to partner-name", () => {
        expect(response.redirectRoute).toBe("/new/cardiff/partner-name");
      });
      it("Should return cumulativeFullAnswers including the previous answers and the new partner without additional whitespace", () => {
        expect(response.cumulativeFullAnswers).toEqual({
          partners: ["partner one", "partner two"]
        });
      });

      it("Should return empty validatorErrors", () => {
        expect(response.validatorErrors).toEqual({});
      });
    });

    describe("Given a service thrown an error", () => {
      let response;
      beforeEach(async () => {
        validate.mockImplementation(() => {
          throw new Error("Some error");
        });

        try {
          response = await partnerDetailsSave(
            currentPage,
            { partners: ["partner one"] },
            { partner_name: "partner two" },
            council,
            editMode
          );
        } catch (err) {
          response = err;
        }
      });

      it("Should throw the error", () => {
        expect(response.message).toBe("Some error");
      });
    });
  });

  describe("In edit mode", () => {
    beforeEach(() => {
      editMode = true;
    });

    describe("When given valid submission data on save adding new partner", () => {
      let response;
      beforeEach(async () => {
        validate.mockImplementation(() => ({
          errors: {}
        }));

        try {
          response = await partnerDetailsSave(
            currentPage,
            { partners: ["partner one"] },
            { partner_name: "partner two" },
            council,
            editMode
          );
        } catch (err) {
          response = err;
        }
      });

      it("Should set redirectRoute back to partner-name in edit mode", () => {
        expect(response.redirectRoute).toBe(
          "/new/cardiff/partner-name?edit=partner-name"
        );
      });
      it("Should return cumulativeFullAnswers including the previous answers and the new partner", () => {
        expect(response.cumulativeFullAnswers).toEqual({
          partners: ["partner one", "partner two"]
        });
      });

      it("Should return empty validatorErrors", () => {
        expect(response.validatorErrors).toEqual({});
      });
    });
    describe("When given valid submission data on save changing existing partner", () => {
      let response;
      beforeEach(async () => {
        validate.mockImplementation(() => ({
          errors: {}
        }));

        try {
          response = await partnerDetailsSave(
            currentPage,
            { partners: ["partner one", "partner two"] },
            { partner_name: "partner new name", index: 0 },
            council,
            editMode
          );
        } catch (err) {
          response = err;
        }
      });

      it("Should set redirectRoute back to partner-name in edit mode", () => {
        expect(response.redirectRoute).toBe(
          "/new/cardiff/partner-name?edit=partner-name"
        );
      });
      it("Should return cumulativeFullAnswers including the previous answers and the new partner", () => {
        expect(response.cumulativeFullAnswers).toEqual({
          partners: ["partner new name", "partner two"]
        });
      });

      it("Should return empty validatorErrors", () => {
        expect(response.validatorErrors).toEqual({});
      });
    });

    describe("When given too many partners on save", () => {
      let response;
      beforeEach(async () => {
        validate.mockImplementation(() => ({
          errors: {}
        }));

        try {
          response = await partnerDetailsSave(
            currentPage,
            {
              partners: [
                "partner 1",
                "partner 2",
                "partner 3",
                "partner 4",
                "partner 5"
              ]
            },
            { partner_name: "partner 6" },
            council,
            editMode
          );
        } catch (err) {
          response = err;
        }
      });

      it("Should set redirectRoute back to partner-name in edit mode", () => {
        expect(response.redirectRoute).toBe(
          "/new/cardiff/partner-name?edit=partner-name"
        );
      });
      it("Should return cumulativeFullAnswers including the previous answers without the new partner", () => {
        expect(response.cumulativeFullAnswers).toEqual({
          partners: [
            "partner 1",
            "partner 2",
            "partner 3",
            "partner 4",
            "partner 5"
          ]
        });
      });

      it("Should return empty validatorErrors", () => {
        expect(response.validatorErrors).toEqual({});
      });
    });

    describe("When given invalid submission data on save", () => {
      let response;
      beforeEach(async () => {
        validate.mockImplementation(() => ({
          errors: { example: "error" }
        }));

        try {
          response = await partnerDetailsSave(
            currentPage,
            { partners: ["partner one"] },
            { targetPartner: null },
            council,
            editMode
          );
        } catch (err) {
          response = err;
        }
      });

      it("Should set redirectRoute back to the same page in edit mode", () => {
        expect(response.redirectRoute).toBe(
          "/partnership/current?edit=partner-name"
        );
      });

      it("Should return non empty validatorErrors", () => {
        expect(response.validatorErrors).toEqual({ example: "error" });
      });

      it("Should return cumulativeFullAnswers", () => {
        expect(response.cumulativeFullAnswers).toEqual({
          partners: ["partner one"]
        });
      });
    });

    describe("When given invalid submission data on update", () => {
      let response;
      beforeEach(async () => {
        validate.mockImplementation(() => ({
          errors: { example: "error" }
        }));

        try {
          response = await partnerDetailsSave(
            currentPage,
            { partners: ["partner one"] },
            { partner_name: "", index: 0 },
            council,
            editMode
          );
        } catch (err) {
          response = err;
        }
      });

      it("Should set redirectRoute back to the same page", () => {
        expect(response.redirectRoute).toBe(
          "/partnership/current?id=0&edit=partner-name"
        );
      });

      it("Should return non empty validatorErrors", () => {
        expect(response.validatorErrors).toEqual({ example: "error" });
      });

      it("Should return cumulativeFullAnswers", () => {
        expect(response.cumulativeFullAnswers).toEqual({
          partners: ["partner one"]
        });
      });
    });

    describe("Given a service thrown an error", () => {
      let response;
      beforeEach(async () => {
        validate.mockImplementation(() => {
          throw new Error("Some error");
        });

        try {
          response = await partnerDetailsSave(
            currentPage,
            { partners: ["partner one"] },
            { partner_name: "partner two" },
            council,
            editMode
          );
        } catch (err) {
          response = err;
        }
      });

      it("Should throw the error", () => {
        expect(response.message).toBe("Some error");
      });
    });
  });
});

describe("Partner-details controller: partnerDetailsDelete()", () => {
  describe("Without edit mode", () => {
    beforeEach(() => {
      editMode = false;
    });

    describe("When given valid submission data on delete", () => {
      let response;
      beforeEach(async () => {
        validate.mockImplementation(() => ({
          errors: {}
        }));

        try {
          response = await partnerDetailsDelete(
            {
              partners: ["partner one", "partner two", "partner three"]
            },
            { index: 1 },
            council,
            editMode
          );
        } catch (err) {
          response = err;
        }
      });

      it("Should set redirectRoute to partner-name page", () => {
        expect(response.redirectRoute).toBe("/new/cardiff/partner-name");
      });
      it("Should return cumulativeFullAnswers including the previous answers without the deleted partner", () => {
        expect(response.cumulativeFullAnswers).toEqual({
          partners: ["partner one", "partner three"]
        });
      });
    });

    describe("When given invalid index data on delete", () => {
      let response;
      beforeEach(async () => {
        validate.mockImplementation(() => ({
          errors: {}
        }));

        try {
          response = await partnerDetailsDelete(
            {
              partners: ["partner one", "partner two", "partner three"]
            },
            { index: -1 },
            council,
            editMode
          );
        } catch (err) {
          response = err;
        }
      });

      it("Should set redirectRoute to partner-name page", () => {
        expect(response.redirectRoute).toBe("/new/cardiff/partner-name");
      });
      it("Should return cumulativeFullAnswers including the previous answers wwith no changes", () => {
        expect(response.cumulativeFullAnswers).toEqual({
          partners: ["partner one", "partner two", "partner three"]
        });
      });

      it("Should return empty validatorErrors", () => {
        expect(response.validatorErrors).toEqual({});
      });
    });

    describe("When given invalid array data on delete", () => {
      let response;
      beforeEach(async () => {
        try {
          response = await partnerDetailsDelete(
            { partners: [] },
            { index: 0 },
            council,
            editMode
          );
        } catch (err) {
          response = err;
        }
      });

      it("Should set redirectRoute to partner-name page", () => {
        expect(response.redirectRoute).toBe("/new/cardiff/partner-name");
      });
      it("Should return cumulativeFullAnswers still with the empty array", () => {
        expect(response.cumulativeFullAnswers).toEqual({
          partners: []
        });
      });

      it("Should return empty validatorErrors", () => {
        expect(response.validatorErrors).toEqual({});
      });
    });

    describe("When partners array is not defined", () => {
      let errorThrown = false;
      beforeEach(async () => {
        try {
          await partnerDetailsDelete({}, { index: 0 }, council, editMode);
        } catch (err) {
          errorThrown = true;
        }
      });

      it("Should throw error", () => {
        expect(errorThrown).toBe(true);
      });
    });
  });
  describe("In edit mode", () => {
    beforeEach(() => {
      editMode = true;
    });
    describe("When given valid submission data on delete", () => {
      let response;
      beforeEach(async () => {
        validate.mockImplementation(() => ({
          errors: {}
        }));

        try {
          response = await partnerDetailsDelete(
            {
              partners: ["partner one", "partner two", "partner three"]
            },
            { index: 1 },
            council,
            editMode
          );
        } catch (err) {
          response = err;
        }
      });

      it("Should set redirectRoute to partner-name in edit mode", () => {
        expect(response.redirectRoute).toBe(
          "/new/cardiff/partner-name?edit=partner-name"
        );
      });
      it("Should return cumulativeFullAnswers including the previous answers without the deleted partner", () => {
        expect(response.cumulativeFullAnswers).toEqual({
          partners: ["partner one", "partner three"]
        });
      });
    });

    describe("When given invalid index data on delete", () => {
      let response;
      beforeEach(async () => {
        validate.mockImplementation(() => ({
          errors: {}
        }));

        try {
          response = await partnerDetailsDelete(
            {
              partners: ["partner one", "partner two", "partner three"]
            },
            { index: -1 },
            council,
            editMode
          );
        } catch (err) {
          response = err;
        }
      });

      it("Should set redirectRoute to partner-name page in edit mode", () => {
        expect(response.redirectRoute).toBe(
          "/new/cardiff/partner-name?edit=partner-name"
        );
      });
      it("Should return cumulativeFullAnswers including the previous answers with no changes", () => {
        expect(response.cumulativeFullAnswers).toEqual({
          partners: ["partner one", "partner two", "partner three"]
        });
      });

      it("Should return empty validatorErrors", () => {
        expect(response.validatorErrors).toEqual({});
      });
    });

    describe("When given invalid array data on delete", () => {
      let response;
      beforeEach(async () => {
        validate.mockImplementation(() => ({
          errors: {}
        }));

        try {
          response = await partnerDetailsDelete(
            { partners: [] },
            { index: 0 },
            council,
            editMode
          );
        } catch (err) {
          response = err;
        }
      });

      it("Should set redirectRoute to the partner-name page in edit mode", () => {
        expect(response.redirectRoute).toBe(
          "/new/cardiff/partner-name?edit=partner-name"
        );
      });
      it("Should return cumulativeFullAnswers still with the empty array", () => {
        expect(response.cumulativeFullAnswers).toEqual({
          partners: []
        });
      });

      it("Should return empty validatorErrors", () => {
        expect(response.validatorErrors).toEqual({});
      });
    });
  });
});
describe("Partner-details controller: partnerDetailsContinue()", () => {
  describe("Without edit mode", () => {
    beforeEach(() => {
      editMode = false;
    });

    describe("When given valid submission data on continue", () => {
      let response;
      let partnerArray = ["partner one", "partner two", "partner three"];

      beforeEach(async () => {
        validate.mockImplementation(() => ({
          errors: {}
        }));

        try {
          response = await partnerDetailsContinue(
            currentPage,
            { partners: partnerArray },
            council,
            editMode
          );
        } catch (err) {
          response = err;
        }
      });

      it("Should set redirectRoute back to the main partnerhsip contact page", () => {
        expect(response.redirectRoute).toBe(
          "/new/cardiff/main-partnership-contact"
        );
      });

      it("Should return empty validatorErrors", () => {
        expect(response.validatorErrors).toEqual({});
      });
    });

    describe("When a validation error occurs on continue", () => {
      let partnerArray = ["only one partner"];
      let response;
      beforeEach(async () => {
        validate.mockImplementation(() => ({
          errors: { partners: "Invalid partners" }
        }));
        response = await partnerDetailsContinue(
          currentPage,
          { partners: partnerArray },
          council,
          editMode
        );
      });

      it("Should set redirectRoute back to the main partnerhsip contact page", () => {
        expect(response.redirectRoute).toBe("/new/cardiff/current");
      });

      it("Should return empty validatorErrors", () => {
        expect(response.validatorErrors).toEqual({
          partners: "Invalid partners"
        });
      });
    });
    describe("Given a service thrown an error", () => {
      let response;
      beforeEach(async () => {
        validate.mockImplementation(() => {
          throw new Error("Some error");
        });

        try {
          response = await partnerDetailsContinue(
            currentPage,
            { partners: ["partner one"] },
            council,
            editMode,
            {}
          );
        } catch (err) {
          response = err;
        }
      });

      it("Should throw the error", () => {
        expect(response.message).toBe("Some error");
      });
    });
  });
  describe("In edit mode", () => {
    beforeEach(() => {
      editMode = true;
    });
    describe("When the main partnership contact is still in the list", () => {
      let response;
      let partnerArray = ["partner one", "partner two", "partner three"];

      beforeEach(async () => {
        validate.mockImplementation(() => ({
          errors: {}
        }));

        try {
          response = await partnerDetailsContinue(
            currentPage,
            {
              partners: partnerArray,
              main_partnership_contact: "partner one"
            },

            council,
            editMode,
            {}
          );
        } catch (err) {
          response = err;
        }
      });

      it("Should set redirectRoute to the registration summary page", () => {
        expect(response.redirectRoute).toBe(
          "/new/cardiff/registration-summary"
        );
      });
      it("Should return empty validatorErrors", () => {
        expect(response.validatorErrors).toEqual({});
      });
    });

    describe("When the main partnership contact is not in the list anymore", () => {
      let response;
      let partnerArray = ["partner one", "partner two", "partner three"];

      beforeEach(async () => {
        response = await partnerDetailsContinue(
          currentPage,
          {
            partners: partnerArray,
            main_partnership_contact: "deleted partner"
          },

          council,
          editMode,
          {}
        );
      });

      it("Should set redirectRoute to the main partnerhsip contact page in edit mode", () => {
        expect(response.redirectRoute).toBe(
          "/new/cardiff/main-partnership-contact?edit=main-partnership-contact"
        );
      });
    });
  });
});
