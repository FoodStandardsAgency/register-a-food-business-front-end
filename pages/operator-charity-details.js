import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  HiddenTextAccessible,
} from "../src/components";
import { Header, InputField, Paragraph } from "govuk-react";
import PropTypes from "prop-types";

const OperatorCharityDetails = (props) => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Header level={1} size="LARGE">
      Details of the operating charity
    </Header>

    <HiddenTextAccessible
      hiddentextindex={1}
      id="hiddenTextFBO"
      summaryText={"What is a food business operator?"}
    >
      <Paragraph mb={0}>
        The operator is the person or people, charity or company who makes the
        decisions about the food business. They decide what it serves and how it
        operates.
      </Paragraph>
    </HiddenTextAccessible>

    <form action={props.formAction} method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_charity_name",
              defaultValue: props.cumulativeFullAnswers.operator_charity_name,
              autoComplete: "off",
            }}
            id="operator_charity_name"
            meta={{
              touched: true,
              error: props.validatorErrors["operator_charity_name"],
            }}
          >
            Charity name
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_charity_number",
              defaultValue: props.cumulativeFullAnswers.operator_charity_number,
              autoComplete: "off",
            }}
            id="operator_charity_number"
            meta={{
              touched: true,
              error: props.validatorErrors["operator_charity_number"],
            }}
          >
            Charity reference number (optional)
          </InputField>
        </ContentItem.B_30_15>

        <HiddenTextAccessible
          hiddentextindex={2}
          id="hiddenTextCharityNumbers"
          summaryText={"Questions about charity reference numbers"}
        >
          <span>
            Charities that are registered with the Charities Commission will
            have a charity reference number. You can find your charity reference
            number by visiting the{" "}
            <a
              href="http://apps.charitycommission.gov.uk/Showcharity/RegisterOfCharities/registerhomepage.aspx"
              target="_blank"
              rel="noopener noreferrer"
              id="link-charity-commission"
            >
              Charity Commission website (opens in new window)
            </a>
            .
          </span>
        </HiddenTextAccessible>
      </ContentItem.B_30_15>

      <ContinueButton {...props} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(OperatorCharityDetails);

OperatorCharityDetails.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string),
};
