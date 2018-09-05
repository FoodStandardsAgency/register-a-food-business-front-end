jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn()
  }))
}));
const { statusRouter } = require("./status.route");

describe("status route: ", () => {
  let router, handler;
  beforeEach(() => {
    router = statusRouter();
  });

  describe("GET to /status", () => {
    let req, res;

    beforeEach(() => {
      handler = router.get.mock.calls[0][1];
      req = {};
      res = {
        send: jest.fn()
      };
      handler(req, res);
    });

    it("Should call res.send with a success message", () => {
      expect(res.send).toHaveBeenLastCalledWith("STATUS: ");
    });
  });

  describe("GET to /status/healthcheck", () => {
    let req, res;

    beforeEach(() => {
      handler = router.get.mock.calls[1][1];
      req = {};
      res = {
        send: jest.fn()
      };
      handler(req, res);
    });

    it("Should call res.send with a success message", () => {
      expect(res.send).toHaveBeenLastCalledWith("FRONT END healthcheck PASSED");
    });
  });
});
