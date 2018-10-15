jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn()
  }))
}));
jest.mock("../controllers/continue.controller");
const continueController = require("../controllers/continue.controller");
const { continueRouter } = require("./continue.route");

describe("Continue route: ", () => {
  let router, handler;
  beforeEach(() => {
    router = continueRouter();
  });
  describe("POST to /continue/:originator/:editModePage?", () => {
    let req, res;

    beforeEach(() => {
      continueController.mockImplementation(() => ({
        validatorErrors: {},
        redirectRoute: "/newPage",
        cumulativeAnswers: {
          new: "answers"
        },
        switches: { exampleSwitch: true }
      }));

      handler = router.post.mock.calls[0][1];

      req = {
        session: {
          cumulativeAnswers: {},
          switches: {},
          council: "council",
          pathConfig: { path: "existing path from session" },
          save: cb => {
            cb();
          }
        },
        body: "body",
        params: {
          originator: "originator",
          editModePage: "false"
        }
      };

      res = {
        redirect: jest.fn()
      };

      handler(req, res);
    });

    it("Should call continueController with currentPage, cumulativeAnswers, body, switches, editModePage, and path", () => {
      expect(continueController).toHaveBeenCalledWith(
        "/originator",
        {},
        "body",
        {},
        false,
        "existing path from session"
      );
    });

    it("Should update session", () => {
      expect(req.session.cumulativeAnswers).toEqual({ new: "answers" });
      expect(req.session.switches).toEqual({ exampleSwitch: true });
    });

    it("Should redirect to next page", () => {
      expect(res.redirect).toBeCalledWith("/new/council/newPage");
    });

    describe("given that editModePage is on", () => {
      let req, res;

      beforeEach(() => {
        continueController.mockImplementation(() => ({
          validatorErrors: {},
          redirectRoute: "/newPage",
          cumulativeAnswers: {
            new: "answers"
          },
          switches: { exampleSwitch: true }
        }));

        handler = router.post.mock.calls[0][1];

        req = {
          session: {
            cumulativeAnswers: {},
            switches: {},
            council: "council",
            pathConfig: { path: "existing path from session" },
            save: cb => {
              cb();
            }
          },
          body: "body",
          params: {
            originator: "originator",
            editModePage: "true"
          }
        };

        res = {
          redirect: jest.fn()
        };

        handler(req, res);
      });

      it("Should call continueController with editModePage on", () => {
        expect(continueController).toHaveBeenCalledWith(
          "/originator",
          {},
          "body",
          {},
          true,
          "existing path from session"
        );
      });

      it("Should update session", () => {
        expect(req.session.cumulativeAnswers).toEqual({ new: "answers" });
        expect(req.session.switches).toEqual({ exampleSwitch: true });
      });

      it("Should redirect to next page", () => {
        expect(res.redirect).toBeCalledWith("/new/council/newPage");
      });
    });

    describe("given that the controller response redirects to submit", () => {
      let req, res;

      beforeEach(() => {
        continueController.mockImplementation(() => ({
          validatorErrors: {},
          redirectRoute: "/submit",
          cumulativeAnswers: {
            new: "answers"
          },
          switches: { exampleSwitch: true }
        }));

        handler = router.post.mock.calls[0][1];

        req = {
          session: {
            cumulativeAnswers: {},
            switches: {},
            council: "council",
            pathConfig: { path: "existing path from session" },
            save: cb => {
              cb();
            }
          },
          body: "body",
          params: {
            originator: "originator",
            editModePage: "true"
          }
        };

        res = {
          redirect: jest.fn()
        };

        handler(req, res);
      });

      it("Should call redirect", () => {
        expect(res.redirect).toBeCalledWith("/submit");
      });
    });

    describe("given that req.session.save throws an error", () => {
      let req, res, response;
      beforeEach(() => {
        continueController.mockImplementation(() => ({
          validatorErrors: {},
          redirectRoute: "/submit",
          cumulativeAnswers: {
            new: "answers"
          },
          switches: { exampleSwitch: true }
        }));

        handler = router.post.mock.calls[0][1];

        req = {
          session: {
            cumulativeAnswers: {},
            switches: {},
            council: "council",
            pathConfig: { path: "existing path from session" },
            save: cb => {
              cb("session save error");
            }
          },
          body: "body",
          params: {
            originator: "originator",
            editModePage: "true"
          }
        };

        res = {
          redirect: jest.fn()
        };
        try {
          handler(req, res);
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
