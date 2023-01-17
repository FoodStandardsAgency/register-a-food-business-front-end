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
  const laConfig = {
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
    describe("When redirect route is not registration summary", () => {
      let res, req;

      beforeEach(() => {
        submitController.mockImplementation(() => ({
          redirectRoute: "/summary-confirmation",
          submissionDate: "date",
          fsaRegistrationNumber: "12345678",
          emailFbo: { recipient: "fbo@example.com", success: true },
          laConfig: laConfig,
          allValidationErrors: {
            some: "error"
          }
        }));

        handler = router.get.mock.calls[0][1];

        req = {
          session: {
            cumulativeFullAnswers: {
              some: "answers"
            },
            language: "en",
            council: "cardiff",
            addressLookups: ["1"],
            pathConfig: { _id: "1.0.0", path: { some: "path" } },
            id: "S3S510NI6",
            save: (cb) => {
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
          {
            some: "answers"
          },
          ["1"],
          "1.0.0",
          "S3S510NI6",
          "en",
          {
            some: "path"
          }
        );
      });

      it("Should update session", () => {
        expect(req.session.submissionDate).toEqual("date");
        expect(req.session.fsaRegistrationNumber).toEqual("12345678");
        expect(req.session.emailFbo.recipient).toEqual("fbo@example.com");
        expect(req.session.emailFbo.success).toEqual(true);
        expect(req.session.laConfig).toEqual(laConfig);
      });

      it("Should set redirect to response", () => {
        expect(res.redirect).toBeCalledWith("/new/summary-confirmation");
      });
    });

    describe("When redirect route is registration-summary", () => {
      let res, req;

      beforeEach(() => {
        submitController.mockImplementation(() => ({
          redirectRoute: "/registration-summary",
          submissionError: { some: "error" },
          allValidationErrors: { some: "errors" }
        }));

        handler = router.get.mock.calls[0][1];

        req = {
          session: {
            cumulativeFullAnswers: {
              some: "answers"
            },
            language: "en",
            council: "cardiff",
            addressLookups: ["1"],
            pathConfig: { _id: "1.0.0", path: { some: "path" } },
            save: (cb) => {
              cb();
            }
          }
        };
        res = {
          redirect: jest.fn()
        };
        handler(req, res);
      });

      it("Should update session with submissionError and allValidationErrors", () => {
        expect(req.session.submissionError).toEqual({ some: "error" });
        expect(req.session.allValidationErrors).toEqual({ some: "errors" });
      });

      it("Should set redirect to response", () => {
        expect(res.redirect).toBeCalledWith("/new/registration-summary");
      });
    });

    describe("When session.save throws an error", () => {
      let res, req, next;
      next = jest.fn();

      beforeEach(async () => {
        submitController.mockImplementation(() => ({
          redirectRoute: "back",
          submissionDate: "date",
          fsaRegistrationNumber: "12345678",
          emailFbo: { recipient: "fbo@example.com", success: true },
          laConfig: laConfig
        }));

        handler = router.get.mock.calls[0][1];

        req = {
          session: {
            cumulativeFullAnswers: {
              some: "answers"
            },
            language: "en",
            council: "cardiff",
            addressLookups: ["1"],
            pathConfig: { _id: "1.0.0" },
            save: (cb) => {
              cb("session save error");
            }
          }
        };
        res = {
          redirect: jest.fn()
        };
        await handler(req, res, next);
      });

      it("should throw a session save error", () => {
        expect(next).toBeCalledWith("session save error");
      });
    });

    describe("when an error is thrown", () => {
      let next;
      beforeEach(async () => {
        submitController.mockImplementation(() => {
          throw new Error("error");
        });
        next = jest.fn();
        handler = router.get.mock.calls[0][1];
        req = {
          session: {
            cumulativeFullAnswers: {
              some: "answers"
            },
            language: "en",
            council: "cardiff",
            addressLookups: ["1"],
            pathConfig: { _id: "1.0.0" },
            save: () => {}
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
