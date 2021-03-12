import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  ContinueButton,
  ProcessedErrorSummary,
  HiddenTextAccessible,
  PostForm
} from "../src/components";
import { Heading, InputField } from "@slice-and-dice/govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

const LimitedCompanyDetails = (props) => (
  <FsaLayout {...props}>
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      id="operator_company_name"
    />
    <Heading as="h1" size="LARGE">
      {props.t("Company details")}
    </Heading>

    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <ContentItem.B_30_15>
        <InputField
          input={{
            name: "operator_company_name",
            defaultValue: props.cumulativeFullAnswers.operator_company_name,
            autoComplete: "organization"
          }}
          errorPrefix={`${props.t("Error")}: `}
          hint={props.t(
            "The name of the registered company that is acting as the operator of this food business."
          )}
          id="operator_company_name"
          meta={{
            touched: true,
            error: props.t(props.validatorErrors["operator_company_name"])
          }}
        >
          {props.t("Registered company name")}
        </InputField>
      </ContentItem.B_30_15>

      <ContentItem.B_30_15>
        <InputField
          input={{
            name: "operator_companies_house_number",
            defaultValue:
              props.cumulativeFullAnswers.operator_companies_house_number,
            autoComplete: "off"
          }}
          errorPrefix={`${props.t("Error")}: `}
          hint={props.t(
            "Every registered company will have a Companies House reference number."
          )}
          id="operator_companies_house_number"
          meta={{
            touched: true,
            error: props.t(
              props.validatorErrors["operator_companies_house_number"]
            )
          }}
        >
          {props.t("Companies House number")}
        </InputField>
      </ContentItem.B_30_15>

      <ContentItem.B_30_15>
        <HiddenTextAccessible
          summary={props.t("I don't know my Companies House number")}
          {...props}
        >
          {/* TODO JMB: replace the span with a paragraph once it's possible to pass an array or similar to Paragraph for the link */}
          <span>
            {props.t(
              "Every limited company has to be registered with Companies House, and will have a company reference number. You can find your company reference number by visiting the"
            )}{" "}
            <a
              href="https://beta.companieshouse.gov.uk/"
              target="_blank"
              rel="noopener noreferrer"
              id="link-companies-house"
            >
              {props.t("Companies House website (opens in new window)")}
            </a>
            .
          </span>
        </HiddenTextAccessible>
      </ContentItem.B_30_15>

      <ContinueButton {...props} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(SessionWrapper(LimitedCompanyDetails));

LimitedCompanyDetails.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
