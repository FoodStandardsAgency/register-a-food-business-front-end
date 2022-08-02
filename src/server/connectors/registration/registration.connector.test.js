jest.mock("axios");
jest.mock("./registration.double");

const axios = require("axios");
const { sendRequest } = require("./registration.connector");
const { registrationDouble } = require("./registration.double");

const testSubmissionData = { example: "value" };
const testRegDataVersion = "1.0.0";

describe("Function: sendRequest", () => {
  beforeEach(() => {
    process.env.DOUBLE_MODE = "false";
  });

  let result;

  describe("When request succeeds", () => {
    beforeEach(async () => {
      axios.mockResolvedValue("response");
      result = await sendRequest(testSubmissionData, testRegDataVersion);
    });

    it("Should return res", () => {
      expect(result).toBe("response");
    });

    it("Should call axios with the correct args", () => {
      expect(axios).toHaveBeenLastCalledWith(expect.anything(), {
        method: "POST",
        headers: expect.objectContaining({
          "registration-data-version": "1.0.0"
        }),
        data: testSubmissionData
      });
    });
  });

  describe("When request errors", () => {
    beforeEach(async () => {
      axios.mockImplementation(() => {
        throw new Error("request error");
      });
      result = await sendRequest(testSubmissionData, testRegDataVersion);
    });

    it("Should catch the error", () => {
      expect(result.message).toBe("request error");
    });
  });

  describe("When DOUBLE_MODE is set", () => {
    beforeEach(async () => {
      process.env.DOUBLE_MODE = true;
      registrationDouble.mockImplementation(() => {
        return "double response";
      });
      result = await sendRequest(testSubmissionData, testRegDataVersion);
    });

    afterEach(() => {
      process.env.DOUBLE_MODE = false;
    });

    it("should return double response", () => {
      expect(result).toBe("double response");
    });
  });
});
