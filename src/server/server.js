const cls = require("cls-hooked");
const appInsights = require("applicationinsights");
const morgan = require("morgan");
const packageJson = require("../../package.json");
const i18n = require("i18n");
const nunjucks = require("nunjucks");
var sassMiddleware = require("node-sass-middleware");
var path = require("path");

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

const { COSMOSDB_URL } = require("./config");

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
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const csurf = require("csurf");

const app = (module.exports = express());

i18n.configure({
  // setup some locales - other locales default to en silently
  locales: ["en", "cy"],
  defaultLocale: "en",
  queryParameter: "lang",
  // sets a custom cookie name to parse locale settings from
  cookie: "lang",
  order: ["querystring", "cookie", "header"],

  // where to store json files - defaults to './locales'
  directory: __dirname + "/../../public/static/locales"
});

const routes = require("./routes");
const { errorHandler } = require("./middleware/errorHandler");

const clsNamespace = cls.createNamespace("application");
const { v4: uuidv4 } = require("uuid");
const clsMiddleware = (req, res, next) => {
  // req and res are event emitters. We want to access CLS context inside of their event callbacks
  clsNamespace.bind(req);
  clsNamespace.bind(res);

  clsNamespace.run(() => {
    clsNamespace.set("requestId", uuidv4());
    clsNamespace.set("request", req);

    next();
  });
};

let store = null;
if (COSMOSDB_URL) {
  logger.info("Server: setting session cache to database");
  store = new MongoStore({
    url: COSMOSDB_URL,
    dbName: "front-end-cache"
  });
  logger.info("Server: successfully set up database connection");
} else {
  logger.info("Server: setting session cache to memory");
}

let sessionOptions = {
  secret: process.env.COOKIE_SECRET ? process.env.COOKIE_SECRET : generateId(),
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

app.engine("html", nunjucks.render);
app.set("view engine", "njk");

const sixtyDaysInSeconds = 5184000;
app.set("trust proxy", 1);
app.enable("trust proxy");
app.use(clsMiddleware);
app.use(limiter);
app.use(session(sessionOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  helmet.hsts({
    maxAge: sixtyDaysInSeconds
  })
);
app.use(csurf());

// i18n init parses req for language headers, cookies, etc.
app.use(i18n.init);

// configure nunjucks environment
const env = nunjucks.configure(
  ["node_modules/govuk-frontend/", "pages", "components"],
  {
    express: app //integrate nunjucks into express
  }
);
env.addGlobal("__", i18n.__);
env.addFilter("t", i18n.__);

app.use(morgan("combined", { stream: logger.stream }));

app.use(
  sassMiddleware({
    src: __dirname + "/sass", //where the sass files are
    dest: __dirname + "/css", //where css should go
    debug: true
  })
);

app.use(
  "/assets",
  express.static(
    path.join(__dirname, "/../../node_modules/govuk-frontend/govuk/assets")
  )
);
app.use("/pdfs", express.static(__dirname + "/static/pdfs"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/scripts", express.static(path.join(__dirname, "/../../scripts")));

// Set language cookie - TODO: Does i18next do this for you?  Need to check user accepted cookies?
app.all("*", (req, res, next) => {
  if (req && req.query && req.query.lang) {
    res.cookie("lang", req.query.lang);
  }
  next();
});

app.use(routes());
app.use(errorHandler);

app.listen(port, (err) => {
  if (err) throw err;
  logger.info(
    `App running in ${COSMOSDB_URL} ${
      dev ? "DEVELOPMENT" : "PRODUCTION"
    } mode on http://localhost:${port}`
  );
});
