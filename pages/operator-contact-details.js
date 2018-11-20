import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  HiddenTextAccessible
} from "../src/components";
import { Header, InputField, Paragraph } from "govuk-react";
import PropTypes from "prop-types";

const OperatorContactDetails = props => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Header level={1} size="LARGE">
      Operator contact details
    </Header>

    <HiddenTextAccessible summaryText={"What is a food business operator?"}>
      <Paragraph mb={0}>
        The operator is the person or persons, charity or company who makes the
        decisions about the food business, what it serves and how it operates.
      </Paragraph>
    </HiddenTextAccessible>

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
              "Your email address will be used to update you regarding policy or legal changes that could affect your food business."
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
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
