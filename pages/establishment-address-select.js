import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  SelectWithHeader,
  HiddenTextAccessible
} from "../src/components";
import { Heading, Paragraph, Link } from "govuk-react";
import PropTypes from "prop-types";

const EstablishmentAddressLookup = (props) => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <Heading as="h1" size="LARGE">
      What is the establishment's address?
    </Heading>

    <HiddenTextAccessible
      id="hiddenTextEstablishment"
      summary={"What is an establishment?"}
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
          <Heading as="h2" size="MEDIUM">
            Postcode
          </Heading>
          <Paragraph className="establishmentPostcodeDisplay" mb={0}>
            {props.cumulativeFullAnswers.establishment_postcode_find}
          </Paragraph>
          <Link
            id="changeEstablishmentPostcode"
            href={
              props.editModeFirstPage
                ? "/establishment-address?edit=establishment-address"
                : "/establishment-address"
            }
          >
            Change postcode
          </Link>
        </ContentItem.B_30_15>

          <ContentItem.B_20_20>
        <SelectWithHeader
          label={`Select an address for ${props.cumulativeFullAnswers.establishment_postcode_find}`}
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
          </ContentItem.B_20_20>
        <ContentItem.B_30_15>
          <Link
            id="cantFindAddressLink"
            href={
              props.editModeFirstPage
                ? `/new/${props.council}/establishment-address-manual?edit=establishment-address-manual`
                : `/new/${props.council}/establishment-address-manual`
            }
          >
            I can't find my address in the list
          </Link>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>

      <ContinueButton {...props} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(EstablishmentAddressLookup);

EstablishmentAddressLookup.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  )
};
