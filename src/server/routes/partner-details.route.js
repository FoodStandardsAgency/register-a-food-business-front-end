/**
 * The partner-details router stores partner names in the user's session and redirects the user to appropriate pages depending on action required (add / edit / delete / next).
 * It also redirects the user to the next page in the path.
 * Routes: /partner-details/:originator
 * @module routers/partner-details
 */

const { Router } = require("express");
const { Next } = require("../next");
const { logEmitter } = require("../services/logging.service");
const partnerDetailsController = require("../controllers/partner-details.controller");

const getOriginator = referrerUrl => {
  return referrerUrl.substr(referrerUrl.lastIndexOf("/")).split("?")[0];
};

const partnerDetailsRouter = () => {
  const router = Router();

  router.post("/save", async (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/partnership/save route");

    const originator = getOriginator(req.get("Referrer"));

    const data =
      req.session.cumulativeFullAnswers.targetPartner !== null
        ? Object.assign({}, req.body, {
            index: req.session.cumulativeFullAnswers.targetPartner
          })
        : req.body;

    if (req.session.cumulativeFullAnswers.partners === undefined) {
      req.session.cumulativeFullAnswers.partners = [];
    }

    const response = await partnerDetailsController(
      originator,
      req.session.cumulativeFullAnswers,
      data,
      req.session.council,
      "save"
    );

    req.session.validatorErrors = response.validatorErrors;
    req.session.cumulativeFullAnswers = response.cumulativeFullAnswers;

    logEmitter.emit("functionSuccess", "Routes", "/partnership/save route");
    req.session.save(err => {
      if (err) {
        logEmitter.emit(
          "functionFail",
          "Routes",
          "/partnership/save route",
          err
        );
        throw err;
      }
      res.redirect(response.redirectRoute);
    });
  });

  router.get("/partner-details", async (req, res) => {
    logEmitter.emit(
      "functionCall",
      "Routes",
      "/partnership/partnerdetails route"
    );

    if (req.session.cumulativeFullAnswers.partners === undefined) {
      req.session.cumulativeFullAnswers.partners = [];
    }
    const targetPartner = req.query.id ? parseInt(req.query.id) : null;
    req.session.cumulativeFullAnswers.targetPartner = targetPartner;

    logEmitter.emit(
      "functionSuccess",
      "Routes",
      "/partnership/partner-details route"
    );
    req.session.save(err => {
      if (err) {
        logEmitter.emit(
          "functionFail",
          "Routes",
          "/partnership/partner-details route",
          err
        );
        throw err;
      }
      Next.render(req, res, "/partner-details");
    });
  });

  router.post("/delete-partner", async (req, res) => {
    logEmitter.emit(
      "functionCall",
      "Routes",
      "/partnership/delete-partner route"
    );

    const originator = getOriginator(req.get("Referrer"));

    if (req.session.cumulativeFullAnswers.partners === undefined) {
      req.session.cumulativeFullAnswers.partners = [];
    }

    const response = await partnerDetailsController(
      originator,
      req.session.cumulativeFullAnswers,
      req.body,
      req.session.council,
      "delete"
    );

    req.session.validatorErrors = response.validatorErrors;
    req.session.cumulativeFullAnswers = response.cumulativeFullAnswers;

    logEmitter.emit(
      "functionSuccess",
      "Routes",
      "/partnerdetails/delete route"
    );
    req.session.save(err => {
      if (err) {
        logEmitter.emit(
          "functionFail",
          "Routes",
          "/partner-details route",
          err
        );
        throw err;
      }
      res.redirect(response.redirectRoute);
    });
  });

  return router;
};

module.exports = { partnerDetailsRouter };
