jest.mock("express", () => ({
  Router: jest.fn(() => ({
    use: jest.fn(),
    get: jest.fn()
  }))
}));
jest.mock("./server", () => ({
  app: {
    render: jest.fn(),
    getRequestHandler: jest.fn()
  }
}));

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
  tradingStatusRouter
} = require("./routes/index");

const routes = require("./routes");

describe("Function: routes", () => {
  let result;
  beforeEach(() => {
    result = routes();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should call use", () => {
    expect(result.use).toHaveBeenCalled();
  });

  it("Should call the routers", () => {
    expect(backRouter).toHaveBeenCalled();
    expect(cleansessionRouter).toHaveBeenCalled();
    expect(continueRouter).toHaveBeenCalled();
    expect(editRouter).toHaveBeenCalled();
    expect(findAddressRouter).toHaveBeenCalled();
    expect(newRouter).toHaveBeenCalled();
    expect(qaRouter).toHaveBeenCalled();
    expect(submitRouter).toHaveBeenCalled();
    expect(switchesRouter).toHaveBeenCalled();
    expect(tradingStatusRouter).toHaveBeenCalled();
  });
});
