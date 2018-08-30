const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");

const setCookieRouter = () => {
  const router = Router();
  router.post("/:cookieName/:newValue", (req, res) => {
    logEmitter.emit("functionCall", "Routers", "/cookie/:cookieName route");

    const cookieName = req.params.cookieName;
    const newValue = req.params.newValue;

    if (cookieName === "acceptAllCookies") {
      res.cookie("acceptAllCookies", newValue, {
        // Cookie preferences set to expire after 25 days
        maxAge: 2160000000
        // secure: process.env.COOKIE_SECURE === "true"
      });

      if (newValue === "false") {
        // remove the content of optional cookies and set immediate expiration
        const googleCookieNames = Object.keys(req.cookies).filter(cookieName =>
          cookieName.startsWith("_g")
        );

        googleCookieNames.forEach(cookieName => {
          res.cookie(cookieName, "deleted", {
            maxAge: 0
          });
        });
      }
    }

    logEmitter.emit("functionSuccess", "Routers", "/cookie/:cookieName route");
    res.redirect("back");
  });

  return router;
};

module.exports = { setCookieRouter };
