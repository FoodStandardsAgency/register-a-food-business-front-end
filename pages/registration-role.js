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
import { Radio, MultiChoice, Fieldset } from "govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from '../i18n';

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
            {props.t("What is your role in this food business?")}
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
              value="Sole trader"
              id="registration_role_sole_trader"
              defaultChecked={
                props.cumulativeFullAnswers.registration_role === "Sole trader"
              }
            >
              {props.t("I operate it as a sole trader")}
            </Radio>
            <Radio
              name="registration_role"
              value="Partnership"
              id="registration_role_partnership"
              defaultChecked={
                props.cumulativeFullAnswers.registration_role === "Partnership"
              }
            >
              {props.t("I operate it in a partnership")}
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
              {props.t("I represent a person, charity, limited company (Ltd), organisation or trust that operates it")}
            </Radio>
          </MultiChoice>
        </Fieldset>
      </ContentItem.B_45_30>

      <ContinueButton {...props} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation('SessionWrapper(RegistrationRole)')(SessionWrapper(RegistrationRole));

RegistrationRole.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
