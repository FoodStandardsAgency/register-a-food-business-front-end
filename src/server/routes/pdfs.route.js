/**
 * The pdfs router returns pdf document files
 * @module routers/pdfs
 */

const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const path = require("path");

const pdfsRouter = () => {
  const router = Router();

  router.get("/feedback", async (req, res, next) => {
    logEmitter.emit("functionCall", "Routes", "/pdfs/feedback");
    try {
      let file = path.join(
        __dirname,
        "..",
        req.query.language === "cy"
          ? "/static/pdfs/RAFB-Privacy-Notice-Cymraeg.pdf"
          : "/static/pdfs/feedback-declaration.pdf"
      );
      res.sendFile(file);
      logEmitter.emit("functionSuccessWith", "Routes", "/pdfs/feedback", file);
    } catch (err) {
      logEmitter.emit("functionFail", "Routes", "/pdfs/feedback", err);
      next(err);
    }
  });

  return router;
};

module.exports = { pdfsRouter };
