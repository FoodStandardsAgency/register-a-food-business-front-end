jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn()
  }))
}));
jest.mock("../config", () => ({
  QA_KEY: "abcd"
}));
jest.mock("../connectors/config-db/config-db.connector");
const { qaRouter } = require("./qa.route");
const { getCouncilDataByID } = require("../connectors/config-db/config-db.connector");

describe("QA Route: ", () => {
  let router, handler;
  beforeEach(() => {
    router = qaRouter();
  });

  describe("GET to /qa/:target", () => {
    describe("with QA_KEY", () => {
      let res, req, next;
      beforeEach(async () => {
        next = jest.fn();
        handler = router.get.mock.calls[0][1];

        req = {
          session: {
            localAuthority: {},
            save: (cb) => {
              cb();
            }
          },
          query: {
            QA_KEY: "abcd",
            la_id: "8015",
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
        getCouncilDataByID.mockResolvedValue({
          _id: 8015,
          local_council: "Cardiff"
        });
        handler(req, res, next);
      });

      it("Should set session to the request query", () => {
        expect(req.session.cumulativeFullAnswers).toEqual(req.query);
      });

      it("Should set session.localAuthority._id to the la_id query param", () => {
        expect(req.session.localAuthority._id).toEqual(+req.query.la_id);
      });

      it("Should redirect to registration summary page", () => {
        expect(res.redirect).toBeCalledWith("/new/registration-summary");
      });
    });

    describe("without QA_KEY", () => {
      let res, req, next;
      beforeEach(async () => {
        next = jest.fn();
        handler = router.get.mock.calls[0][1];

        req = {
          session: {
            save: (cb) => {
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
        handler(req, res, next);
      });

      it("Should return a 403 status", () => {
        expect(res.status).toBeCalledWith(403);
      });
    });
  });
});
