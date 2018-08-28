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
  let router, handler;
  beforeEach(() => {
    router = submitRouter();
  });

  describe("GET to /submit", () => {
    let res, req;
    beforeEach(() => {
      submitController.mockImplementation(() => ({
        submissionErrors: {},
        redirectRoute: "/summary-confirmation",
        submissionDate: "date",
        fsaRegistrationNumber: "12345678",
        recipient: "blank@blank.com"
      }));

      handler = router.get.mock.calls[0][1];

      req = {
        session: {
          cumulativeAnswers: {
            some: "answers"
          },
          council: "council",
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
      expect(req.session.recipient).toEqual("blank@blank.com");
    });

    it("Should set redirect to response", () => {
      expect(res.redirect).toBeCalledWith("/new/council/summary-confirmation");
    });
  });
});
