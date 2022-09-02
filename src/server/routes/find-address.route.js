/**
 * The find-address router stores address lookup results in the user's session and redirects the user to the next page in the path.
 * Routes: /find-address/:originator
 * @module routers/find-address
 */

const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const findAddressController = require("../controllers/find-address.controller");

const findAddressRouter = () => {
  const router = Router();

  router.post("/:originator", async (req, res, next) => {
    logEmitter.emit("functionCall", "Routes", "/findaddress/:originator route");
    try {
      const response = await findAddressController(
        `/${req.params.originator}`,
        req.session.cumulativeFullAnswers,
        req.body
      );

      req.session.cumulativeFullAnswers = response.cumulativeFullAnswers;
      req.session.validatorErrors = response.validatorErrors;

      req.session.addressLookups = Object.assign(
        {},
        req.session.addressLookups,
        response.addressLookups
      );

      req.session.switches = Object.assign(
        {},
        req.session.switches,
        response.switches
      );

      logEmitter.emit(
        "functionSuccess",
        "Routes",
        "/findaddress/:originator route"
      );
      req.session.save((err) => {
        if (err) {
          logEmitter.emit("functionFail", "Routes", "/find-address route", err);
          throw err;
        }

        const query = req.headers.referer.includes("edit")
          ? `?edit=${response.redirectRoute.substring(1)}`
          : "";

        res.redirect(
          `/new/${req.session.council}${response.redirectRoute}${query}`
        );
      });
    } catch (err) {
      logEmitter.emit(
        "functionFail",
        "Routes",
        "/findaddress/:originator route",
        err
      );
      next(err);
    }
  });

  return router;
};

module.exports = { findAddressRouter };
