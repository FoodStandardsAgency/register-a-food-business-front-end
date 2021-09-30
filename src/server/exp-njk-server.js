// usual requirements
const express = require("express");
const cookieParser = require("cookie-parser");
const i18n = require("i18n");
const nunjucks = require("nunjucks");
const app = (module.exports = express());
var sassMiddleware = require("node-sass-middleware");
var path = require("path");

i18n.configure({
  // setup some locales - other locales default to en silently
  locales: ["en", "cy"],
  queryParameter: "lang",
  // sets a custom cookie name to parse locale settings from
  cookie: "lang_cookie_name",

  // where to store json files - defaults to './locales'
  directory: __dirname + "/../../public/static/locales"
});

// set default express engine and extension
app.engine("html", nunjucks.render);
app.set("view engine", "njk");

// you will need to use cookieParser to expose cookies to req.cookies
app.use(cookieParser());

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

app.use(
  sassMiddleware({
    src: __dirname + "/sass", //where the sass files are
    dest: __dirname + "/css", //where css should go
    debug: true // obvious
  })
);

// app.use('/assets', express.static('/node_modules/govuk-frontend/govuk/assets'))
app.use(
  "/assets",
  express.static(
    path.join(__dirname, "/../../node_modules/govuk-frontend/govuk/assets")
  )
);
app.use("/pdfs", express.static(__dirname + "/static/pdfs"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/scripts", express.static(path.join(__dirname, "/../../scripts")));

// serving homepage
app.get("/", function (req, res) {
  const props = {
    date: new Date(),
    language: i18n.getLocale(req),
    csrf: "test",
    currentPage: "index"
  };
  res.render("index", { props });
  //sass.renderSync('index', {templateData})
});

app.post("/continue/index", function (req, res) {
  const props = {
    language: i18n.getLocale(req),
    csrf: "test",
    currentPage: "registration-role",
    cumulativeFullAnswers: {
      registration_role: "SOLETRADER"
    }
  };
  res.render("registration-role", { props });
  //sass.renderSync('index', {templateData})
});

// starting server
app.listen(3000);