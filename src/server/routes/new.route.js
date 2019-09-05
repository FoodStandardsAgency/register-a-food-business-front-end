/**
 * The new router stores the local council string in the session and renders the requested page using Next.js.
 * Routes: /new/:lc, /new/:lc/:page
 * @module routers/new
 */

const { Router } = require("express");
const { Next } = require("../next");
const { logEmitter } = require("../services/logging.service");
const { LC_CACHE_TIME_TO_LIVE } = require("../config");
const {
  transformAnswersForSummary
} = require("../services/data-transform.service");
const {
  getPathConfigByVersion,
  getLocalCouncils,
  getCountryOfCouncil
} = require("../connectors/config-db/config-db.connector");
const { REGISTRATION_DATA_VERSION } = require("../config");
const { Cache } = require("../services/cache.service");
const { getBrowserInfo } = require("../services/browser-support.service");

let allowedCouncils = null;

const allowedCouncilsCache = Cache(
  LC_CACHE_TIME_TO_LIVE,
  false,
  true,
  getLocalCouncils
);

const newRouter = () => {
  const router = Router();

  router.get("/:lc/:page?", async (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/new route");
    allowedCouncils = await allowedCouncilsCache.get();

    // Check that the council is supported
    if (allowedCouncils.includes(req.params.lc)) {
      const page = req.params.page || "index";

      // If the requested page is the homepage, regenerate the session before rendering.
      // (This wipes the user's data, allowing for a clean slate in the new registration)
      if (page === "index") {
        req.session.regenerate(async () => {
          req.session.council = req.params.lc;
          req.session.pathConfig = await getPathConfigByVersion(
            REGISTRATION_DATA_VERSION
          );
          const browserInfo = getBrowserInfo(req.headers["user-agent"]);
          Object.assign(req.session, req.session, { ...browserInfo });

          try {
            req.session.country = await getCountryOfCouncil(req.params.lc);
          } catch (err) {
            console.log("getCountryOfCouncil failed");
            console.log(err);
            throw err;
          }

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
        // Save the path config to the session if not yet there
        if (!req.session.pathConfig) {
          req.session.pathConfig = await getPathConfigByVersion(
            REGISTRATION_DATA_VERSION
          );
        }
        // Save the browser support to the session if not there yet
        if (!req.session.isBrowserSupported) {
          const browserInfo = getBrowserInfo(req.headers["user-agent"]);
          Object.assign(req.session, req.session, { ...browserInfo });
        }
        // Save the country to session if not yet there
        if (!req.session.country) {
          req.session.country = "northern-ireland";
          //await getCountryOfCouncil(req.params.lc);
        }
        // Transform the data into summary format on pages where it is required and save to session
        if (
          page === "registration-summary" ||
          page === "summary-confirmation"
        ) {
          req.session.transformedData = transformAnswersForSummary(
            req.session.cumulativeFullAnswers,
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
          // For all other scenarios, render the requested page.
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
