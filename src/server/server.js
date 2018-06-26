const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const routes = require("./routes");
const { Next } = require("./next");
const { info } = require("winston");

module.exports = async () => {
  const app = express();
  ////////////////
  // WARNING: the below uses in-memory session storage and must be replaced.
  app.use(
    session({
      secret: "TEMPORARYSECRET",
      resave: false,
      saveUninitialized: true
    })
  );
  ////////////////

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());

  const hello = () => {
    console.log("Console running");
    info("Winston Running");
    setTimeout(hello, 5000);
  };
  hello();

  await Next.prepare();

  app.use(routes());

  return app;
};
