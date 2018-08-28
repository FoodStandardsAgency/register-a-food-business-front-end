const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");

const cleansessionRouter = () => {
  const router = Router();

  router.get("", (req, res) => {
    logEmitter.emit("functionCall", "Routers", "/cleansession route");
    req.session.destroy(err => {
      if (err) {
        logEmitter.emit("functionFail", "Routers", "/cleansession route", err);
        res.redirect("back");
      } else {
        logEmitter.emit(
          "functionSuccessWith",
          "Routers",
          "/cleansession route",
          "route '/'"
        );
        res.redirect("/");
      }
    });
  });

  return router;
};

module.exports = { cleansessionRouter };
