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
  let localAuthorityMapitID, councilRecord;

  localAuthorityMapitID = await getLocalAuthorityIDByPostcode(postcode);
  if (!localAuthorityMapitID) {
    logEmitter.emit(
      "functionFail",
      "local-authority.service",
      "getLocalAuthorityByPostcode",
      `getLocalAuthorityIDByPostcode(${postcode}) failed`
    );
    return false;
  }

  councilRecord = await getCouncilDataByMapitID(localAuthorityMapitID);
  if (!councilRecord) {
    logEmitter.emit(
      "functionFail",
      "local-authority.service",
      "getLocalAuthorityByPostcode",
      `getCouncilDataByMapitID(${localAuthorityMapitID}) failed`
    );
    return false;
  }
  if (
    councilRecord &&
    !councilRecord.mapit_generation &&
    (!councilRecord.local_council_url ||
      (councilRecord.local_council_url &&
        councilRecord.local_council_url === ""))
  ) {
    logEmitter.emit(
      "functionFail",
      "local-authority.service",
      "getLocalAuthorityByPostcode",
      `getCouncilDataByMapitID(${localAuthorityMapitID}) councilRecord.local_council_url is empty`
    );
    return false;
  }

  if (councilRecord.mapit_generation) {
    localAuthorityMapitID = await getLocalAuthorityIDByPostcode(
      postcode,
      councilRecord.mapit_generation
    );
    if (!localAuthorityMapitID) {
      logEmitter.emit(
        "functionFail",
        "local-authority.service",
        "getLocalAuthorityByPostcode",
        `getLocalAuthorityIDByPostcode(${postcode}) failed`
      );
      return false;
    }
    councilRecord = await getCouncilDataByMapitID(localAuthorityMapitID);
    if (!councilRecord) {
      logEmitter.emit(
        "functionFail",
        "local-authority.service",
        "getLocalAuthorityByPostcode",
        `getCouncilDataByMapitID(${localAuthorityMapitID}) failed`
      );
      return false;
    }
    if (
      councilRecord &&
      (!councilRecord.local_council_url ||
        (councilRecord.local_council_url &&
          councilRecord.local_council_url === ""))
    ) {
      logEmitter.emit(
        "functionFail",
        "local-authority.service",
        "getLocalAuthorityByPostcode",
        `getCouncilDataByMapitID(${localAuthorityMapitID}) councilRecord.local_council_url is empty`
      );
      return false;
    }
  }
  logEmitter.emit(
    "functionSuccess",
    "local-authority.service",
    "getLocalAuthorityByPostcode"
  );
  return councilRecord;
};

module.exports = { getLocalAuthorityByPostcode };
