jest.mock("winston", () => ({
  error: jest.fn()
}));

const { errorHandler } = require("../middleware/errorHandler");
const { error } = require("winston");
const url = "test/test"
const csrfToken=jest.fn();

describe("errorHandler", () => {
  it("should call res.render", () => {
    let res = { render:jest.fn() };
      let req = {csrfToken:csrfToken, url:url};
      let err = {message:""}
    errorHandler(err, req, res);

    expect(res.render).toHaveBeenCalled();
  });

  describe("when status code is not defined", () => {
    error.mockImplementation();
    it("should emit statusCode: null", () => {
      let res = { render:jest.fn() };
      let req = {csrfToken:csrfToken, url:url};
      let err = {message:"no error"}
      errorHandler(err, req, res);

      expect(error).toHaveBeenNthCalledWith(3, {"message": "no error"});
      expect(error).toHaveBeenNthCalledWith(4, "statusCode: undefined");
      error.mockReset();
    });
  });

  describe("when res and the statusCode are defined", () => {
    error.mockImplementation();
    it("should emit res.statusCode", () => {
      let err = {message:""};
      let req = {csrfToken:csrfToken, url:url};
      let res = { statusCode: 4, render:jest.fn() };
      errorHandler(err, req, res);
      expect(error).toHaveBeenNthCalledWith(2, "statusCode: 4");
    });
  });
});
