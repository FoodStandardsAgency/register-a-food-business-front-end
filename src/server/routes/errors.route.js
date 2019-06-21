const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const { Next } = require("../next");

const errorsRouter = () => {
  const router = Router();

  router.use("/:err_code", (req, res, next) => {
    logEmitter.emit("functionCall", "Routes", "/errors/:err_code/ route");
    res.status(req.params.err_code);
    Next.render(req, res, `/errorWrapper`);
  });

  return router;
};

module.exports = { errorsRouter };
