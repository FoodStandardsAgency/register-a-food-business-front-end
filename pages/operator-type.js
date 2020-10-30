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
import { OperatorTypeEnum } from "../src/enums";
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
            style={{ marginBottom: "30px" }}
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
              value={OperatorTypeEnum.PERSON.key}
              id="operator_type_person"
              defaultChecked={
                props.cumulativeFullAnswers.operator_type ===
                OperatorTypeEnum.PERSON.key
              }
            >
              The food business is owned or operated by a person
            </Radio>
            <Radio
              name="operator_type"
              value={OperatorTypeEnum.COMPANY.key}
              id="operator_type_company"
              defaultChecked={
                props.cumulativeFullAnswers.operator_type ===
                OperatorTypeEnum.COMPANY.key
              }
            >
              The food business is owned or operated by a limited company
            </Radio>
            <Radio
              name="operator_type"
              value={OperatorTypeEnum.CHARITY.key}
              id="operator_type_charity"
              defaultChecked={
                props.cumulativeFullAnswers.operator_type ===
                OperatorTypeEnum.CHARITY.key
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
