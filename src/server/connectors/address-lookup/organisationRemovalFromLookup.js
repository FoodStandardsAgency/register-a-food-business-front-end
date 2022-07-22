const { logEmitter } = require("../../services/logging.service");
/**
 * Removes organization from address lookup
 *
 * @param {array} addressList A list of addresses
 *
 * @returns {array} A list of addresses without organization
 */
const organisationRemovalFromLookup = (addressList) => {
  logEmitter.emit(
    "functionCall",
    "organisationRemovalFromLookup",
    "organisationRemovalFromLookup"
  );
  if (addressList.length === 0) {
    return addressList;
  }
  const addressListWithoutOrganisation = addressList.map((a) => {
    var address = a;
    if (address.hasOwnProperty("organisation")) {
      // removes organisation from summaryline
      if (
        isString(address.organisation) &&
        address.summaryline.startsWith(address.organisation + ", ")
      ) {
        address.summaryline = address.summaryline.substring(
          address.organisation.length + 2
        );
      }
      // removes organisation key
      delete address.organisation;
    }
    logEmitter.emit(
      "functionSuccess",
      "organisationRemovalFromLookup",
      "organisationRemovalFromLookup"
    );
    return address;
  });
  return removeDuplicateObjectFromArray(
    addressListWithoutOrganisation,
    "summaryline"
  );
};

/**
 * Removes duplicate objects from array by key
 *
 * @param {array} array of objects
 * @param {key} object key to be compared
 *
 * @returns {array} array of objects without duplicates
 */
const removeDuplicateObjectFromArray = (array, key) => {
  let check = {};
  let res = [];
  for (let i = 0; i < array.length; i++) {
    if (!check[array[i][key]]) {
      check[array[i][key]] = true;
      res.push(array[i]);
    }
  }
  return res;
};

/**
 * Check if x is string
 *
 * @param {x} any
 *
 * @returns {bool} true if string, else false
 */
const isString = (x) => typeof x === "string" || x instanceof String;

module.exports = { organisationRemovalFromLookup };
