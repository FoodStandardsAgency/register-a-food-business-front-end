const { error } = require("winston");
const PropsGenerator = require("../propsGenerator");

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  error(err);
  error(`statusCode: ${res ? res.statusCode : err ? err.statusCode : null}`);
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
