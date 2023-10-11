jest.mock("axios");


const axios = require("axios");
axios.defaults.validateStatus = () => true;
const { sendRequest } = require("./registration.connector");

const testSubmissionData = { example: "value" };
const testRegDataVersion = "1.0.0";

describe("Function: sendRequest", () => {
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
});
