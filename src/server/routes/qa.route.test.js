jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn()
  }))
}));
jest.mock("../config", () => ({
  QA_KEY: "abcd"
}));
const { qaRouter } = require("./qa.route");

describe("QA Route: ", () => {
  let router, handler;
  beforeEach(() => {
    router = qaRouter();
  });

  describe("GET to /qa/:target", () => {
    describe("with QA_KEY", () => {
      let res, req;
      beforeEach(() => {
        handler = router.get.mock.calls[0][1];

        req = {
          session: {
            council: "original-council",
            save: cb => {
              cb();
            }
          },
          query: {
            QA_KEY: "abcd",
            registration_role: "Representative",
            operator_type: "A company"
          },
          params: {
            lc: "cardiff",
            target: "registration-summary"
          }
        };
        res = {
          redirect: jest.fn()
        };
        handler(req, res);
      });

      it("Should set session to the request query", () => {
        expect(req.session.cumulativeFullAnswers).toEqual(req.query);
      });

      it("Should set session.council to the lc param", () => {
        expect(req.session.council).toEqual(req.params.lc);
      });

      it("Should redirect to registration summary page", () => {
        expect(res.redirect).toBeCalledWith(
          "/new/cardiff/registration-summary"
        );
      });
    });

    describe("without QA_KEY", () => {
      let res, req;
      beforeEach(() => {
        handler = router.get.mock.calls[0][1];

        req = {
          session: {
            save: cb => {
              cb();
            }
          },
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
});
