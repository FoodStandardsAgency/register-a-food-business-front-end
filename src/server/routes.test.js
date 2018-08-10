require("dotenv").config();

jest.mock("./next", () => ({
  handle: jest.fn()
}));

jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn()
  }))
}));

jest.mock("./config", () => ({
  QA_KEY: "abcd"
}));

jest.mock("./controllers/continue.controller");
jest.mock("./controllers/back.controller");
jest.mock("./controllers/submit.controller");
jest.mock("./controllers/switches.controller");
jest.mock("./controllers/find-address.controller");

const { handle } = require("./next");
const continueController = require("./controllers/continue.controller");
const backController = require("./controllers/back.controller");
const submitController = require("./controllers/submit.controller");
const switchesController = require("./controllers/switches.controller");
const findAddressController = require("./controllers/find-address.controller");

const routes = require("./routes");

describe("Router: ", () => {
  let router, handler;
  beforeEach(() => {
    router = routes();
  });

  afterEach(() => jest.clearAllMocks());

  describe("Should set up: ", () => {
    it("should return router object", () => {
      expect(typeof router).toBe("object");
      expect(router.post).toBeDefined();
      expect(router.get).toBeDefined();
    });

    it("should set up continue route", () => {
      expect(router.post.mock.calls[0][0]).toBe(
        "/continue/:originator/:editMode?"
      );
    });

    it("should set up back route", () => {
      expect(router.get.mock.calls[0][0]).toBe("/back/:originator");
    });

    it("should set up submit route", () => {
      expect(router.get.mock.calls[1][0]).toBe("/submit");
    });

    it("should set up QA route", () => {
      expect(router.get.mock.calls[2][0]).toBe("/qa/:target");
    });

    it("should set up switches route", () => {
      expect(router.post.mock.calls[1][0]).toBe(
        "/switches/:switchName/:action/:originator"
      );
    });

    it("should set up edit route", () => {
      expect(router.get.mock.calls[3][0]).toBe("/edit/:target");
    });

    it("should set up findaddress route", () => {
      expect(router.post.mock.calls[2][0]).toBe("/findaddress/:originator");
    });

    it("should set up cleansession route", () => {
      expect(router.get.mock.calls[4][0]).toBe("/cleansession");
    });

    it("should set up generic Next route", () => {
      expect(router.get.mock.calls[5][0]).toBe("*");
    });
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
          switches: {}
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
      expect(res.redirect).toBeCalledWith("/newPage");
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
            switches: {}
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
        expect(res.redirect).toBeCalledWith("/newPage");
      });
    });
  });

  describe("GET to /back/:originator", () => {
    let req, res;

    beforeEach(() => {
      backController.mockImplementation(() => "/previousPage");

      handler = router.get.mock.calls[0][1];

      req = {
        session: {
          cumulativeAnswers: {}
        },
        params: {
          originator: "originator"
        }
      };

      res = {
        redirect: jest.fn()
      };

      handler(req, res);
    });

    it("Should call backController with currentPage, cumulativeAnswers", () => {
      expect(backController).toHaveBeenCalledWith("/originator", {});
    });

    it("Should redirect to previous page", () => {
      expect(res.redirect).toBeCalledWith("/previousPage");
    });
  });

  describe("GET to /submit", () => {
    let res, req;
    beforeEach(() => {
      submitController.mockImplementation(() => ({
        submissionErrors: {},
        redirectRoute: "/summary-confirmation",
        submissionDate: "date",
        fsaRegistrationNumber: "12345678"
      }));

      handler = router.get.mock.calls[1][1];

      req = {
        session: {
          cumulativeAnswers: {
            some: "answers"
          },
          addressLookups: ["1"]
        }
      };
      res = {
        redirect: jest.fn()
      };
      handler(req, res);
    });

    it("Should call submitController with cumulativeAnswers", () => {
      expect(submitController).toHaveBeenCalledWith(
        {
          some: "answers"
        },
        ["1"]
      );
    });

    it("Should update session", () => {
      expect(req.session.submissionDate).toEqual("date");
      expect(req.session.fsaRegistrationNumber).toEqual("12345678");
    });

    it("Should set redirect to response", () => {
      expect(res.redirect).toBeCalledWith("/summary-confirmation");
    });
  });

  describe("GET to /qa/:target", () => {
    describe("with QA_KEY", () => {
      let res, req;
      beforeEach(() => {
        handler = router.get.mock.calls[2][1];

        req = {
          session: {},
          query: {
            QA_KEY: "abcd",
            registration_role: "Representative",
            operator_type: "A company"
          },
          params: {
            target: "registration-summary"
          }
        };
        res = {
          redirect: jest.fn()
        };
        handler(req, res);
      });

      it("Should set session to the request query", () => {
        expect(req.session.cumulativeAnswers).toEqual(req.query);
      });

      it("Should redirect to registration summary page", () => {
        expect(res.redirect).toBeCalledWith("/registration-summary");
      });
    });

    describe("without QA_KEY", () => {
      let res, req;
      beforeEach(() => {
        handler = router.get.mock.calls[2][1];

        req = {
          session: {},
          query: {
            QA_KEY: null,
            registration_role: "Representative",
            operator_type: "A company"
          }
        };

        res = {
          status: jest.fn(),
          send: jest.fn(),
          redirect: jest.fn()
        };
        handler(req, res);
      });

      it("Should return a 403 status", () => {
        expect(res.status).toBeCalledWith(403);
      });
    });
  });

  describe("POST to /switches/:switchName/:action/:originator", () => {
    const req = {
      session: { switches: {} },
      params: {
        switchName: "exampleSwitch",
        action: "on",
        originator: "/mock-page-1"
      }
    };
    const res = {
      redirect: jest.fn()
    };

    beforeEach(() => {
      switchesController.mockImplementation(() => ({
        cumulativeAnswers: { example: "answer" },
        newSwitchState: true
      }));
      handler = router.post.mock.calls[1][1];
      handler(req, res);
    });

    it("Should redirect to the previous page", () => {
      expect(res.redirect).toBeCalledWith("back");
    });

    it("Should update session", () => {
      expect(req.session.cumulativeAnswers).toEqual({ example: "answer" });
      expect(req.session.switches).toEqual({ exampleSwitch: true });
    });

    describe("Given there is no switches object", () => {
      beforeEach(() => {
        req.session.switches = undefined;
        handler(req, res);
      });

      it("Should redirect to the previous page", () => {
        expect(res.redirect).toBeCalledWith("back");
      });
    });
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
      handler = router.get.mock.calls[3][1];
      handler(req, res);
    });

    it("Should call res.redirect with target of examplePage and a query of edit=on", () => {
      expect(res.redirect).toHaveBeenCalledWith("/examplePage?edit=on");
    });
  });

  describe("POST to /findaddress/:originator", () => {
    const req = {
      session: {
        cumulativeAnswers: {},
        addressLookups: { some_page: [] }
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
      handler = router.post.mock.calls[2][1];
      handler(req, res);
    });

    it("Should redirect to the redirectRoute page", () => {
      expect(res.redirect).toBeCalledWith("/another-page");
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

  describe("GET to /cleansession", () => {
    describe("given an error occurs on session destroy", () => {
      const req = {
        session: {
          example: "value",
          destroy: jest.fn(callback => callback("this is an error"))
        }
      };

      const res = {
        redirect: jest.fn()
      };

      beforeEach(() => {
        handler = router.get.mock.calls[4][1];
        handler(req, res);
      });

      it("Should not have cleared the session", () => {
        expect(req.session.example).toEqual("value");
      });

      it("Should call res.redirect with target of '/'", () => {
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
          })
        }
      };

      const res = {
        redirect: jest.fn()
      };

      beforeEach(() => {
        handler = router.get.mock.calls[4][1];
        handler(req, res);
      });

      it("Should set the session to be an empty object", () => {
        expect(req.session.example).not.toBeDefined();
      });

      it("Should call res.redirect with target of '/'", () => {
        expect(res.redirect).toHaveBeenCalledWith("/");
      });
    });
  });

  describe("GET to *", () => {
    const req = {
      session: {}
    };

    beforeEach(() => {
      handler = router.get.mock.calls[5][1];

      handler(req, "response");
    });

    it("Should call getRequestHandler", () => {
      expect(handle).toHaveBeenCalledWith(
        {
          session: {}
        },
        "response"
      );
    });
  });
});
