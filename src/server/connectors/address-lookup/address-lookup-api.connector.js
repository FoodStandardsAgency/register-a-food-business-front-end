/**
 * @module connectors/address-lookup-api
 */

const fetch = require("node-fetch");
const {
  ADDRESS_API_URL_BASE,
  ADDRESS_API_URL_QUERY,
  ADDRESS_API_URL_BASE_STANDARD,
  ADDRESS_API_URL_QUERY_STANDARD
} = require("../../config");
const { logEmitter } = require("../../services/logging.service");
const { addressLookupDouble } = require("./address-lookup-api.double");

/**
 * Fetches addresses from the address lookup API for the given postcode
 *
 * @param {string} postcode The postcode to search by
 * @param {number} addressCountLimit CURRENTLY OBSOLETE
 *
 * @returns {array} A list of addresses
 */
const getAddressesByPostcode = async (postcode, addressCountLimit = 100) => {
  logEmitter.emit(
    "functionCallWith",
    "address-lookup-api.connector",
    "getAddressByPostcode",
    postcode
  );

  const DOUBLE_MODE = process.env.DOUBLE_MODE;

  let firstJson;
  if (DOUBLE_MODE === "true") {
    const firstRes = addressLookupDouble(postcode, ADDRESS_API_URL_QUERY);
    if (firstRes.status === 200) {
      firstJson = firstRes.json();
    } else {
      logEmitter.emit(
        "functionFail",
        "address-lookup-api.connector",
        "getAddressesByPostcode",
        `Address lookup API responded with non-200 status: ${firstRes.status}`
      );
      throw new Error(
        `Address lookup API responded with non-200 status: ${firstRes.status}`
      );
    }
  } else {
    firstJson = await fetchUsingPostcoderPremium(postcode);
    if (!firstJson || firstJson.length === 0) {
      firstJson = await fetchUsingPostcoderStandard(postcode);
    }
  }

  // TODO JMB: debug multi-call code

  // if (firstJson.length === 100 && firstJson[99].morevalues) {
  //   let nextPage = 1;

  //   let totalRequestCount = 1;

  //   let combinedResponses = JSON.parse(JSON.stringify(firstJson));

  //   const totalResults = combinedResponses[99].totalresults;

  //   const numberOfTotalRequestsToMake =
  //     totalResults > addressCountLimit
  //       ? Math.ceil(addressCountLimit / 100)
  //       : Math.ceil(totalResults / 100);

  //       delete combinedResponses[99].morevalues;
  //   delete combinedResponses[99].nextpage;
  //   delete combinedResponses[99].totalresults;

  //   while (totalRequestCount < numberOfTotalRequestsToMake) {
  //     let loopResponse;
  //     let loopJson;

  //     if (DOUBLE_MODE === "true") {
  //       loopResponse = addressLookupDouble(
  //         lowercaseCountryCode,
  //         postcode,
  //         ADDRESS_API_URL_QUERY + "&page=2"
  //       );
  //     } else {
  //       loopResponse = await fetch(
  //         `${ADDRESS_API_URL_BASE}/${postcode}?${ADDRESS_API_URL_QUERY}&page=${nextPage}`,
  //         {
  //           method: "GET"
  //         }
  //       );
  //     }

  //     console.log(postcode, loopResponse);

  //     if (loopResponse.status === 200) {
  //       loopJson = loopResponse.json();
  //     } else {
  //       throw new Error("Address lookup API is down");
  //     }

  //     if (loopJson.length === 100 && loopJson[99].morevalues) {
  //       delete loopJson[99].morevalues;
  //       delete loopJson[99].nextpage;
  //       delete loopJson[99].totalresults;
  //     }

  //     combinedResponses.push(...loopJson);

  //     combinedResponses.splice(addressCountLimit, combinedResponses.length);

  //     nextPage++;
  //     totalRequestCount++;
  //   }

  //   winston.info(
  //     `lookupAPI.connector: getAddressesByPostcode: finished with ${totalRequestCount} API request`
  //   );

  //   return combinedResponses;
  // } else if (firstJson.length === 0) {
  //   winston.info(
  //     `lookupAPI.connector: getAddressesByPostcode: finished with one API request. No addresses were found for this postcode.`
  //   );
  //   return firstJson;
  // } else {
  //   winston.info(
  //     `lookupAPI.connector: getAddressesByPostcode: finished with one API request`
  //   );
  //   return firstJson;
  // }
  logEmitter.emit(
    "functionSuccess",
    "address-lookup-api.connector",
    "getAddressByPostcode"
  );
  return firstJson;
};

/**
 * Fetches addresses using Postcoder Premium service
 *
 * @param {string} postcode The postcode to search by
 *
 * @returns {object} API response object
 */
const fetchUsingPostcoderPremium = async postcode => {
  logEmitter.emit(
    "functionCall",
    "address-lookup-api.connector",
    "fetchUsingPostcoderPremium",
    postcode
  );
  console.log(`${ADDRESS_API_URL_BASE}/${postcode}?${ADDRESS_API_URL_QUERY}`);
  const response = await fetch(
    `${ADDRESS_API_URL_BASE}/${postcode}?${ADDRESS_API_URL_QUERY}`,
    {
      method: "GET"
    }
  );
  if (response.status === 200) {
    return response.json();
  } else {
    logEmitter.emit(
      "functionFail",
      "address-lookup-api.connector",
      "fetchUsingPostcoderPremium",
      `Address lookup API responded with non-200 status: ${response.status}`
    );
  }
};

/**
 * Fetches addresses using Postcoder Standard service
 *
 * @param {string} postcode The postcode to search by
 *
 * @returns {object} API response object
 */
const fetchUsingPostcoderStandard = async postcode => {
  logEmitter.emit(
    "functionCall",
    "address-lookup-api.connector",
    "fetchUsingPostcoderStandard",
    postcode
  );
  const response = await fetch(
    `${ADDRESS_API_URL_BASE_STANDARD}/uk/${postcode}?${ADDRESS_API_URL_QUERY_STANDARD}`,
    {
      method: "GET"
    }
  );
  if (response.status === 200) {
    return response.json();
  } else {
    logEmitter.emit(
      "functionFail",
      "address-lookup-api.connector",
      "fetchUsingPostcoderStandard",
      `Address lookup API responded with non-200 status: ${response.status}`
    );
    throw new Error(
      `Address lookup API responded with non-200 status: ${response.status}`
    );
  }
};

module.exports = { getAddressesByPostcode };
