jest.mock("express", () => ({
  Router: jest.fn(() => ({
    use: jest.fn(),
    get: jest.fn(),
  })),
}));
jest.mock("./next");
jest.mock("./routes/index");

const {
  backRouter,
  cleansessionRouter,
  continueRouter,
  editRouter,
  findAddressRouter,
  newRouter,
  qaRouter,
  submitRouter,
  switchesRouter,
} = require("./routes/index");
const { handle } = require("./next");

const routes = require("./routes");

describe("Function: routes", () => {
  let result, handler;
  beforeEach(() => {
    result = routes();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should call use", () => {
    expect(result.use).toBeCalled();
  });

  it("Should call the routers", () => {
    expect(backRouter).toBeCalled();
    expect(cleansessionRouter).toBeCalled();
    expect(continueRouter).toBeCalled();
    expect(editRouter).toBeCalled();
    expect(findAddressRouter).toBeCalled();
    expect(newRouter).toBeCalled();
    expect(qaRouter).toBeCalled();
    expect(submitRouter).toBeCalled();
    expect(switchesRouter).toBeCalled();
  });

  it("should redirect with /", () => {
    const req = "req";
    const res = { redirect: jest.fn() };
    handler = result.get.mock.calls[0][1];
    handler(req, res);
    expect(res.redirect).toBeCalled();
  });

  it("should call next handle with *", () => {
    const req = "req";
    const res = "res";
    handler = result.get.mock.calls[1][1];
    handler(req, res);
    expect(handle).toBeCalledWith(req, res);
  });
});
