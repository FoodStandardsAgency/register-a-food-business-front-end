import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  PostForm
} from "../src/components";
import { Heading, Checkbox, MultiChoice, Paragraph } from "govuk-react";
import PropTypes from "prop-types";
import { CustomerTypeEnum } from "../src/enums";

const CustomerType = (props) => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Heading as="h1" size="LARGE">
      Who will this establishment supply food to?
    </Heading>
    <Paragraph>Select all that apply</Paragraph>

    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
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
            value={CustomerTypeEnum.OTHER_BUSINESSES.key}
            defaultChecked={props.cumulativeFullAnswers.supply_other}
          >
            It will supply food to other businesses to process, sell or serve
          </Checkbox>

          <Checkbox
            name="supply_directly"
            id="customer_type_supply_directly"
            value={CustomerTypeEnum.END_CONSUMER.key}
            defaultChecked={props.cumulativeFullAnswers.supply_directly}
          >
            It will supply food directly to end consumers
          </Checkbox>
        </MultiChoice>
      </ContentItem.B_45_30>

      <ContinueButton {...props} />
    </PostForm>
  </FsaLayout>
);

export default SessionWrapper(CustomerType);

CustomerType.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
