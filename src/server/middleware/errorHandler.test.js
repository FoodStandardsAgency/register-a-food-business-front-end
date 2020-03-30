jest.mock("../next");
jest.mock("../services/logging.service");

const { errorHandler } = require("../middleware/errorHandler");
const { Next } = require("../next");
const { logEmitter } = require("../services/logging.service");

describe("errorHandler", () => {
  Next.render.mockImplementation();
  it("should call Next", () => {
    errorHandler();

    expect(Next.render).toHaveBeenCalled();
  });

  describe("when response is defined", () => {
    logEmitter.emit.mockImplementation(() => jest.fn());
    describe("when err and res are not defined", () => {
      it("should emit statusCode: null", () => {
        errorHandler();

        expect(logEmitter.emit).toHaveBeenCalledWith(
          "functionCallWith",
          "errorHandler",
          "errorHandler",
          "statusCode: null"
        );
      });
    });

    describe("when res is not defined but err is", () => {
      it("should emit statusCode: err.statusCode", () => {
        const err = { statusCode: 400 };
        errorHandler(err);

        expect(logEmitter.emit).toHaveBeenCalledWith(
          "functionCallWith",
          "errorHandler",
          "errorHandler",
          "statusCode: 400"
        );
      });
    });

    describe("when res is defined", () => {
      it("should emit statusCode: res.statusCode", () => {
        const err = { statusCode: 400 };
        const req = undefined;
        const res = { statusCode: 200 };
        errorHandler(err, req, res);

        expect(logEmitter.emit).toHaveBeenCalledWith(
          "functionCallWith",
          "errorHandler",
          "errorHandler",
          "statusCode: 200"
        );
      });
    });
  });
});
