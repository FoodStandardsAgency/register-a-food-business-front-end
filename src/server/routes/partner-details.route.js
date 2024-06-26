/**
 * The partner-details router stores partner names in the user's session and redirects the user to appropriate pages depending on action required (add / edit / delete / next).
 * It also redirects the user to the next page in the path.
 * Routes: /partner-details/:originator
 * @module routers/partner-details
 */
const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const {
  partnerDetailsContinue,
  partnerDetailsSave,
  partnerDetailsDelete
} = require("../controllers/partner-details.controller");

const getOriginator = (referrerUrl) => {
  return referrerUrl.substr(referrerUrl.lastIndexOf("/")).split("?")[0];
};

const isEditMode = (reqQuery) => {
  return reqQuery.edit === "partner-name";
};

const initializePartners = (session) => {
  return session.cumulativeFullAnswers.partners || [];
};

const PropsGenerator = require("../propsGenerator");

const partnerDetailsRouter = () => {
  const router = Router();

  router.post("/save", async (req, res, next) => {
    logEmitter.emit("functionCall", "Routes", "/partnership/save route");
    try {
      const originator = getOriginator(req.get("Referrer"));

      const data =
        req.session.cumulativeFullAnswers.targetPartner !== undefined
          ? Object.assign({}, req.body, {
              index: req.session.cumulativeFullAnswers.targetPartner
            })
          : req.body;

      req.session.cumulativeFullAnswers.partners = initializePartners(req.session);

      const response = partnerDetailsSave(
        originator,
        req.session.cumulativeFullAnswers,
        data,
        isEditMode(req.query)
      );

      req.session.validatorErrors = response.validatorErrors;
      req.session.cumulativeFullAnswers = response.cumulativeFullAnswers;

      logEmitter.emit("functionSuccess", "Routes", "/partnership/save route");
      req.session.save((err) => {
        if (err) {
          logEmitter.emit("functionFail", "Routes", "/partnership/save route", err);
          throw err;
        }
        res.redirect(response.redirectRoute);
      });
    } catch (err) {
      logEmitter.emit("functionFail", "Routes", "//partnership/save route", err);
      next(err);
    }
  });

  router.get("/partner-details", (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/partnership/partner-details route");

    req.session.cumulativeFullAnswers.partners = initializePartners(req.session);

    const targetPartner = parseInt(req.query.id, 10);
    if (!isNaN(targetPartner)) {
      req.session.cumulativeFullAnswers.targetPartner = targetPartner;
    } else {
      delete req.session.cumulativeFullAnswers.targetPartner;
    }

    logEmitter.emit("functionSuccess", "Routes", "/partnership/partner-details route");
    req.session.save((err) => {
      if (err) {
        logEmitter.emit("functionFail", "Routes", "/partnership/partner-details route", err);
        throw err;
      }
      var props = PropsGenerator(req);
      res.render(`partner-details`, { props });
    });
  });

  router.post("/delete-partner", async (req, res, next) => {
    logEmitter.emit("functionCall", "Routes", "/partnership/delete-partner route");
    try {
      req.session.cumulativeFullAnswers.partners = initializePartners(req.session);

      const response = partnerDetailsDelete(
        req.session.cumulativeFullAnswers,
        req.body,
        isEditMode(req.query)
      );

      req.session.validatorErrors = response.validatorErrors;
      req.session.cumulativeFullAnswers = response.cumulativeFullAnswers;

      logEmitter.emit("functionSuccess", "Routes", "/partner-details/delete route");
      req.session.save((err) => {
        if (err) {
          logEmitter.emit("functionFail", "Routes", "/partner-details route", err);
          throw err;
        }
        res.redirect(response.redirectRoute);
      });
    } catch (err) {
      logEmitter.emit("functionFail", "Routes", "/partnership/delete-partner route", err);
      next(err);
    }
  });

  router.post("/continue", async (req, res, next) => {
    logEmitter.emit("functionCall", "Routes", "/partnership/continue route");
    try {
      const originator = getOriginator(req.get("Referrer"));

      req.session.cumulativeFullAnswers.partners = initializePartners(req.session);

      const response = partnerDetailsContinue(
        originator,
        req.session.cumulativeFullAnswers,
        isEditMode(req.query),
        req.session.allValidationErrors
      );

      req.session.validatorErrors = response.validatorErrors;
      req.session.allValidationErrors = response.allValidationErrors;

      logEmitter.emit("functionSuccess", "Routes", "/partner-details/continue route");
      req.session.save((err) => {
        if (err) {
          logEmitter.emit("functionFail", "Routes", "/partner-details/continue route", err);
          throw err;
        }
        res.redirect(response.redirectRoute);
      });
    } catch (err) {
      logEmitter.emit("functionFail", "Routes", "/partnership/continue route", err);
      next(err);
    }
  });

  router.get("/back", (req, res) => {
    logEmitter.emit("functionCall", "Routes", "partnership/back route");
    const redirectUrl = isEditMode(req.query)
      ? `/new/partner-name?edit=partner-name`
      : `/new/partner-name`;
    logEmitter.emit(
      "functionSuccessWith",
      "Routes",
      "partnership/back route",
      `Redirecting to: ${redirectUrl}`
    );
    res.redirect(redirectUrl);
  });

  return router;
};

module.exports = { partnerDetailsRouter };
