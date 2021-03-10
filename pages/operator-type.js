import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  HiddenTextAccessible,
  PostForm
} from "../src/components";
import { operatorTypeEnum } from "@slice-and-dice/register-a-food-business-validation";
import {
  Radio,
  MultiChoice,
  Paragraph,
  Fieldset
} from "@slice-and-dice/govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

const OperatorType = (props) => (
  <FsaLayout {...props}>
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
            {props.t("Who operates this business?")}
          </Fieldset.Legend>
          <HiddenTextAccessible
            summary={props.t("What is a food business operator?")}
            {...props}
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
              error: props.t(props.validatorErrors.operator_type)
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

      <ContinueButton {...props} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(SessionWrapper(OperatorType));

OperatorType.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
