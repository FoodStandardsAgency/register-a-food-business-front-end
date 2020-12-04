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
import { operatorTypeEnum } from "@slice-and-dice/register-a-food-business-validation";
import { Radio, MultiChoice, Paragraph, Fieldset } from "govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

const OperatorType = (props) => (
  <FsaLayout {...props}>
    <BackButton {...props} t={props.t} />
    <ProcessedErrorSummary
      t={props.t}
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
            {props.t("Who operates this business?")}
          </Fieldset.Legend>
          <HiddenTextAccessible
            t={props.t}
            summary={props.t("What is a food business operator?")}
          >
            <Paragraph mb={0}>
              {props.t(
                "The operator is the person or people, charity or company who makes the decisions about the food business. They decide what it serves and how it operates."
              )}
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
              value={operatorTypeEnum.PERSON.key}
              id="operator_type_person"
              defaultChecked={
                props.cumulativeFullAnswers.operator_type ===
                operatorTypeEnum.PERSON.key
              }
            >
              {props.t("The food business is owned or operated by a person")}
            </Radio>
            <Radio
              name="operator_type"
              value={operatorTypeEnum.COMPANY.key}
              id="operator_type_company"
              defaultChecked={
                props.cumulativeFullAnswers.operator_type ===
                operatorTypeEnum.COMPANY.key
              }
            >
              {props.t(
                "The food business is owned or operated by a limited company"
              )}
            </Radio>
            <Radio
              name="operator_type"
              value={operatorTypeEnum.CHARITY.key}
              id="operator_type_charity"
              defaultChecked={
                props.cumulativeFullAnswers.operator_type ===
                operatorTypeEnum.CHARITY.key
              }
            >
              {props.t(
                "The food business is owned or operated by a charity, organisation or trust"
              )}
            </Radio>
          </MultiChoice>
        </Fieldset>
      </ContentItem.B_45_30>

      <ContinueButton {...props} t={props.t} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("SessionWrapper(OperatorType)")(
  SessionWrapper(OperatorType)
);

OperatorType.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
