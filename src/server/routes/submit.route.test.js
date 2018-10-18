jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn()
  }))
}));
jest.mock("../controllers/submit.controller");
const submitController = require("../controllers/submit.controller");
const { submitRouter } = require("./submit.route");

describe("Submit route: ", () => {
  const lcConfig = {
    hygiene: {
      code: 4221,
      local_council: "District Council",
      local_council_notify_emails: ["fsatestemail.valid@gmail.com"],
      local_council_email: "fsatestemail.valid@gmail.com"
    },
    standards: {
      code: 4226,
      local_council: "County Council",
      local_council_notify_emails: ["fsatestemail.valid@gmail.com"],
      local_council_email: "fsatestemail.valid@gmail.com"
    }
  };
  let router, handler;
  beforeEach(() => {
    router = submitRouter();
  });

  describe("GET to /submit", () => {
    describe("When redirect route is not back", () => {
      let res, req;

      beforeEach(() => {
        submitController.mockImplementation(() => ({
          redirectRoute: "/summary-confirmation",
          submissionDate: "date",
          fsaRegistrationNumber: "12345678",
          emailFbo: { recipient: "fbo@example.com", success: true },
          lcConfig: lcConfig
        }));

        handler = router.get.mock.calls[0][1];

        req = {
          session: {
            cumulativeAnswers: {
              some: "answers"
            },
            council: "cardiff",
            addressLookups: ["1"],
            pathConfig: { _id: "1.0.0" },
            save: cb => {
              cb();
            }
          }
        };
        res = {
          redirect: jest.fn()
        };
        handler(req, res);
      });

      it("Should call submitController with the correct args", () => {
        expect(submitController).toHaveBeenCalledWith(
          "cardiff",
          {
            some: "answers"
          },
          ["1"],
          "1.0.0"
        );
      });

      it("Should update session", () => {
        expect(req.session.submissionDate).toEqual("date");
        expect(req.session.fsaRegistrationNumber).toEqual("12345678");
        expect(req.session.emailFbo.recipient).toEqual("fbo@example.com");
        expect(req.session.emailFbo.success).toEqual(true);
        expect(req.session.lcConfig).toEqual(lcConfig);
      });

      it("Should set redirect to response", () => {
        expect(res.redirect).toBeCalledWith(
          "/new/cardiff/summary-confirmation"
        );
      });
    });

    describe("When redirect route is back", () => {
      let res, req;

      beforeEach(() => {
        submitController.mockImplementation(() => ({
          redirectRoute: "back",
          submissionDate: "date",
          fsaRegistrationNumber: "12345678",
          emailFbo: { recipient: "fbo@example.com", success: true },
          lcConfig: lcConfig
        }));

        handler = router.get.mock.calls[0][1];

        req = {
          session: {
            cumulativeAnswers: {
              some: "answers"
            },
            council: "cardiff",
            addressLookups: ["1"],
            pathConfig: { _id: "1.0.0" },
            save: cb => {
              cb();
            }
          }
        };
        res = {
          redirect: jest.fn()
        };
        handler(req, res);
      });

      it("Should set redirect to response", () => {
        expect(res.redirect).toBeCalledWith("back");
      });
    });

    describe("When session.save throws an error", () => {
      let response, res, req;

      beforeEach(async () => {
        submitController.mockImplementation(() => ({
          redirectRoute: "back",
          submissionDate: "date",
          fsaRegistrationNumber: "12345678",
          emailFbo: { recipient: "fbo@example.com", success: true },
          lcConfig: lcConfig
        }));

        handler = router.get.mock.calls[0][1];

        req = {
          session: {
            cumulativeAnswers: {
              some: "answers"
            },
            council: "cardiff",
            addressLookups: ["1"],
            pathConfig: { _id: "1.0.0" },
            save: cb => {
              cb("session save error");
            }
          }
        };
        res = {
          redirect: jest.fn()
        };
        try {
          await handler(req, res);
        } catch (err) {
          response = err;
        }
      });

      it("should throw a session save error", () => {
        expect(response).toBe("session save error");
      });
    });
  });
});
