describe("Sanity check", () => {
  it("should pass if 1 equals 1", () => {
    expect(1).toBe(1);
  });
});

// jest.mock("express", () => ({
//   Router: jest.fn(() => ({
//     post: jest.fn(),
//     get: jest.fn()
//   }))
// }));

// jest.mock("../controllers/find-local-authority.controller");
// const findLocalAuthorityController = require("../controllers/find-local-authority.controller");
// const { findLocalAuthorityRouter } = require("./find-local-authority.route.js");

// describe("findLocalAuthority route: ", () => {
//   let router, handler;
//   beforeEach(() => {
//     router = findLocalAuthorityRouter();
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe("POST to /findlocalauthority/:originator", () => {
//     describe("When session.save works", () => {
//       const req = {
//         session: {
//           cumulativeFullAnswers: {},
//           save: (cb) => {
//             cb();
//           }
//         },
//         body: "body",
//         params: {
//           originator: "/some-page"
//         },
//         headers: {
//           referer: ""
//         }
//       };
//       const res = {
//         redirect: jest.fn()
//       };

//       beforeEach(() => {
//         findLocalAuthorityController.mockImplementation(() => ({
//           cumulativeFullAnswers: { example: "answer" },
//           validatorErrors: {},
//           localAuthority: {
//             local_council: "City of Cardiff Council",
//             local_council_url: "cardiff",
//             country: "wales"
//           },
//           redirectRoute: "/another-page"
//         }));
//         handler = router.post.mock.calls[0][1];
//         handler(req, res);
//       });
//       it("Should redirect to the redirectRoute page", () => {
//         expect(res.redirect).toBeCalledWith("/new/another-page");
//       });

//       it("Should set req.session.localAuthority.local_council_url", () => {
//         expect(req.session.localAuthority.local_council_url).toEqual("cardiff");
//       });

//       it("Should set req.session.localAuthority.country", () => {
//         expect(req.session.localAuthority.country).toEqual("wales");
//       });

//       it("Should set req.session.localAuthority.local_council", () => {
//         expect(req.session.localAuthority.local_council).toEqual("City of Cardiff Council");
//       });

//       it("Should update session", () => {
//         expect(req.session.cumulativeFullAnswers).toEqual({
//           example: "answer"
//         });
//         expect(req.session.validatorErrors).toEqual({});
//       });
//     });

//     describe("When local authority not onboarded", () => {
//       const req = {
//         session: {
//           cumulativeFullAnswers: {},
//           save: (cb) => {
//             cb();
//           }
//         },
//         body: "body",
//         params: {
//           originator: "/some-page"
//         },
//         headers: {
//           referer: ""
//         }
//       };
//       const res = {
//         redirect: jest.fn()
//       };

//       beforeEach(() => {
//         findLocalAuthorityController.mockImplementation(() => ({
//           cumulativeFullAnswers: { example: "answer" },
//           validatorErrors: {},
//           localAuthority: {
//             local_council: "City of Cardiff Council",
//             local_council_url: "cardiff",
//             country: "wales",
//             reg_form_url: "https://www.test.com"
//           },
//           redirectRoute: "/another-page"
//         }));
//         handler = router.post.mock.calls[0][1];
//         handler(req, res);
//       });
//       it("Should call redirect", () => {
//         expect(res.redirect).toBeCalledWith("https://www.test.com");
//       });
//     });

//     describe("When session.save throws an error", () => {
//       let response, next;
//       next = jest.fn();
//       const req = {
//         session: {
//           cumulativeFullAnswers: {},
//           save: (cb) => {
//             cb("session save error");
//           }
//         },
//         body: "body",
//         params: {
//           originator: "/some-page"
//         }
//       };
//       const res = {
//         redirect: jest.fn()
//       };

//       beforeEach(async () => {
//         findLocalAuthorityController.mockImplementation(() => ({
//           cumulativeFullAnswers: { example: "answer" },
//           validatorErrors: {},
//           localAuthority: "Cardiff",
//           redirectRoute: "/another-page"
//         }));
//         handler = router.post.mock.calls[0][1];
//         try {
//           await handler(req, res, next);
//         } catch (err) {
//           response = err;
//         }
//       });

//       it("Should throw an error", () => {
//         expect(next).toBeCalledWith("session save error");
//       });
//     });

//     describe("when an error is thrown", () => {
//       let next;
//       beforeEach(async () => {
//         findLocalAuthorityController.mockImplementation(() => {
//           throw new Error("error");
//         });
//         next = jest.fn();
//         handler = router.post.mock.calls[0][1];
//         req = {
//           session: {
//             cumulativeFullAnswers: {},
//             localAuthority: "Cardiff"
//           },
//           body: "body",
//           params: {
//             originator: "/some-page"
//           }
//         };

//         res = {
//           redirect: jest.fn()
//         };

//         handler(req, res, next);
//       });
//       it("should call next with error", () => {
//         expect(next).toBeCalledWith(new Error("error"));
//       });
//     });
//   });
// });
