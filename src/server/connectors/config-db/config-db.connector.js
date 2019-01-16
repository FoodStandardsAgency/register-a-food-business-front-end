/**
 * @module connectors/config-db
 */

const mongodb = require("mongodb");
const { configVersionCollectionDouble } = require("./config-db.double");
const { CONFIGDB_URL } = require("../../config");
const { logEmitter } = require("../../services/logging.service");
const { statusEmitter } = require("../../services/statusEmitter.service");

let client;
let configDB;
let configVersionCollection;
let lcConfigCollection;

let pathConfig = null;
let localCouncilUrls = null;

/**
 * Sets up a connection to the configVersion collection in the config database.
 * The client, configDB and configVersionCollection variables are accessible to other functions in this connector.
 */
const establishConnectionToMongo = async () => {
  if (process.env.DOUBLE_MODE === "true") {
    logEmitter.emit(
      "doubleMode",
      "config-db.connector",
      "establishConnectionToMongo"
    );
    configVersionCollection = configVersionCollectionDouble;
  } else {
    client = await mongodb.MongoClient.connect(CONFIGDB_URL, {
      useNewUrlParser: true
    });

    configDB = client.db("register_a_food_business_config");

    configVersionCollection = configDB.collection("configVersion");
    lcConfigCollection = configDB.collection("lcConfig");
  }
};

/**
 * Fetches the path configuration (including pages, switches etc) from the config database
 *
 * @param {string} version The data version of this registration, corresponding to an entry in the config database
 *
 * @returns {object} An object containing the _id and path fields of the config database data for the given config version
 */
const getPathConfigByVersion = async version => {
  logEmitter.emit(
    "functionCall",
    "config-db.connector",
    "getPathConfigByVersion"
  );

  if (pathConfig === null) {
    try {
      await establishConnectionToMongo();

      const configVersionRecord = await configVersionCollection.findOne({
        _id: version
      });

      if (configVersionRecord === null) {
        pathConfig = null;
        statusEmitter.emit("incrementCount", "getPathConfigFailed");
        statusEmitter.emit(
          "setStatus",
          "mostRecentGetPathConfigSucceeded",
          false
        );
      } else {
        pathConfig = {
          _id: configVersionRecord._id,
          path: configVersionRecord.path
        };
        statusEmitter.emit("incrementCount", "getPathConfigSucceeded");
        statusEmitter.emit(
          "setStatus",
          "mostRecentGetPathConfigSucceeded",
          true
        );
      }
    } catch (err) {
      statusEmitter.emit("incrementCount", "getPathConfigFailed");
      statusEmitter.emit(
        "setStatus",
        "mostRecentGetPathConfigSucceeded",
        false
      );
      logEmitter.emit(
        "functionFail",
        "config-db.connector",
        "getPathConfigByVersion",
        err
      );

      const newError = new Error();
      newError.name = "mongoConnectionError";
      newError.message = err.message;

      throw newError;
    }
  }

  logEmitter.emit(
    "functionSuccess",
    "config-db.connector",
    "getPathConfigByVersion"
  );

  return pathConfig;
};

/**
 * Fetches the list of allowed local councils from the config database
 *
 * @returns {Array} An array containing shortened local council names
 */
const getLocalCouncils = async () => {
  logEmitter.emit("functionCall", "config-db.connector", "getLocalCouncils");

  if (localCouncilUrls === null) {
    try {
      await establishConnectionToMongo();

      localCouncilUrls = await lcConfigCollection.distinct("local_council_url");

      if (localCouncilUrls === null) {
        statusEmitter.emit("incrementCount", "getLocalCouncilsFailed");
        statusEmitter.emit(
          "setStatus",
          "mostRecentGetLocalCouncilsSucceeded",
          false
        );
      } else {
        statusEmitter.emit("incrementCount", "getLocalCouncilsSucceeded");
        statusEmitter.emit(
          "setStatus",
          "mostRecentGetLocalCouncilsSucceeded",
          true
        );
      }
    } catch (err) {
      statusEmitter.emit("incrementCount", "getLocalCouncilsFailed");
      statusEmitter.emit(
        "setStatus",
        "mostRecentGetLocalCouncilsSucceeded",
        false
      );
      logEmitter.emit(
        "functionFail",
        "config-db.connector",
        "getLocalCouncils",
        err
      );

      const newError = new Error();
      newError.name = "mongoConnectionError";
      newError.message = err.message;

      throw newError;
    }
  }
  return localCouncilUrls;
};

/**
 * Resets the in-memory path config. Primarily for testing purposes.
 *
 * @returns {any} The cleared in-memory path config
 */
const clearPathConfigCache = () => {
  pathConfig = null;
  return pathConfig;
};

module.exports = {
  getPathConfigByVersion,
  clearPathConfigCache,
  getLocalCouncils
};
