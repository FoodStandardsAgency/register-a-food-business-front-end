jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn()
  }))
}));
jest.mock("../controllers/partner-details.controller");

const {
  partnerDetailsContinue,
  partnerDetailsSave,
  partnerDetailsDelete
} = require("../controllers/partner-details.controller");
const { partnerDetailsRouter } = require("./partner-details.route");

describe("Partner Details Route: ", () => {
  let router, handler;
  beforeEach(() => {
    router = partnerDetailsRouter();
  });

  describe("POST to /save", () => {
    let req, res;
    describe("Add new partner", () => {
      beforeEach(() => {
        partnerDetailsSave.mockImplementation(() => ({
          validationErrors: {},
          redirectRoute: "/page",
          cumulativeFullAnswers: {
            partners: ["One First", "Second Two"]
          },
          switches: { exampleSwitch: true }
        }));

        handler = router.post.mock.calls[0][1];

        req = {
          session: {
            cumulativeFullAnswers: {
              partners: ["One First", "Second Two"]
            },
            switches: {},
            council: "council",
            pathConfig: { path: "existing path from session" },
            save: (cb) => {
              cb();
            }
          },
          csrfToken: jest.fn(),
          url: "test/test",
          get: (value) => "www.test.com/new/thepage?display=true",
          body: "body",
          query: {}
        };

        res = {
          redirect: jest.fn(),
          render: jest.fn()
        };

        handler(req, res);
      });

      it("Should return the correct response", () => {
        expect(partnerDetailsSave).toHaveBeenCalledWith(
          "/thepage",
          {
            partners: ["One First", "Second Two"]
          },
          "body",
          "council",
          false
        );
      });

      it("Should redirector to next page", () => {
        expect(res.redirect).toBeCalledWith("/page");
      });
    });
    describe("Update partner", () => {
      beforeEach(() => {
        partnerDetailsSave.mockImplementation(() => ({
          validationErrors: {},
          redirectRoute: "/new/council/page",
          cumulativeFullAnswers: {
            new: "answers"
          },
          switches: { exampleSwitch: true }
        }));

        handler = router.post.mock.calls[0][1];

        req = {
          session: {
            cumulativeFullAnswers: { targetPartner: "Brian May" },
            switches: {},
            council: "council",
            pathConfig: { path: "existing path from session" },
            save: (cb) => {
              cb();
            }
          },
          csrfToken: jest.fn(),
          url: "test/test",
          get: (value) => "www.test.com/new/thepage?display=true",
          header: {
            Referrer: "www.test.com/new/thepage?display=true"
          },
          query: {}
        };

        res = {
          redirect: jest.fn(),
          render: jest.fn()
        };

        handler(req, res);
      });

      it("Should return the correct response", () => {
        expect(partnerDetailsSave).toHaveBeenCalledWith(
          "/thepage",
          { targetPartner: "Brian May", partners: [] },
          { index: "Brian May" },
          "council",
          false
        );
      });

      it("Should redirect to next page", () => {
        expect(res.redirect).toHaveBeenCalledWith("/new/council/page");
      });
    });
    describe("When session.save throws an error at /partnership/save", () => {
      let response, next;
      next = jest.fn();
      const req = {
        session: {
          cumulativeFullAnswers: {},
          council: "council",
          pathConfig: { path: "existing path from session" },
          save: (cb) => {
            cb("Error saving session");
          }
        },
        csrfToken: jest.fn(),
        url: "test/test",
        body: "body",
        params: {
          targetPartner: "exampleTargetPartner",
          action: "on",
          originator: "/mock-page-1"
        },
        get: (value) => "www.test.com/new/thepage?display=true",
        header: {
          Referrer: "www.test.com/new/thepage?display=true"
        },
        query: {}
      };

      beforeEach(async () => {
        partnerDetailsSave.mockImplementation(() => ({
          validationErrors: {},
          redirectRoute: "/page",
          cumulativeFullAnswers: {
            new: "answers"
          }
        }));

        handler = router.post.mock.calls[0][1];

        const res = {
          redirect: jest.fn(),
          render: jest.fn()
        };
        try {
          await handler(req, res, next);
        } catch (err) {
          response = err;
        }
      });

      it("Shold throw an error", () => {
        expect(next).toBeCalledWith("Error saving session");
      });
    });

    describe("When partners is not defined", () => {
      beforeEach(() => {
        partnerDetailsSave.mockImplementation(() => ({
          validationErrors: {},
          redirectRoute: "/page",
          cumulativeFullAnswers: {
            partners: []
          },
          switches: { exampleSwitch: true }
        }));

        handler = router.post.mock.calls[0][1];

        req = {
          session: {
            cumulativeFullAnswers: {},
            switches: {},
            council: "council",
            pathConfig: { path: "existing path from session" },
            save: (cb) => {
              cb();
            }
          },
          csrfToken: jest.fn(),
          url: "test/test",
          get: (value) => "www.test.com/new/thepage?display=true",
          header: {
            Referrer: "www.test.com/new/thepage?display=true"
          },
          body: "body",
          query: {}
        };

        res = {
          redirect: jest.fn(),
          render: jest.fn()
        };

        handler(req, res);
      });

      it("Should have response contain partners set as empty array", () => {
        expect(partnerDetailsSave).toBeCalledWith(
          "/thepage",
          {
            partners: []
          },
          "body",
          "council",
          false
        );
      });
    });
  });

  describe("GET from /partner-details", () => {
    describe("When it has partners and query", () => {
      let res, req;
      beforeEach(() => {
        handler = router.get.mock.calls[0][1];

        req = {
          session: {
            cumulativeFullAnswers: {
              partners: ["First One", "Second Two"]
            },
            save: (cb) => {
              cb();
            }
          },
          csrfToken: jest.fn(),
          url: "test/test",
          query: {
            id: "1"
          }
        };

        res = {
          redirect: jest.fn(),
          render: jest.fn()
        };

        handler(req, res);
      });

      it("Should set target partner to have a value", () => {
        expect(req.session.cumulativeFullAnswers.targetPartner).toBe(1);
      });
      it("Should have partners", () => {
        expect(req.session.cumulativeFullAnswers.partners).toEqual([
          "First One",
          "Second Two"
        ]);
      });
      it("Should call res.render", () => {
        expect(res.render).toBeCalled();
      });
    });

    describe("When it has no partners and no query", () => {
      let res, req;
      beforeEach(() => {
        handler = router.get.mock.calls[0][1];

        req = {
          session: {
            cumulativeFullAnswers: {},
            save: (cb) => {
              cb();
            }
          },
          csrfToken: jest.fn(),
          url: "test/test",
          query: {}
        };

        res = {
          redirect: jest.fn(),
          render: jest.fn()
        };

        handler(req, res);
      });

      it("Should delete target partner", () => {
        expect(req.session.cumulativeFullAnswers.targetPartner).toBe(undefined);
      });
      it("Should have Partners as an empty array", () => {
        expect(req.session.cumulativeFullAnswers.partners).toEqual([]);
      });
      it("Should call res.render", () => {
        expect(res.render).toBeCalled();
      });
    });

    describe("When targetPartner is set in session but req param is missing", () => {
      let res, req;
      beforeEach(() => {
        handler = router.get.mock.calls[0][1];

        req = {
          session: {
            cumulativeFullAnswers: {
              targetPartner: "Brian",
              partners: ["Brian"]
            },
            save: (cb) => {
              cb();
            }
          },
          csrfToken: jest.fn(),
          url: "test/test",
          query: {}
        };

        res = {
          redirect: jest.fn(),
          render: jest.fn()
        };

        handler(req, res);
      });
      it("Should delete target partner", () => {
        expect(req.session.cumulativeFullAnswers.targetPartner).toBe(undefined);
      });
      it("Should call res.render", () => {
        expect(res.render).toBeCalled();
      });
    });

    describe("When it fails to save the session", () => {
      let res, req, response;
      beforeEach(() => {
        handler = router.get.mock.calls[0][1];

        req = {
          session: {
            cumulativeFullAnswers: {
              partners: ["First One", "Second Two"]
            },
            save: (cb) => {
              cb("session save error");
            }
          },
          csrfToken: jest.fn(),
          url: "test/test",
          query: {
            id: "1"
          }
        };

        res = {
          redirect: jest.fn(),
          render: jest.fn()
        };

        try {
          handler(req, res);
        } catch (err) {
          response = err;
        }
      });

      it("should throw a session save error", () => {
        expect(response).toBe("session save error");
      });
    });
  });

  describe("POST to /delete-partner", () => {
    let res, req;
    describe("When partners provided", () => {
      beforeEach(() => {
        partnerDetailsDelete.mockImplementation(() => ({
          validationErrors: {},
          redirectRoute: "/page",
          cumulativeFullAnswers: {
            partners: ["One First", "Second Two"]
          },
          switches: { exampleSwitch: true }
        }));

        handler = router.post.mock.calls[1][1];

        req = {
          session: {
            council: "council",
            cumulativeFullAnswers: {
              partners: ["One First", "Two Second"]
            },
            save: (cb) => {
              cb();
            }
          },
          csrfToken: jest.fn(),
          url: "test/test",
          get: (value) => "www.test.com/new/thepage?display=true",
          body: {
            example: "property"
          },
          header: {
            Referrer: "www.address.com/new/council/thispage?blah=hello"
          },
          query: {}
        };

        res = {
          redirect: jest.fn(),
          render: jest.fn()
        };

        handler(req, res);
      });
      it("Should call the partner details controller correctly", () => {
        expect(partnerDetailsDelete).toHaveBeenCalledWith(
          { partners: ["One First", "Two Second"] },
          { example: "property" },
          "council",
          false
        );
      });
      it("Should redirect to next page", () => {
        expect(res.redirect).toHaveBeenCalledWith("/page");
      });
    });
    describe("When partners are not provided", () => {
      beforeEach(() => {
        partnerDetailsDelete.mockImplementation(() => ({
          validationErrors: {},
          redirectRoute: "/page",
          cumulativeFullAnswers: {},
          switches: { exampleSwitch: true }
        }));

        handler = router.post.mock.calls[1][1];

        req = {
          session: {
            council: "council",
            cumulativeFullAnswers: {},
            save: (cb) => {
              cb();
            }
          },
          csrfToken: jest.fn(),
          url: "test/test",
          get: (value) => "www.test.com/new/thepage?display=true",
          body: {
            example: "property"
          },
          header: {
            Referrer: "www.address.com/new/council/thispage?blah=hello"
          },
          query: {}
        };

        res = {
          redirect: jest.fn(),
          render: jest.fn()
        };

        handler(req, res);
      });
      it("Should call the partner details controller correctly", () => {
        expect(partnerDetailsDelete).toHaveBeenCalledWith(
          { partners: [] },
          { example: "property" },
          "council",
          false
        );
      });
      it("Should redirect to next page", () => {
        expect(res.redirect).toHaveBeenCalledWith("/page");
      });
    });

    describe("When session.save throws an error at /partnership/delete-partner", () => {
      let response, next;
      next = jest.fn();
      beforeEach(async () => {
        partnerDetailsDelete.mockImplementation(() => ({
          validationErrors: {},
          redirectRoute: "/page",
          cumulativeFullAnswers: {
            partners: ["One First", "Second Two"]
          },
          switches: { exampleSwitch: true }
        }));

        handler = router.post.mock.calls[0][1];

        req = {
          session: {
            council: "council",
            cumulativeFullAnswers: {
              partners: ["One First", "Two Second"]
            },
            save: (cb) => {
              cb("Error saving session");
            }
          },
          csrfToken: jest.fn(),
          url: "test/test",
          get: (value) => "www.test.com/new/thepage?display=true",
          body: {
            example: "property"
          },
          header: {
            Referrer: "www.address.com/new/council/thispage?blah=hello"
          },
          query: {}
        };

        res = {
          redirect: jest.fn(),
          render: jest.fn()
        };
        try {
          await handler(req, res, next);
        } catch (err) {
          response = err;
        }
      });

      it("Should throw an error", () => {
        expect(next).toBeCalledWith("Error saving session");
      });
    });
  });

  describe("POST to /continue", () => {
    let res, req;
    describe("When partners provided", () => {
      beforeEach(() => {
        partnerDetailsContinue.mockImplementation(() => ({
          validationErrors: {},
          redirectRoute: "/page",
          cumulativeFullAnswers: {
            partners: ["One First", "Second Two"]
          },
          switches: {}
        }));

        handler = router.post.mock.calls[2][1];

        req = {
          session: {
            council: "council",
            cumulativeFullAnswers: {
              partners: ["One First", "Two Second"]
            },
            allValidationErrors: [],
            save: (cb) => {
              cb();
            }
          },
          csrfToken: jest.fn(),
          url: "test/test",
          get: (value) => "www.test.com/new/thepage?display=true",
          body: {
            example: "property to ignore"
          },
          header: {
            Referrer: "www.address.com/new/council/thispage?blah=hello"
          },
          query: {}
        };
        res = {
          redirect: jest.fn(),
          render: jest.fn()
        };

        handler(req, res);
      });
      it("Should call the partnerDetailsContinue correctly", () => {
        expect(partnerDetailsContinue).toHaveBeenCalledWith(
          "/thepage",
          { partners: ["One First", "Two Second"] },

          "council",
          false,
          []
        );
      });
      it("Should redirect to next page", () => {
        expect(res.redirect).toHaveBeenCalledWith("/page");
      });
    });
    describe("When partners are invalid", () => {
      beforeEach(() => {
        partnerDetailsContinue.mockImplementation(() => ({
          validationErrors: { partners: "Invalid partners" },
          redirectRoute: "/page",
          cumulativeFullAnswers: { partners: [] },
          switches: {}
        }));

        handler = router.post.mock.calls[2][1];

        req = {
          session: {
            council: "council",
            cumulativeFullAnswers: { partners: [] },
            allValidationErrors: [],
            save: (cb) => {
              cb();
            }
          },
          csrfToken: jest.fn(),
          url: "test/test",
          get: (value) => "www.test.com/new/thepage?display=true",
          body: {
            example: "property"
          },
          header: {
            Referrer: "www.address.com/new/council/thispage?blah=hello"
          },
          query: {}
        };

        res = {
          redirect: jest.fn(),
          render: jest.fn()
        };

        handler(req, res);
      });
      it("Should call the partnerDetailsContinue correctly", () => {
        expect(partnerDetailsContinue).toHaveBeenCalledWith(
          "/thepage",
          { partners: [] },

          "council",
          false,
          []
        );
      });
      it("Should redirect to next page", () => {
        expect(res.redirect).toHaveBeenCalledWith("/page");
      });
    });

    describe("When session.save throws an error at /partnership/continue", () => {
      let response, next;
      next = jest.fn();
      beforeEach(async () => {
        partnerDetailsContinue.mockImplementation(() => ({
          validationErrors: {},
          redirectRoute: "/page",
          cumulativeFullAnswers: {
            partners: ["One First", "Second Two"]
          },
          switches: { exampleSwitch: true }
        }));

        handler = router.post.mock.calls[2][1];

        req = {
          session: {
            council: "council",
            cumulativeFullAnswers: {
              partners: ["One First", "Two Second"]
            },
            save: (cb) => {
              cb("Error saving session");
            }
          },
          csrfToken: jest.fn(),
          url: "test/test",
          get: () => "www.test.com/new/thepage?display=true",
          body: {
            example: "property"
          },
          header: {
            Referrer: "www.address.com/new/council/thispage?blah=hello"
          },
          query: {}
        };

        res = {
          redirect: jest.fn(),
          render: jest.fn()
        };
        try {
          await handler(req, res, next);
        } catch (err) {
          response = err;
        }
      });

      it("Should throw an error", () => {
        expect(next).toBeCalledWith("Error saving session");
      });
    });

    describe("when an error is thrown at /partnership/save", () => {
      let next;
      beforeEach(async () => {
        partnerDetailsSave.mockImplementation(() => {
          throw new Error("error");
        });
        next = jest.fn();
        handler = router.post.mock.calls[0][1];

        req = {
          session: {
            cumulativeFullAnswers: {
              partners: ["One First", "Second Two"]
            },
            switches: {},
            council: "council",
            pathConfig: { path: "existing path from session" },
            save: (cb) => {
              cb();
            }
          },
          csrfToken: jest.fn(),
          url: "test/test",
          get: (value) => "www.test.com/new/thepage?display=true",
          body: "body",
          query: {}
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
    describe("when an error is thrown at /partnership/delete-partner", () => {
      let next;
      beforeEach(async () => {
        partnerDetailsDelete.mockImplementation(() => {
          throw new Error("error");
        });
        next = jest.fn();
        handler = router.post.mock.calls[1][1];

        req = {
          session: {
            council: "council",
            cumulativeFullAnswers: {
              partners: ["One First", "Two Second"]
            },
            save: (cb) => {
              cb();
            }
          },
          csrfToken: jest.fn(),
          url: "test/test",
          get: (value) => "www.test.com/new/thepage?display=true",
          body: {
            example: "property"
          },
          header: {
            Referrer: "www.address.com/new/council/thispage?blah=hello"
          },
          query: {}
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
    describe("when an error is thrown at /partnership/continue", () => {
      let next;
      beforeEach(async () => {
        partnerDetailsContinue.mockImplementation(() => {
          throw new Error("error");
        });
        next = jest.fn();
        handler = router.post.mock.calls[2][1];

        req = {
          session: {
            council: "council",
            cumulativeFullAnswers: {
              partners: ["One First", "Two Second"]
            }
          },
          csrfToken: jest.fn(),
          url: "test/test",
          get: () => "www.test.com/new/thepage?display=true",
          body: {
            example: "property"
          },
          header: {
            Referrer: "www.address.com/new/council/thispage?blah=hello"
          },
          query: {}
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
