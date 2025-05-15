jest.mock("../connectors/trading-status/trading-status.connector");

const { tradingStatus } = require("./trading-status.service");
const { sendTradingStatus } = require("../connectors/trading-status/trading-status.connector");

describe("Function: tradingStatus", () => {
  const testFsaId = "123456789";
  let result;

  describe("When sendTradingStatus succeeds", () => {
    beforeEach(async () => {
      sendTradingStatus.mockImplementation(() => {
        return { status: 200 };
      });
      result = await tradingStatus(testFsaId, true);
    });

    it("Should call sendTradingStatus with fsaId", () => {
      expect(sendTradingStatus).toBeCalledWith(testFsaId, true);
    });

    it("Should return the response", () => {
      expect(result.status).toBeDefined();
    });
  });

  describe("When sendTradingStatus errors", () => {
    beforeEach(async () => {
      sendTradingStatus.mockImplementation(() => {
        throw new Error("FAIL");
      });
      result = await tradingStatus(testFsaId, true);
    });

    it("Should catch the error", () => {
      expect(result.message).toBe("FAIL");
    });
  });
});
