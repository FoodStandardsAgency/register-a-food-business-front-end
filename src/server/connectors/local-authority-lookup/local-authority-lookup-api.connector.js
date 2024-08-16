/**
 * @module connectors/local-authority-lookup-api
 */

const axios = require("axios");
axios.defaults.validateStatus = () => true;
const HttpsProxyAgent = require("https-proxy-agent");
const { MAPIT_API, MAPIT_API_KEY } = require("../../config");
const { logEmitter } = require("../../services/logging.service");

/**
 * Fetches Local authority id from the local authority lookup API for the given postcode
 *
 * @param {string} postcode The postcode to search by
 * @param {integer} generation The generayion number (optional)
 *
 * @returns {integer} Local authority id
 */
const getLocalAuthorityIDByPostcode = async (postcode, generation) => {
  logEmitter.emit(
    "functionCallWith",
    "local-authority-lookup-api.connector",
    "getLocalAuthorityIDByPostcode",
    postcode
  );

  let responseJSON;

  responseJSON = await fetchUsingMapItApi(postcode, generation);

  if (responseJSON && responseJSON.shortcuts && responseJSON.shortcuts.council) {
    if (Number.isInteger(responseJSON.shortcuts.council)) {
      logEmitter.emit(
        "functionSuccess",
        "local-authority-lookup-api.connector",
        "getLocalAuthorityIDByPostcode"
      );
      return responseJSON.shortcuts.council;
    } else {
      if (
        responseJSON.shortcuts.council.district &&
        Number.isInteger(responseJSON.shortcuts.council.district)
      ) {
        logEmitter.emit(
          "functionSuccess",
          "local-authority-lookup-api.connector",
          "getLocalAuthorityIDByPostcode"
        );
        return responseJSON.shortcuts.council.district;
      } else {
        logEmitter.emit(
          "functionFail",
          "local-authority-lookup-api.connector",
          "getLocalAuthorityIDByPostcode",
          "fetchUsingMapItApi response .shortcuts.council.district is empty or not number"
        );
        return false;
      }
    }
  } else {
    logEmitter.emit(
      "functionFail",
      "local-authority-lookup-api.connector",
      "getLocalAuthorityIDByPostcode",
      "fetchUsingMapItApi response is empty"
    );
    return false;
  }
};

/**
 * Fetches Local authority id from the local authority lookup API for the given grideasting and gridnorthing point
 * @param {string} grideasting The easting to search by
 * @param {string} gridnorthing The northing to search by
 * @param {integer} generation The generayion number (optional)
 * @returns {integer} Local authority id
 */
const getLocalAuthorityIDByPoint = async (grideasting, gridnorthing, generation) => {
  logEmitter.emit(
    "functionCallWith",
    "local-authority-lookup-api.connector",
    "getLocalAuthorityIDByPoint",
    `${grideasting},${gridnorthing}`
  );

  let responseJSON;
  let localAuthority;

  responseJSON = await fetchUsingMapItPointApi(grideasting, gridnorthing, generation);

  if (responseJSON && Object.keys(responseJSON).length > 0) {
    // check if any object has one of this type 'MTD', 'DIS','UTA', 'CTY','LGD', 'LBO','COI' and return id
    // DIS and CTY can be in the same response
    const validTypes = ["MTD", "DIS", "UTA", "LGD", "LBO", "COI"];
    for (const key in responseJSON) {
      if (responseJSON.hasOwnProperty(key)) {
        const element = responseJSON[key];
        if (validTypes.includes(element.type)) {
          localAuthority = element.id;
          break;
        }
      }
    }
    if (localAuthority) {
      logEmitter.emit(
        "functionSuccess",
        "local-authority-lookup-api.connector",
        "getLocalAuthorityIDByPoint"
      );
      return localAuthority;
    } else {
      logEmitter.emit(
        "functionFail",
        "local-authority-lookup-api.connector",
        "getLocalAuthorityIDByPoint",
        "fetchUsingMapItApi response has no local authority"
      );
      return false;
    }
  } else {
    logEmitter.emit(
      "functionFail",
      "local-authority-lookup-api.connector",
      "getLocalAuthorityIDByPoint",
      "fetchUsingMapItApi response is empty"
    );
    return false;
  }
};

/**
 * Fetches local authority using MapIt service
 *
 * @param {string} postcode The postcode to search by
 * @param {integer} generation The generayion number (optional)
 *
 * @returns {object} API response object
 */
const fetchUsingMapItApi = async (postcode, generation) => {
  try {
    logEmitter.emit(
      "functionCallWith",
      "local-authority-lookup-api.connector",
      "fetchUsingMapItApi",
      postcode
    );

    let mapitGeneration = generation ? `&generation=${generation}` : "";

    const options = { method: "GET" };
    if (process.env.HTTP_PROXY) {
      options.httpsAgent = new HttpsProxyAgent(process.env.HTTP_PROXY);
      // https://github.com/axios/axios/issues/2072#issuecomment-609650888
      options.proxy = false;
    }
    const response = await axios(
      `${MAPIT_API}/postcode/${postcode}?api_key=${MAPIT_API_KEY}${mapitGeneration}`,
      options
    );
    if (response.status === 200) {
      logEmitter.emit("info", "MapIt LA response" + response.data);
      if (!response.data || Object.keys(response.data).length === 0) {
        logEmitter.emit("warning", "MapIt LA lookup failure"); // Used for Azure alerts
        throw new Error("Response data is empty");
      }
      logEmitter.emit("info", "MapIt LA lookup success"); // Used for Azure alerts
      return response.data;
    } else {
      response.status == 404 || logEmitter.emit("warning", "MapIt LA lookup failure"); // Used for Azure alerts
      logEmitter.emit(
        "functionFail",
        "local-authority-lookup-api.connector",
        "fetchUsingMapItApi",
        `MapIt API responded with non-200 status: ${response.status} - ${response.statusText}`
      );
      return false;
    }
  } catch (err) {
    logEmitter.emit(
      "functionFail",
      "local-authority-lookup-api.connector",
      "fetchUsingMapItApi",
      err
    );
    logEmitter.emit("warning", "MapIt LA lookup failure"); // Used for Azure alerts
    return false;
  }
};

/**
 * Fetches local authority using MapIt Point service
 * @param {string} grideasting The easting to search by
 * @param {string} gridnorthing The northing to search by
 * @param {integer} generation The generayion number (optional)
 * @returns {object} API response object
 */
const fetchUsingMapItPointApi = async (grideasting, gridnorthing, generation) => {
  try {
    logEmitter.emit(
      "functionCallWith",
      "local-authority-lookup-api.connector",
      "fetchUsingMapItPointApi",
      `${grideasting},${gridnorthing}`
    );

    let mapitGeneration = generation ? `&generation=${generation}` : "";

    const options = { method: "GET" };
    if (process.env.HTTP_PROXY) {
      options.httpsAgent = new HttpsProxyAgent(process.env.HTTP_PROXY);
      // https://github.com/axios/axios/issues/2072#issuecomment-609650888
      options.proxy = false;
    }
    const response = await axios(
      `${MAPIT_API}/point/27700/${grideasting},${gridnorthing}?api_key=${MAPIT_API_KEY}${mapitGeneration}`,
      options
    );

    if (response.status === 200) {
      logEmitter.emit("info", "MapIt LA response" + response.data);
      if (!response.data || Object.keys(response.data).length === 0) {
        logEmitter.emit("warning", "MapIt LA lookup failure"); // Used for Azure alerts
        throw new Error("Response data is empty");
      }
      logEmitter.emit("info", "MapIt LA lookup success"); // Used for Azure alerts
      return response.data;
    } else {
      response.status == 404 || logEmitter.emit("warning", "MapIt LA lookup failure"); // Used for Azure alerts
      logEmitter.emit(
        "functionFail",
        "local-authority-lookup-api.connector",
        "fetchUsingMapItPointApi",
        `MapIt API responded with non-200 status: ${response.status} - ${response.statusText}`
      );
      return false;
    }
  } catch (err) {
    logEmitter.emit(
      "functionFail",
      "local-authority-lookup-api.connector",
      "fetchUsingMapItPointApi",
      err
    );
    logEmitter.emit("warning", "MapIt LA lookup failure"); // Used for Azure alerts
    return false;
  }
};

module.exports = {
  getLocalAuthorityIDByPostcode,
  getLocalAuthorityIDByPoint,
  fetchUsingMapItApi,
  fetchUsingMapItPointApi
};
