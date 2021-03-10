import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  PostForm
} from "../src/components";
import { Heading, Checkbox, MultiChoice, Paragraph } from "govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";
import { customerTypeEnum } from "@slice-and-dice/register-a-food-business-validation";

const CustomerType = (props) => (
  <FsaLayout {...props}>
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Heading as="h1" size="LARGE">
      {props.t("Who will this establishment supply food to?")}
    </Heading>
    <Paragraph>{props.t("Select all that apply")}</Paragraph>

    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <ContentItem.B_45_30>
        <MultiChoice
          label=""
          language = {props.t("en")}
          meta={{
            touched: true,
            error: props.t(props.validatorErrors.customer_type)
          }}
        >
          <Checkbox
            name="supply_other"
            id="customer_type_supply_other"
            value={customerTypeEnum.OTHER_BUSINESSES.key}
            defaultChecked={props.cumulativeFullAnswers.supply_other}
          >
            {props.t(
              "It will supply food to other businesses to process, sell or serve"
            )}
          </Checkbox>

          <Checkbox
            name="supply_directly"
            id="customer_type_supply_directly"
            value={customerTypeEnum.END_CONSUMER.key}
            defaultChecked={props.cumulativeFullAnswers.supply_directly}
          >
            {props.t("It will supply food directly to end consumers")}
          </Checkbox>
        </MultiChoice>
      </ContentItem.B_45_30>

      <ContinueButton {...props} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(SessionWrapper(CustomerType));

CustomerType.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
