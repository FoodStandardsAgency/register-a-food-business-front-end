jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn()
  }))
}));
const path = require("path");
const { pdfsRouter } = require("./pdfs.route");

describe("PDF Route: ", () => {
  let router, handler;
  beforeEach(() => {
    router = pdfsRouter();
  });

  describe("GET to /feedback", () => {
    describe("with success", () => {
      let res, req;
      beforeEach(() => {
        handler = router.get.mock.calls[0][1];

        req = {};
        res = {
          sendFile: jest.fn()
        };
        handler(req, res);
      });

      it("Should send file", () => {
        let file = path.join(
          __dirname,
          "..",
          "/static/pdfs/feedback-declaration.pdf"
        );
        expect(res.sendFile).toBeCalledWith(file);
      });
    });
  });
});
