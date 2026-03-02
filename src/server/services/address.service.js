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
 * @param {array} addresses The addresses returned from fetchUsingPostcoderPremium/Standard are an Array with addressLine1 and posttown included
 *
 * @returns {array} A true or false value if addressline1 or posttown exists/doesnt exists
 */
function filterOutIncompleteAddresses(addresses) {
  return addresses.filter(
    (address) =>
      typeof address.addressline1 === "string" &&
      address.addressline1.trim().length > 0 &&
      typeof address.posttown === "string" &&
      address.posttown.trim().length > 0
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
    let addresses = await fetchUsingPostcoderPremium(postcode);
    if (!addresses || addresses.length === 0) {
      addresses = await fetchUsingPostcoderStandard(postcode);
    }

    if (!addresses) {
      throw Error("Postcoder returned no data");
    }

    const filtered = filterOutIncompleteAddresses(addresses);

    if (addresses.length === 0) {
      logEmitter.emit("info", "Postcoder returned no addresses", {
        postcode
      });
    } else if (filtered.length === 0) {
      logEmitter.emit("info", "Postcoder returned no complete addresses", {
        postcode
      });
    }

    const cleaned = removeOrganisationFromAddressLookup(filtered);

    logEmitter.emit("info", "Postcoder address lookup success"); // Used for Azure alerts
    logEmitter.emit("functionSuccess", "address.service", "getUkAddressesByPostcode");
    return cleaned;
  } catch (err) {
    logEmitter.emit("warning", "Postcoder address lookup failure"); // Used for Azure alerts
    logEmitter.emit("functionFail", "address.service", "getUkAddressesByPostcode", err);
    return [];
  }
};

module.exports = { getUkAddressesByPostcode, filterOutIncompleteAddresses };
