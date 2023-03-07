/**
 * Find-local-authority router searches the local authority by postcode and redirects to next step or manual authority selector if no authority is found.
 * Routes: /findlocalauthority/:originator
 * @module routers/find-local-authority
 */

const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const findLocalAuthorityController = require("../controllers/find-local-authority.controller");

const findLocalAuthorityRouter = () => {
  const router = Router();

  router.post("/:originator", async (req, res, next) => {
    logEmitter.emit(
      "functionCall",
      "Routes",
      "/findlocalauthority/:originator route"
    );
    try {
      const response = await findLocalAuthorityController(
        `/${req.params.originator}`,
        req.session.cumulativeFullAnswers,
        req.body
      );

      req.session.cumulativeFullAnswers = response.cumulativeFullAnswers;
      req.session.validatorErrors = response.validatorErrors;

      req.session.localAuthority = response.localAuthority;

      logEmitter.emit(
        "functionSuccess",
        "Routes",
        "/findlocalauthority/:originator route"
      );
      req.session.save((err) => {
        if (err) {
          logEmitter.emit(
            "functionFail",
            "Routes",
            "/findlocalauthority route",
            err
          );
          throw err;
        }

        const query = req.headers.referer.includes("edit")
          ? `?edit=${response.redirectRoute.substring(1)}`
          : "";

        res.redirect(`/new${response.redirectRoute}${query}`);
      });
    } catch (err) {
      logEmitter.emit(
        "functionFail",
        "Routes",
        "/findlocalauthority/:originator route",
        err
      );
      next(err);
    }
  });

  return router;
};

module.exports = { findLocalAuthorityRouter };
