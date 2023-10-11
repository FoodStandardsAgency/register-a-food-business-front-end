/**
 * @module connectors/registration
 */

const axios = require("axios");
axios.defaults.validateStatus = () => true;
const { SUBMIT_URL, API_SECRET, CLIENT_NAME } = require("../../config");
const { logEmitter } = require("../../services/logging.service");


/**
 * Sends a new registration to the back-end service
 *
 * @param {object} submissionData The object containing all registration data and declaration
 * @param {string} regDataVersion The data version of this registration, corresponding to an entry in the config database
 *
 * @returns {object} The back-end service response
 */
const sendRequest = async (submissionData, regDataVersion, sessionId) => {
  try {
    let res;
    logEmitter.emit(
      "functionCallWith",
      "registration.connector",
      "sendRequest",
      SUBMIT_URL
    );
    const headers = {
      "Content-Type": "application/json",
      "api-secret": API_SECRET,
      "client-name": CLIENT_NAME,
      "registration-data-version": regDataVersion,
      "front-end-session-id": sessionId
    };
    res = await axios(SUBMIT_URL, {
      method: "POST",
      headers,
      data: submissionData
    });
    logEmitter.emit("functionSuccess", "registration.connector", "sendRequest");
    return res;
  } catch (err) {
    logEmitter.emit(
      "functionFail",
      "registration.connector",
      "sendRequest",
      err
    );
    return err;
  }
};

module.exports = { sendRequest };
