jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn()
  }))
}));

const { cleansessionRouter } = require("./cleansession.route");

describe("Cleansession route: ", () => {
  let router, handler;
  beforeEach(() => {
    router = cleansessionRouter();
  });

  describe("GET to /cleansession", () => {
    describe("given an error occurs on session destroy", () => {
      const req = {
        session: {
          example: "value",
          destroy: jest.fn(callback => callback("this is an error")),
          council: "council"
        }
      };

      const res = {
        redirect: jest.fn()
      };

      beforeEach(() => {
        handler = router.get.mock.calls[0][1];
        handler(req, res);
      });

      it("Should not have cleared the session", () => {
        expect(req.session.example).toEqual("value");
      });

      it("Should call res.redirect with target of 'back'", () => {
        expect(res.redirect).toHaveBeenCalledWith("back");
      });
    });

    describe("given session destroy is successful and no errors occur", () => {
      const req = {
        session: {
          example: "value",
          destroy: jest.fn(callback => {
            delete req.session.example;
            callback();
          }),
          council: "council"
        }
      };

      const res = {
        redirect: jest.fn()
      };

      beforeEach(() => {
        handler = router.get.mock.calls[0][1];
        handler(req, res);
      });

      it("Should set the session to be an empty object", () => {
        expect(req.session.example).not.toBeDefined();
      });

      it("Should call res.redirect with target of '/new/council/'", () => {
        expect(res.redirect).toHaveBeenCalledWith("/new/council/");
      });
    });
  });
});
