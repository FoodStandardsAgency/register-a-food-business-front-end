/**
 * Functions for fetching addresses in a specific country
 * @module services/address
 */

const {
  getAddressesByPostcode
} = require("../connectors/address-lookup/address-lookup-api.connector");
const { statusEmitter } = require("../services/statusEmitter.service");
const { logEmitter } = require("./logging.service");

/**
 * Fetches addresses for UK postcodes
 *
 * @param {string} postcode The postcode to search by
 *
 * @returns {array} A list of addresses
 */
const getUkAddressesByPostcode = async (postcode) => {
  logEmitter.emit("functionCall", "address.service", "getUkAddressesByPostcode");

  try {
    const addressLookupResponse = await getAddressesByPostcode(postcode, 500);

    logEmitter.emit("functionSuccess", "address.service", "getUkAddressesByPostcode");
    return addressLookupResponse;
  } catch (err) {
    logEmitter.emit("warning", "Postcoder address lookup failure"); // Used for Azure alerts
    logEmitter.emit("functionFail", "address.service", "getUkAddressesByPostcode", err);
    return [];
  }
};

module.exports = { getUkAddressesByPostcode };
