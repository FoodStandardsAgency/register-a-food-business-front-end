/**
 * Functions for fetching addresses in a specific country
 * @module services/address
 */

const {
  fetchUsingPostcoderPremium,
  fetchUsingPostcoderStandard
} = require("../connectors/address-lookup/address-lookup-api.connector");
const { logEmitter } = require("./logging.service");
const {
  removeOrganisationFromAddressLookup
} = require("../connectors/address-lookup/removeOrganisationFromAddressLookup");

/**
 * Filters out addresses that are missing either addressline1 or posttown
 *
 * @param {string} addresses The addresses returned from fetchUsingPostcoderPremium/Standard
 *
 * @returns {boolean} A true or false value if addressline1 or posttown exists/doesnt exists
 */
function filterOutIncompleteAddresses(addresses) {
  return addresses.filter(
    (address) => typeof address.addressline1 === "string" && typeof address.posttown === "string"
  );
}

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
    let firstJson = await fetchUsingPostcoderPremium(postcode);
    if (!firstJson || firstJson.length === 0) {
      firstJson = await fetchUsingPostcoderStandard(postcode);
    }

    if (!firstJson) {
      throw Error("Postcoder returned no data");
    }

    let filtered = filterOutIncompleteAddresses(firstJson);

    if (firstJson.length === 0) {
      logEmitter.emit("info", "Postcoder returned no addresses", {
        postcode
      });
    }

    if (filtered.length === 0) {
      logEmitter.emit("info", "Postcoder returned no complete addresses", {
        postcode
      });
    }

    filtered = removeOrganisationFromAddressLookup(filtered);

    logEmitter.emit("info", "Postcoder address lookup success"); // Used for Azure alerts
    logEmitter.emit("functionSuccess", "address.service", "getUkAddressesByPostcode");
    return filtered;
  } catch (err) {
    logEmitter.emit("warning", "Postcoder address lookup failure"); // Used for Azure alerts
    logEmitter.emit("functionFail", "address.service", "getUkAddressesByPostcode", err);
    return [];
  }
};

module.exports = { getUkAddressesByPostcode };
