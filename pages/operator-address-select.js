import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  SelectWithHeader,
  AddressHelp
} from "../src/components";
import { Header, Paragraph, asAnchor } from "govuk-react";
import PropTypes from "prop-types";

const AnchorTag = asAnchor("a");

const OperatorAddressLookup = props => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <AddressHelp role={props.cumulativeFullAnswers.registration_role} />
    <form action={props.formAction} method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <Header level={2} size="MEDIUM">
            Postcode
          </Header>
          <Paragraph className="operatorPostcodeDisplay" mb={0}>
            {props.cumulativeFullAnswers.operator_postcode_find}
          </Paragraph>
          <AnchorTag id="changeOperatorPostcode" href="/operator-address">
            Change postcode
          </AnchorTag>
        </ContentItem.B_30_15>

        <SelectWithHeader
          label={`Select an address for ${
            props.cumulativeFullAnswers.operator_postcode_find
          }`}
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

        <ContentItem.B_30_15>
          <AnchorTag
            id="cantFindAddressLink"
            href={`/new/${props.council}/operator-address-manual`}
          >
            I can't find my address in the list
          </AnchorTag>
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
