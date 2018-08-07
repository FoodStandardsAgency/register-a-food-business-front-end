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
  <FsaLayout>
    <BackButton editMode={props.editMode} originator="business-type" />
    <Header level={2}>What kind of food business are you registering?</Header>

    <form action={`/continue/business-type/${props.editMode}`} method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <BusinessTypeLookup id="businessTypeLookup" {...props} />
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>
      <ContinueButton editMode={props.editMode} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(BusinessType);

BusinessType.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
