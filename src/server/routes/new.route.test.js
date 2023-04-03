jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn()
  }))
}));
jest.mock("../services/data-transform.service");
jest.mock("../server", () => ({
  app: {
    render: jest.fn()
  }
}));
jest.mock("../connectors/config-db/config-db.connector");
jest.mock("../services/browser-support.service");

const { newRouter } = require("./new.route");
const {
  transformAnswersForSummary
} = require("../services/data-transform.service");
const {
  getPathConfigByVersion
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
    getBrowserInfo.mockImplementation((req) => () => {
      return {
        browser: "chrome",
        browserVersion: "70.0.12",
        isSupported: true
      };
    });
  });

  describe("GET to /new/page", () => {
    describe("When req.session.council and req.session.pathConfig are both undefined and page is not index", () => {
      let req, res;

      beforeEach(async () => {
        handler = router.get.mock.calls[0][1];
        req = {
          session: {
            regenerate: (cb) => {
              cb();
            }
          },
          params: {
            page: "operator-type"
          },
          csrfToken: jest.fn(),
          url: "test/test",
          headers: {
            "user-agent":
              "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0"
          }
        };

        res = {
          redirect: jest.fn(),
          render: jest.fn()
        };

        await handler(req, res);
      });

      it("Should set req.session.pathConfig", () => {
        expect(req.session.pathConfig).toBe(
          "fetched path from either cache or DB"
        );
      });

      it("Should call res.render", () => {
        expect(res.render).toBeCalled();
      });
    });

    describe("When req.session.council and req.session.pathConfig are both defined", () => {
      let req, res;

      beforeEach(() => {
        handler = router.get.mock.calls[0][1];
        req = {
          session: {
            pathConfig: "existing path from session",
            regenerate: (cb) => {
              cb();
            }
          },
          params: {
            page: "/new page"
          },
          csrfToken: jest.fn(),
          url: "test/test",
          headers: {
            "user-agent":
              "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0"
          }
        };

        res = {
          render: jest.fn()
        };

        handler(req, res);
      });

      it("Should call res.render with page", () => {
        expect(res.render).toBeCalledWith("/new page", expect.anything());
      });

      it("Should not change the path", () => {
        expect(req.session.pathConfig).toBe("existing path from session");
      });

      describe("When page is /index", () => {
        beforeEach(async () => {
          handler = router.get.mock.calls[0][1];
          req = {
            session: {
              pathConfig: "existing path from session",
              regenerate: (cb) => {
                cb();
              }
            },
            params: {
              page: "index"
            },
            csrfToken: jest.fn(),
            url: "test/test",
            headers: {
              "user-agent":
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0"
            }
          };

          res = {
            redirect: jest.fn(),
            render: jest.fn()
          };

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
            example: "data"
          }));
          handler = router.get.mock.calls[0][1];
          req = {
            session: {
              save: (cb) => {
                cb();
              }
            },
            params: {
              page: "registration-summary"
            },
            csrfToken: jest.fn(),
            url: "test/test",
            headers: {
              "user-agent":
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0"
            }
          };

          res = {
            redirect: jest.fn(),
            render: jest.fn()
          };

          await handler(req, res);
        });

        it("Should call res.render with page", () => {
          expect(res.render).toBeCalledWith(
            "registration-summary",
            expect.anything()
          );
        });

        it("Should set session.transformedData", () => {
          expect(req.session.transformedData).toEqual({
            example: "data"
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
            regenerate: (cb) => {
              cb();
            }
          },
          params: {},
          csrfToken: jest.fn(),
          url: "test/test",
          headers: {
            "user-agent":
              "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0"
          }
        };

        res = {
          redirect: jest.fn(),
          render: jest.fn()
        };

        await handler(req, res);
      });

      it("Should call res.render with index", () => {
        expect(res.render).toBeCalledWith("index", expect.anything());
      });
    });

    describe("when an error is thrown", () => {
      let next;
      beforeEach(async () => {
        transformAnswersForSummary.mockImplementation(() => {
          throw new Error("error");
        });
        next = jest.fn();
        handler = router.get.mock.calls[0][1];
        req = {
          session: {
            save: (cb) => {
              cb();
            }
          },
          params: {
            page: "registration-summary"
          },
          csrfToken: jest.fn(),
          url: "test/test",
          headers: {
            "user-agent":
              "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0"
          }
        };

        res = {
          redirect: jest.fn(),
          render: jest.fn()
        };

        handler(req, res, next);
      });
      it("should call next with error", () => {
        expect(next).toBeCalledWith(new Error("error"));
      });
    });
  });
});
