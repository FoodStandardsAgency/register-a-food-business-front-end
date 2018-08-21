const {
  sendRequest
} = require("../connectors/registration/registration.connector");
const { logEmitter } = require("../../server/services/logging.service");

module.exports.submit = async submissionData => {
  logEmitter.emit("functionCall", "submit.service", "submit");
  try {
    const stringSubmissionData = JSON.stringify(submissionData);
    const response = await sendRequest(stringSubmissionData);
    logEmitter.emit("functionSuccess", "submit.service", "submit");
    return response;
  } catch (err) {
    logEmitter.emit("functionFail", "submit.service", "submit", err);
    return err;
  }
};
