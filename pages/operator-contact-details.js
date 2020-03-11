import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  ContactDetailsHelp
} from "../src/components";
import { Heading, InputField } from "govuk-react";
import PropTypes from "prop-types";

const OperatorContactDetails = props => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Heading as="h1" size="LARGE">
      {`${
        props.cumulativeFullAnswers.registration_role === "Partnership"
          ? "Partnership"
          : "Operator"
      } contact details`}
    </Heading>
    <ContactDetailsHelp role={props.cumulativeFullAnswers.registration_role} />
    <form action={props.formAction} method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_primary_number",
              defaultValue: props.cumulativeFullAnswers.operator_primary_number,
              autoComplete: "tel"
            }}
            id="operator_primary_number"
            meta={{
              touched: true,
              error: props.validatorErrors.operator_primary_number
            }}
          >
            Main phone number
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_secondary_number",
              defaultValue:
                props.cumulativeFullAnswers.operator_secondary_number,
              autoComplete: "off"
            }}
            id="operator_secondary_number"
            meta={{
              touched: true,
              error: props.validatorErrors.operator_secondary_number
            }}
          >
            Secondary phone number (optional)
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_email",
              defaultValue: props.cumulativeFullAnswers.operator_email,
              autoComplete: "email"
            }}
            id="operator_email"
            hint={[
              "We will use your email to keep you informed of any policy or legal changes that could affect your food business."
            ]}
            meta={{
              touched: true,
              error: props.validatorErrors.operator_email
            }}
          >
            Email address
          </InputField>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>

      <ContinueButton {...props} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(OperatorContactDetails);

OperatorContactDetails.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
