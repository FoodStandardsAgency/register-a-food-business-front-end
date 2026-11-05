const { Router } = require("express");

const crawlerPolicy = (allowIndexing) => {
  const router = Router();

  router.use((req, res, next) => {
    if (!allowIndexing) {
      res.set("X-Robots-Tag", "noindex, nofollow");
    }
    next();
  });

  router.get("/robots.txt", (req, res) => {
    res
      .set("Cache-Control", "public, max-age=3600")
      .type("text/plain")
      .send(`User-agent: *\nAllow: /\n`);
  });

  return router;
};

module.exports = { crawlerPolicy };
