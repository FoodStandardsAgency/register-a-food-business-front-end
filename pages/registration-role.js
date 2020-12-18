import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  PostForm
} from "../src/components";
import { operatorTypeEnum } from "@slice-and-dice/register-a-food-business-validation";
import { Radio, MultiChoice, Fieldset } from "govuk-react";
import PropTypes from "prop-types";

const RegistrationRole = (props) => (
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
            What is your role in this food business?
          </Fieldset.Legend>
          <MultiChoice
            label=""
            meta={{
              touched: true,
              error: props.validatorErrors.registration_role
            }}
          >
            <Radio
              name="registration_role"
              value={operatorTypeEnum.SOLETRADER.key}
              id="registration_role_sole_trader"
              defaultChecked={
                props.cumulativeFullAnswers.registration_role ===
                operatorTypeEnum.SOLETRADER.key
              }
            >
              I operate it as a sole trader
            </Radio>
            <Radio
              name="registration_role"
              value={operatorTypeEnum.PARTNERSHIP.key}
              id="registration_role_partnership"
              defaultChecked={
                props.cumulativeFullAnswers.registration_role ===
                operatorTypeEnum.PARTNERSHIP.key
              }
            >
              I operate it in a partnership
            </Radio>
            <Radio
              name="registration_role"
              value="Representative"
              id="registration_role_representative"
              defaultChecked={
                props.cumulativeFullAnswers.registration_role ===
                "Representative"
              }
            >
              I represent a person, charity, limited company (Ltd), organisation
              or trust that operates it
            </Radio>
          </MultiChoice>
        </Fieldset>
      </ContentItem.B_45_30>

      <ContinueButton {...props} />
    </PostForm>
  </FsaLayout>
);

export default SessionWrapper(RegistrationRole);

RegistrationRole.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
