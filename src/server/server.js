const cls = require("cls-hooked");
const appInsights = require("applicationinsights");
const morgan = require("morgan");
const packageJson = require("../../package.json");

if (
  "APPINSIGHTS_INSTRUMENTATIONKEY" in process.env &&
  process.env["APPINSIGHTS_INSTRUMENTATIONKEY"] !== ""
) {
  console.log(`Setting up application insights modules`);
  appInsights.setup().start();
  appInsights.defaultClient.addTelemetryProcessor((envelope) => {
    envelope.tags["ai.cloud.role"] = packageJson.name; // eslint-disable-line no-param-reassign
  });
}
const { logger } = require("./services/winston");

require("dotenv").config();

const { MONGODB_URL } = require("./config");

function byteToHex(byte) {
  return ("0" + byte.toString(16)).slice(-2);
}

// str generateId(int len);
//   len - must be an even number (default: 40)
function generateId(len = 40) {
  var arr = new Uint8Array(len / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, byteToHex).join("");
}
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";

const express = require("express");
const next = require("next");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const csurf = require("csurf");

const app = next({ dev });
const handle = app.getRequestHandler();

module.exports = { app };
const routes = require("./routes");
const { errorHandler } = require("./middleware/errorHandler");

const clsNamespace = cls.createNamespace("application");
const { v5: uuidv5 } = require("uuid");
const clsMiddleware = (req, res, next) => {
  // req and res are event emitters. We want to access CLS context inside of their event callbacks
  clsNamespace.bind(req);
  clsNamespace.bind(res);

  clsNamespace.run(() => {
    clsNamespace.set(
      "requestId",
      uuidv5("https://register.food.gov.uk/", uuidv5.DNS)
    );
    clsNamespace.set("request", req);

    next();
  });
};

app.prepare().then(async () => {
  let server = express();

  let store = null;
  if (MONGODB_URL) {
    logger.info("Server: setting session cache to database");
    store = new MongoStore({
      url: MONGODB_URL
    });
    logger.info("Server: successfully set up database connection");
  } else {
    logger.info("Server: setting session cache to memory");
  }

  let sessionOptions = {
    secret: process.env.COOKIE_SECRET
      ? process.env.COOKIE_SECRET
      : generateId(),
    resave: true,
    saveUninitialized: false,
    cookie: {
      // Session cookie set to expire after 24 hours
      maxAge: 86400000,
      httpOnly: true
    },
    store: store
  };

  if (process.env.COOKIE_SECURE === "true") {
    sessionOptions.cookie.secure = true;
  }
  let limiter = rateLimit({
    max: process.env.RATE_LIMIT // limit each IP to x requests per minute
  });

  const sixtyDaysInSeconds = 5184000;
  server.set("trust proxy", 1);
  server.enable("trust proxy");
  server.use(clsMiddleware);
  server.use(limiter);
  server.use(session(sessionOptions));
  server.use(cookieParser());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(
    helmet.hsts({
      maxAge: sixtyDaysInSeconds
    })
  );
  server.use(csurf());

  server.use(routes());
  server.use(errorHandler);

  server.use(morgan("combined", { stream: logger.stream }));

  server.all("*", (req, res) => {
    handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    logger.info(
      `App running in ${MONGODB_URL} ${
        dev ? "DEVELOPMENT" : "PRODUCTION"
      } mode on http://localhost:${port}`
    );
  });
});
