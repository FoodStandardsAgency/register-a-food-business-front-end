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
    describe("When the language is not specified", () => {
      let res, req;
      beforeEach(() => {
        handler = router.get.mock.calls[0][1];

        req = {
          query: {}
        };
        res = {
          sendFile: jest.fn()
        };
        handler(req, res);
      });

      it("Should return english file", () => {
        let file = path.join(
          __dirname,
          "..",
          "/static/pdfs/feedback-declaration.pdf"
        );
        expect(res.sendFile).toHaveBeenCalledWith(file);
      });
    });

    describe("When the language is welsh", () => {
      let res, req;
      beforeEach(() => {
        handler = router.get.mock.calls[0][1];

        req = {
          query: {
            language: "cy"
          }
        };
        res = {
          sendFile: jest.fn()
        };
        handler(req, res);
      });

      it("Should return welsh file", () => {
        let file = path.join(
          __dirname,
          "..",
          "/static/pdfs/RAFB-Privacy-Notice-Cymraeg.pdf"
        );
        expect(res.sendFile).toHaveBeenCalledWith(file);
      });
    });
  });
});
