const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");

const cleansessionRouter = () => {
  const router = Router();

  router.get("", (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/cleansession route");
    req.session.destroy(err => {
      if (err) {
        logEmitter.emit("functionFail", "Routes", "/cleansession route", err);
        res.redirect("back");
      } else {
        logEmitter.emit(
          "functionSuccessWith",
          "Routes",
          "/cleansession route",
          `Redirecting to: /new/${req.session.council}/`
        );
        res.redirect(`/new/${req.session.council}/`);
      }
    });
  });

  return router;
};

module.exports = { cleansessionRouter };
