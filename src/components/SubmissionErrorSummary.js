import { ErrorSummary } from "govuk-react";
import PropTypes from "prop-types";

const SubmissionErrorSummary = (props) => {
  const errors = [];
  for (let error of props.submissionErrors) {
    errors.push({
      targetName: error,
      text: error
    });
  }
  if (props.submissionErrors.length > 0) {
    return (
      <ErrorSummary
        id="errorSummary"
        heading="There was a problem submitting the registration"
        errors={errors}
      />
    );
  } else {
    return null;
  }
};
export default SubmissionErrorSummary;

SubmissionErrorSummary.propTypes = {
  submissionError: PropTypes.objectOf(PropTypes.string)
};
