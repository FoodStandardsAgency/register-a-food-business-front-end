import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  HiddenTextAccessible
} from "../src/components";
import { Header, InputField } from "govuk-react";
import PropTypes from "prop-types";

const LimitedCompanyDetails = props => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <ProcessedErrorSummary validatorErrors={props.validatorErrors} />
    <Header level={1} size="LARGE">
      Company details
    </Header>

    <form action={props.formAction} method="post">
      <ContentItem.B_30_15>
        <InputField
          input={{
            name: "operator_company_name",
            defaultValue: props.cumulativeFullAnswers.operator_company_name,
            autoComplete: "organization"
          }}
          hint={
            "The name of the registered company that is acting as the operator of this food business."
          }
          id="operator_company_name"
          meta={{
            touched: true,
            error: props.validatorErrors["operator_company_name"]
          }}
        >
          Registered company name
        </InputField>
      </ContentItem.B_30_15>

      <ContentItem.B_30_15>
        <InputField
          input={{
            name: "operator_company_house_number",
            defaultValue:
              props.cumulativeFullAnswers.operator_company_house_number,
            autoComplete: "off"
          }}
          hint={
            "Every registered company will have a Companies House reference number."
          }
          id="operator_company_house_number"
          meta={{
            touched: true,
            error: props.validatorErrors["operator_company_house_number"]
          }}
        >
          Companies House number
        </InputField>
      </ContentItem.B_30_15>

      <ContentItem.B_30_15>
        <HiddenTextAccessible
          summaryText={"I don't know my Companies House number"}
        >
          {/* TODO JMB: replace the span with a paragraph once it's possible to pass an array or similar to Paragraph for the link */}
          <span>
            Every limited company has to be registered with Companies House, and
            will have a company reference number. You can find your company
            reference number by visiting the{" "}
            <a
              href="https://beta.companieshouse.gov.uk/"
              target="_blank"
              rel="noopener noreferrer"
              id="link-companies-house"
            >
              Companies House website (opens in new window)
            </a>.
          </span>
        </HiddenTextAccessible>
      </ContentItem.B_30_15>

      <ContinueButton {...props} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(LimitedCompanyDetails);

LimitedCompanyDetails.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
