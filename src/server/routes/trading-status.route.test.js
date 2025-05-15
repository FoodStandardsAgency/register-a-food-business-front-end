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

        req = {
          params: {
            fsaid: testFsaId
          }
        };
        res = {
          render: jest.fn()
        };
        handler(req, res);
      });

      it("Should call tradingStatusService with the correct args", () => {
        expect(tradingStatus).toHaveBeenCalledWith(testFsaId, true);
      });

      it("Should render the page", () => {
        expect(res.render).toHaveBeenCalledWith("trading-status-still-trading");
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

        req = {
          params: {
            fsaid: testFsaId
          }
        };
        res = {
          render: jest.fn()
        };
        handler(req, res);
      });

      it("Should call tradingStatusService with the correct args", () => {
        expect(tradingStatus).toHaveBeenCalledWith(testFsaId, false);
      });

      it("Should render the page", () => {
        expect(res.render).toHaveBeenCalledWith("trading-status-no-longer-trading");
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
