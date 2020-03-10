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
import styled from "react-emotion";
import moment from "moment";

const AnchorTag = asAnchor("a");

const FsaPanel = styled(Panel)`
  h2 {
    display: none;
  }
`;

const ApplicationComplete = props => (
  <FsaLayout {...props}>
    <Header level={1} size="LARGE">
      Submission complete
    </Header>
    <Paragraph>
      Thank you for submitting your food business registration.
    </Paragraph>
    {props.fsaRegistrationNumber ? (
      <FsaPanel
        id="panelWithNumber"
        panelTitle=""
        panelBody={[
          "Your unique food business registration application reference is",
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
        panelBody={"Awaiting registration application reference"}
      />
    )}
    <InsetText>
      <Paragraph mb={0}>
        Please keep note of this registration application reference for your records.
      </Paragraph>
    </InsetText>

    <ContentItem.B_30_15>
      <Header level={2} size="MEDIUM" mb={1}>
        Submitted on
      </Header>
      <Paragraph mb={0}>
        {moment(props.submissionDate).format("DD MMM YYYY")}
      </Paragraph>
    </ContentItem.B_30_15>

    <div id="sentToCouncilsSection">
      <Header level={2} size="MEDIUM" mb={2}>
        Your registration has been sent to:
      </Header>
      {props.lcConfig.hygieneAndStandards ? (
        <ContentItem.B_30_15 id="hygieneAndStandardsCouncil">
          <Header level={4} mb={1}>
            {props.lcConfig.hygieneAndStandards.local_council}
          </Header>
          <Paragraph mb={0}>
            {`Email: ${props.lcConfig.hygieneAndStandards.local_council_email}`}
          </Paragraph>
          {props.lcConfig.hygieneAndStandards.local_council_phone_number ? (
            <Paragraph mb={0} id="hygieneAndStandardsNumber">
              {`Phone: ${
                props.lcConfig.hygieneAndStandards.local_council_phone_number
              }`}
            </Paragraph>
          ) : null}
        </ContentItem.B_30_15>
      ) : props.lcConfig.hygiene && props.lcConfig.standards ? (
        <div>
          <ContentItem.B_30_15 id="hygieneCouncil">
            <Header level={4} mb={1}>
              {props.lcConfig.hygiene.local_council}
            </Header>
            <Paragraph mb={0}>
              {`Email: ${props.lcConfig.hygiene.local_council_email}`}
            </Paragraph>
            {props.lcConfig.hygiene.local_council_phone_number ? (
              <Paragraph mb={0} id="hygieneNumber">
                {`Phone: ${props.lcConfig.hygiene.local_council_phone_number}`}
              </Paragraph>
            ) : null}
            <HintText>Responsible local council for food hygiene</HintText>
          </ContentItem.B_30_15>
          <ContentItem.B_30_15 id="standardsCouncil">
            <Header level={4} mb={1}>
              {props.lcConfig.standards.local_council}
            </Header>
            <Paragraph mb={0}>
              {`Email: ${props.lcConfig.standards.local_council_email}`}
            </Paragraph>
            {props.lcConfig.standards.local_council_phone_number ? (
              <Paragraph mb={0} id="standardsNumber">
                {`Phone: ${
                  props.lcConfig.standards.local_council_phone_number
                }`}
              </Paragraph>
            ) : null}
            <HintText>Responsible local council for food standards</HintText>
          </ContentItem.B_30_15>
        </div>
      ) : null}
    </div>

    <ContentItem.B_30_15>
      <Paragraph className="receiveConfirmationEmail">
        {`A copy of this registration has been sent to **${props.transformedData
          .operator_email ||
          props.transformedData.contact_representative_email}.**`}
      </Paragraph>
    </ContentItem.B_30_15>

    <Header level={2} size="LARGE">
      What's next?
    </Header>
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
        you can do to help prepare for the opening of your business.
      </Paragraph>
    </ContentItem.B_30_15>

    <ContentItem.B_30_15>
      <Header level={2} size="LARGE">
        Find out here what you can do to prepare:
      </Header>
      <HintText mb={3}>All links open in a new window</HintText>

      {props.country === "wales" ? (
        <Header level={3} mb={2} size="SMALL">
          English
        </Header>
      ) : null}

      <ContentItem.B_20_20>
        <AnchorTag
          id="foodSafetyLink"
          href="https://www.food.gov.uk/business-guidance"
          target="_blank"
          rel="noopener noreferrer"
        >
          Guidance on food hygiene and how to run a safe food business
        </AnchorTag>
      </ContentItem.B_20_20>
      <ContentItem.B_20_20>
        <AnchorTag
          id="fhrsScoreLink"
          href="https://www.food.gov.uk/business-guidance/food-hygiene-ratings-for-businesses"
          target="_blank"
          rel="noopener noreferrer"
        >
          How to achieve a high food hygiene rating (FHRS score)
        </AnchorTag>
      </ContentItem.B_20_20>

      {props.country === "northern-ireland" ? (
        <ContentItem.B_20_20>
          <AnchorTag
            id="safeCateringLink"
            href="https://www.food.gov.uk/business-guidance/safe-catering"
            target="_blank"
            rel="noopener noreferrer"
          >
            Safe catering
          </AnchorTag>
        </ContentItem.B_20_20>
      ) : null}

      <ContentItem.B_20_20>
        <AnchorTag
          id="safetyManagementLink"
          href="https://www.food.gov.uk/business-guidance/safer-food-better-business"
          target="_blank"
          rel="noopener noreferrer"
        >
          Information on the food safety management system safer food, better
          business
        </AnchorTag>
      </ContentItem.B_20_20>

      <ContentItem.B_20_20>
        <AnchorTag
          id="foodLabellingLink"
          href="https://www.food.gov.uk/business-guidance/industry-specific-advice/labelling-and-allergens"
          target="_blank"
          rel="noopener noreferrer"
        >
          Food labelling and allergens guidance
        </AnchorTag>
      </ContentItem.B_20_20>

      {props.country === "wales" || props.country === "northern-ireland" ? (
        <ContentItem.B_20_20>
          <AnchorTag
            id="businessGuidanceLink"
            href={
              props.country === "northern-ireland"
                ? "https://www.nibusinessinfo.co.uk/"
                : "https://www.businesswales.gov.wales/starting-up"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            Business support -
            {props.country === "wales" ? ` Wales` : " Northern Ireland"}
          </AnchorTag>
        </ContentItem.B_20_20>
      ) : (
        <ContentItem.B_30_15>
          <ContentItem.B_20_20>
            <AnchorTag
              id="businessSupportHelplineEnglishLink"
              href="https://www.gov.uk/business-support-helpline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Business support & helpline
            </AnchorTag>
          </ContentItem.B_20_20>

          <ContentItem.B_20_20>
            or contact the Business Support Helpline on 0300 456 3565
          </ContentItem.B_20_20>
        </ContentItem.B_30_15>
      )}

      {props.country === "wales" ? (
        <ContentItem.B_30_15>
          <Header level={3} mb={2} size="SMALL">
            Cymru
          </Header>
          <ContentItem.B_20_20>
            <AnchorTag
              id="businessGuidanceWelshLink"
              href="https://www.food.gov.uk/cy/canllawiau-ar-gyfer-busnesau"
              target="_blank"
              rel="noopener noreferrer"
            >
              I gael cyngor cyffredinol ar hylendid bwyd a sut i redeg busnes
              bwyd diogel
            </AnchorTag>
          </ContentItem.B_20_20>

          <ContentItem.B_20_20>
            <AnchorTag
              id="foodHygieneRatingsWelshLink"
              href="https://www.food.gov.uk/cy/business-guidance/sgoriau-hylendid-bwyd-ar-gyfer-busnesau"
              target="_blank"
              rel="noopener noreferrer"
            >
              I gael gwybodaeth am sut i gael sgôr uchel o dan y Cynllun Sgorio
              Hylendid Bwyd
            </AnchorTag>
          </ContentItem.B_20_20>

          <ContentItem.B_20_20>
            <AnchorTag
              id="saferFoodBetterBusinessWelshLink"
              href="https://www.food.gov.uk/cy/business-guidance/bwyd-mwy-diogel-busnes-gwell"
              target="_blank"
              rel="noopener noreferrer"
            >
              I gael gwybodaeth am y system rheoli diogelwch bwyd, Bwyd mwy
              Diogel, Busnes Gwell
            </AnchorTag>
          </ContentItem.B_20_20>

          <ContentItem.B_20_20>
            <AnchorTag
              id="labellingAndAllergensWelshLink"
              href="https://www.food.gov.uk/cy/canllawiau-ar-gyfer-busnesau/cyngor-penodol-ar-gyfer-y-diwydiant/labelu-ac-alergenau"
              target="_blank"
              rel="noopener noreferrer"
            >
              I gael canllawiau ar labelu bwyd ac alergenau
            </AnchorTag>
          </ContentItem.B_20_20>

          <ContentItem.B_20_20>
            <AnchorTag
              id="businessStartUpGuidanceWelshLink"
              href="https://businesswales.gov.wales/starting-up/cy"
              target="_blank"
              rel="noopener noreferrer"
            >
              I gael cyngor busnes cyffredinol
            </AnchorTag>
          </ContentItem.B_20_20>
        </ContentItem.B_30_15>
      ) : null}
    </ContentItem.B_30_15>

    <Header level={2} mb={5} size="LARGE">
      Your registration details:
    </Header>
    <SummaryTable {...props.transformedData} applicationCompletePage={true} />
  </FsaLayout>
);

export default SessionWrapper(ApplicationComplete);

ApplicationComplete.propTypes = {
  fsaRegistrationNumber: PropTypes.string,
  lcConfig: PropTypes.object,
  submissionDate: PropTypes.string,
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  recipient: PropTypes.string
};
