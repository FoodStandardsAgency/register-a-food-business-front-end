import SessionWrapper from "../src/components/SessionWrapper";
import { FsaLayout, ContentItem, SummaryTable } from "../src/components";
import { Header, Panel, Paragraph, InsetText, asAnchor } from "govuk-react";
import PropTypes from "prop-types";
import { transformAnswersForSummary } from "../src/server/services/data-transform.service";
import moment from "moment";

const AnchorTag = asAnchor("a");

const ApplicationComplete = props => {
  const transformedData = transformAnswersForSummary(
    props.cumulativeAnswers,
    props.addressLookups
  );

  return (
    <FsaLayout {...props}>
      <Header level={2}>Your food business registration confirmation</Header>
      <Paragraph>
        {`Thank you for submitting your food business registration. Your
        registration has been sent to **${
          props.lcConfig.hygieneAndStandards
            ? props.lcConfig.hygieneAndStandards.local_council
            : props.lcConfig.hygiene.local_council +
              "** and **" +
              props.lcConfig.standards.local_council
        }.** To contact the food
        team at your Local Council please email **${
          props.lcConfig.hygieneAndStandards
            ? props.lcConfig.hygieneAndStandards.local_council_email
            : props.lcConfig.hygiene.local_council_email +
              "** or **" +
              props.lcConfig.standards.local_council_email
        }.**`}
      </Paragraph>
      <InsetText>
        <Paragraph mb={0}>
          Please keep note of this registration number for your records.
        </Paragraph>
      </InsetText>
      <Paragraph className="receiveConfirmationEmail">
        {`A copy of this registration has been sent to **${
          props.emailFbo.recipient
        }.**`}
      </Paragraph>
      {props.fsaRegistrationNumber ? (
        <Panel
          id="panelWithNumber"
          panelTitle="Registration submitted"
          panelBody={[
            "Your unique food business registration number is:",
            <br />,
            <br />,
            <span className="bold" id="fsa-rn">
              {props.fsaRegistrationNumber}
            </span>
          ]}
        />
      ) : (
        <Panel
          id="panelWithText"
          panelTitle="Registration submitted"
          panelBody={"Awaiting registration number"}
        />
      )}

      <Paragraph mb={1}>**Submitted on**</Paragraph>
      <Paragraph>
        {moment(props.submissionDate).format("DD MMM YYYY")}
      </Paragraph>
      <Paragraph mb={1}>**Responsible Local Authority**</Paragraph>
      <Paragraph>{props.localCouncil}</Paragraph>
      <Header level={2}>What's next?</Header>
      <InsetText>
        <Paragraph mb={0}>
          **The council may contact you before the inspection to discuss how
          your business operates or to offer advice. You may receive an
          unannounced food inspection from your local council soon after you
          start trading.**
        </Paragraph>
      </InsetText>
      <Paragraph>
        Meanwhile, there are some things you can do to help prepare for the
        opening of your business opening.
      </Paragraph>
      <Header level={2}>Find out here what you can do to prepare:</Header>
      <ContentItem.B_20_20>
        <AnchorTag
          id="foodSafetyLink"
          href="https://www.food.gov.uk/business-guidance"
          target="_blank"
          rel="noopener noreferrer"
        >
          Food safety and how to run a food business (including Northern
          Ireland)
        </AnchorTag>
      </ContentItem.B_20_20>
      <ContentItem.B_20_20>
        <AnchorTag
          id="standardGuidanceLink"
          href="https://www.businesscompanion.info/en/in-depth-guides"
          target="_blank"
          rel="noopener noreferrer"
        >
          Standards guidance for England and Wales
        </AnchorTag>
      </ContentItem.B_20_20>
      <ContentItem.B_20_20>
        <AnchorTag
          id="fhrsScoreLink"
          href="https://www.food.gov.uk/business-guidance/food-hygiene-ratings-for-businesses"
          target="_blank"
          rel="noopener noreferrer"
        >
          How to achieve a high FHRS score and how to appeal
        </AnchorTag>
      </ContentItem.B_20_20>
      <ContentItem.B_20_20>
        <AnchorTag
          id="primaryAuthorityLink"
          href="https://www.gov.uk/guidance/local-regulation-primary-authority"
          target="_blank"
          rel="noopener noreferrer"
        >
          Do you qualify for primary authority partnership and how to get one
        </AnchorTag>
      </ContentItem.B_20_20>
      <SummaryTable {...transformedData} hideChangeButtons={true} />
    </FsaLayout>
  );
};

export default SessionWrapper(ApplicationComplete);

ApplicationComplete.propTypes = {
  fsaRegistrationNumber: PropTypes.string,
  localCouncil: PropTypes.string,
  localCouncilEmail: PropTypes.string,
  submissionDate: PropTypes.string,
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string),
  recipient: PropTypes.string
};
