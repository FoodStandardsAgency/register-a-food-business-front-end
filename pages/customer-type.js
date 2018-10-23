import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton
} from "../src/components";
import { Header, Checkbox, MultiChoice, Paragraph } from "govuk-react";
import PropTypes from "prop-types";

const CustomerType = props => (
  <FsaLayout {...props}>
    <BackButton {...props} originator="customer-type" />
    <Header level={2}>Who will this establishment supply food to?</Header>
    <Paragraph>Select all that apply</Paragraph>

    <form action={props.formAction} method="post">
      <ContentItem.B_45_30>
        <MultiChoice
          label=""
          meta={{
            touched: true,
            error: props.validatorErrors.customer_type
          }}
        >
          <Checkbox
            name="supply_other"
            id="customer_type_supply_other"
            value="It will supply food to other businesses to process, sell or serve"
            defaultChecked={props.cumulativeFullAnswers.supply_other}
          >
            It will supply food to other businesses to process, sell or serve
          </Checkbox>

          <Checkbox
            name="supply_directly"
            id="customer_type_supply_directly"
            value="It will supply food directly to end consumer"
            defaultChecked={props.cumulativeFullAnswers.supply_directly}
          >
            It will supply food directly to end consumers
          </Checkbox>
        </MultiChoice>
      </ContentItem.B_45_30>

      <ContinueButton {...props} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(CustomerType);

CustomerType.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
