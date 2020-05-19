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
    logEmitter.emit(
      "functionCall",
      "config-db.connector",
      "establishConnectionToMongo"
    );

    // If no connection or connection is not valid after downtime
    if (!client || !client.topology || !client.topology.isConnected()) {
      try {
        if (client && client.topology !== undefined) {
          client.close();
        }
        client = await mongodb.MongoClient.connect(CONFIGDB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
      } catch (err) {
        logEmitter.emit(
          "functionFail",
          "config-db.connector",
          "establishConnectionToMongo",
          err
        );
        throw err;
      }
    }

    configDB = client.db("register_a_food_business_config");
    configVersionCollection = configDB.collection("configVersion");
    lcConfigCollection = configDB.collection("lcConfig");
    logEmitter.emit(
      "functionSuccess",
      "config-db.connector",
      "establishConnectionToMongo"
    );
  }
};

/**
 * Fetches the path configuration (including pages, switches etc) from the config database
 *
 * @param {string} version The data version of this registration, corresponding to an entry in the config database
 *
 * @returns {object} An object containing the _id and path fields of the config database data for the given config version
 */
const getPathConfigByVersion = async (version) => {
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
  let localCouncilUrls = null;
  logEmitter.emit("functionCall", "config-db.connector", "getLocalCouncils");

  try {
    await establishConnectionToMongo();

    localCouncilUrls = await lcConfigCollection
      .find({
        $and: [
          { local_council_url: { $ne: "" } },
          { local_council_url: { $ne: null } }
        ]
      })
      .project({ local_council_url: 1, _id: 0 })
      .toArray();

    if (localCouncilUrls.length < 1) {
      statusEmitter.emit("incrementCount", "getLocalCouncilsFailed");
      statusEmitter.emit(
        "setStatus",
        "mostRecentGetLocalCouncilsSucceeded",
        false
      );
    } else {
      localCouncilUrls = localCouncilUrls.map((res) => res.local_council_url);
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

  logEmitter.emit("functionSuccess", "config-db.connector", "getLocalCouncils");

  return localCouncilUrls;
};

/**
 * Retrieves council-specific details
 *
 * @param {string} council Name of the council
 *
 * @returns {Object} Object with council data
 */
const getCouncilData = async (council) => {
  logEmitter.emit("functionCall", "config-db.connector", "getCouncilData");

  let councilRecord = null;
  try {
    await establishConnectionToMongo();

    councilRecord = await lcConfigCollection.findOne({
      local_council_url: council
    });

    if (councilRecord === null) {
      statusEmitter.emit("incrementCount", "getCouncilDataFailed");
      statusEmitter.emit(
        "setStatus",
        "mostRecentGetCouncilDataSucceeded",
        false
      );
      const newError = new Error();
      newError.name = "mongoConnectionError";
      newError.message = "getCouncilData retrieved null";
      throw newError;
    } else {
      statusEmitter.emit("incrementCount", "getCouncilDataSucceeded");
      statusEmitter.emit(
        "setStatus",
        "mostRecentGetCouncilDataSucceeded",
        true
      );
    }
  } catch (err) {
    statusEmitter.emit("incrementCount", "getCouncilDataFailed");
    statusEmitter.emit("setStatus", "mostRecentGetCouncilDataSucceeded", false);
    logEmitter.emit(
      "functionFail",
      "config-db.connector",
      "getCouncilData",
      err
    );

    const newError = new Error();
    newError.name = "mongoConnectionError";
    newError.message = err.message;

    throw newError;
  }

  logEmitter.emit("functionSuccess", "config-db.connector", "getCouncilData");

  return councilRecord;
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

const clearMongoConnection = () => {
  client = undefined;
};

module.exports = {
  getPathConfigByVersion,
  clearPathConfigCache,
  clearMongoConnection,
  getLocalCouncils,
  getCouncilData
};
