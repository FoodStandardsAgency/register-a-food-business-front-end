import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  SelectWithHeader,
  AddressHelp
} from "../src/components";
import { Heading, Paragraph, Link } from "govuk-react";
import PropTypes from "prop-types";

const OperatorAddressLookup = (props) => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <AddressHelp role={props.cumulativeFullAnswers.registration_role} />
    <form action={props.formAction} method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <Heading as="h2" size="MEDIUM">
            Postcode
          </Heading>
          <Paragraph className="operatorPostcodeDisplay" mb={0}>
            {props.cumulativeFullAnswers.operator_postcode_find}
          </Paragraph>
          <Link
            id="changeOperatorPostcode"
            href={
              props.editModeFirstPage
                ? "/operator-address?edit=operator-address"
                : "/operator-address"
            }
          >
            Change postcode
          </Link>
        </ContentItem.B_30_15>
        <ContentItem.B_20_20>
          <SelectWithHeader
            label={`Select an address for ${props.cumulativeFullAnswers.operator_postcode_find}`}
            input={{
              id: "operatorAddressDropdown",
              name: "operator_address_selected",
              defaultValue:
                props.cumulativeFullAnswers.operator_address_selected || 0
            }}
          >
            {props.addressLookups.operator_postcode_find ? (
              props.addressLookups.operator_postcode_find.map(
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
                ? `/new/${props.council}/operator-address-manual?edit=operator-address-manual`
                : `/new/${props.council}/operator-address-manual`
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

export default SessionWrapper(OperatorAddressLookup);

OperatorAddressLookup.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  )
};
