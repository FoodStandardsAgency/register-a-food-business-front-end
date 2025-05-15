jest.mock("axios");

const axios = require("axios");
const { CONFIRMED_TRADING_API_URL, STOPPED_TRADING_API_URL } = require("../../config");
axios.defaults.validateStatus = () => true;
const { sendTradingStatus } = require("./trading-status.connector");

const testFsaId = "123456789";

describe("Function: sendTradingStatus", () => {
  let result;

  describe("When confirmed trading request succeeds", () => {
    beforeEach(async () => {
      axios.mockResolvedValue("response");
      result = await sendTradingStatus(testFsaId, true);
    });

    it("Should return res", () => {
      expect(result).toBe("response");
    });

    it("Should call axios with the correct args", () => {
      expect(axios).toHaveBeenLastCalledWith(`${CONFIRMED_TRADING_API_URL}/${testFsaId}`, {
        headers: expect.anything(),
        method: "POST"
      });
    });
  });

  describe("When stopped trading request succeeds", () => {
    beforeEach(async () => {
      axios.mockResolvedValue("response");
      result = await sendTradingStatus(testFsaId, false);
    });

    it("Should return res", () => {
      expect(result).toBe("response");
    });

    it("Should call axios with the correct args", () => {
      expect(axios).toHaveBeenLastCalledWith(`${STOPPED_TRADING_API_URL}/${testFsaId}`, {
        headers: expect.anything(),
        method: "POST"
      });
    });
  });

  describe("When request errors", () => {
    beforeEach(async () => {
      axios.mockImplementation(() => {
        throw new Error("request error");
      });
      result = await sendTradingStatus(testFsaId, true);
    });

    it("Should catch the error", () => {
      expect(result.message).toBe("request error");
    });
  });
});
