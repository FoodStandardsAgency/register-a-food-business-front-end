jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn()
  }))
}));
jest.mock("../controllers/partner-details.controller");
jest.mock("../next", () => ({
  Next: {
    render: jest.fn()
  }
}));
const {
  partnerDetailsContinue,
  partnerDetailsSave,
  partnerDetailsDelete
} = require("../controllers/partner-details.controller");
const { partnerDetailsRouter } = require("./partner-details.route");
const { Next } = require("../next");

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
            partners: [ ]
          },
          switches: { exampleSwitch: true }
        }));

        handler = router.post.mock.calls[0][1];

        req = {
          session: {
            cumulativeFullAnswers: {
              partners: [ ],
              targetPartner: { id: null }
            },
            switches: {},
            council: "council",
            pathConfig: { path: "existing path from session" },
            save: cb => {
              cb();
            }
          },
          get: value => "www.test.com/new/thepage?display=true",
          body: { partner_name: "Brian May" },
          query: {}
        };

        res = {
          redirect: jest.fn()
        };

        handler(req, res);
      });

      it("Should return the correct response", () => {
        expect(partnerDetailsSave).toHaveBeenCalledWith(
          "/thepage",
          {
            partners: [ ],
            targetPartner: { id: null}
          },
          { partner_name: "Brian May" },
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
            partners: [ "Brian May" ]
          },
          switches: { exampleSwitch: true }
        }));

        handler = router.post.mock.calls[0][1];

        req = {
          session: {
            cumulativeFullAnswers: { 
              partners: [ "Brian May" ],
              targetPartner: { id: 0, name: "Brian May" } 
            },
            switches: {},
            council: "council",
            pathConfig: { path: "existing path from session" },
            save: cb => {
              cb();
            }
          },
          get: value => "www.test.com/new/thepage?display=true",
          header: {
            Referrer: "www.test.com/new/thepage?display=true"
          },
          body: { index: 0, partner_name: "Brian April" },
          query: {}
        };

        res = {
          redirect: jest.fn()
        };

        handler(req, res);
      });

      it("Should return the correct response", () => {
        expect(partnerDetailsSave).toHaveBeenCalledWith(
          "/thepage",
          { targetPartner: { id: 0, name: "Brian May" }, partners: [ "Brian May" ] },
          { index: 0, partner_name: "Brian April" },
          "council",
          false
        );
      });

      it("Should redirect to next page", () => {
        expect(res.redirect).toHaveBeenCalledWith("/new/council/page");
      });
    });

    describe("Partner details throws error", () => {
      let response;
      const req = {
        session: {
          cumulativeFullAnswers: {
            partners: [],
            targetPartner: { id: null }
          },
          council: "council",
          pathConfig: { path: "existing path from session" },
          save: cb => {
            cb("save error");
          }
        },
        body: "body",
        params: {
          targetPartner: "exampleTargetPartner",
          action: "on",
          originator: "/mock-page-1"
        },
        get: value => "www.test.com/new/thepage?display=true",
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
          redirect: jest.fn()
        };
        try {
          await handler(req, res);
        } catch (err) {
          response = err;
        }
      });

      it("Shold throw an error", () => {
        expect(response).toBe("save error");
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
            save: cb => {
              cb();
            }
          },
          get: value => "www.test.com/new/thepage?display=true",
          header: {
            Referrer: "www.test.com/new/thepage?display=true"
          },
          body: { index: 0, partner_name: "Brian April" },
          query: {}
        };

        res = {
          redirect: jest.fn()
        };

        handler(req, res);
      });

      it("Should have response contain partners set as empty array", () => {
        expect(partnerDetailsSave).toBeCalledWith(
          "/thepage",
          {
            partners: [ ],
            targetPartner: { id: null }
          },
          { partner_name: "Brian May" },
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
            save: cb => {
              cb();
            }
          },
          query: {
            id: "1"
          }
        };

        res = {
          redirect: jest.fn()
        };

        handler(req, res);
      });

      it("Should set target partner to have a value", () => {
        expect(req.session.cumulativeFullAnswers.targetPartner).toEqual(
          { id: 1, name: "Second Two" }
        );
      });
      it("Should have partners", () => {
        expect(req.session.cumulativeFullAnswers.partners).toEqual([
          "First One",
          "Second Two"
        ]);
      });
      it("Should call Next.render", () => {
        expect(Next.render).toBeCalled();
      });
    });

    describe("When it has no partners and no query", () => {
      let res, req;
      beforeEach(() => {
        handler = router.get.mock.calls[0][1];

        req = {
          session: {
            cumulativeFullAnswers: {},
            save: cb => {
              cb();
            }
          },
          query: {}
        };

        res = {
          redirect: jest.fn()
        };

        handler(req, res);
      });

      it("Should delete target partner", () => {
        expect(req.session.cumulativeFullAnswers.targetPartner).toEqual(
          { id: NaN, name: undefined }
        );
      });
      it("Should have Partners as an empty array", () => {
        expect(req.session.cumulativeFullAnswers.partners).toEqual([]);
      });
      it("Should call Next.render", () => {
        expect(Next.render).toBeCalled();
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
            save: cb => {
              cb("session save error");
            }
          },
          query: {
            id: "1"
          }
        };

        res = {
          redirect: jest.fn()
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
            save: cb => {
              cb();
            }
          },
          get: value => "www.test.com/new/thepage?display=true",
          body: {
            example: "property"
          },
          header: {
            Referrer: "www.address.com/new/council/thispage?blah=hello"
          },
          query: {}
        };

        res = {
          redirect: jest.fn()
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
            save: cb => {
              cb();
            }
          },
          get: value => "www.test.com/new/thepage?display=true",
          body: {
            example: "property"
          },
          header: {
            Referrer: "www.address.com/new/council/thispage?blah=hello"
          },
          query: {}
        };

        res = {
          redirect: jest.fn()
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

    describe("When an error is thrown", () => {
      let response;
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
              partners: ["One First", "Two Second"],
              targetPartner: { id: 0, name: "One First" }
            },
            save: cb => {
              cb("Error saving session");
            }
          },
          get: value => "www.test.com/new/thepage?display=true",
          body: {
            example: "property"
          },
          header: {
            Referrer: "www.address.com/new/council/thispage?blah=hello"
          },
          query: {}
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

      it("Should throw an error", () => {
        expect(response).toBe("Error saving session");
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
            save: cb => {
              cb();
            }
          },
          get: value => "www.test.com/new/thepage?display=true",
          body: {
            example: "property to ignore"
          },
          header: {
            Referrer: "www.address.com/new/council/thispage?blah=hello"
          },
          query: {}
        };
        res = {
          redirect: jest.fn()
        };

        handler(req, res);
      });
      it("Should call the partnerDetailsContinue correctly", () => {
        expect(partnerDetailsContinue).toHaveBeenCalledWith(
          "/thepage",
          { partners: ["One First", "Two Second"] },

          "council",
          false
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
            save: cb => {
              cb();
            }
          },
          get: value => "www.test.com/new/thepage?display=true",
          body: {
            example: "property"
          },
          header: {
            Referrer: "www.address.com/new/council/thispage?blah=hello"
          },
          query: {}
        };

        res = {
          redirect: jest.fn()
        };

        handler(req, res);
      });
      it("Should call the partnerDetailsContinue correctly", () => {
        expect(partnerDetailsContinue).toHaveBeenCalledWith(
          "/thepage",
          { partners: [] },

          "council",
          false
        );
      });
      it("Should redirect to next page", () => {
        expect(res.redirect).toHaveBeenCalledWith("/page");
      });
    });

    describe("When an error is thrown", () => {
      let response;
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
            save: cb => {
              cb("Error saving session");
            }
          },
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
          redirect: jest.fn()
        };
        try {
          await handler(req, res);
        } catch (err) {
          response = err;
        }
      });

      it("Should throw an error", () => {
        expect(response).toBe("Error saving session");
      });
    });
  });
});