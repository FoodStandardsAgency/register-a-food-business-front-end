const { submit } = require("../services/submit.service");
const {
  transformAnswersForSubmit
} = require("../services/data-transform.service");

const submitController = async (submissionData, addressLookups) => {
  const controllerResponse = {
    submissionErrors: {},
    redirectRoute: null,
    submissionDate: "",
    fsaRegistrationNumber: "",
    email_fbo: {
      recipient: ""
    }
  };

  if (submissionData && Object.getOwnPropertyNames(submissionData).length > 0) {
    const transformedData = transformAnswersForSubmit(
      submissionData,
      addressLookups
    );
    const response = await submit(transformedData);
    const res = await response.json();

    if (response.status === 200) {
      controllerResponse.redirectRoute = "/summary-confirmation";
      controllerResponse.submissionDate = res.reg_submission_date;
      controllerResponse.fsaRegistrationNumber = res["fsa-rn"];
      controllerResponse.recipient = res.email_fbo.recipient;
    } else {
      controllerResponse.redirectRoute = "back";
    }
  } else {
    controllerResponse.submissionErrors.emptyData =
      "/submit route was called with an empty submission data object";
  }

  return controllerResponse;
};

module.exports = submitController;
