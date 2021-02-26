import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  HiddenTextAccessible,
  PostForm
} from "../src/components";
import { Heading, InputField, Paragraph } from "govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

const OperatorCharityDetails = (props) => (
  <FsaLayout {...props}>
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Heading as="h1" size="LARGE">
      {props.t("Details of the operating charity, organisation or trust")}
    </Heading>

    <HiddenTextAccessible
      hiddentextindex={1}
      id="hiddenTextFBO"
      summary={props.t("What is a food business operator?")}
      {...props}
    >
      <Paragraph mb={0}>
        {props.t(
          "The operator is the person or people, charity or company who makes the decisions about the food business. They decide what it serves and how it operates."
        )}
      </Paragraph>
    </HiddenTextAccessible>

    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_charity_name",
              defaultValue: props.cumulativeFullAnswers.operator_charity_name,
              autoComplete: "off"
            }}
            id="operator_charity_name"
            meta={{
              touched: true,
              error: props.t(props.validatorErrors["operator_charity_name"])
            }}
          >
            {props.t("Charity, organisation or trust name")}
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_charity_number",
              defaultValue: props.cumulativeFullAnswers.operator_charity_number,
              autoComplete: "off"
            }}
            id="operator_charity_number"
            meta={{
              touched: true,
              error: props.t(props.validatorErrors["operator_charity_number"])
            }}
          >
            {props.t("Charity reference number (optional)")}
          </InputField>
        </ContentItem.B_30_15>

        <HiddenTextAccessible
          hiddentextindex={2}
          id="hiddenTextCharityNumbers"
          summary={props.t("Questions about charity reference numbers")}
          {...props}
        >
          <span>
            {props.t(
              "Charities that are registered with the Charities Commission will have a charity reference number. You can find your charity reference number by visiting the"
            )}{" "}
            <a
              href="http://apps.charitycommission.gov.uk/Showcharity/RegisterOfCharities/registerhomepage.aspx"
              target="_blank"
              rel="noopener noreferrer"
              id="link-charity-commission"
            >
              {props.t("Charity Commission website (opens in new window)")}
            </a>
            .
          </span>
        </HiddenTextAccessible>
      </ContentItem.B_30_15>

      <ContinueButton {...props} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(
  SessionWrapper(OperatorCharityDetails)
);

OperatorCharityDetails.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
