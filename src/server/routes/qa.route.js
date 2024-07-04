/**
 * The qa router adds POST body data to the user's session and redirects to a specified page.
 * Routes: /qa/:target
 * @module routers/qa
 */

const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const { initialiseArray } = require("../services/data-transform.service");
const { QA_KEY } = require("../config");
const { getCouncilDataByID } = require("../connectors/config-db/config-db.connector");

const qaRouter = () => {
  const router = Router();

  router.get("/:target", async (req, res, next) => {
    logEmitter.emit("functionCall", "Routes", "/qa/:target route");
    try {
      if (req.query.QA_KEY && req.query.QA_KEY === QA_KEY) {
        if (req.query.la_id) {
          req.session.localAuthority = await getCouncilDataByID(req.query.la_id);
        }
        const target = req.params.target;
        delete req.query.QA_KEY;
        req.session.cumulativeFullAnswers = req.query;
        req.session.cumulativeFullAnswers = initialiseArray(
          req.session.cumulativeFullAnswers,
          "business_scale",
          true
        );
        req.session.cumulativeFullAnswers = initialiseArray(
          req.session.cumulativeFullAnswers,
          "food_type",
          true
        );
        req.session.cumulativeFullAnswers = initialiseArray(
          req.session.cumulativeFullAnswers,
          "processing_activities",
          true
        );
        logEmitter.emit("functionSuccessWith", "Routes", "/qa/:target route", target);
        req.session.save(() => {
          res.redirect(`/new/${target}`);
        });
      } else {
        logEmitter.emit("functionFail", "Routes", "/qa/:target route", "403 not permitted");
        res.status(403);
        res.send("Not permitted");
      }
    } catch (err) {
      logEmitter.emit("functionFail", "Routes", "/qa/:target route");
      next(err);
    }
  });

  return router;
};

module.exports = { qaRouter };
