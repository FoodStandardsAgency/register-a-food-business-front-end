import {
  FsaLayout,
  SessionWrapper,
  BackButton,
  ContinueButton,
  BusinessTypeLookup,
  ContentItem
} from "../src/components";
import { Header } from "govuk-react";
import PropTypes from "prop-types";

const BusinessType = props => (
  <FsaLayout {...props}>
    <BackButton editModePage={props.editModePage} originator="business-type" />
    <Header level={2}>What kind of food business are you registering?</Header>

    <form action={props.formAction} method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <BusinessTypeLookup id="businessTypeLookup" {...props} />
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>
      <ContinueButton editModePage={props.editModePage} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(BusinessType);

BusinessType.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
