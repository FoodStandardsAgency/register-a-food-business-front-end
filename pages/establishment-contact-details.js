import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  CheckboxButton,
  ProcessedErrorSummary,
  OnHandleErrorClick
} from "../src/components";
import { Header, InputField, Paragraph, HiddenText } from "govuk-react";
import PropTypes from "prop-types";

const EstablishmentContactDetails = props => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Header level={1} size="LARGE">
      Establishment contact details
    </Header>

    <HiddenText summaryText={"What is an establishment?"}>
      <Paragraph mb={0}>
        An establishment is the location of your food business, and the food
        activities taking place there. If it is a mobile food business, please
        use the location where it is normally stored overnight.
      </Paragraph>
    </HiddenText>

    <form action={props.formAction} method="post">
      <ContentItem.B_30_15>
        <CheckboxButton
          type="submit"
          formAction="/switches/reuseOperatorContactDetails/toggle/establishment-contact-details"
          className={
            props.switches.reuseOperatorContactDetails ? "checked" : null
          }
        >
          Re-use operator contact details
        </CheckboxButton>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "establishment_primary_number",
              defaultValue: props.switches.reuseOperatorContactDetails
                ? props.cumulativeFullAnswers.operator_primary_number ||
                  props.cumulativeFullAnswers.contact_representative_number
                : props.cumulativeFullAnswers.establishment_primary_number,
              autoComplete: "tel"
            }}
            id="establishment_primary_number"
            meta={{
              touched: true,
              error: props.validatorErrors["establishment_primary_number"]
            }}
          >
            Main phone number
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "establishment_secondary_number",
              defaultValue: props.switches.reuseOperatorContactDetails
                ? props.cumulativeFullAnswers.operator_secondary_number
                : props.cumulativeFullAnswers.establishment_secondary_number,
              autoComplete: "off"
            }}
            id="establishment_secondary_number"
            meta={{
              touched: true,
              error: props.validatorErrors["establishment_secondary_number"]
            }}
          >
            Secondary phone number (optional)
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "establishment_email",
              defaultValue: props.switches.reuseOperatorContactDetails
                ? props.cumulativeFullAnswers.operator_email ||
                  props.cumulativeFullAnswers.contact_representative_email
                : props.cumulativeFullAnswers.establishment_email,
              autoComplete: "email"
            }}
            id="establishment_email"
            hint={[
              "Your email address will be used to update you regarding policy or legal changes that could affect your food business."
            ]}
            meta={{
              touched: true,
              error: props.validatorErrors.establishment_email
            }}
          >
            Email address
          </InputField>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>

      <ContinueButton {...props} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(EstablishmentContactDetails);

EstablishmentContactDetails.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string),
  switches: PropTypes.objectOf(PropTypes.bool)
};
