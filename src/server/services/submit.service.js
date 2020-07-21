/**
 * Sends requests to a connector
 * @module services/submit
 */

const {
  sendRequest
} = require("../connectors/registration/registration.connector");
const { logEmitter } = require("./logging.service");

const submit = async (submissionData, regDataVersion, sessionId) => {
  logEmitter.emit("functionCall", "submit.service", "submit");

  try {
    const stringSubmissionData = JSON.stringify(submissionData);
    const response = await sendRequest(stringSubmissionData, regDataVersion, sessionId);
    logEmitter.emit("functionSuccess", "submit.service", "submit");
    return response;
  } catch (err) {
    logEmitter.emit("functionFail", "submit.service", "submit", err);
    return err;
  }
};

module.exports = { submit };
