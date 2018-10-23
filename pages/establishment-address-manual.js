import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick
} from "../src/components";
import {
  Header,
  InputField,
  HiddenText,
  Paragraph,
  ErrorText
} from "govuk-react";
import PropTypes from "prop-types";

const EstablishmentAddress = props => (
  <FsaLayout {...props}>
    <BackButton
      {...props}
      href={
        props.switches["/establishment-address-none-found"]
          ? "/establishment-address"
          : "/establishment-address-select"
      }
    />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Header level={2}>Establishment address</Header>

    <HiddenText summaryText={"What is an establishment?"}>
      <Paragraph mb={0}>
        An establishment is the location of your food business, and the food
        activities taking place there. If it is a mobile food business, please
        use the location where it is normally stored overnight.
      </Paragraph>
    </HiddenText>

    <form action={props.formAction} method="post">
      <ContentItem.B_30_15>
        {props.switches["/establishment-address-none-found"] ? (
          <ContentItem.B_30_15>
            <ErrorText id="addressNotFoundByPostcodeMessage">
              {`No addresses found for the postcode "${
                props.cumulativeFullAnswers.establishment_postcode_find
              }". Please enter your address manually or go back to try a
              different postcode.`}
            </ErrorText>
          </ContentItem.B_30_15>
        ) : null}

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "establishment_first_line",
              defaultValue:
                props.cumulativeFullAnswers.establishment_first_line,
              autoComplete: "address-line1"
            }}
            id="establishment_first_line"
            // TODO APM: Decide on and implement validation for first line of address
            // Work out why validator errors fails in test
            meta={{
              touched: true,
              error: props.validatorErrors.establishment_first_line
            }}
          >
            First line of address
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "establishment_street",
              defaultValue: props.cumulativeFullAnswers.establishment_street,
              autoComplete: "address-line2"
            }}
            id="establishment_street"
            meta={{
              touched: true,
              error: props.validatorErrors.establishment_street
            }}
          >
            Street (optional)
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "establishment_town",
              defaultValue: props.cumulativeFullAnswers.establishment_town,
              autoComplete: "locality"
            }}
            id="establishment_town"
            meta={{
              touched: true,
              error: props.validatorErrors.establishment_town
            }}
          >
            Town or city (optional)
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "establishment_postcode",
              defaultValue: props.cumulativeFullAnswers.establishment_postcode,
              autoComplete: "postal-code"
            }}
            id="establishment_postcode"
            meta={{
              touched: true,
              error: props.validatorErrors.establishment_postcode
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

export default SessionWrapper(EstablishmentAddress);

EstablishmentAddress.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
