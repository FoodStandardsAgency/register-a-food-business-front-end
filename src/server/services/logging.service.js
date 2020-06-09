const EventEmitter = require("events");
const {logger} = require("./winston");

class LogEmitter extends EventEmitter {}

const DEBUG = "debug";
const WARN = "warning";
const ERROR = "error";
const INFO = "info";
const FUNCTION_CALL_WITH = "functionCallWith";
const FUNCTION_SUCCESS_WITH = "functionSuccessWith";
const FUNCTION_CALL = "functionCall";
const FUNCTION_SUCCESS = "functionSuccess";
const FUNCTION_FAIL = "functionFail";
const DOUBLE_MODE = "doubleMode";

const logEmitter = new LogEmitter();

logEmitter.on(FUNCTION_CALL, (module, functionName) => {
  logger.info(`${module}: ${functionName} called`);
});

logEmitter.on(FUNCTION_CALL_WITH, (module, functionName, data) => {
  logger.info(`${module}: ${functionName} called with: ${data}`);
});

logEmitter.on(FUNCTION_SUCCESS, (module, functionName) => {
  logger.info(`${module}: ${functionName} successful`);
});

logEmitter.on(FUNCTION_SUCCESS_WITH, (module, functionName, data) => {
  logger.info(`${module}: ${functionName} successful with: ${data}`);
});

logEmitter.on(FUNCTION_FAIL, (module, functionName, err) => {
  logger.error(`${module}: ${functionName} failed with: ${err.message}`);
});

logEmitter.on(DOUBLE_MODE, (module, functionName) => {
  logger.info(`${module}: ${functionName}: running in double mode`);
});

logEmitter.on(INFO, (message) => {
  logger.info(message);
});

logEmitter.on(WARN, (message) => {
  logger.warn(message);
});

logEmitter.on(DEBUG, (message) => {
  logger.debug(message);
});

logEmitter.on(ERROR, (message) => {
  logger.error(message);
});

module.exports = {
  logEmitter,
  FUNCTION_CALL,
  FUNCTION_FAIL,
  FUNCTION_SUCCESS,
  DOUBLE_MODE,
  INFO,
  ERROR,
  DEBUG
};
