import FsaLayout from "../src/components/FsaLayout";
import SessionWrapper from "../src/components/SessionWrapper";
import ContentItem from "../src/components/ContentItem";
import { Header, Button, InputField, HiddenText, Paragraph } from "govuk-react";

const EstablishmentAddress = props => (
  <FsaLayout>
    <Header level={2}>Establishment address</Header>

    <ContentItem.B_30_15>
      <HiddenText summaryText={"What is an establishment?"}>
        <Paragraph mb={0}>
          An establishment is the location of your food business, and the food
          activities taking place there. If it is a mobile food business, please
          use the location where it is normally stored overnight.
        </Paragraph>
      </HiddenText>
    </ContentItem.B_30_15>

    <form action="/continue/establishment-address" method="post">
      <ContentItem.B_30_15>
        <InputField
          input={{
            name: "establishment_first_line",
            defaultValue: props.cumulativeAnswers.establishment_first_line,
            autoComplete: "address-line1"
          }}
          id="establishment_first_line"
          // TODO APM: Decide on and implement validation for first line of address
          // Work out why validator errors fails in test
          meta={{
            touched: true,
            error: props.validatorErrors["establishment_first_line"]
          }}
        >
          First Line of address
        </InputField>
      </ContentItem.B_30_15>

      <ContentItem.B_30_15>
        <InputField
          input={{
            name: "establishment_street",
            defaultValue: props.cumulativeAnswers.establishment_street,
            autoComplete: "address-line2"
          }}
          id="establishment_street"
          meta={{
            touched: true,
            error: props.validatorErrors["establishment_street"]
          }}
        >
          Street
        </InputField>
      </ContentItem.B_30_15>

      <ContentItem.B_30_15>
        <InputField
          input={{
            name: "establishment_town",
            defaultValue: props.cumulativeAnswers.establishment_town,
            autoComplete: "locality"
          }}
          id="establishment_town"
          meta={{
            touched: true,
            error: props.validatorErrors["establishment_town"]
          }}
        >
          Town or city
        </InputField>
      </ContentItem.B_30_15>

      <ContentItem.B_30_15>
        <InputField
          input={{
            name: "establishment_postcode",
            defaultValue: props.cumulativeAnswers.establishment_postcode,
            autoComplete: "postal-code"
          }}
          id="establishment_postcode"
          meta={{
            touched: true,
            error: props.validatorErrors["establishment_postcode"]
          }}
        >
          Postcode
        </InputField>
      </ContentItem.B_30_15>

      <Button id="continue-button" type="submit">
        Continue
      </Button>
    </form>
    <Paragraph>
      If you are registering a mobile food business, please use the location
      where it is normally stored overnight.
    </Paragraph>
  </FsaLayout>
);

export default SessionWrapper(EstablishmentAddress);
