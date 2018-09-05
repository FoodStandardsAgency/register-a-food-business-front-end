jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn()
  }))
}));
const { healthcheckRouter } = require("./healthcheck.route");

describe("healthcheck route: ", () => {
  let router, handler;
  beforeEach(() => {
    router = healthcheckRouter();
  });

  describe("GET to /healthcheck", () => {
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
      expect(res.send).toHaveBeenLastCalledWith("FRONT END healthcheck PASSED");
    });
  });
});
