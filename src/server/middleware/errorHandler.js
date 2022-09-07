const { logger } = require("../services/winston");
const PropsGenerator = require("../propsGenerator");

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);
  if (res.headersSent) {
    return next(err);
  }
  logger.error(
    `statusCode: ${res ? res.statusCode : err ? err.statusCode : null}`
  );
  var props = {
    statusCode: res ? res.statusCode : err ? err.statusCode : "500",
    err: err ? err : "An error occurred.",
    ...PropsGenerator(req)
  };
  if (err.message.match("template not found")) {
    res.render("page-not-found", { props });
  } else {
    res.render("internal-server-error", { props });
  }
};

module.exports = { errorHandler };
