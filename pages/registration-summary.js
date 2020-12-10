import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  SummaryTable,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  PostForm
} from "../src/components";
import { Heading, HintText } from "govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";
import LanguageChangeButton from "../src/components/LanguageChangeButton";

const RegistrationSummary = (props) => (
  <FsaLayout {...props}>
    <LanguageChangeButton />
    <BackButton {...props} t={props.t} />
    <ProcessedErrorSummary
      t={props.t}
      validatorErrors={props.allValidationErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <ContentItem.B_30_15>
      <Heading as="h1" size="LARGE">
        {props.t("Check your answers")}
      </Heading>
      <HintText>
        {props.t("You must check your answers before you continue")}
      </HintText>
    </ContentItem.B_30_15>

    <SummaryTable
      t={props.t}
      {...props.transformedData}
      validatorErrors={props.allValidationErrors}
    />

    <PostForm
      action="/continue/registration-summary"
      csrfToken={props.csrfToken}
    >
      <ContinueButton t={props.t} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(SessionWrapper(RegistrationSummary));

RegistrationSummary.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  )
};
