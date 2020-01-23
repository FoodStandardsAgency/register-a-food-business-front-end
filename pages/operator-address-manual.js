import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  AddressHelp
} from "../src/components";
import { InputField, ErrorText } from "govuk-react";
import PropTypes from "prop-types";

const OperatorAddress = props => (
  <FsaLayout {...props}>
    <BackButton
      {...props}
      href={
        props.switches["/operator-address-none-found"]
          ? `/new/${props.council}/operator-address`
          : `/new/${props.council}/operator-address-select`
      }
    />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <AddressHelp role={props.cumulativeFullAnswers.registration_role} />
    <form action={props.formAction} method="post">
      <ContentItem.B_30_15>
        {props.switches["/operator-address-none-found"] ? (
          <ContentItem.B_30_15>
            <ErrorText id="addressNotFoundByPostcodeMessage">
              {`No addresses found for the postcode "${
                props.cumulativeFullAnswers.operator_postcode_find
              }". Please enter your address manually or go back to try a
              different postcode.`}
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
            id="operator_address_line_1"
            meta={{
              touched: true,
              error: props.validatorErrors.operator_address_line_1
            }}
          >
            Address line 1
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_address_line_2",
              defaultValue: props.cumulativeFullAnswers.operator_address_line_2,
              autoComplete: "address-line2"
            }}
            id="operator_address_line_2"
            meta={{
              touched: true,
              error: props.validatorErrors.operator_address_line_2
            }}
          >
            Address line 2
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_address_line_3",
              defaultValue: props.cumulativeFullAnswers.operator_address_line_3,
              autoComplete: "address-line3"
            }}
            id="operator_address_line_3"
            meta={{
              touched: true,
              error: props.validatorErrors.operator_address_line_3
            }}
          >
            Address line 3
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_town",
              defaultValue: props.cumulativeFullAnswers.operator_town,
              autoComplete: "locality"
            }}
            id="operator_town"
            meta={{
              touched: true,
              error: props.validatorErrors.operator_town
            }}
          >
            Town or city (optional)
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_postcode",
              defaultValue: props.cumulativeFullAnswers.operator_postcode,
              autoComplete: "postal-code"
            }}
            id="operator_postcode"
            meta={{
              touched: true,
              error: props.validatorErrors.operator_postcode
            }}
          >
            Postcode
          </InputField>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>

      <ContinueButton {...props} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(OperatorAddress);

OperatorAddress.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
