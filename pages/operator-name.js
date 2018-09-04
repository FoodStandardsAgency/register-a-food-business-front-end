import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick
} from "../src/components";
import { Header, InputField, Paragraph, HiddenText } from "govuk-react";
import PropTypes from "prop-types";

const OperatorName = props => (
  <FsaLayout {...props}>
    <BackButton editMode={props.editMode} originator="operator-name" />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Header level={2}>What is the operator's name?</Header>
    <HiddenText summaryText={"What is a food business operator?"}>
      <Paragraph mb={0}>
        The food business operator is the person, charity or company who makes
        the decisions about the food business, what it serves and how it
        operates.
      </Paragraph>
    </HiddenText>
    <form action={`/continue/operator-name/${props.editMode}`} method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_first_name",
              defaultValue: props.cumulativeAnswers.operator_first_name,
              autoComplete: "given-name"
            }}
            id="operator_first_name"
            meta={{
              touched: true,
              error: props.validatorErrors["operator_first_name"]
            }}
          >
            First and middle names
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_last_name",
              defaultValue: props.cumulativeAnswers.operator_last_name,
              autoComplete: "family-name"
            }}
            id="operator_last_name"
            meta={{
              touched: true,
              error: props.validatorErrors.operator_last_name
            }}
          >
            Last name
          </InputField>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>
      <ContinueButton editMode={props.editMode} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(OperatorName);

OperatorName.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
