const { logEmitter } = require("../../services/logging.service");
/**
 * Removes organization from address lookup
 *
 * @param {array} addressList A list of addresses
 *
 * @returns {array} A list of addresses without organization
 */
const removeOrganisationFromAddressLookup = (addressList) => {
  logEmitter.emit(
    "functionCall",
    "removeOrganisationFromAddressLookup",
    "removeOrganisationFromAddressLookup"
  );

  if (addressList.length === 0) {
    return addressList;
  }

  const addressListWithoutOrganisation = addressList.map((a) => {
    var address = a;

    if (address.hasOwnProperty("organisation")) {
      if (
        isString(address.organisation) &&
        address.summaryline.startsWith(address.organisation + ", ")
      ) {
        // removes organisation from summaryline
        address.summaryline = address.summaryline.substring(address.organisation.length + 2);
      }

      // removes organisation key
      delete address.organisation;
    }
    return address;
  });

  logEmitter.emit(
    "functionSuccess",
    "removeOrganisationFromAddressLookup",
    "removeOrganisationFromAddressLookup"
  );

  return removeDuplicates(addressListWithoutOrganisation, "summaryline");
};

/**
 * Removes duplicate objects from array by key using a Set() Method:
 * This method sets a new object type with ES6 (ES2015) that allows you to create collections of unique values.
 *
 * @param {arr} array of objects
 * @param {key} object key to be compared
 *
 * @returns array of objects without duplicates
 */
const removeDuplicates = (array, key) => {
  var check = new Set();
  return array.filter((obj) => !check.has(obj[key]) && check.add(obj[key]));
};

/**
 * Check if x is string
 *
 * @param {x} any
 *
 * @returns {bool} true if string, else false
 */
const isString = (x) => typeof x === "string" || x instanceof String;

module.exports = { removeOrganisationFromAddressLookup };
