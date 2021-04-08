import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  AddressHelp,
  PostForm
} from "../src/components";
import { InputField, ErrorText } from "@slice-and-dice/govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";
import { operatorTypeEnum } from "@slice-and-dice/register-a-food-business-validation";

const OperatorAddress = (props) => (
  <FsaLayout
    {...props}
    backHref={
      props.switches["/operator-address-none-found"]
        ? `/new/${props.council}/operator-address`
        : `/new/${props.council}/operator-address-select`
    }
  >
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <AddressHelp
      role={props.cumulativeFullAnswers.registration_role}
      header={props.t(
        props.cumulativeFullAnswers.registration_role ===
          operatorTypeEnum.PARTNERSHIP.key
          ? "What is the partnership contact's address?"
          : "What is the operator's address?"
      )}
    />
    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <ContentItem.B_30_15>
        {props.switches["/operator-address-none-found"] ? (
          <ContentItem.B_30_15>
            <ErrorText id="addressNotFoundByPostcodeMessage">
              {`${props.t("No addresses found for the postcode")} "${
                props.cumulativeFullAnswers.operator_postcode_find
              }". ${props.t(
                "Please enter your address manually or go back to try a different postcode."
              )}`}
            </ErrorText>
          </ContentItem.B_30_15>
        ) : null}

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_address_line_1",
              defaultValue: props.cumulativeFullAnswers.operator_address_line_1,
              autoComplete: "address-line1"
            }}
            errorPrefix={`${props.t("Error")}: `}
            id="operator_address_line_1"
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.operator_address_line_1)
            }}
          >
            {props.t("Address line 1")}
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_address_line_2",
              defaultValue: props.cumulativeFullAnswers.operator_address_line_2,
              autoComplete: "address-line2"
            }}
            errorPrefix={`${props.t("Error")}: `}
            id="operator_address_line_2"
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.operator_address_line_2)
            }}
          >
            {props.t("Address line 2 (optional)")}
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_address_line_3",
              defaultValue: props.cumulativeFullAnswers.operator_address_line_3,
              autoComplete: "address-line3"
            }}
            errorPrefix={`${props.t("Error")}: `}
            id="operator_address_line_3"
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.operator_address_line_3)
            }}
          >
            {props.t("Address line 3 (optional)")}
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_town",
              defaultValue: props.cumulativeFullAnswers.operator_town,
              autoComplete: "locality"
            }}
            errorPrefix={`${props.t("Error")}: `}
            id="operator_town"
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.operator_town)
            }}
          >
            {props.t("Town or city")}
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_postcode",
              defaultValue: props.cumulativeFullAnswers.operator_postcode,
              autoComplete: "postal-code"
            }}
            errorPrefix={`${props.t("Error")}: `}
            id="operator_postcode"
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.operator_postcode)
            }}
          >
            {props.t("Postcode")}
          </InputField>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>

      <ContinueButton {...props} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(SessionWrapper(OperatorAddress));

OperatorAddress.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
