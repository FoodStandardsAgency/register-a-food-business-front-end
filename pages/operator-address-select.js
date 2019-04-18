import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  SelectWithHeader,
  HiddenTextAccessible
} from "../src/components";
import { Header, Paragraph, asAnchor, HintText } from "govuk-react";
import PropTypes from "prop-types";

const AnchorTag = asAnchor("a");

const OperatorAddressLookup = props => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <Header level={1} size="LARGE">
      {props.cumulativeFullAnswers.registration_role === "Partnership"
        ? "What is the partners's address?"
        : "What is the operator's address?"}
    </Header>
    <ContentItem.B_30_15>
      <HintText>
        Operator address is the contact address for the operator. For example
        home address for a sole trader or headquarters address for a limited
        company.
      </HintText>
    </ContentItem.B_30_15>

    <HiddenTextAccessible
      id="hiddenTextFBO"
      summaryText={"What is a food business operator?"}
    >
      <Paragraph mb={0}>
        The operator is the person or people, charity or company who makes the
        decisions about the food business. They decide what it serves and how it
        operates.
      </Paragraph>
    </HiddenTextAccessible>

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
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string)
};
