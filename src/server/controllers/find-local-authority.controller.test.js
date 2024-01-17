jest.mock("../services/validation.service");
jest.mock("../services/local-authority.service");

const { logEmitter } = require("../services/logging.service");
const { getLocalAuthorityByPostcode } = require("../services/local-authority.service");
const { validate } = require("../services/validation.service");

const findLocalAuthorityController = require("./find-local-authority.controller");

describe("Function: findLocalAuthorityController: ", () => {
  let response;
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("given previous answers and a valid postcode for onboarded LA", () => {
    beforeEach(async () => {
      getLocalAuthorityByPostcode.mockResolvedValue({
        local_council: "Test council",
        local_council_url: "test-council"
      });
      validate.mockImplementation(() => ({
        errors: {}
      }));
      response = await findLocalAuthorityController(
        "/establishment-address",
        {
          example: "answer"
        },
        {
          establishment_postcode_find: "AA11 1AA"
        }
      );
    });

    it("Should return cumulativeFullAnswers including the previous answers and the new postcode", () => {
      expect(response.cumulativeFullAnswers).toEqual({
        example: "answer",
        establishment_postcode_find: "AA11 1AA"
      });
    });

    it("Should return a redirectRoute of the LA established", () => {
      expect(response.redirectRoute).toEqual("/la-established");
    });

    it("Should return empty validatorErrors", () => {
      expect(response.validatorErrors).toEqual({});
    });
  });

  describe("given previous answers and a valid postcode for not-onboarded LA", () => {
    beforeEach(async () => {
      getLocalAuthorityByPostcode.mockResolvedValue(false);
      validate.mockImplementation(() => ({
        errors: {}
      }));
      response = await findLocalAuthorityController(
        "/establishment-address",
        {
          example: "answer"
        },
        {
          establishment_postcode_find: "AA11 1AA"
        }
      );
    });

    it("Should return cumulativeFullAnswers including the previous answers and the new postcode", () => {
      expect(response.cumulativeFullAnswers).toEqual({
        example: "answer",
        establishment_postcode_find: "AA11 1AA"
      });
    });

    it("Should return a redirectRoute of the LA selector", () => {
      expect(response.redirectRoute).toEqual("/la-selector");
    });

    it("Should return empty validatorErrors", () => {
      expect(response.validatorErrors).toEqual({});
    });
  });

  describe("given previous answers and a invalid postcode", () => {
    beforeEach(async () => {
      getLocalAuthorityByPostcode.mockResolvedValue(false);
      validate.mockImplementation(() => ({
        errors: { example: "error" }
      }));
      response = await findLocalAuthorityController(
        "/establishment-address",
        {
          example: "answer"
        },
        {
          establishment_postcode_find: "not a valid postcode"
        }
      );
    });

    it("Should return cumulativeFullAnswers including the previous answers and the new postcode", () => {
      expect(response.cumulativeFullAnswers).toEqual({
        example: "answer",
        establishment_postcode_find: "not a valid postcode"
      });
    });

    it("Should return a redirectRoute to current page", () => {
      expect(response.redirectRoute).toEqual("/establishment-address");
    });

    it("Should return the correct validatorErrors", () => {
      expect(response.validatorErrors).toEqual({
        example: "error"
      });
    });
  });

  describe("given the controller throws an error", () => {
    let spy;
    beforeEach(async () => {
      validate.mockImplementation(() => ({
        errors: {}
      }));
      getLocalAuthorityByPostcode.mockImplementationOnce(() => {
        throw new Error("Some error");
      });

      spy = jest.spyOn(logEmitter, "emit");

      response = await findLocalAuthorityController(
        "/establishment-address",
        {
          example: "answer"
        },
        {
          establishment_postcode_find: "AA11 1AA"
        }
      );
    });
    it("has catch and log error", () => {
      expect(spy).toHaveBeenLastCalledWith(
        "functionFail",
        "find-local-authority.controller",
        "findLocalAuthorityController",
        new Error("Some error")
      );
    });
  });
});
