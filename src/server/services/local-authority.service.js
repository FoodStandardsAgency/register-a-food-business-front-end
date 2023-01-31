/**
 * Functions for fetching addresses in a specific country
 * @module services/address
 */

const {
  getLocalAuthorityIDByPostcode
} = require("../connectors/local-authority-lookup/local-authority-lookup-api.connector");
const { statusEmitter } = require("../services/statusEmitter.service");
const { logEmitter } = require("./logging.service");
const {
  getCouncilDatabyID,
  getCouncilDataByMapitID
} = require("../connectors/config-db/config-db.connector");

/**
 * Fetches local authority for UK postcode
 *
 * @param {string} postcode The postcode to search by
 *
 * @returns {object} Local authority
 */
const getLocalAuthorityByPostcode = async (postcode) => {
  logEmitter.emit(
    "functionCall",
    "local-authority.service",
    "getLocalAuthorityByPostcode"
  );

  const localAuthorityMapitID = await getLocalAuthorityIDByPostcode(postcode);
  if (!localAuthorityMapitID) {
    return false;
  }

  const councilRecord = await getCouncilDataByMapitID(localAuthorityMapitID);
  if (!councilRecord) {
    return false;
  }

  statusEmitter.emit("setStatus", "mostRecentAddressLookupSucceeded", true);
  logEmitter.emit(
    "functionSuccess",
    "local-authority.service",
    "getLocalAuthorityByPostcode"
  );
  return councilRecord;
};

module.exports = { getLocalAuthorityByPostcode };
