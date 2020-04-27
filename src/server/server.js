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
const { info } = require("winston");

const app = next({ dev });
const handle = app.getRequestHandler();

module.exports = { app };
const routes = require("./routes");
const { errorHandler } = require("./middleware/errorHandler");

app.prepare().then(async () => {
    let server = express();

    let store = null;
    if (MONGODB_URL) {
        info("Server: setting session cache to database");
        store = new MongoStore({
            url: MONGODB_URL
        });
        info("Server: successfully set up database connection");
    } else {
        info("Server: setting session cache to memory");
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

    server.set("trust proxy", 1);
    server.enable("trust proxy");

    server.use(limiter);
    server.use(session(sessionOptions));
    server.use(cookieParser());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.use(routes());
    server.use(errorHandler);

    server.all("*", (req, res) => {
        handle(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        info(
            `App running in ${MONGODB_URL} ${
                dev ? "DEVELOPMENT" : "PRODUCTION"
            } mode on http://localhost:${port}`
        );
    });
});
