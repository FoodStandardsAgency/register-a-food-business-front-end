import { ErrorSummary } from "@slice-and-dice/govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../../i18n.js";

const ProcessedErrorSummary = (props) => {
  const errors = [];
  for (let error in props.validatorErrors) {
    errors.push({
      targetName: error,
      text: props.t(props.validatorErrors[error])
    });
  }
  if (Object.keys(props.validatorErrors).length > 0) {
    return (
      <ErrorSummary
        id="errorSummary"
        heading={props.t("There is a problem")}
        onHandleErrorClick={props.onHandleErrorClick}
        errors={errors}
        role="alert"
        tabIndex={-1}
        href="#go-to-error" // dummy href to ensure screen readers detect link
      />
    );
  } else {
    return null;
  }
};
export default withTranslation("common")(ProcessedErrorSummary);

ProcessedErrorSummary.propTypes = {
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
