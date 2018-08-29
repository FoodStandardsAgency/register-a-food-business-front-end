jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn()
  }))
}));

jest.mock("../controllers/find-address.controller");
const findAddressController = require("../controllers/find-address.controller");
const { findAddressRouter } = require("./find-address.route");

describe("findAddress route: ", () => {
  let router, handler;
  beforeEach(() => {
    router = findAddressRouter();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST to /findaddress/:originator", () => {
    describe("When session.save works", () => {
      const req = {
        session: {
          cumulativeAnswers: {},
          addressLookups: { some_page: [] },
          council: "council",
          save: cb => {
            cb();
          }
        },
        body: "body",
        params: {
          originator: "/some-page"
        }
      };

      const res = {
        redirect: jest.fn()
      };

      beforeEach(() => {
        findAddressController.mockImplementation(() => ({
          cumulativeAnswers: { example: "answer" },
          validatorErrors: {},
          addressLookups: { example: [] },
          redirectRoute: "/another-page"
        }));
        handler = router.post.mock.calls[0][1];
        handler(req, res);
      });
      it("Should redirect to the redirectRoute page", () => {
        expect(res.redirect).toBeCalledWith("/new/council/another-page");
      });

      it("Should update session without overwriting existing addressLookups values", () => {
        expect(req.session.cumulativeAnswers).toEqual({ example: "answer" });
        expect(req.session.validatorErrors).toEqual({});
        expect(req.session.addressLookups).toEqual({
          some_page: [],
          example: []
        });
      });
    });

    describe("When session.save throws an error", () => {
      let response;
      const req = {
        session: {
          cumulativeAnswers: {},
          addressLookups: { some_page: [] },
          council: "council",
          save: cb => {
            cb("session save error");
          }
        },
        body: "body",
        params: {
          originator: "/some-page"
        }
      };

      const res = {
        redirect: jest.fn()
      };

      beforeEach(async () => {
        findAddressController.mockImplementation(() => ({
          cumulativeAnswers: { example: "answer" },
          validatorErrors: {},
          addressLookups: { example: [] },
          redirectRoute: "/another-page"
        }));
        handler = router.post.mock.calls[0][1];
        try {
          await handler(req, res);
        } catch (err) {
          response = err;
        }
      });

      it("Should throw an error", () => {
        expect(response).toBe("session save error");
      });
    });
  });
});
