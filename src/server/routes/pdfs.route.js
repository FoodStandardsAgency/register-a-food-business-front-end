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

  router.get("/accessibility", async (req, res, next) => {
    logEmitter.emit("functionCall", "Routes", "/pdfs/accessibility");
    try {
      let file = path.join(
        __dirname,
        "..",
        req.query.language === "cy"
          ? "/static/pdfs/accessibility-cy.pdf"
          : "/static/pdfs/accessibility-en.pdf"
      );
      res.sendFile(file);
      logEmitter.emit("functionSuccessWith", "Routes", "/pdfs/accessibility", file);
    } catch (err) {
      logEmitter.emit("functionFail", "Routes", "/pdfs/accessibility", err);
      next(err);
    }
  });

  router.get("/cookie-policy", async (req, res, next) => {
    logEmitter.emit("functionCall", "Routes", "/pdfs/cookie-policy");
    try {
      let file = path.join(
        __dirname,
        "..",
        req.query.language === "cy"
          ? "/static/pdfs/cookie-policy-cy.pdf"
          : "/static/pdfs/cookie-policy-en.pdf"
      );
      res.sendFile(file);
      logEmitter.emit("functionSuccessWith", "Routes", "/pdfs/cookie-policy", file);
    } catch (err) {
      logEmitter.emit("functionFail", "Routes", "/pdfs/cookie-policy", err);
      next(err);
    }
  });

  router.get("/privacy-notice", async (req, res, next) => {
    logEmitter.emit("functionCall", "Routes", "/pdfs/privacy-notice");
    try {
      let file = path.join(
        __dirname,
        "..",
        req.query.language === "cy"
          ? "/static/pdfs/privacy-notice-cy.pdf"
          : "/static/pdfs/privacy-notice-en.pdf"
      );
      res.sendFile(file);
      logEmitter.emit("functionSuccessWith", "Routes", "/pdfs/privacy-notice", file);
    } catch (err) {
      logEmitter.emit("functionFail", "Routes", "/pdfs/privacy-notice", err);
      next(err);
    }
  });

  return router;
};

module.exports = { pdfsRouter };
