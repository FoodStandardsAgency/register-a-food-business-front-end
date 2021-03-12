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
import { Heading, InputField } from "@slice-and-dice/govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

const OperatorName = (props) => (
  <FsaLayout {...props}>
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Heading as="h1" size="LARGE">
      {props.t("What is the operator's name?")}
    </Heading>
    <HiddenTextAccessible
      summary={props.t("What is a food business operator?")}
      {...props}
    >
      {props.t(
        "The operator is the person or people, charity or company who makes the decisions about the food business. They decide what it serves and how it operates."
      )}
    </HiddenTextAccessible>
    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <ContentItem.B_30_15>
        <InputField
          input={{
            name: "operator_first_name",
            defaultValue: props.cumulativeFullAnswers.operator_first_name,
            autoComplete: "given-name"
          }}
          id="operator_first_name"
          meta={{
            touched: true,
            error: props.t(props.validatorErrors["operator_first_name"])
          }}
        >
          {props.t("First and middle names")}
        </InputField>
      </ContentItem.B_30_15>

      <ContentItem.B_30_15>
        <InputField
          input={{
            name: "operator_last_name",
            defaultValue: props.cumulativeFullAnswers.operator_last_name,
            autoComplete: "family-name"
          }}
          id="operator_last_name"
          meta={{
            touched: true,
            error: props.t(props.validatorErrors.operator_last_name)
          }}
        >
          {props.t("Last name")}
        </InputField>
      </ContentItem.B_30_15>
      <ContinueButton {...props} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(SessionWrapper(OperatorName));

OperatorName.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
