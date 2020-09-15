import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  HiddenTextAccessible,
  PostForm
} from "../src/components";
import { Radio, MultiChoice, Paragraph, Fieldset } from "govuk-react";
import PropTypes from "prop-types";

const OperatorType = (props) => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />

    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <ContentItem.B_45_30>
        <Fieldset>
          <Fieldset.Legend
            size="LARGE"
            isPageHeading
            style={{ "margin-bottom": "30px" }}
          >
            Who operates this business?
          </Fieldset.Legend>
          <HiddenTextAccessible summary={"What is a food business operator?"}>
            <Paragraph mb={0}>
              The operator is the person or people, charity or company who makes
              the decisions about the food business. They decide what it serves
              and how it operates.
            </Paragraph>
          </HiddenTextAccessible>
          <MultiChoice
            label=""
            meta={{
              touched: true,
              error: props.validatorErrors.operator_type
            }}
          >
            <Radio
              name="operator_type"
              value="A person"
              id="operator_type_person"
              defaultChecked={
                props.cumulativeFullAnswers.operator_type === "A person"
              }
            >
              The food business is owned or operated by a person
            </Radio>
            <Radio
              name="operator_type"
              value="A company"
              id="operator_type_company"
              defaultChecked={
                props.cumulativeFullAnswers.operator_type === "A company"
              }
            >
              The food business is owned or operated by a limited company
            </Radio>
            <Radio
              name="operator_type"
              value="A charity"
              id="operator_type_charity"
              defaultChecked={
                props.cumulativeFullAnswers.operator_type === "A charity"
              }
            >
              The food business is owned or operated by a charity, organisation
              or trust
            </Radio>
          </MultiChoice>
        </Fieldset>
      </ContentItem.B_45_30>

      <ContinueButton {...props} />
    </PostForm>
  </FsaLayout>
);

export default SessionWrapper(OperatorType);

OperatorType.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
