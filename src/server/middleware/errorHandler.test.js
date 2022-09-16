jest.mock("../services/winston", () => ({
  logger: {
    error: jest.fn()
  }
}));

const { errorHandler } = require("../middleware/errorHandler");
const { logger } = require("../services/winston");
const url = "test/test";
const csrfToken = jest.fn();

describe("errorHandler", () => {
  it("should call res.render", () => {
    let res = { render: jest.fn() };
    let req = { csrfToken: csrfToken, url: url };
    let err = { message: "" };
    errorHandler(err, req, res);

    expect(res.render).toHaveBeenCalled();
  });

  describe("when status code is not defined", () => {
    logger.error.mockImplementation();
    it("should emit statusCode: null", () => {
      let res = { render: jest.fn() };
      let req = { csrfToken: csrfToken, url: url };
      let err = { message: "no error" };
      errorHandler(err, req, res);

      expect(logger.error).toHaveBeenNthCalledWith(3, "no error");
      expect(logger.error).toHaveBeenNthCalledWith(2, "statusCode: undefined");
      logger.error.mockReset();
    });
  });

  describe("when res and the statusCode are defined", () => {
    logger.error.mockImplementation();
    it("should emit res.statusCode", () => {
      let err = { message: "" };
      let req = { csrfToken: csrfToken, url: url };
      let res = { statusCode: 4, render: jest.fn() };
      errorHandler(err, req, res);
      expect(logger.error).toHaveBeenNthCalledWith(2, "statusCode: 4");
    });
  });

  describe("when res.headersSent is true", () => {
    it("should call next(err)", () => {
      let err = { message: "error" };
      let req = { csrfToken: csrfToken, url: url };
      let res = { headersSent: true };
      let next = jest.fn();
      errorHandler(err, req, res, next);
      expect(next).toBeCalledWith({ message: "error" });
    });
  });

  describe("when error thrown inside PropsGenerator", () => {
    it("should not call PropsGenerator", () => {
      let err = { message: "error", stack: "propsGenerator", statusCode: 500 };
      let req = { csrfToken: csrfToken, url: url };
      let res = { render: jest.fn() };
      let next = jest.fn();
      errorHandler(err, req, res, next);
      expect(res.render).toHaveBeenCalledWith("internal-server-error", {
        props: { err }
      });
    });
  });
});
