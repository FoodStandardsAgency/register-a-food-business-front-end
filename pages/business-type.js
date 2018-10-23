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
    <BackButton editModeFirstPage={props.editModeFirstPage} originator="business-type" />
    <Header level={2}>What kind of food business are you registering?</Header>

    <form action={props.formAction} method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <BusinessTypeLookup id="businessTypeLookup" {...props} />
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>
      <ContinueButton editModeFirstPage={props.editModeFirstPage} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(BusinessType);

BusinessType.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
