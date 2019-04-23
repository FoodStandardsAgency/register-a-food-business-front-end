import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick
} from "../src/components";
import { Header, InputField } from "govuk-react";
import PropTypes from "prop-types";

const PartnerDetails = props => (
  <FsaLayout {...props}>
    <BackButton href="/partnership/back" {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Header level={1} size="LARGE">
      What is the partner's name?
    </Header>
    <form action="/partnership/save" method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "partner_name",
              autoComplete: "name",
              defaultValue:
                props.cumulativeFullAnswers.partners[
                  props.cumulativeFullAnswers.targetPartner
                ]
            }}
            id="partner_name"
            meta={{
              touched: true,
              error: props.validatorErrors["partnerName"]
            }}
          >
            Full name
          </InputField>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>
      <ContinueButton {...props} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(PartnerDetails);

PartnerDetails.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
