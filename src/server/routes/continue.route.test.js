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
  describe("POST to /continue/:originator/:editMode?", () => {
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
          council: "council"
        },
        body: "body",
        params: {
          originator: "originator",
          editMode: "false"
        }
      };

      res = {
        redirect: jest.fn()
      };

      handler(req, res);
    });

    it("Should call continueController with currentPage, cumulativeAnswers, body, switches, and editMode", () => {
      expect(continueController).toHaveBeenCalledWith(
        "/originator",
        {},
        "body",
        {},
        false
      );
    });

    it("Should update session", () => {
      expect(req.session.cumulativeAnswers).toEqual({ new: "answers" });
      expect(req.session.switches).toEqual({ exampleSwitch: true });
    });

    it("Should redirect to next page", () => {
      expect(res.redirect).toBeCalledWith("/new/council/newPage");
    });

    describe("given that editMode is on", () => {
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
            council: "council"
          },
          body: "body",
          params: {
            originator: "originator",
            editMode: "true"
          }
        };

        res = {
          redirect: jest.fn()
        };

        handler(req, res);
      });

      it("Should call continueController with editMode on", () => {
        expect(continueController).toHaveBeenCalledWith(
          "/originator",
          {},
          "body",
          {},
          true
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
  });
});
