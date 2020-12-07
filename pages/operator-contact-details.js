import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  ContactDetailsHelp,
  PostForm
} from "../src/components";
import { operatorTypeEnum } from "@slice-and-dice/register-a-food-business-validation";
import { Heading, InputField } from "govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

const OperatorContactDetails = (props) => (
  <FsaLayout {...props}>
    <BackButton {...props} t={props.t} />
    <ProcessedErrorSummary
      t={props.t}
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Heading as="h1" size="LARGE">
      {`${
        props.cumulativeFullAnswers.registration_role ===
        operatorTypeEnum.PARTNERSHIP.key
          ? "Partnership"
          : "Operator"
      } contact details`}
    </Heading>
    <ContactDetailsHelp
      role={props.cumulativeFullAnswers.registration_role}
      t={props.t}
    />
    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
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
            {props.t("Main phone number")}
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
            {props.t("Secondary phone number (optional)")}
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
            hint={props.t(
              "We will use your email to keep you informed of any policy or legal changes that could affect your food business."
            )}
            meta={{
              touched: true,
              error: props.validatorErrors.operator_email
            }}
          >
            {props.t("Email address")}
          </InputField>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>

      <ContinueButton {...props} t={props.t} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(
  SessionWrapper(OperatorContactDetails)
);

OperatorContactDetails.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
