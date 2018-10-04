const mongodb = require("mongodb");
const { pathConfigCollectionDouble } = require("./config-db.double");
const { CONFIGDB_URL } = require("../../config");
const { logEmitter } = require("../../services/logging.service");
const { statusEmitter } = require("../../services/statusEmitter.service");

let client;
let configDB;
let pathConfigCollection;

let pathConfig = null;

const establishConnectionToMongo = async () => {
  if (process.env.DOUBLE_MODE === "true") {
    logEmitter.emit(
      "doubleMode",
      "config-db.connector",
      "establishConnectionToMongo"
    );
    pathConfigCollection = pathConfigCollectionDouble;
  } else {
    client = await mongodb.MongoClient.connect(CONFIGDB_URL, {
      useNewUrlParser: true
    });

    configDB = client.db("register_a_food_business_config");

    pathConfigCollection = configDB.collection("pathConfig");
  }
};

const getPathConfigByVersion = async version => {
  logEmitter.emit(
    "functionCall",
    "config-db.connector",
    "getPathConfigByVersion"
  );

  if (pathConfig === null) {
    try {
      await establishConnectionToMongo();

      const pathConfigRecord = await pathConfigCollection.findOne({
        _id: version
      });

      if (pathConfigRecord === null) {
        pathConfig = null;
        statusEmitter.emit("incrementCount", "getPathConfigFailed");
        statusEmitter.emit(
          "setStatus",
          "mostRecentGetPathConfigSucceeded",
          false
        );
      } else {
        pathConfig = pathConfigRecord;
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

const clearPathConfigCache = () => {
  pathConfig = null;
  return pathConfig;
};

module.exports = { getPathConfigByVersion, clearPathConfigCache };
