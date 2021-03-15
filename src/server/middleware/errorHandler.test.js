jest.mock("../server", () => ({
  app: {
    render: jest.fn()
  }
}));
jest.mock("winston", () => ({
  error: jest.fn()
}));

const { errorHandler } = require("../middleware/errorHandler");
const { app } = require("../server");
const { error } = require("winston");

describe("errorHandler", () => {
  app.render.mockImplementation();
  it("should call Next", () => {
    errorHandler();

    expect(app.render).toHaveBeenCalled();
  });

  describe("when err and res are not defined", () => {
    error.mockImplementation();
    it("should emit statusCode: null", () => {
      errorHandler("no error");

      expect(error).toHaveBeenNthCalledWith(3, "no error");
      expect(error).toHaveBeenNthCalledWith(4, "statusCode: undefined");
      error.mockReset();
    });
  });

  describe("when res and the statusCode are defined", () => {
    error.mockImplementation();
    it("should emit res.statusCode", () => {
      let err = "";
      let req = {};
      let res = { statusCode: 4 };
      errorHandler(err, req, res);
      expect(error).toHaveBeenNthCalledWith(2, "statusCode: 4");
    });
  });
});
