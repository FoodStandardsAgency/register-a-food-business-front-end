const { logEmitter } = require("../services/logging.service");
const PropsGenerator = require("../propsGenerator");

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    logEmitter.emit("error", `Application error: ${err && err.message}`); // Does not trigger Azure alert
    return next(err);
  } else if (err.message == "invalid csrf token") {
    logEmitter.emit("error", `Application error: ${err && err.message}`); // Does not trigger Azure alert
  } else {
    logEmitter.emit("error", `Application error handled - ${err && err.message}`); // Used for Azure alerts
  }

  logEmitter.emit("error", `statusCode: ${res ? res.statusCode : err ? err.statusCode : null}`);
  var props = {
    statusCode: res ? res.statusCode : err ? err.statusCode : "500",
    err: err ? err : "An error occurred.",
    ...(err.stack && err.stack.toString().includes("propsGenerator") ? {} : PropsGenerator(req))
  };
  if (err.message.match("template not found")) {
    res.render("page-not-found", { props });
  } else {
    res.render("internal-server-error", { props });
  }
};

module.exports = { errorHandler };
