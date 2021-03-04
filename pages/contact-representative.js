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

const ContactRepresentative = (props) => {
  return (
    <FsaLayout {...props}>
      <ProcessedErrorSummary
        validatorErrors={props.validatorErrors}
        onHandleErrorClick={OnHandleErrorClick}
      />
      <Heading as="h1" size="LARGE">
        {props.t("Operator contact details")}
      </Heading>
      <Paragraph>
        {props.t(
          "Please give us the details of the person at this company or charity we should speak to about food hygiene and safety."
        )}
      </Paragraph>
      <HiddenTextAccessible
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
                name: "contact_representative_name",
                defaultValue:
                  props.cumulativeFullAnswers.contact_representative_name,
                autoComplete: "off"
              }}
              id="contact_representative_name"
              meta={{
                touched: true,
                error: props.t(
                  props.validatorErrors.contact_representative_name
                )
              }}
            >
              {props.t("Name of contact")}
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
                error: props.t(
                  props.validatorErrors.contact_representative_role
                )
              }}
            >
              {props.t("Role (optional)")}
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
                error: props.t(
                  props.validatorErrors.contact_representative_number
                )
              }}
            >
              {props.t("Phone number")}
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
              hint={props.t(
                "We will use your email to keep you informed of any policy or legal changes that could affect your food business."
              )}
              meta={{
                touched: true,
                error: props.t(
                  props.validatorErrors.contact_representative_email
                )
              }}
            >
              {props.t("Email address")}
            </InputField>
          </ContentItem.B_30_15>
        </ContentItem.B_30_15>

        <ContinueButton {...props} />
      </PostForm>
    </FsaLayout>
  );
};

export default withTranslation("common")(SessionWrapper(ContactRepresentative));

ContactRepresentative.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
