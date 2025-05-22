/**
 * The set-cookie router sets the specified browser cookie to a specified new value.
 * Routes: /set-cookie/:cookieName/:newValue
 * @module routers/set-cookie
 */

require("dotenv").config();
const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");

const setCookieRouter = () => {
  const router = Router();
  router.get("/:cookieName/:newValue", (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/cookie/:cookieName route");

    const cookieName = req.params.cookieName;
    const newValue = req.params.newValue;
    if (cookieName === "acceptAllCookies") {
      res.cookie("acceptAllCookies", newValue, {
        // User's cookie preferences set to expire after 25 days
        maxAge: 2160000000
      });

      if (newValue === "false") {
        // remove the content of optional cookies and set immediate expiration
        const googleCookieNames = Object.keys(req.cookies).filter((cookieName) =>
          cookieName.startsWith("_g")
        );

        googleCookieNames.forEach((cookieName) => {
          res.cookie(cookieName, "deleted", {
            maxAge: 0
          });
        });
      }
    }

    logEmitter.emit("functionSuccess", "Routes", "/cookie/:cookieName route");
    res.redirect(req.get("Referrer") || "/");
  });

  return router;
};

module.exports = { setCookieRouter };
