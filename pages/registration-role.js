import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
} from "../src/components";
import { Header, Radio, MultiChoice } from "govuk-react";
import PropTypes from "prop-types";

const RegistrationRole = (props) => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Header level={1} size="LARGE">
      What is your role in this food business?
    </Header>

    <form action={props.formAction} method="post">
      <ContentItem.B_45_30>
        <MultiChoice
          label=""
          meta={{
            touched: true,
            error: props.validatorErrors.registration_role,
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
            I operate it as a sole trader
          </Radio>
          <Radio
            name="registration_role"
            value="Partnership"
            id="registration_role_partnership"
            defaultChecked={
              props.cumulativeFullAnswers.registration_role === "Partnership"
            }
          >
            I operate it in a partnership
          </Radio>
          <Radio
            name="registration_role"
            value="Representative"
            id="registration_role_representative"
            defaultChecked={
              props.cumulativeFullAnswers.registration_role === "Representative"
            }
          >
            I represent a person, charity or limited company that operates it
          </Radio>
        </MultiChoice>
      </ContentItem.B_45_30>

      <ContinueButton {...props} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(RegistrationRole);

RegistrationRole.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string),
};
