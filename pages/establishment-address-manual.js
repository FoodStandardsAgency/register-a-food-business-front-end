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
import { Header, InputField, Paragraph, ErrorText } from "govuk-react";
import PropTypes from "prop-types";

const EstablishmentAddress = props => (
  <FsaLayout {...props}>
    <BackButton
      {...props}
      href={
        props.switches["/establishment-address-none-found"]
          ? `/new/${props.council}/establishment-address`
          : `/new/${props.council}/establishment-address-select`
      }
    />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Header level={1} size="LARGE">
      What is the establishment's address?
    </Header>

    <HiddenTextAccessible summaryText={"What is an establishment?"}>
      <Paragraph mb={0}>
        An establishment is the location of your food business, and the food
        activities taking place there. If it is a mobile food business, please
        use the location where it is normally stored overnight.
      </Paragraph>
    </HiddenTextAccessible>

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
              name: "establishment_address_line_1",
              defaultValue:
                props.cumulativeFullAnswers.establishment_address_line_1,
              autoComplete: "address-line1"
            }}
            id="establishment_address_line_1"
            meta={{
              touched: true,
              error: props.validatorErrors.establishment_address_line_1
            }}
          >
            Address line 1
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "establishment_address_line_2",
              defaultValue:
                props.cumulativeFullAnswers.establishment_address_line_2,
              autoComplete: "address-line2"
            }}
            id="establishment_address_line_2"
            meta={{
              touched: true,
              error: props.validatorErrors.establishment_address_line_2
            }}
          >
            Address line 2 (optional)
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "establishment_address_line_3",
              defaultValue:
                props.cumulativeFullAnswers.establishment_address_line_3,
              autoComplete: "address-line3"
            }}
            id="establishment_address_line_3"
            meta={{
              touched: true,
              error: props.validatorErrors.establishment_address_line_3
            }}
          >
            Address line 3 (optional)
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
            Town or city
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
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
