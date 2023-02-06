jest.mock("../services/validation.service");
jest.mock("../services/session-management.service");
jest.mock("../services/local-authority.service");
jest.mock("../services/statusEmitter.service");

const {
  getLocalAuthorityByPostcode
} = require("../services/local-authority.service");
const { validate } = require("../services/validation.service");
const smallAddressResponseJSON = require("../connectors/address-lookup/smallAddressResponseMock.json");

const findLocalAuthorityController = require("./find-local-authority.controller");

const testEmptyAddressArray = [];

const testPreviousAnswers = {
  example: "answer"
};

const testNewAnswerPostcode = {
  establishment_postcode_find: "AA11 1AA"
};

let response;

describe("Function: findLocalAuthorityController: ", () => {
  describe("given previous answers and a valid postcode", () => {
    beforeEach(() => {
      validate.mockImplementation(() => ({
        errors: {}
      }));
    });

    describe("given that at least one address is returned", () => {
      beforeEach(async () => {
        getLocalAuthorityByPostcode.mockImplementation(
          () => smallAddressResponseJSON
        );

        response = await findLocalAuthorityController(
          "/la-selector",
          testPreviousAnswers,
          testNewAnswerPostcode
        );
      });
      it("Should return cumulativeFullAnswers including the previous answers and the new postcode", () => {
        expect(response.cumulativeFullAnswers).toEqual({
          example: "answer",
          establishment_postcode_find: "AA11 1AA"
        });
      });
      it("Should return a redirectRoute of the manual entry page", () => {
        expect(response.redirectRoute).toEqual("/la-established");
      });

      it("Should return cumulativeFullAnswers including the previous answers and the new postcode", () => {
        expect(response.cumulativeFullAnswers).toEqual({
          example: "answer",
          establishment_postcode_find: "AA11 1AA"
        });
      });

      it("Should return empty validatorErrors", () => {
        expect(response.validatorErrors).toEqual({});
      });
    });

    describe("given previous answers and an invalid postcode", () => {
      beforeEach(async () => {
        validate.mockImplementation(() => ({
          errors: { example: "error" }
        }));

        response = await findLocalAuthorityController(
          "/la-selector",
          testPreviousAnswers,
          {
            establishment_postcode_find: "not a valid postcode"
          }
        );
      });

      it("Should return a redirectRoute of the current page", () => {
        expect(response.redirectRoute).toEqual("/la-selector");
      });

      it("Should return cumulativeFullAnswers including the previous answers and the invalid postcode", () => {
        expect(response.cumulativeFullAnswers).toEqual({
          example: "answer",
          establishment_postcode_find: "not a valid postcode"
        });
      });

      it("Should return the correct validatorErrors", () => {
        expect(response.validatorErrors).toEqual({
          example: "error"
        });
      });
    });
  });
});
