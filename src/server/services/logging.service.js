/**
 * Modifications to the logEmitter for different logging purposes
 * @module services/logging
 */

const EventEmitter = require("events");
const { info, error } = require("winston");

class LogEmitter extends EventEmitter {}

const logEmitter = new LogEmitter();

logEmitter.on("functionCall", (module, functionName) => {
  info(`${module}: ${functionName} called`);
});

logEmitter.on("functionCallWith", (module, functionName, data) => {
  info(`${module}: ${functionName} called with: ${data}`);
});

logEmitter.on("functionSuccess", (module, functionName) => {
  info(`${module}: ${functionName} successful`);
});

logEmitter.on("functionSuccessWith", (module, functionName, data) => {
  info(`${module}: ${functionName} successful with: ${data}`);
});

logEmitter.on("functionFail", (module, functionName, err) => {
  error(`${module}: ${functionName} failed with: ${err}`);
});

logEmitter.on("doubleMode", (module, functionName) => {
  info(`${module}: ${functionName}: running in double mode`);
});

module.exports = { logEmitter };
