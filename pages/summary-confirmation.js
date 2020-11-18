import SessionWrapper from "../src/components/SessionWrapper";
import { FsaLayout, ContentItem, SummaryTable } from "../src/components";
import {
  Heading,
  Panel,
  Paragraph,
  InsetText,
  Link,
  HintText
} from "govuk-react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import moment from "moment";
import { withTranslation } from "../i18n";

const FsaPanel = styled(Panel)`
  h2 {
    display: none;
  }
`;

const ApplicationComplete = (props) => (
  <FsaLayout {...props}>
    <Heading as="h1" size="LARGE">
      {props.t("Submission complete")}
    </Heading>
    <Paragraph>
      {props.t("Thank you for submitting your food business registration.")}
    </Paragraph>
    {props.fsaRegistrationNumber ? (
      <FsaPanel id="panelWithNumber" title="">
        {[
          {
            this: props.t(
              "Your unique food business registration application reference is"
            )
          },
          <br key={1} />,
          <br key={2} />,
          <span key={3} className="bold" id="fsa-rn">
            {props.fsaRegistrationNumber.split("-").join(" - ")}
          </span>
        ]}
      </FsaPanel>
    ) : (
      <FsaPanel
        id="panelWithText"
        panelTitle={props.t("Registration submitted")}
        panelBody={props.t("Awaiting registration application reference")}
      />
    )}
    <InsetText>
      <Paragraph mb={0}>
        {props.t(
          "Please keep note of this registration application reference for your records."
        )}
      </Paragraph>
    </InsetText>

    <ContentItem.B_30_15>
      <Heading as="h2" size="MEDIUM" mb={1}>
        {props.t("Submitted on")}
      </Heading>
      <Paragraph mb={0}>
        {moment(props.submissionDate).format("DD MMM YYYY")}
      </Paragraph>
    </ContentItem.B_30_15>

    <div id="sentToCouncilsSection">
      <Heading as="h2" size="MEDIUM" mb={2}>
        {props.t("Your registration has been sent to:")}
      </Heading>
      {props.lcConfig.hygieneAndStandards ? (
        <ContentItem.B_30_15 id="hygieneAndStandardsCouncil">
          <Heading as="h4" mb={1}>
            {props.lcConfig.hygieneAndStandards.local_council}
          </Heading>
          <Paragraph mb={0}>
            {`Email: ${props.lcConfig.hygieneAndStandards.local_council_email}`}
          </Paragraph>
          {props.lcConfig.hygieneAndStandards.local_council_phone_number ? (
            <Paragraph mb={0} id="hygieneAndStandardsNumber">
              {`Phone: ${props.lcConfig.hygieneAndStandards.local_council_phone_number}`}
            </Paragraph>
          ) : null}
        </ContentItem.B_30_15>
      ) : props.lcConfig.hygiene && props.lcConfig.standards ? (
        <div>
          <ContentItem.B_30_15 id="hygieneCouncil">
            <Heading as="h4" mb={1}>
              {props.lcConfig.hygiene.local_council}
            </Heading>
            <Paragraph mb={0}>
              {`Email: ${props.lcConfig.hygiene.local_council_email}`}
            </Paragraph>
            {props.lcConfig.hygiene.local_council_phone_number ? (
              <Paragraph mb={0} id="hygieneNumber">
                {`Phone: ${props.lcConfig.hygiene.local_council_phone_number}`}
              </Paragraph>
            ) : null}
            <HintText>
              {props.t("Responsible local council for food hygiene")}
            </HintText>
          </ContentItem.B_30_15>
          <ContentItem.B_30_15 id="standardsCouncil">
            <Heading as="h4" mb={1}>
              {props.lcConfig.standards.local_council}
            </Heading>
            <Paragraph mb={0}>
              {`Email: ${props.lcConfig.standards.local_council_email}`}
            </Paragraph>
            {props.lcConfig.standards.local_council_phone_number ? (
              <Paragraph mb={0} id="standardsNumber">
                {`Phone: ${props.lcConfig.standards.local_council_phone_number}`}
              </Paragraph>
            ) : null}
            <HintText>
              {props.t("Responsible local council for food standards")}
            </HintText>
          </ContentItem.B_30_15>
        </div>
      ) : null}
    </div>

    <ContentItem.B_30_15>
      <Paragraph className="receiveConfirmationEmail">
        {props.t("A copy of this registration has been sent to")}{" "}
        {`**${
          props.transformedData.operator_email ||
          props.transformedData.contact_representative_email
        }.**`}
      </Paragraph>
    </ContentItem.B_30_15>

    <Heading as="h2" size="LARGE">
      {props.t("What's next?")}
    </Heading>
    <InsetText>
      <Paragraph mb={0}>
        {props.t(
          "**You may receive an unannounced food inspection from your local council soon after you start trading.**"
        )}
      </Paragraph>
    </InsetText>
    <ContentItem.B_30_15>
      <Paragraph>
        {props.t(
          "The council may contact you before the inspection to discuss how your business operates or to offer advice. Meanwhile, there are some things you can do to help prepare for the opening of your business."
        )}
      </Paragraph>
    </ContentItem.B_30_15>

    <ContentItem.B_30_15>
      <Heading as="h2" size="LARGE">
        {props.t("Find out here what you can do to prepare:")}
      </Heading>
      <HintText mb={3}>{props.t("All links open in a new window")}</HintText>

      {props.country === "wales" ? (
        <Heading as="h3" mb={2} size="SMALL">
          {props.t("English")}
        </Heading>
      ) : null}

      <ContentItem.B_20_20>
        <Link
          id="foodSafetyLink"
          href="https://www.food.gov.uk/business-guidance"
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.t(
            "Guidance on food hygiene and how to run a safe food business"
          )}
        </Link>
      </ContentItem.B_20_20>
      <ContentItem.B_20_20>
        <Link
          id="fhrsScoreLink"
          href="https://www.food.gov.uk/business-guidance/food-hygiene-ratings-for-businesses"
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.t("How to achieve a high food hygiene rating (FHRS score)")}
        </Link>
      </ContentItem.B_20_20>

      {props.country === "northern-ireland" ? (
        <ContentItem.B_20_20>
          <Link
            id="safeCateringLink"
            href="https://www.food.gov.uk/business-guidance/safe-catering"
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.t("Safe catering")}
          </Link>
        </ContentItem.B_20_20>
      ) : null}

      <ContentItem.B_20_20>
        <Link
          id="safetyManagementLink"
          href="https://www.food.gov.uk/business-guidance/safer-food-better-business"
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.t(
            "Information on the food safety management system safer food, better business"
          )}
        </Link>
      </ContentItem.B_20_20>

      <ContentItem.B_20_20>
        <Link
          id="foodLabellingLink"
          href="https://www.food.gov.uk/business-guidance/industry-specific-advice/labelling-and-allergens"
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.t("Food labelling and allergens guidance")}
        </Link>
      </ContentItem.B_20_20>

      {props.country === "wales" || props.country === "northern-ireland" ? (
        <ContentItem.B_20_20>
          <Link
            id="businessGuidanceLink"
            href={
              props.country === "northern-ireland"
                ? "https://www.nibusinessinfo.co.uk/"
                : "https://www.businesswales.gov.wales/starting-up"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.t("Business support")} -
            {props.country === "wales" ? ` Wales` : " Northern Ireland"}
          </Link>
        </ContentItem.B_20_20>
      ) : (
        <ContentItem.B_30_15>
          <ContentItem.B_20_20>
            <Link
              id="businessSupportHelplineEnglishLink"
              href="https://www.gov.uk/business-support-helpline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.t("Business support & helpline")}
            </Link>
          </ContentItem.B_20_20>

          <ContentItem.B_20_20>
            {props.t(
              "or contact the Business Support Helpline on 0300 456 3565"
            )}
          </ContentItem.B_20_20>
        </ContentItem.B_30_15>
      )}

      {props.country === "wales" ? (
        <ContentItem.B_30_15>
          <Heading as="h3" mb={2} size="SMALL">
            Cymru
          </Heading>
          <ContentItem.B_20_20>
            <Link
              id="businessGuidanceWelshLink"
              href="https://www.food.gov.uk/cy/canllawiau-ar-gyfer-busnesau"
              target="_blank"
              rel="noopener noreferrer"
            >
              I gael cyngor cyffredinol ar hylendid bwyd a sut i redeg busnes
              bwyd diogel
            </Link>
          </ContentItem.B_20_20>

          <ContentItem.B_20_20>
            <Link
              id="foodHygieneRatingsWelshLink"
              href="https://www.food.gov.uk/cy/business-guidance/sgoriau-hylendid-bwyd-ar-gyfer-busnesau"
              target="_blank"
              rel="noopener noreferrer"
            >
              I gael gwybodaeth am sut i gael sgôr uchel o dan y Cynllun Sgorio
              Hylendid Bwyd
            </Link>
          </ContentItem.B_20_20>

          <ContentItem.B_20_20>
            <Link
              id="saferFoodBetterBusinessWelshLink"
              href="https://www.food.gov.uk/cy/business-guidance/bwyd-mwy-diogel-busnes-gwell"
              target="_blank"
              rel="noopener noreferrer"
            >
              I gael gwybodaeth am y system rheoli diogelwch bwyd, Bwyd mwy
              Diogel, Busnes Gwell
            </Link>
          </ContentItem.B_20_20>

          <ContentItem.B_20_20>
            <Link
              id="labellingAndAllergensWelshLink"
              href="https://www.food.gov.uk/cy/canllawiau-ar-gyfer-busnesau/cyngor-penodol-ar-gyfer-y-diwydiant/labelu-ac-alergenau"
              target="_blank"
              rel="noopener noreferrer"
            >
              I gael canllawiau ar labelu bwyd ac alergenau
            </Link>
          </ContentItem.B_20_20>

          <ContentItem.B_20_20>
            <Link
              id="businessStartUpGuidanceWelshLink"
              href="https://businesswales.gov.wales/starting-up/cy"
              target="_blank"
              rel="noopener noreferrer"
            >
              I gael cyngor busnes cyffredinol
            </Link>
          </ContentItem.B_20_20>
        </ContentItem.B_30_15>
      ) : null}
    </ContentItem.B_30_15>

    <Heading as="h2" mb={5} size="LARGE">
      {props.t("Your registration details:")}
    </Heading>
    <SummaryTable
      {...props.transformedData}
      validatorErrors={props.validatorErrors}
      applicationCompletePage={true}
    />
  </FsaLayout>
);

export default withTranslation("SessionWrapper(ApplicationComplete)")(
  SessionWrapper(ApplicationComplete)
);

ApplicationComplete.propTypes = {
  fsaRegistrationNumber: PropTypes.string,
  lcConfig: PropTypes.object,
  submissionDate: PropTypes.string,
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  recipient: PropTypes.string
};
