const { app } = require("../server");
const { error } = require("winston");

const errorHandler = (err, req, res, next) => {
  error(err);
  error(`statusCode: ${res ? res.statusCode : err ? err.statusCode : null}`);
  var props = {
    statusCode: res ? res.statusCode : err ? err.statusCode : null,
    err: err
  }
  res.render("internal-server-error", {props});
};

module.exports = { errorHandler };
