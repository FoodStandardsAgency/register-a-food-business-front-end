const EventEmitter = require("events");
const { logger } = require("./winston");

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

const getPresentContext = () => {
  var getNamespace = require("cls-hooked").getNamespace;

  var writer = getNamespace("rafbfe");

  let req = writer.get("request");

  if (req) {
    return {
      context: {
        status: "has-session",
        session_id: req.session.id
      }
    };
  }

  return {
    status: "no-session",
    session_id: null
  };
};

logEmitter.on(FUNCTION_CALL, (module, functionName) => {
  logger.info(`${module}: ${functionName} called`, getPresentContext());
});

logEmitter.on(FUNCTION_CALL_WITH, (module, functionName, data) => {
  logger.info(
    `${module}: ${functionName} called with: ${data}`,
    getPresentContext()
  );
});

logEmitter.on(FUNCTION_SUCCESS, (module, functionName) => {
  logger.info(`${module}: ${functionName} successful`, getPresentContext());
});

logEmitter.on(FUNCTION_SUCCESS_WITH, (module, functionName, data) => {
  logger.info(
    `${module}: ${functionName} successful with: ${data}`,
    getPresentContext()
  );
});

logEmitter.on(FUNCTION_FAIL, (module, functionName, err) => {
  logger.error(
    `${module}: ${functionName} failed with: ${err.message}`,
    getPresentContext()
  );
});

logEmitter.on(DOUBLE_MODE, (module, functionName) => {
  logger.info(
    `${module}: ${functionName}: running in double mode`,
    getPresentContext()
  );
});

logEmitter.on(INFO, (message) => {
  logger.info(message, getPresentContext());
});

logEmitter.on(WARN, (message) => {
  logger.warn(message, getPresentContext());
});

logEmitter.on(DEBUG, (message) => {
  logger.debug(message, getPresentContext());
});

logEmitter.on(ERROR, (message) => {
  logger.error(message, getPresentContext());
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
