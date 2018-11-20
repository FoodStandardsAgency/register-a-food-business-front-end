import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  SelectWithHeader,
  HiddenTextAccessible
} from "../src/components";
import { Header, Paragraph, asAnchor } from "govuk-react";
import PropTypes from "prop-types";

const AnchorTag = asAnchor("a");

const EstablishmentAddressLookup = props => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <Header level={1} size="LARGE">
      What is the establishment's address?
    </Header>

    <HiddenTextAccessible
      id="hiddenTextEstablishment"
      summaryText={"What is an establishment?"}
    >
      <Paragraph mb={0}>
        An establishment is the location of your food business. If it is a
        mobile food business, please use the location where it is normally
        stored overnight.
      </Paragraph>
    </HiddenTextAccessible>

    <form action={props.formAction} method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <Header level={2} size="MEDIUM">
            Postcode
          </Header>
          <Paragraph className="establishmentPostcodeDisplay" mb={0}>
            {props.cumulativeFullAnswers.establishment_postcode_find}
          </Paragraph>
          <AnchorTag
            id="changeEstablishmentPostcode"
            href="/establishment-address"
          >
            Change postcode
          </AnchorTag>
        </ContentItem.B_30_15>

        <SelectWithHeader
          label={`Select an address for ${
            props.cumulativeFullAnswers.establishment_postcode_find
          }`}
          input={{
            id: "establishmentAddressDropdown",
            name: "establishment_address_selected",
            defaultValue:
              props.cumulativeFullAnswers.establishment_address_selected || 0
          }}
        >
          {props.addressLookups.establishment_postcode_find ? (
            props.addressLookups.establishment_postcode_find.map(
              (address, index) => (
                <option key={address.summaryline} value={index}>
                  {address.summaryline}
                </option>
              )
            )
          ) : (
            <option>No addresses found</option>
          )}
        </SelectWithHeader>

        <ContentItem.B_30_15>
          <AnchorTag
            id="cantFindAddressLink"
            href={`/new/${props.council}/establishment-address-manual`}
          >
            I can't find my address in the list
          </AnchorTag>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>

      <ContinueButton {...props} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(EstablishmentAddressLookup);

EstablishmentAddressLookup.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string)
};
