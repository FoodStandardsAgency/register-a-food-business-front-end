/**
 * The new router stores the local council string in the session and renders the requested page.
 * Routes: /new/:lc, /new/:lc/:page
 * @module routers/new
 */
const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");

const { LC_CACHE_TIME_TO_LIVE, pathConfig } = require("../config");
const { transformAnswersForSummary } = require("../services/data-transform.service");
const { getLocalCouncils, getCouncilData } = require("../connectors/config-db/config-db.connector");
const {
  REGISTRATION_DATA_VERSION,
  MAINTENANCE_MODE_BLOCK_NEW,
  MAINTENANCE_MODE_BLOCK_ALL
} = require("../config");
const { Cache } = require("../services/cache.service");
const { getBrowserInfo } = require("../services/browser-support.service");
const PropsGenerator = require("../propsGenerator");

const localAuthoritiesCache = Cache(LC_CACHE_TIME_TO_LIVE, false, true, getLocalCouncils);

const newRouter = () => {
  const router = Router();

  if (MAINTENANCE_MODE_BLOCK_ALL === "true") {
    router.get("*", (req, res) => {
      logEmitter.emit(
        "functionSuccessWith",
        "Routes",
        "/* route",
        "Maintenance Mode (Block All Users) Active. Rendering page: /maintenance"
      );
      res.render("maintenance");
    });
  }

  // new route needed for index page
  router.get("/", async (req, res, next) => {
    logEmitter.emit("functionCall", "Routes", "/new (root route)");

    req.session.regenerate(async () => {
      try {
        req.session.pathConfig = pathConfig;
        const browserInfo = getBrowserInfo(req.headers["user-agent"]);
        Object.assign(req.session, req.session, { ...browserInfo });

        if (MAINTENANCE_MODE_BLOCK_NEW === "true") {
          logEmitter.emit(
            "functionSuccessWith",
            "Routes",
            "/new route",
            "Maintenance Mode (Block New Users) Active. Rendering page: /maintenance"
          );
          res.render("maintenance");
        } else {
          logEmitter.emit(
            "functionSuccessWith",
            "Routes",
            "/new route",
            "Session regenerated. Rendering page: /index"
          );

          var props = PropsGenerator(req);
          res.render("index", { props });
        }
      } catch (err) {
        logEmitter.emit("functionFail", "Routes", "/new route", err);
        next(err);
      }
    });
  });

  router.get("/:page{}", async (req, res, next) => {
    logEmitter.emit("functionCall", "Routes", "/new route");
    try {
      const page = req.params.page || "index";

      const localAuthorities = await localAuthoritiesCache.get();

      // If it is legacy request to /new/local-authority, redirect to /new
      if (localAuthorities && localAuthorities.find((i) => i.local_council_url === page)) {
        logEmitter.emit("functionSuccessWith", "Routes", `/new/${page} route`, "Redirect to /new");
        res.redirect("/new");
        return;
      }

      // If the requested page is the homepage, regenerate the session before rendering.
      // (This wipes the user's data, allowing for a clean slate in the new registration)
      if (page === "index") {
        req.session.regenerate(async () => {
          try {
            req.session.pathConfig = pathConfig;
            const browserInfo = getBrowserInfo(req.headers["user-agent"]);
            Object.assign(req.session, req.session, { ...browserInfo });

            if (MAINTENANCE_MODE_BLOCK_NEW === "true") {
              logEmitter.emit(
                "functionSuccessWith",
                "Routes",
                "/new route",
                "Maintenance Mode (Block New Users) Active. Rendering page: /maintenance"
              );
              res.render("maintenance");
            } else {
              logEmitter.emit(
                "functionSuccessWith",
                "Routes",
                "/new route",
                "Session regenerated. Rendering page: /index"
              );

              var props = PropsGenerator(req);
              res.render("index", { props });
            }
          } catch (err) {
            logEmitter.emit("functionFail", "Routes", "/new route", err);
            next(err);
          }
        });
      } else {
        // Save the path config to the session if not yet there
        if (!req.session.pathConfig) {
          req.session.pathConfig = pathConfig;
        }
        // Save the browser support to the session if not there yet
        if (!req.session.isBrowserSupported) {
          const browserInfo = getBrowserInfo(req.headers["user-agent"]);
          Object.assign(req.session, req.session, { ...browserInfo });
        }
        if (page === "establishment-trading-name" && req.session.validatorErrors) {
          delete req.session.validatorErrors["trading_name"];
        }
        // Transform the data into summary format on pages where it is required and save to session
        if (page === "registration-summary" || page === "summary-confirmation") {
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

            res.render(`${page}`, { props: PropsGenerator(req) });
          });
          // For all other scenarios, render the requested page.
        } else {
          logEmitter.emit("functionSuccessWith", "Routes", "/new route", `Rendering page: ${page}`);
          const props = PropsGenerator(req);
          if (page === "la-selector") {
            props["localAuthorities"] = localAuthorities;
          }
          res.render(`${page}`, { props: props });
        }
      }
    } catch (err) {
      logEmitter.emit("functionFail", "Routes", "/new route", err);
      next(err);
    }
  });

  return router;
};

module.exports = { newRouter };
