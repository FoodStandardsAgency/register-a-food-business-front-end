jest.mock("../services/data-transform.service");
jest.mock("../services/submit.service");
jest.mock("../services/path.service");
jest.mock("../services/validation.service");

const { transformAnswersForSubmit } = require("../services/data-transform.service");
const { submit } = require("../services/submit.service");
const { editPath } = require("../services/path.service");
const { revalidateAllAnswers } = require("../services/validation.service");

const submitController = require("./submit.controller");

const testLcUrl = "example-lc";
const testSubmissionData = { some: "data" };
const testAddressLookups = {};
const testRegDataVersion = "1.0.0";
const testSessionId = "S35S10NI6";
const testLanguage = "en";
const testPathFromSession = {
  "/some-page": {
    on: true,
    switches: {}
  },
  "/final-page": {
    on: true,
    switches: {}
  }
};

const submitArgs = [
  testSubmissionData,
  testAddressLookups,
  testRegDataVersion,
  testSessionId,
  testLanguage,
  testPathFromSession
];

let response;

describe("Function: submitController: ", () => {
  beforeEach(() => {
    transformAnswersForSubmit.mockImplementation(() => ({
      transformedDataExample: "value"
    }));
  });

  describe("When given empty submission data", () => {
    beforeEach(async () => {
      try {
        response = await submitController(
          {},
          testAddressLookups,
          testRegDataVersion,
          testSessionId,
          testLanguage
        );
      } catch (err) {
        response = err;
      }
    });

    it("it should throw an error", () => {
      expect(response.message).toBe(
        "/submit route was called with an empty submission data object"
      );
    });
  });

  describe("When submit returns a no status", () => {
    beforeEach(async () => {
      submit.mockImplementation(() => ({
        code: "ENOTFOUND"
      }));
      response = await submitController(...submitArgs);
    });

    it("should set redirectRoute to internal-server-error", () => {
      expect(response.redirectRoute).toBe("/internal-server-error");
    });
  });

  describe("When submit returns an error", () => {
    beforeEach(async () => {
      submit.mockImplementation(() => ({
        status: 500,
        statusText: "internal-server-error",
        data: { reg_submission_date: "10 Jul 2018" }
      }));
      response = await submitController(...submitArgs);
    });

    it("should set redirectRoute to internal-server-error", () => {
      expect(response.redirectRoute).toBe("/internal-server-error");
    });

    it("Should have caught correct error messages", () => {
      expect(response.submissionError.length).toBe(1);
      expect(response.submissionError[0]).toBe("500: internal-server-error");
    });
  });

  describe("When submit returns a 400 error", () => {
    beforeEach(async () => {
      submit.mockImplementation(() => ({
        status: 400,
        data: { userMessages: [{ message: "Error 123" }] }
      }));
      response = await submitController(...submitArgs);
    });
    editPath.mockImplementation(() => ({
      "/some-page": {
        on: true,
        switches: {}
      },
      "/final-page": {
        on: true,
        switches: {}
      }
    }));
    revalidateAllAnswers.mockImplementation(() => ({
      errors: { some: "error" }
    }));

    it("Should set redirectRoute to registration-summary", () => {
      expect(response.redirectRoute).toBe("/registration-summary");
    });

    it("Should have caught correct error messages", () => {
      expect(response.submissionError.length).toBe(1);
      expect(response.submissionError[0]).toBe("Error 123");
      expect(response.allValidationErrors).toEqual({ some: "error" });
    });
  });

  describe("When submit returns a 200 but no fsa-rn", () => {
    beforeEach(async () => {
      submit.mockImplementation(() => ({
        status: 200,
        data: {}
      }));
      response = await submitController(...submitArgs);
    });

    it("Should set redirectRoute to interal-server-error", () => {
      expect(response.redirectRoute).toBe("/internal-server-error");
    });
  });

  describe("When submit does NOT return an error", () => {
    beforeEach(async () => {
      submit.mockImplementation(() => ({
        status: 200,
        data: {
          reg_submission_date: "10 Jul 2018",
          "fsa-rn": "D9YC4B-KFK5JE-PKR7VX",
          email_fbo: {
            success: true,
            recipient: "fbo@example.com"
          },
          lc_config: { example: "data" }
        }
      }));
      response = await submitController(...submitArgs);
    });

    it("Should call the submit service function with the correct args", () => {
      expect(submit).toHaveBeenLastCalledWith(
        {
          transformedDataExample: "value"
        },
        testRegDataVersion,
        testSessionId
      );
    });
    it("Should set redirectRoute to summary-confirmation", () => {
      expect(response.redirectRoute).toBe("/summary-confirmation");
    });
    it("Should should return reg_submission_date", () => {
      expect(response.submissionDate).toBe("10 Jul 2018");
    });
    it("Should should return fsa_rn", () => {
      expect(response.fsaRegistrationNumber).toBe("D9YC4B-KFK5JE-PKR7VX");
    });
    it("Should should return emailFbo", () => {
      expect(response.emailFbo.recipient).toBe("fbo@example.com");
    });
    it("Should should return laConfig", () => {
      expect(response.laConfig.example).toBe("data");
    });
  });
});
