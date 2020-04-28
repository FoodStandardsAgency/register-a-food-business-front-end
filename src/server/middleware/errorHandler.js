const { app } = require("../server");
const { error } = require("winston");

const errorHandler = (err, req, res, next) => {
  error(err);
  error(`statusCode: ${res ? res.statusCode : err ? err.statusCode : null}`);
  app.render(req, res, "/internal-server-error");
};

module.exports = { errorHandler };
