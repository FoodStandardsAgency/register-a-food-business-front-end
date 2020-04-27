jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn(),
  })),
}));
jest.mock("../services/data-transform.service");
jest.mock("../next", () => ({
  Next: {
    render: jest.fn(),
  },
}));
jest.mock("../connectors/config-db/config-db.connector");
jest.mock("../services/browser-support.service");

const { Next } = require("../next");
const { newRouter } = require("./new.route");
const {
  transformAnswersForSummary,
} = require("../services/data-transform.service");
const {
  getPathConfigByVersion,
  getLocalCouncils,
  getCouncilData,
} = require("../connectors/config-db/config-db.connector");
const { getBrowserInfo } = require("../services/browser-support.service");

describe("New route: ", () => {
  let router, handler;
  beforeEach(() => {
    jest.clearAllMocks();
    router = newRouter();
    getPathConfigByVersion.mockImplementation(
      () => "fetched path from either cache or DB"
    );
    getLocalCouncils.mockImplementation(() => Promise.resolve(["purbeck"]));
    getBrowserInfo.mockImplementation((req) => () => {
      return {
        browser: "chrome",
        browserVersion: "70.0.12",
        isSupported: true,
      };
    });
    getCouncilData.mockImplementation(() => ({
      country: "northern-ireland",
      local_council: "Belfast Council",
    }));
  });

  describe("GET to /new/:lc/page", () => {
    describe("When req.session.council and req.session.pathConfig are both undefined and page is not index", () => {
      let req, res;

      beforeEach(async () => {
        handler = router.get.mock.calls[0][1];
        req = {
          session: {
            regenerate: (cb) => {
              cb();
            },
          },
          params: {
            lc: "purbeck",
            page: "operator-type",
          },
          headers: {
            "user-agent":
              "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
          },
        };

        res = "res";

        await handler(req, res);
      });

      it("Should set req.session.council", () => {
        expect(req.session.council).toEqual("purbeck");
      });

      it("Should set req.session.pathConfig", () => {
        expect(req.session.pathConfig).toBe(
          "fetched path from either cache or DB"
        );
      });

      it("Should set req.session.country", () => {
        expect(req.session.country).toEqual("northern-ireland");
      });

      it("Should set req.session.lcName", () => {
        expect(req.session.lcName).toEqual("Belfast Council");
      });

      it("Should call Next.render", () => {
        expect(Next.render).toBeCalled();
      });
    });

    describe("When req.session.council and req.session.pathConfig are both defined", () => {
      let req, res;

      beforeEach(() => {
        handler = router.get.mock.calls[0][1];
        req = {
          session: {
            council: "purbeck",
            pathConfig: "existing path from session",
            regenerate: (cb) => {
              cb();
            },
          },
          params: {
            page: "new page",
            lc: "purbeck",
          },
          headers: {
            "user-agent":
              "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
          },
        };

        res = "res";

        handler(req, res);
      });

      it("Should call Next.render with page", () => {
        expect(Next.render).toBeCalledWith(req, res, "/new page");
      });

      it("Should not change the path", () => {
        expect(req.session.pathConfig).toBe("existing path from session");
      });

      describe("When page is /index", () => {
        beforeEach(async () => {
          handler = router.get.mock.calls[0][1];
          req = {
            session: {
              council: "purbeck",
              pathConfig: "existing path from session",
              regenerate: (cb) => {
                cb();
              },
            },
            params: {
              page: "index",
              lc: "purbeck",
            },
            headers: {
              "user-agent":
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
            },
          };

          res = "res";

          await handler(req, res);
        });

        it("Should fetch a new version of the path", () => {
          expect(req.session.pathConfig).toBe(
            "fetched path from either cache or DB"
          );
        });
      });

      describe("When page is registration-summary", () => {
        beforeEach(async () => {
          transformAnswersForSummary.mockImplementation(() => ({
            example: "data",
          }));
          handler = router.get.mock.calls[0][1];
          req = {
            session: {
              council: "purbeck",
              save: (cb) => {
                cb();
              },
            },
            params: {
              page: "registration-summary",
              lc: "purbeck",
            },
            headers: {
              "user-agent":
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
            },
          };

          res = "res";

          await handler(req, res);
        });

        it("Should call Next.render with page", () => {
          expect(Next.render).toBeCalledWith(
            expect.anything(),
            res,
            "/registration-summary"
          );
        });

        it("Should set session.transformedData", () => {
          expect(req.session.transformedData).toEqual({
            example: "data",
          });
        });
      });
    });

    describe("When req.params.page is not defined", () => {
      let req, res;
      beforeEach(async () => {
        handler = router.get.mock.calls[0][1];
        req = {
          session: {
            council: "purbeck",
            regenerate: (cb) => {
              cb();
            },
          },
          params: {
            lc: "purbeck",
          },
          headers: {
            "user-agent":
              "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
          },
        };

        res = "res";

        await handler(req, res);
      });

      it("Should call Next.render with index", () => {
        expect(Next.render).toBeCalledWith(req, res, "/index");
      });

      it("Should set req.session.country", () => {
        expect(req.session.country).toEqual("northern-ireland");
      });

      it("Should set req.session.lcName", () => {
        expect(req.session.lcName).toEqual("Belfast Council");
      });
    });

    describe("When req.params.lc is not allowed", () => {
      let req, res;

      beforeEach(() => {
        handler = router.get.mock.calls[0][1];
        req = {
          session: {
            council: "not a supported council",
            regenerate: (cb) => {
              cb();
            },
          },
          params: {
            lc: "not a supported council",
          },
          headers: {
            "user-agent":
              "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
          },
        };

        res = "res";

        handler(req, res);
      });

      it("Should call Next.render with unsupported-council", () => {
        expect(Next.render).toBeCalledWith(req, res, "/unsupported-council");
      });
    });
  });
});
