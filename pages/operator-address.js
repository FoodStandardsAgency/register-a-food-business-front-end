import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  FindAddressButton
} from "../src/components";
import {
  Header,
  InputField,
  HiddenText,
  Paragraph,
  HintText
} from "govuk-react";
import PropTypes from "prop-types";

const OperatorAddress = props => (
  <FsaLayout {...props}>
    <BackButton {...props} />

    <Header level={2}>What is the operator's address?</Header>
    <ContentItem.B_30_15>
      <HintText>
        Operator address is the contact address for the operator. For example
        home address for a sole trader or headquarters address for a limited
        company.
      </HintText>
    </ContentItem.B_30_15>

    <HiddenText summaryText={"What is a food business operator?"}>
      <Paragraph mb={0}>
        The food business operator is the person, charity or company who makes
        the decisions about the food business, what it serves and how it
        operates.
      </Paragraph>
    </HiddenText>

    <form action="/findaddress/operator-address" method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <InputField
            input={{
              id: "operator_postcode_find",
              name: "operator_postcode_find",
              defaultValue: props.cumulativeFullAnswers.operator_postcode_find,
              autoComplete: "postal-code"
            }}
            id="operatorPostcodeFindComponent"
            meta={{
              touched: true,
              error: props.validatorErrors.operator_postcode_find
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

export default SessionWrapper(OperatorAddress);

OperatorAddress.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
