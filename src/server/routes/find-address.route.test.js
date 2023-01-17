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
          cumulativeFullAnswers: {},
          addressLookups: { some_page: [] },
          council: "council",
          save: (cb) => {
            cb();
          }
        },
        body: "body",
        params: {
          originator: "/some-page"
        },
        headers: {
          referer: ""
        }
      };

      const res = {
        redirect: jest.fn()
      };

      beforeEach(() => {
        findAddressController.mockImplementation(() => ({
          cumulativeFullAnswers: { example: "answer" },
          validatorErrors: {},
          addressLookups: { example: [] },
          redirectRoute: "/another-page"
        }));
        handler = router.post.mock.calls[0][1];
        handler(req, res);
      });
      it("Should redirect to the redirectRoute page", () => {
        expect(res.redirect).toBeCalledWith("/new/another-page");
      });

      it("Should update session without overwriting existing addressLookups values", () => {
        expect(req.session.cumulativeFullAnswers).toEqual({
          example: "answer"
        });
        expect(req.session.validatorErrors).toEqual({});
        expect(req.session.addressLookups).toEqual({
          some_page: [],
          example: []
        });
      });
    });

    describe("When session.save throws an error", () => {
      let response, next;
      next = jest.fn();
      const req = {
        session: {
          cumulativeFullAnswers: {},
          addressLookups: { some_page: [] },
          council: "council",
          save: (cb) => {
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
          cumulativeFullAnswers: { example: "answer" },
          validatorErrors: {},
          addressLookups: { example: [] },
          redirectRoute: "/another-page"
        }));
        handler = router.post.mock.calls[0][1];
        try {
          await handler(req, res, next);
        } catch (err) {
          response = err;
        }
      });

      it("Should throw an error", () => {
        expect(next).toBeCalledWith("session save error");
      });
    });

    describe("when an error is thrown", () => {
      let next;
      beforeEach(async () => {
        findAddressController.mockImplementation(() => {
          throw new Error("error");
        });
        next = jest.fn();
        handler = router.post.mock.calls[0][1];
        req = {
          session: {
            cumulativeFullAnswers: {},
            addressLookups: { some_page: [] },
            council: "council"
          },
          body: "body",
          params: {
            originator: "/some-page"
          }
        };

        res = {
          redirect: jest.fn()
        };

        handler(req, res, next);
      });
      it("should call next with error", () => {
        expect(next).toBeCalledWith(new Error("error"));
      });
    });
  });
});
