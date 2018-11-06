jest.mock("../services/data-transform.service");
jest.mock("../services/submit.service");

const {
  transformAnswersForSubmit
} = require("../services/data-transform.service");
const { submit } = require("../services/submit.service");

const submitController = require("./submit.controller");

const testLcUrl = "example-lc";
const testSubmissionData = { some: "data" };
const testAddressLookups = {};
const testRegDataVersion = "1.0.0";

const submitArgs = [
  testLcUrl,
  testSubmissionData,
  testAddressLookups,
  testRegDataVersion
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
          testLcUrl,
          {},
          testAddressLookups,
          testRegDataVersion
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

  describe("When submit returns an error", () => {
    beforeEach(async () => {
      submit.mockImplementation(() => ({
        status: "500",
        json: () => ({ reg_submission_date: "10 Jul 2018" })
      }));
      response = await submitController(...submitArgs);
    });

    it("Should set redirectRoute to back", () => {
      expect(response.redirectRoute).toBe("back");
    });
  });

  describe("When submit does NOT return an error", () => {
    beforeEach(async () => {
      submit.mockImplementation(() => ({
        status: 200,
        json: () => ({
          reg_submission_date: "10 Jul 2018",
          "fsa-rn": "D9YC4B-KFK5JE-PKR7VX",
          email_fbo: {
            success: true,
            recipient: "fbo@example.com"
          },
          lc_config: { example: "data" }
        })
      }));
      response = await submitController(...submitArgs);
    });

    it("Should call the submit service function with the correct args", () => {
      expect(submit).toHaveBeenLastCalledWith(
        {
          transformedDataExample: "value"
        },
        testRegDataVersion
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
    it("Should should return lcConfig", () => {
      expect(response.lcConfig.example).toBe("data");
    });
  });
});
