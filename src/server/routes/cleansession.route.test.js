jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn()
  }))
}));

const { cleansessionRouter } = require("./cleansession.route");

describe("Cleansession route: ", () => {
  let router, handler;
  beforeEach(() => {
    router = cleansessionRouter();
  });

  describe("GET to /cleansession", () => {
    describe("given an error occurs on session regenerate", () => {
      const req = {
        session: {
          regenerate: jest.fn(callback => callback("this is an error"))
        }
      };

      const res = {
        json: jest.fn()
      };

      beforeEach(() => {
        handler = router.get.mock.calls[0][1];
        handler(req, res);
      });

      it("Should call res.redirect with target of 'back'", () => {
        expect(res.json).toHaveBeenCalledWith({
          error: "Session regenerate failed."
        });
      });
    });

    describe("given session destroy is successful and no errors occur", () => {
      const req = {
        session: {
          regenerate: jest.fn(callback => {
            callback();
          })
        },
        sessionID: "123456"
      };

      const res = {
        set: jest.fn(),
        json: jest.fn()
      };

      beforeEach(() => {
        handler = router.get.mock.calls[0][1];
        handler(req, res);
      });

      it("Should call res.set with 'session_id' and the actual session ID as args", () => {
        expect(res.set).toHaveBeenCalledWith("session_id", req.sessionID);
      });

      it("Should call res.json with an object including the session ID", () => {
        expect(res.json).toHaveBeenCalledWith({ session_id: req.sessionID });
      });
    });
  });
});
