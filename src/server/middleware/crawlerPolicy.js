const { Router } = require("express");

const crawlerPolicy = (environment) => {
  const router = Router();
  const allowIndexing = environment === "production";

  router.use((req, res, next) => {
    if (!allowIndexing) {
      res.set("X-Robots-Tag", "noindex, nofollow");
    }
    next();
  });

  router.get("/robots.txt", (req, res) => {
    res
      .set("Cache-Control", "max-age=3600")
      .type("text/plain")
      .send(`User-agent: *\n${allowIndexing ? "Allow: /" : "Disallow: /"}\n`);
  });

  return router;
};

module.exports = { crawlerPolicy };
