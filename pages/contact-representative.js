import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick
} from "../src/components";
import { Header, InputField, Paragraph, HiddenText } from "govuk-react";
import PropTypes from "prop-types";

const ContactRepresentative = props => {
  return (
    <FsaLayout {...props}>
      <BackButton {...props} />
      <ProcessedErrorSummary
        validatorErrors={props.validatorErrors}
        onHandleErrorClick={OnHandleErrorClick}
      />
      <Header level={1} size="LARGE">
        Operator contact details
      </Header>
      <Paragraph>
        Please give us the details of the person at this company or charity we
        should speak to about food hygiene and safety.
      </Paragraph>
      <HiddenText summaryText={"What is a food business operator?"}>
        <Paragraph mb={0}>
          The food business operator is the person, charity or company who makes
          the decisions about the food business, what it serves and how it
          operates.
        </Paragraph>
      </HiddenText>
      <form action={props.formAction} method="post">
        <ContentItem.B_30_15>
          <ContentItem.B_30_15>
            <InputField
              input={{
                name: "contact_representative_name",
                defaultValue:
                  props.cumulativeFullAnswers.contact_representative_name,
                autoComplete: "off"
              }}
              id="contact_representative_name"
              meta={{
                touched: true,
                error: props.validatorErrors.contact_representative_name
              }}
            >
              Name of contact
            </InputField>
          </ContentItem.B_30_15>
          <ContentItem.B_30_15>
            <InputField
              input={{
                name: "contact_representative_role",
                defaultValue:
                  props.cumulativeFullAnswers.contact_representative_role,
                autoComplete: "off"
              }}
              id="contact_representative_role"
              meta={{
                touched: true,
                error: props.validatorErrors.contact_representative_role
              }}
            >
              Role (optional)
            </InputField>
          </ContentItem.B_30_15>
          <ContentItem.B_30_15>
            <InputField
              input={{
                name: "contact_representative_number",
                defaultValue:
                  props.cumulativeFullAnswers.contact_representative_number,
                autoComplete: "tel"
              }}
              id="contact_representative_number"
              meta={{
                touched: true,
                error: props.validatorErrors.contact_representative_number
              }}
            >
              Phone number
            </InputField>
          </ContentItem.B_30_15>
          <ContentItem.B_30_15>
            <InputField
              input={{
                name: "contact_representative_email",
                defaultValue:
                  props.cumulativeFullAnswers.contact_representative_email,
                autoComplete: "email"
              }}
              id="contact_representative_email"
              hint={[
                "Your email address will be used to update you regarding policy or legal changes that could affect your food business."
              ]}
              meta={{
                touched: true,
                error: props.validatorErrors.contact_representative_email
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
};

export default SessionWrapper(ContactRepresentative);

ContactRepresentative.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
