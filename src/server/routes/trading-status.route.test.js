jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn()
  }))
}));
jest.mock("../services/trading-status.service");
const { tradingStatus } = require("../services/trading-status.service");
const { tradingStatusRouter } = require("./trading-status.route");

const testFsaId = "123456789";

describe("Trading Status route: ", () => {
  let router, handler;
  beforeEach(() => {
    router = tradingStatusRouter();
  });

  describe("GET to /stilltrading", () => {
    describe("When still trading is set successfully", () => {
      let res, req;

      beforeEach(() => {
        tradingStatus.mockImplementation(() => ({
          status: 200
        }));

        handler = router.get.mock.calls[0][1];
        next = jest.fn();
        req = {
          params: {
            fsaid: testFsaId
          },
          query: {
            token: "encryptedId",
            lang: "en"
          }
        };
        res = {
          render: jest.fn()
        };
        handler(req, res, next);
      });

      it("Should call tradingStatusService with the correct args", () => {
        expect(tradingStatus).toHaveBeenCalledWith(testFsaId, "encryptedId", true);
      });

      it("Should render the page", () => {
        expect(res.render).toHaveBeenCalledWith("trading-status-still-trading", { language: "en" });
      });
    });

    describe("when an error is thrown", () => {
      let next;
      beforeEach(async () => {
        tradingStatus.mockImplementation(() => {
          throw new Error("error");
        });
        next = jest.fn();
        handler = router.get.mock.calls[0][1];
        req = {
          params: {
            fsaid: testFsaId
          },
          query: {
            token: "encryptedId"
          }
        };
        res = {};

        handler(req, res, next);
      });
      it("should call next with error", () => {
        expect(next).toBeCalledWith(new Error("error"));
      });
    });
  });

  describe("GET to /nolongertrading", () => {
    describe("When no longer trading is set successfully", () => {
      let res, req;

      beforeEach(() => {
        tradingStatus.mockImplementation(() => ({
          status: 200
        }));

        handler = router.get.mock.calls[1][1];
        next = jest.fn();
        req = {
          params: {
            fsaid: testFsaId
          },
          query: {
            token: "encryptedId",
            lang: "cy"
          }
        };
        res = {
          render: jest.fn()
        };
        handler(req, res, next);
      });

      it("Should call tradingStatusService with the correct args", () => {
        expect(tradingStatus).toHaveBeenCalledWith(testFsaId, "encryptedId", false);
      });

      it("Should render the page", () => {
        expect(res.render).toHaveBeenCalledWith("trading-status-no-longer-trading", {
          language: "cy"
        });
      });
    });

    describe("when an error is thrown", () => {
      let next;
      beforeEach(async () => {
        tradingStatus.mockImplementation(() => {
          throw new Error("error");
        });
        next = jest.fn();
        handler = router.get.mock.calls[0][1];
        req = {
          params: {
            fsaid: testFsaId
          },
          query: {
            token: "encryptedId"
          }
        };
        res = {};

        handler(req, res, next);
      });
      it("should call next with error", () => {
        expect(next).toBeCalledWith(new Error("error"));
      });
    });
  });
});
