import SessionWrapper from "../src/components/SessionWrapper";
import { FsaLayout, ContentItem, SummaryTable } from "../src/components";
import {
  Header,
  Panel,
  Paragraph,
  InsetText,
  asAnchor,
  HintText
} from "govuk-react";
import PropTypes from "prop-types";
import moment from "moment";
import styled from "react-emotion";

const AnchorTag = asAnchor("a");

const FsaPanel = styled(Panel)`
  h2 {
    display: none;
  }
`;

const ApplicationComplete = props => (
  <FsaLayout {...props}>
    <Header level={2}>Submission complete</Header>
    <Paragraph>
      Thank you for submitting your food business registration.
    </Paragraph>
    {props.fsaRegistrationNumber ? (
      <FsaPanel
        id="panelWithNumber"
        panelTitle=""
        panelBody={[
          "Your unique food business registration number is",
          <br />,
          <br />,
          <span className="bold" id="fsa-rn">
            {props.fsaRegistrationNumber.split("-").join(" - ")}
          </span>
        ]}
      />
    ) : (
      <FsaPanel
        id="panelWithText"
        panelTitle="Registration submitted"
        panelBody={"Awaiting registration number"}
      />
    )}
    <InsetText>
      <Paragraph mb={0}>
        Please keep note of this registration number for your records.
      </Paragraph>
    </InsetText>

    <ContentItem.B_30_15>
      <Header level={3} mb={1}>
        Submitted on
      </Header>
      <Paragraph mb={0}>
        {moment(props.submissionDate).format("DD MMM YYYY")}
      </Paragraph>
    </ContentItem.B_30_15>

    <Header level={3} mb={2}>
      Your registration has been sent to:
    </Header>
    {props.lcConfig.hygieneAndStandards ? (
      <ContentItem.B_30_15 id="hygieneAndStandardsCouncil">
        <Header level={4} mb={1}>
          {props.lcConfig.hygieneAndStandards.local_council}
        </Header>
        <Paragraph mb={0}>
          {props.lcConfig.hygieneAndStandards.local_council_email}
        </Paragraph>
        {props.lcConfig.hygieneAndStandards.local_council_phone_number ? (
          <Paragraph mb={0} id="hygieneAndStandardsNumber">
            {props.lcConfig.hygieneAndStandards.local_council_phone_number}
          </Paragraph>
        ) : null}
      </ContentItem.B_30_15>
    ) : (
      <div>
        <ContentItem.B_30_15 id="hygieneCouncil">
          <Header level={4} mb={1}>
            {props.lcConfig.hygiene.local_council}
          </Header>
          <Paragraph mb={0}>
            {props.lcConfig.hygiene.local_council_email}
          </Paragraph>
          {props.lcConfig.hygiene.local_council_phone_number ? (
            <Paragraph mb={0} id="hygieneNumber">
              {props.lcConfig.hygiene.local_council_phone_number}
            </Paragraph>
          ) : null}
          <HintText>Reponsible local council for food hygiene</HintText>
        </ContentItem.B_30_15>
        <ContentItem.B_30_15 id="standardsCouncil">
          <Header level={4} mb={1}>
            {props.lcConfig.standards.local_council}
          </Header>
          <Paragraph mb={0}>
            {props.lcConfig.standards.local_council_email}
          </Paragraph>
          {props.lcConfig.standards.local_council_phone_number ? (
            <Paragraph mb={0} id="standardsNumber">
              {props.lcConfig.standards.local_council_phone_number}
            </Paragraph>
          ) : null}
          <HintText>Responsible local council for food standards</HintText>
        </ContentItem.B_30_15>
      </div>
    )}

    <ContentItem.B_30_15>
      <Paragraph className="receiveConfirmationEmail">
        {`A copy of this registration has been sent to **${
          props.emailFbo.recipient
        }.**`}
      </Paragraph>
    </ContentItem.B_30_15>

    <Header level={2}>What's next?</Header>
    <InsetText>
      <Paragraph mb={0}>
        **You may receive an unannounced food inspection from your local council
        soon after you start trading.**
      </Paragraph>
    </InsetText>
    <ContentItem.B_30_15>
      <Paragraph>
        The council may contact you before the inspection to discuss how your
        business operates or to offer advice. Meanwhile, there are some things
        you can do to help prepare for the opening of your business opening.
      </Paragraph>
    </ContentItem.B_30_15>

    <Header level={2}>Find out here what you can do to prepare:</Header>
    <ContentItem.B_20_20>
      <AnchorTag
        id="foodSafetyLink"
        href="https://www.food.gov.uk/business-guidance"
        target="_blank"
        rel="noopener noreferrer"
      >
        Food safety and how to run a food business (including Northern Ireland)
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
    <SummaryTable {...props.transformedData} applicationCompletePage={true} />
  </FsaLayout>
);

export default SessionWrapper(ApplicationComplete);

ApplicationComplete.propTypes = {
  fsaRegistrationNumber: PropTypes.string,
  lcConfig: PropTypes.object,
  submissionDate: PropTypes.string,
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string),
  recipient: PropTypes.string
};
