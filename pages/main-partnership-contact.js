import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick
} from "../src/components";
import { Header, Paragraph, Radio, MultiChoice, HintText } from "govuk-react";
import PropTypes from "prop-types";
import PartnershipCommon from "./common/partnership-common";

const getPartnersList = props => {
  let output = [];
  const partners = props.cumulativeFullAnswers.partners;

  for (let id in partners) {
    output.push(
      <Radio
        name="main_partnership_contact"
        value={partners[id]}
        id={`partner-${id}`}
        key={id}
        defaultChecked={
          props.cumulativeFullAnswers.main_partnership_contact === partners[id]
        }
      >
        {partners[id]}
      </Radio>
    );
  }
  return output;
};

const PrimaryPartner = props => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Header level={1} size="LARGE">
      Who is the main point of contact?
    </Header>
    <ContentItem.B_30_15>
      <HintText>
        Please select the partner who will be the main point of contact for this
        business
      </HintText>
    </ContentItem.B_30_15>
    {PartnershipCommon.whatIsAPartnership()}
    <form action={props.formAction} method="post">
      <ContentItem.B_45_30>
        <MultiChoice
          label=""
          meta={{
            touched: true,
            error: props.validatorErrors.partner_is_primary
          }}
        >
          {getPartnersList(props)}
        </MultiChoice>
      </ContentItem.B_45_30>

      <ContinueButton {...props} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(PrimaryPartner);

PrimaryPartner.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
