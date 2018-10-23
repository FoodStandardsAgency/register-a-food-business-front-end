import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  SelectWithHeader
} from "../src/components";
import { Header, HiddenText, Paragraph, asAnchor } from "govuk-react";
import PropTypes from "prop-types";

const AnchorTag = asAnchor("a");

const EstablishmentAddressLookup = props => (
  <FsaLayout {...props}>
    <BackButton
      editModeFirstPage={props.editModeFirstPage}
      originator="establishment-address-select"
    />
    <Header level={2}>What is the establishment's address?</Header>

    <HiddenText
      id="hiddenTextEstablishment"
      summaryText={"What is an establishment?"}
    >
      <Paragraph mb={0}>
        An establishment is the location of your food business. If it is a
        mobile food business, please use the location where it is normally
        stored overnight.
      </Paragraph>
    </HiddenText>

    <form action="/continue/establishment-address-select" method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <Header level={3}>Postcode</Header>
          <Header id="establishmentPostcodeDisplay" level={4}>
            {`${
              props.cumulativeFullAnswers.establishment_postcode_find
            } \u2007`}
            <AnchorTag
              id="changeEstablishmentPostcode"
              href="/establishment-address"
            >
              Change
            </AnchorTag>
          </Header>
        </ContentItem.B_30_15>

        <SelectWithHeader
          label="Select an address"
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
            href="/establishment-address-manual"
          >
            I can't find my address in the list
          </AnchorTag>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>

      <ContinueButton editModeFirstPage={props.editModeFirstPage} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(EstablishmentAddressLookup);

EstablishmentAddressLookup.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string)
};
