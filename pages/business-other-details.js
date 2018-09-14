import {
  FsaLayout,
  SessionWrapper,
  BackButton,
  ContinueButton,
  ContentItem
} from "../src/components";
import { Header, TextArea } from "govuk-react";
import PropTypes from "prop-types";

const OtherDetails = props => (
  <FsaLayout {...props}>
    <BackButton editMode={props.editMode} originator="business-other-details" />
    <Header level={2}>Other details</Header>

    <form
      action={`/continue/business-other-details/${props.editMode}`}
      method="post"
    >
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <TextArea
            input={{
              name: "business_other_details",
              defaultValue: props.cumulativeAnswers.business_other_details,
              id: "business_other_details"
            }}
            meta={{
              touched: true,
              error: props.validatorErrors.business_other_details
            }}
          >
            Is there anything else you need to tell us about this establishment?
            (optional)
          </TextArea>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>
      <ContinueButton editMode={props.editMode} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(OtherDetails);

OtherDetails.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
