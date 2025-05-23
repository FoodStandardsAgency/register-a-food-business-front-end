jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn()
  }))
}));
jest.mock("../controllers/continue.controller");
jest.mock("../connectors/config-db/config-db.connector");
const continueController = require("../controllers/continue.controller");
const { continueRouter } = require("./continue.route");
const { getCouncilDataByID } = require("../connectors/config-db/config-db.connector");

describe("Continue route: ", () => {
  let router, handler;
  beforeEach(() => {
    router = continueRouter();
  });
  describe("POST to /continue/:originator", () => {
    let req, res;

    beforeEach(() => {
      continueController.mockImplementation(() => ({
        validatorErrors: {},
        redirectRoute: "/newPage",
        cumulativeFullAnswers: {
          new: "answers"
        },
        switches: { exampleSwitch: true }
      }));

      handler = router.post.mock.calls[0][1];

      req = {
        session: {
          cumulativeFullAnswers: {},
          switches: {},
          pathConfig: "existing path from session",
          save: (cb) => {
            cb();
          }
        },
        body: "body",
        params: {
          originator: "originator"
        }
      };

      res = {
        redirect: jest.fn()
      };

      handler(req, res);
    });

    it("Should call continueController with currentPage, cumulativeFullAnswers, body, switches, and path", () => {
      expect(continueController).toHaveBeenCalledWith(
        "/originator",
        {},
        "body",
        {},
        "existing path from session"
      );
    });

    it("Should update session", () => {
      expect(req.session.cumulativeFullAnswers).toEqual({
        new: "answers"
      });
      expect(req.session.switches).toEqual({ exampleSwitch: true });
    });

    it("Should redirect to next page", () => {
      expect(res.redirect).toBeCalledWith("/new/newPage");
    });

    describe("given that the controller response redirects to submit", () => {
      let req, res;

      beforeEach(() => {
        continueController.mockImplementation(() => ({
          validatorErrors: {},
          redirectRoute: "/submit",
          cumulativeFullAnswers: {
            new: "answers"
          },
          switches: { exampleSwitch: true }
        }));

        handler = router.post.mock.calls[0][1];

        req = {
          session: {
            cumulativeFullAnswers: {},
            switches: {},
            pathConfig: "existing path from session",
            save: (cb) => {
              cb();
            }
          },
          body: "body",
          params: {
            originator: "originator"
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

    describe("When local authority not onboarded", () => {
      let req, res;

      beforeEach(() => {
        continueController.mockImplementation(() => ({
          validatorErrors: {},
          redirectRoute: "/newPage",
          cumulativeFullAnswers: {
            new: "answers"
          },
          switches: { exampleSwitch: true },
          localAuthority: {
            local_council: "City of Cardiff Council",
            local_council_url: "cardiff",
            country: "wales",
            reg_form_url: "https://www.test.com"
          }
        }));

        getCouncilDataByID.mockImplementation(() => ({
          local_council: "City of Cardiff Council",
          local_council_url: "cardiff",
          country: "wales",
          reg_form_url: "https://www.test.com"
        }));

        handler = router.post.mock.calls[0][1];

        req = {
          session: {
            cumulativeFullAnswers: {},
            switches: {},
            pathConfig: "existing path from session",
            save: (cb) => {
              cb();
            }
          },
          body: "body",
          params: {
            originator: "la-selector"
          }
        };

        res = {
          redirect: jest.fn()
        };

        next = jest.fn();

        handler(req, res, next);
      });

      it("Should call redirect", () => {
        expect(res.redirect).toBeCalledWith("https://www.test.com");
      });
    });

    describe("given that req.session.save throws an error", () => {
      let req, res, next;
      beforeEach(() => {
        continueController.mockImplementation(() => ({
          validatorErrors: {},
          redirectRoute: "/submit",
          cumulativeFullAnswers: {
            new: "answers"
          },
          switches: { exampleSwitch: true }
        }));

        next = jest.fn();
        handler = router.post.mock.calls[0][1];

        req = {
          session: {
            cumulativeFullAnswers: {},
            switches: {},
            pathConfig: { path: "existing path from session" },
            save: (cb) => {
              cb("session save error");
            }
          },
          body: "body",
          params: {
            originator: "originator"
          }
        };

        res = {
          redirect: jest.fn()
        };

        handler(req, res, next);
      });

      it("Should throw an error", () => {
        expect(next).toBeCalledWith("session save error");
      });
    });
  });
});
