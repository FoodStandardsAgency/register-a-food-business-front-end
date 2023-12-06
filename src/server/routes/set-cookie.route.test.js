jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn()
  }))
}));
const { setCookieRouter } = require("./set-cookie.route");

describe("Set Cookie route: ", () => {
  let router, handler;
  beforeEach(() => {
    router = setCookieRouter();
  });

  describe("GET to /setcookie/:cookieName/:newValue", () => {
    describe("When cookieName is 'acceptAllCookies'", () => {
      describe("When newValue is 'true'", () => {
        let res, req;

        beforeEach(() => {
          handler = router.get.mock.calls[0][1];
          req = {
            params: {
              cookieName: "acceptAllCookies",
              newValue: "true"
            }
          };
          res = {
            redirect: jest.fn(),
            cookie: jest.fn()
          };
          res.cookie.mockClear();
          res.redirect.mockClear();
          handler(req, res);
        });

        it("should call res.cookie once with 'acceptAllCookies', the new value, a max age of 25 days", () => {
          expect(res.cookie).toHaveBeenCalledTimes(1);
          expect(res.cookie).toHaveBeenLastCalledWith("acceptAllCookies", "true", {
            maxAge: 2160000000
          });
        });

        it("should call res.redirect with 'back'", () => {
          expect(res.redirect).toHaveBeenCalledWith("back");
        });
      });

      describe("When newValue is 'false'", () => {
        let res, req;

        beforeEach(() => {
          process.env.COOKIE_SECURE = "true";
          handler = router.get.mock.calls[0][1];
          req = {
            params: {
              cookieName: "acceptAllCookies",
              newValue: "false"
            },
            cookies: {
              _ga: "thisShouldBeDeleted",
              _gid: "thisShouldBeDeleted",
              some_cookie: "thisShouldBePersisted"
            }
          };
          res = {
            redirect: jest.fn(),
            cookie: jest.fn()
          };
          res.cookie.mockClear();
          res.redirect.mockClear();
          handler(req, res);
        });

        it("should call res.cookie with 'acceptAllCookies', the new value, a max age of 25 days", () => {
          expect(res.cookie).toHaveBeenCalledWith("acceptAllCookies", "false", {
            maxAge: 2160000000
          });
        });

        it("should call res.cookie once more for each each cookie name beginning with '_g', with the cookie name, 'deleted' as the value, and a maxAge of zero", () => {
          expect(res.cookie).toHaveBeenCalledTimes(3);
          expect(res.cookie).toHaveBeenCalledWith("_ga", "deleted", {
            maxAge: 0
          });
          expect(res.cookie).toHaveBeenCalledWith("_gid", "deleted", {
            maxAge: 0
          });
        });

        it("should call res.redirect with 'back'", () => {
          expect(res.redirect).toHaveBeenCalledWith("back");
        });
      });
    });

    describe("When cookieName is not recognised", () => {
      let res, req;

      beforeEach(() => {
        handler = router.get.mock.calls[0][1];
        req = {
          params: { cookieName: "notRecognised", newValue: "true" }
        };
        res = {
          redirect: jest.fn(),
          cookie: jest.fn()
        };
        res.cookie.mockClear();
        res.redirect.mockClear();
        handler(req, res);
      });

      it("should not call res.cookie", () => {
        expect(res.cookie).toHaveBeenCalledTimes(0);
      });

      it("should call res.redirect with 'back'", () => {
        expect(res.redirect).toHaveBeenCalledWith("back");
      });
    });
  });
});
