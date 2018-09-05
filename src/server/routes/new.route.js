const { Router } = require("express");
const { Next } = require("../next");
const { logEmitter } = require("../services/logging.service");
const {
  transformAnswersForSummary
} = require("../services/data-transform.service");

const allowedCouncils = [
  "cardiff",
  "the-vale-of-glamorgan",
  "mid-and-east-antrim",
  "bridgend",
  "west-dorset",
  "north-dorset",
  "weymouth-and-portland"
];

const newRouter = () => {
  const router = Router();

  router.get("/:lc/:page?", (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/new route");

    if (allowedCouncils.includes(req.params.lc)) {
      const page = req.params.page || "index";

      if (page === "index") {
        req.session.regenerate(() => {
          req.session.council = req.params.lc;
          logEmitter.emit(
            "functionSuccessWith",
            "Routes",
            "/new route",
            "Session regenerated. Rendering page: /index"
          );
          Next.render(req, res, `/index`);
        });
      } else {
        // Save council to session if not yet there
        if (!req.session.council) {
          req.session.council = req.params.lc;
        }

        // Transform the data into summary format on pages where it is required
        if (
          page === "registration-summary" ||
          page === "summary-confirmation"
        ) {
          req.session.transformedData = transformAnswersForSummary(
            req.session.cumulativeAnswers,
            req.session.addressLookups
          );

          req.session.save(() => {
            logEmitter.emit(
              "functionSuccessWith",
              "Routes",
              "/new route",
              `Rendering page: ${page}`
            );

            Next.render(req, res, `/${page}`);
          });
        } else {
          logEmitter.emit(
            "functionSuccessWith",
            "Routes",
            "/new route",
            `Rendering page: ${page}`
          );

          Next.render(req, res, `/${page}`);
        }
      }
    } else {
      logEmitter.emit(
        "functionSuccessWith",
        "Routes",
        "/new route",
        `Unsupported council: "${req.params.lc}". Rendering error page.`
      );
      Next.render(req, res, "/unsupported-council");
    }
  });

  return router;
};

module.exports = { newRouter };
