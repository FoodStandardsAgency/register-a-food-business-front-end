import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  HiddenTextAccessible
} from "../src/components";
import {
  Header,
  InputField,
  Paragraph,
  ErrorText,
  HintText
} from "govuk-react";
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
    <Header level={1} size="LARGE">
      {props.cumulativeFullAnswers.registration_role === "Partnership"
        ? "What is the partners's address?"
        : "What is the operator's address?"}
    </Header>
    <ContentItem.B_30_15>
      <HintText>
        Operator address is the contact address for the operator. For example
        home address for a sole trader or headquarters address for a limited
        company.
      </HintText>
    </ContentItem.B_30_15>

    <HiddenTextAccessible summaryText={"What is a food business operator?"}>
      <Paragraph mb={0}>
        The operator is the person or people, charity or company who makes the
        decisions about the food business. They decide what it serves and how it
        operates.
      </Paragraph>
    </HiddenTextAccessible>

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
              name: "operator_first_line",
              defaultValue: props.cumulativeFullAnswers.operator_first_line,
              autoComplete: "address-line1"
            }}
            id="operator_first_line"
            // TODO APM: Decide on and implement validation for first line of address
            // Work out why validator errors fails in test
            meta={{
              touched: true,
              error: props.validatorErrors.operator_first_line
            }}
          >
            First line of address
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_street",
              defaultValue: props.cumulativeFullAnswers.operator_street,
              autoComplete: "address-line2"
            }}
            id="operator_street"
            meta={{
              touched: true,
              error: props.validatorErrors.operator_street
            }}
          >
            Street (optional)
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
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
