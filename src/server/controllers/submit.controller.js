/**
 * @module controllers/submit
 */

const { submit } = require("../services/submit.service");
const { logEmitter } = require("../services/logging.service");
const { transformAnswersForSubmit } = require("../services/data-transform.service");
const { editPath } = require("../services/path.service");
const { revalidateAllAnswers } = require("../services/validation.service");

/**
 * Returns an object containing the redirect route (e.g. the final page), the submission date,
 * and data from the back-end service response, such as the unique FSA registration number and local council details.
 *
 * @param {string} lcUrl The local council name from the URL, e.g. 'west-dorset'
 * @param {object} submissionData An object containing all registration data in the correct format for submission
 * @param {object} addressLookups An object containing the address lookup response(s)
 * @param {string} regDataVersion The version number of the registration data schema being used in this registration
 * @param {string} language The language selected at the point of submission of this registration
 *
 * @returns {object} Values for the router to store/update in the session and the page to redirect to.
 */
const submitController = async (
  submissionData,
  addressLookups,
  regDataVersion,
  sessionId,
  language,
  pathFromSession,
  lcUrl
) => {
  const controllerResponse = {
    redirectRoute: null,
    submissionDate: "",
    fsaRegistrationNumber: "",
    emailFbo: {},
    laConfig: {},
    submissionSucceeded: null
  };
  logEmitter.emit("functionCall", "submit.controller", "submitController");

  try {
    if (submissionData && Object.getOwnPropertyNames(submissionData).length > 0) {
      const transformedData = transformAnswersForSubmit(
        submissionData,
        language,
        addressLookups,
        lcUrl
      );
      const response = await submit(transformedData, regDataVersion, sessionId);
      if (response.status) {
        const res = await response.data;
        if (response.status === 200 && res["fsa-rn"]) {
          controllerResponse.redirectRoute = "/summary-confirmation";
          controllerResponse.submissionDate = res.reg_submission_date;
          controllerResponse.fsaRegistrationNumber = res["fsa-rn"];
          controllerResponse.emailFbo = res.email_fbo;
          controllerResponse.laConfig = res.lc_config;
          controllerResponse.submissionSucceeded = true;
          logEmitter.emit("info", "Registration submission succeeded");
        } else {
          controllerResponse.submissionError = [];
          if (response.status === 400) {
            controllerResponse.allValidationErrors = {};
            for (let userMessage of res.userMessages) {
              controllerResponse.submissionError.push(userMessage.message);
            }
            controllerResponse.redirectRoute = "/registration-summary";
            const path = editPath(
              submissionData,
              controllerResponse.redirectRoute,
              pathFromSession
            );
            const activePath = Object.keys(path).filter((entry) => {
              return path[entry].on === true && entry !== "/declaration";
            });
            Object.assign(
              controllerResponse.allValidationErrors,
              revalidateAllAnswers(activePath, submissionData).errors
            );
            logEmitter.emit(
              "info",
              `Registration submission failed - validation error - ${
                response.status + ": " + response.statusText
              }`
            ); // Used for Azure alerts
          }
          if (controllerResponse.submissionError.length < 1) {
            controllerResponse.submissionError.push(response.status + ": " + response.statusText);
            controllerResponse.redirectRoute = "/internal-server-error";
            logEmitter.emit(
              "error",
              `Registration submission failed - ${response.status + ": " + response.statusText}`
            ); // Used for Azure alerts
          }

          controllerResponse.submissionSucceeded = false;
        }
      } else {
        controllerResponse.redirectRoute = "/internal-server-error";
        controllerResponse.submissionSucceeded = false;
        logEmitter.emit(
          "error",
          `Registration submission failed - no status code returned - ${JSON.stringify(response)}`
        ); // Used for Azure alerts
      }
    } else {
      throw new Error(
        "Registration submission failed - /submit route was called with an empty submission data object" // Used for Azure alerts
      );
    }
    logEmitter.emit("info", "Registration submission succeeded"); // Used for Azure alerts
    logEmitter.emit(
      "functionSuccessWith",
      "submit.controller",
      "submitController",
      `
      redirectRoute: ${controllerResponse.redirectRoute}.
      submissionDate: ${controllerResponse.submissionDate}.
      fsa-rn: ${controllerResponse.fsaRegistrationNumber}.
      laConfig: ${controllerResponse.laConfig}.
      submissionSucceeded: ${controllerResponse.submissionSucceeded}.
      `
    );
    return controllerResponse;
  } catch (err) {
    logEmitter.emit("error", `Registration submission failed - ${err.message}`); // Used for Azure alerts
    logEmitter.emit("functionFail", "submit.controller", "submitController", err);
    throw err;
  }
};

module.exports = submitController;
