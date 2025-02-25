/**
 * The trading-name-details router stores trading-name names in the user's session and redirects the user to appropriate pages depending on action required (add / edit / delete / next).
 * It also redirects the user to the next page in the path.
 * Routes: /trading-name-details/:originator
 * @module routers/trading-name-details
 */
const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const {
  // tradingNameDetailsContinue,
  tradingNameDetailsSave,
  tradingNameDetailsDelete,
  tradingNameDetailsContinue
} = require("../controllers/trading-name-details.controller");

const getOriginator = (referrerUrl) => {
  return referrerUrl.substr(referrerUrl.lastIndexOf("/")).split("?")[0];
};

const isEditMode = (reqQuery) => {
  return reqQuery.edit === "establishment-trading-name";
};

const initializeTradingNames = (session) => {
  return session.cumulativeFullAnswers.establishment_additional_trading_names || [];
};

const PropsGenerator = require("../propsGenerator");

const tradingNameDetailsRouter = () => {
  const router = Router();

  router.post("/save", async (req, res, next) => {
    logEmitter.emit("functionCall", "Routes", "/tradingname/save route");
    try {
      const originator = getOriginator(req.get("Referrer"));

      const data = req.session.cumulativeFullAnswers.targetTradingName
        ? Object.assign({}, req.body, {
            index: req.session.cumulativeFullAnswers.targetTradingName
          })
        : req.body;

      req.session.cumulativeFullAnswers.establishment_additional_trading_names =
        initializeTradingNames(req.session);

      const response = tradingNameDetailsSave(
        originator,
        req.session.cumulativeFullAnswers,
        data,
        isEditMode(req.query)
      );

      req.session.validatorErrors = response.validatorErrors;
      req.session.cumulativeFullAnswers = response.cumulativeFullAnswers;

      logEmitter.emit("functionSuccess", "Routes", "/tradingname/save route");
      req.session.save((err) => {
        if (err) {
          logEmitter.emit("functionFail", "Routes", "/tradingname/save route", err);
          throw err;
        }
        res.redirect(response.redirectRoute);
      });
    } catch (err) {
      logEmitter.emit("functionFail", "Routes", "/tradingname/save route", err);
      next(err);
    }
  });

  router.get("/establishment-trading-name-details", (req, res) => {
    logEmitter.emit(
      "functionCall",
      "Routes",
      "/tradingname/establishment-trading-name-details route"
    );

    req.session.cumulativeFullAnswers.targetTradingName = null;

    if (req.query.trading_name) {
      req.session.cumulativeFullAnswers.establishment_trading_name = req.query.trading_name;
    }

    if (req.query.id) {
      req.session.cumulativeFullAnswers.targetTradingName = req.query.id;
    }

    req.session.cumulativeFullAnswers.establishment_additional_trading_names =
      initializeTradingNames(req.session);

    delete req.session.validatorErrors["establishment_trading_name"];
    delete req.session.validatorErrors["establishment_additional_trading_names"];

    logEmitter.emit(
      "functionSuccess",
      "Routes",
      "/tradingname/establishment-trading-name-details route"
    );
    req.session.save((err) => {
      if (err) {
        logEmitter.emit(
          "functionFail",
          "Routes",
          "/tradingname/establishment-trading-name-details route",
          err
        );
        throw err;
      }
      var props = PropsGenerator(req);

      res.render(`establishment-trading-name-details`, { props });
    });
  });

  router.post("/delete-trading-name", async (req, res, next) => {
    logEmitter.emit("functionCall", "Routes", "/tradingname/delete-trading-name route");
    try {
      req.session.cumulativeFullAnswers.establishment_additional_trading_names =
        initializeTradingNames(req.session);

      const response = tradingNameDetailsDelete(
        req.session.cumulativeFullAnswers,
        req.body,
        isEditMode(req.query)
      );

      req.session.validatorErrors = response.validatorErrors;
      req.session.cumulativeFullAnswers = response.cumulativeFullAnswers;

      logEmitter.emit("functionSuccess", "Routes", "/tradingname/delete-trading-name route");
      req.session.save((err) => {
        if (err) {
          logEmitter.emit("functionFail", "Routes", "/tradingname/delete-trading-name route", err);
          throw err;
        }
        res.redirect(response.redirectRoute);
      });
    } catch (err) {
      logEmitter.emit("functionFail", "Routes", "/tradingname/delete-trading-name route", err);
      next(err);
    }
  });

  router.post("/continue", async (req, res, next) => {
    logEmitter.emit("functionCall", "Routes", "/tradingname/continue route");
    try {
      const originator = getOriginator(req.get("Referrer"));

      req.session.cumulativeFullAnswers = req.session.cumulativeFullAnswers || {};
      req.session.cumulativeFullAnswers.establishment_additional_trading_names =
        initializeTradingNames(req.session);

      const response = tradingNameDetailsContinue(
        originator,
        req.body,
        req.session.cumulativeFullAnswers,
        isEditMode(req.query),
        req.session.allValidationErrors
      );

      req.session.validatorErrors = response.validatorErrors;
      req.session.allValidationErrors = response.allValidationErrors;
      req.session.cumulativeFullAnswers = response.cumulativeFullAnswers;

      logEmitter.emit("functionSuccess", "Routes", "/trading-name-details/continue route");
      req.session.save((err) => {
        if (err) {
          logEmitter.emit("functionFail", "Routes", "/trading-name-details/continue route", err);
          throw err;
        }

        res.redirect(response.redirectRoute);
      });
    } catch (err) {
      logEmitter.emit("functionFail", "Routes", "/tradingname/continue route", err);
      next(err);
    }
  });

  router.get("/back", (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/trading-name-details/back route");
    const redirectUrl = isEditMode(req.query)
      ? `/new/establishment-trading-name?edit=establishment-trading-name`
      : `/new/establishment-trading-name`;
    logEmitter.emit(
      "functionSuccessWith",
      "Routes",
      "tradingname/back route",
      `Redirecting to: ${redirectUrl}`
    );
    res.redirect(redirectUrl);
  });

  return router;
};

module.exports = { tradingNameDetailsRouter };
