import {
  FsaLayout,
  SessionWrapper,
  BackButton,
  ContinueButton,
  BusinessTypeLookup,
  ContentItem,
  ProcessedErrorSummary,
  OnHandleErrorClick
} from "../src/components";
import { Header, Paragraph } from "govuk-react";
import PropTypes from "prop-types";

const BusinessType = props => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Header level={1} size="LARGE">
      What kind of food business are you registering?
    </Header>
    <Paragraph>
      Search with your own keywords and then select the most fitting business
      type from the suggestions
    </Paragraph>
    <form action={props.formAction} method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <BusinessTypeLookup id="businessTypeLookup" {...props} />
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>
      <ContinueButton {...props} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(BusinessType);

BusinessType.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
