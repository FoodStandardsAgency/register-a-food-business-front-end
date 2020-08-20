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

const RegistrationSummary = (props) => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.allValidationErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <ContentItem.B_30_15>
      <Heading as="h1" size="LARGE">
        Check your answers
      </Heading>
      <HintText>You must check your answers before you continue</HintText>
    </ContentItem.B_30_15>

    <SummaryTable
      {...props.transformedData}
      validatorErrors={props.allValidationErrors}
    />

    <PostForm
      action="/continue/registration-summary"
      csrfToken={props.csrfToken}
    >
      <ContinueButton />
    </PostForm>
  </FsaLayout>
);

export default SessionWrapper(RegistrationSummary);

RegistrationSummary.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  )
};
