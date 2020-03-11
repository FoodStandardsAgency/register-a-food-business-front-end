import {
  FsaLayout,
  SessionWrapper,
  BackButton,
  ContinueButton,
  ContentItem,
  ProcessedErrorSummary,
  OnHandleErrorClick
} from "../src/components";
import { Heading, TextArea } from "govuk-react";
import PropTypes from "prop-types";

const OtherDetails = props => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Heading as="h1" size="LARGE">
      Other details
    </Heading>

    <form action={props.formAction} method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <TextArea
            input={{
              name: "business_other_details",
              defaultValue: props.cumulativeFullAnswers.business_other_details,
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
      <ContinueButton {...props} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(OtherDetails);

OtherDetails.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
