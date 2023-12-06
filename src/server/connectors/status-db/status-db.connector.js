/**
 * Updates and stores status variables
 * @module connectors/status
 */
const { logEmitter } = require("../../services/logging.service");
const { establishConnectionToCosmos } = require("../cosmos.client");

let statusCollection;

/**
 * Fetches all available status values
 * *
 * @returns {object} All status values
 */
const getStoredStatus = async () => {
  logEmitter.emit("functionCall", "status-db.connector", "getStoredStatus");
  try {
    statusCollection = await establishConnectionToCosmos("status", "status");
    const storedStatus = await statusCollection.findOne({
      _id: "frontEndStatus"
    });
    logEmitter.emit("functionSuccess", "status-db.connector", "getStoredStatus");

    return storedStatus;
  } catch (err) {
    logEmitter.emit("functionFail", "status-db.connector", "getStoredStatus", err);
    const newError = new Error();
    newError.name = "mongoConnectionError";
    newError.message = err.message;

    throw newError;
  }
};

/**
 * Updates a specified status value
 *
 * @param {string} statusName The status field name
 * @param {any} newStatus The new status value
 *
 * @returns {any} The new status value
 */
const updateStoredStatus = async (statusName, newStatus) => {
  logEmitter.emit("functionCall", "status-db.connector", "updateStoredStatus");
  try {
    statusCollection = await establishConnectionToCosmos("status", "status");
    await statusCollection.updateOne(
      { _id: "frontEndStatus" },
      { $set: { [statusName]: newStatus } }
    );

    logEmitter.emit("functionsuccess", "status-db.connector", "updateStoredStatus");
    return newStatus;
  } catch (err) {
    logEmitter.emit("functionFail", "status-db.connector", "updateStoredStatus", err);

    const newError = new Error();
    newError.name = "mongoConnectionError";
    newError.message = err.message;

    throw newError;
  }
};

module.exports = { getStoredStatus, updateStoredStatus };
