import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  FindAddressButton,
  HiddenTextAccessible
} from "../src/components";
import { Header, InputField, Paragraph } from "govuk-react";
import PropTypes from "prop-types";

const EstablishmentAddress = props => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <Header level={1} size="LARGE">
      Establishment address
    </Header>

    <HiddenTextAccessible summaryText={"What is an establishment?"}>
      <Paragraph mb={0}>
        An establishment is the location of your food business, and the food
        activities taking place there. If it is a mobile food business, please
        use the location where it is normally stored overnight.
      </Paragraph>
    </HiddenTextAccessible>

    <form action="/findaddress/establishment-address" method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <InputField
            input={{
              id: "establishment_postcode_find",
              name: "establishment_postcode_find",
              defaultValue:
                props.cumulativeFullAnswers.establishment_postcode_find,
              autoComplete: "postal-code"
            }}
            id="establishment_postcode_find"
            meta={{
              touched: true,
              error: props.validatorErrors.establishment_postcode_find
            }}
          >
            Postcode
          </InputField>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>

      <FindAddressButton />
    </form>
  </FsaLayout>
);

export default SessionWrapper(EstablishmentAddress);

EstablishmentAddress.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
