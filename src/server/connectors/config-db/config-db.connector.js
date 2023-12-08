/**
 * @module connectors/config-db
 */
const { logEmitter } = require("../../services/logging.service");
const { statusEmitter } = require("../../services/statusEmitter.service");
const { establishConnectionToCosmos } = require("../cosmos.client");
const CONFIG_DATA_LOOKUP_FAILURE = "Configuration data lookup failure";

let configVersionCollection;
let laConfigCollection;

let pathConfig = null;

/**
 * Fetches the path configuration (including pages, switches etc) from the config database
 *
 * @param {string} version The data version of this registration, corresponding to an entry in the config database
 *
 * @returns {object} An object containing the _id and path fields of the config database data for the given config version
 */
const getPathConfigByVersion = async (version) => {
  logEmitter.emit("functionCall", "config-db.connector", "getPathConfigByVersion");

  if (pathConfig === null) {
    try {
      configVersionCollection = await establishConnectionToCosmos("config", "configVersion");

      const configVersionRecord = await configVersionCollection.findOne({
        _id: version
      });

      if (configVersionRecord === null) {
        throw new Error(`Path config version not found (v${version})`);
      } else {
        pathConfig = {
          _id: configVersionRecord._id,
          path: configVersionRecord.path
        };
      }
    } catch (err) {
      logEmitter.emit("warning", CONFIG_DATA_LOOKUP_FAILURE); // Used for Azure alerts
      logEmitter.emit("functionFail", "config-db.connector", "getPathConfigByVersion", err);
      throw err;
    }
  }

  logEmitter.emit("functionSuccess", "config-db.connector", "getPathConfigByVersion");

  return pathConfig;
};

/**
 * Fetches the list of allowed local councils from the config database
 *
 * @returns {Array} An array containing shortened local council names
 */
const getLocalCouncils = async () => {
  let localCouncils = null;
  logEmitter.emit("functionCall", "config-db.connector", "getLocalCouncils");

  try {
    laConfigCollection = await establishConnectionToCosmos("config", "localAuthorities");

    localCouncils = await laConfigCollection
      .find({
        $and: [
          { local_council_url: { $ne: "" } },
          { local_council_url: { $ne: null } },
          { deleted: { $ne: true } }
        ]
      })
      .project({ local_council: 1, local_council_url: 1, _id: 1 })
      .toArray();

    if (localCouncils.length < 1) {
      throw new Error("Local Authorities not found");
    }
  } catch (err) {
    logEmitter.emit("warning", CONFIG_DATA_LOOKUP_FAILURE); // Used for Azure alerts
    logEmitter.emit("functionFail", "config-db.connector", "getLocalCouncils", err);
    throw err;
  }

  logEmitter.emit("functionSuccess", "config-db.connector", "getLocalCouncils");

  return localCouncils;
};

/**
 * Retrieves council-specific details by ID
 *
 * @param {string} councilID ID of the council
 *
 * @returns {Object} Object with council data
 */
const getCouncilDataByID = async (councilID) => {
  logEmitter.emit("functionCall", "config-db.connector", "getCouncilDataByID");
  let councilRecord = null;

  try {
    if (isNaN(councilID)) {
      throw new Error("councilID is not a number");
    }

    laConfigCollection = await establishConnectionToCosmos("config", "localAuthorities");

    councilRecord = await laConfigCollection.findOne({
      _id: +councilID
    });

    if (councilRecord === null) {
      throw new Error(`LA not found (${councilID})`);
    }
  } catch (err) {
    logEmitter.emit("warning", CONFIG_DATA_LOOKUP_FAILURE); // Used for Azure alerts
    logEmitter.emit("functionFail", "config-db.connector", "getCouncilDataByID", err);
    throw err;
  }

  logEmitter.emit("functionSuccess", "config-db.connector", "getCouncilDataByID");

  return councilRecord;
};

/**
 * Retrieves council-specific details by MapIt ID
 *
 * @param {string} councilMapitID MapIt ID of the council
 *
 * @returns {Object} Object with council data
 */
const getCouncilDataByMapitID = async (councilMapitID) => {
  logEmitter.emit("functionCall", "config-db.connector", "getCouncilDataByMapitID");

  let councilRecord = null;
  try {
    laConfigCollection = await establishConnectionToCosmos("config", "localAuthorities");

    councilRecord = await laConfigCollection.findOne({
      mapit_id: councilMapitID
    });
  } catch (err) {
    logEmitter.emit("warning", CONFIG_DATA_LOOKUP_FAILURE); // Used for Azure alerts
    logEmitter.emit("functionFail", "config-db.connector", "getCouncilDataByMapitID", err);
    throw err;
  }

  if (councilRecord === null) {
    const error = new Error("getCouncilDataByMapitID retrieved null");
    logEmitter.emit("functionFail", "config-db.connector", "getCouncilDataByMapitID", error);
    return false;
  }

  logEmitter.emit("functionSuccess", "config-db.connector", "getCouncilDataByMapitID");

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

module.exports = {
  getPathConfigByVersion,
  clearPathConfigCache,
  getLocalCouncils,
  getCouncilDataByID,
  getCouncilDataByMapitID
};
