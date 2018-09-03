import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton
} from "../src/components";
import {
  Header,
  HiddenText,
  Paragraph,
  Select,
  asAnchor,
  HintText
} from "govuk-react";
import PropTypes from "prop-types";

const AnchorTag = asAnchor("a");

const OperatorAddressLookup = props => (
  <FsaLayout {...props}>
    <BackButton
      editMode={props.switches.editMode}
      originator="operator-address-select"
    />
    <Header level={2}>What is the operator's address?</Header>
    <ContentItem.B_30_15>
      <HintText>
        Operator address is the contact address for the operator. For example
        home address for a sole trader or headquarters address for a limited
        company.
      </HintText>
    </ContentItem.B_30_15>

    <HiddenText
      id="hiddenTextFBO"
      summaryText={"What is a food business operator?"}
    >
      <Paragraph mb={0}>
        The food business operator is the person, charity or company who makes
        the decisions about the food business, what it serves and how it
        operates.
      </Paragraph>
    </HiddenText>

    <form action="/continue/operator-address-select" method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <Header level={3}>Postcode</Header>
          <Header id="operatorPostcodeDisplay" level={4}>
            {`${props.cumulativeAnswers.operator_postcode_find} \u2007`}
            <AnchorTag id="changeOperatorPostcode" href="/operator-address">
              Change
            </AnchorTag>
          </Header>
        </ContentItem.B_30_15>

        <Header level={3}>Select an address</Header>
        <Select
          input={{
            id: "operatorAddressDropdown",
            name: "operator_address_selected",
            defaultValue: props.cumulativeAnswers.operator_address_selected || 0
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
        </Select>
        <AnchorTag id="cantFindAddressLink" href="/operator-address-manual">
          I can't find my address in the list
        </AnchorTag>
      </ContentItem.B_30_15>

      <ContinueButton editMode={props.switches.editMode} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(OperatorAddressLookup);

OperatorAddressLookup.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string)
};
