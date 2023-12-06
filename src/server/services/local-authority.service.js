/**
 * Functions for fetching Local Authority for provided potcode
 * @module services/local_authority
 */

const {
  getLocalAuthorityIDByPostcode
} = require("../connectors/local-authority-lookup/local-authority-lookup-api.connector");
const { statusEmitter } = require("../services/statusEmitter.service");
const { logEmitter } = require("./logging.service");
const { getCouncilDataByMapitID } = require("../connectors/config-db/config-db.connector");

/**
 * Fetches local authority for UK postcode
 *
 * @param {string} postcode The postcode to search by
 *
 * @returns {object} Local authority
 */
const getLocalAuthorityByPostcode = async (postcode) => {
  logEmitter.emit("functionCall", "local-authority.service", "getLocalAuthorityByPostcode");
  let localAuthorityMapitID, councilRecord;

  try {
    // Get the mapIt ID based on the postcode
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

    // Get the LA from the mapIt ID
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
        (councilRecord.local_council_url && councilRecord.local_council_url === ""))
    ) {
      logEmitter.emit(
        "functionFail",
        "local-authority.service",
        "getLocalAuthorityByPostcode",
        `getCouncilDataByMapitID(${localAuthorityMapitID}) councilRecord.local_council_url is empty`
      );
      return false;
    }

    // Check if a different generation of LA is required
    if (councilRecord.mapit_generation) {
      // Obtain the mapIt ID based on the postcode and generation ID (SECOND REQUEST)
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
      // Get the LA from the mapIt ID (SECOND REQUEST)
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
          (councilRecord.local_council_url && councilRecord.local_council_url === ""))
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
    logEmitter.emit("functionSuccess", "local-authority.service", "getLocalAuthorityByPostcode");
    return councilRecord;
  } catch (error) {
    logEmitter.emit(
      "functionFail",
      "local-authority.service",
      "getLocalAuthorityByPostcode",
      error
    );
    return false;
  }
};

module.exports = { getLocalAuthorityByPostcode };
