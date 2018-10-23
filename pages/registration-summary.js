import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  SummaryTable
} from "../src/components";
import { Header, HintText } from "govuk-react";
import PropTypes from "prop-types";

const RegistrationSummary = props => (
  <FsaLayout {...props}>
    <BackButton {...props} originator="registration-summary" />

    <ContentItem.B_30_15>
      <ContentItem.B_30_15>
        <Header level={2}>Check your answers</Header>
        <HintText>You must check your answers before you continue</HintText>
      </ContentItem.B_30_15>
      <ContentItem.B_30_15>
        <SummaryTable {...props.transformedData} />
      </ContentItem.B_30_15>
    </ContentItem.B_30_15>

    <form action="/continue/registration-summary" method="post">
      <ContinueButton />
    </form>
  </FsaLayout>
);

export default SessionWrapper(RegistrationSummary);

RegistrationSummary.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string)
};
