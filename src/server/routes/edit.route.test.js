jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn()
  }))
}));

const { editRouter } = require("./edit.route");

describe("Edit route: ", () => {
  let router, handler;
  beforeEach(() => {
    router = editRouter();
  });

  describe("GET to /edit/:target", () => {
    const req = {
      session: {},
      params: { target: "examplePage" }
    };
    const res = {
      redirect: jest.fn()
    };

    beforeEach(() => {
      handler = router.get.mock.calls[0][1];
      handler(req, res);
    });

    it("Should call res.redirect with target of examplePage and a query of edit=on", () => {
      expect(res.redirect).toHaveBeenCalledWith("/examplePage?edit=on");
    });
  });
});
