const {
  getAddressesByPostcode
} = require("../connectors/address-lookup/address-lookup-api.connector");
const { statusEmitter } = require("../services/statusEmitter.service");
const { logEmitter } = require("./logging.service");

const getUkAddressesByPostcode = async postcode => {
  logEmitter.emit(
    "functionCall",
    "address.service",
    "getUkAddressesByPostcode"
  );

  try {
    const addressLookupResponse = await getAddressesByPostcode(
      "uk",
      postcode,
      500
    );

    statusEmitter.emit("setStatus", "mostRecentAddressLookupSucceeded", true);
    logEmitter.emit(
      "functionSuccess",
      "address.service",
      "getUkAddressesByPostcode"
    );
    return addressLookupResponse;
  } catch (err) {
    statusEmitter.emit("setStatus", "mostRecentAddressLookupSucceeded", false);
    logEmitter.emit(
      "functionFail",
      "address.service",
      "getUkAddressesByPostcode",
      err
    );
    throw err;
  }
};

module.exports = { getUkAddressesByPostcode };
