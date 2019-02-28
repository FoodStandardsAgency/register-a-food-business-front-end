/**
 * Updates and stores status variables
 * @module connectors/status
 */
const mongodb = require("mongodb");
const { statusCollectionDouble } = require("./config-db.double");
const { STATUSDB_URL } = require("../../config");
const { logEmitter } = require("../../services/logging.service");

let client;
let statusDB;
let statusCollection;

/**
 * Sets up a connection to the status collection in the config database.
 * The client, configDB and statusCollection variables are accessible to other functions in this connector.
 */
const establishConnectionToMongo = async () => {
  if (process.env.DOUBLE_MODE === "true") {
    logEmitter.emit(
      "doubleMode",
      "status-db.connector",
      "establishConnectionToMongo"
    );
    statusCollection = statusCollectionDouble;
  } else {
    client = await mongodb.MongoClient.connect(STATUSDB_URL, {
      useNewUrlParser: true
    });

    statusDB = client.db("register_a_food_business_status");

    statusCollection = statusDB.collection("status");
  }
};

/**
 * Fetches all available status values
 * *
 * @returns {object} All status values
 */
const getStoredStatus = async () => {
  await establishConnectionToMongo();
  const storedStatus = await statusCollection.findOne({
    _id: "frontEndStatus"
  });

  return storedStatus;
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
  const response = await statusCollection.updateOne(
    { _id: "frontEndStatus" },
    { $set: { [statusName]: newStatus } }
  );
  console.log(response);
  return newStatus;
};

module.exports = { getStoredStatus, updateStoredStatus };
