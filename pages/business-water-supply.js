import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  HiddenTextAccessible,
  PostForm
} from "../src/components";
import { waterSupplyEnum } from "@slice-and-dice/register-a-food-business-validation";
import {
  Fieldset,
  Radio,
  MultiChoice,
  HintText,
  Paragraph
} from "@slice-and-dice/govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

const WaterSupply = (props) => (
  <FsaLayout {...props}>
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <ContentItem.B_45_30>
        <Fieldset>
          <Fieldset.Legend
            size="LARGE"
            isPageHeading
            style={{ marginBottom: "30px" }}
          >
            {props.t("What type of water supply does this establishment use?")}
          </Fieldset.Legend>
          <HiddenTextAccessible
            summary={props.t("What is an establishment?")}
            {...props}
          >
            <Paragraph mb={0}>
              {props.t(
                "An establishment is the location of your food business, and the food activities taking place there. If it is a mobile food business, please use the location where it is normally stored overnight."
              )}
            </Paragraph>
          </HiddenTextAccessible>
          <ContentItem.B_30_15>
            <HintText>
              {props.t(
                "The water supply is where you get your tap water from. It has a private water supply if it uses water that you take up from the ground by yourself. For example from a well."
              )}
            </HintText>
          </ContentItem.B_30_15>
          <MultiChoice
            label=""
            language={props.t("en")}
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.water_supply)
            }}
          >
            <Radio
              name="water_supply"
              value={waterSupplyEnum.PUBLIC.key}
              id="water_supply_public"
              defaultChecked={
                props.cumulativeFullAnswers.water_supply ===
                waterSupplyEnum.PUBLIC.key
              }
            >
              {props.t("Mains water supply (most common supply)")}
            </Radio>
            <Radio
              name="water_supply"
              value={waterSupplyEnum.PRIVATE.key}
              id="water_supply_private"
              defaultChecked={
                props.cumulativeFullAnswers.water_supply ===
                waterSupplyEnum.PRIVATE.key
              }
            >
              {props.t("Private water supply")}
            </Radio>
            <Radio
              name="water_supply"
              value={waterSupplyEnum.BOTH.key}
              id="water_supply_public_and_private"
              defaultChecked={
                props.cumulativeFullAnswers.water_supply ===
                waterSupplyEnum.BOTH.key
              }
            >
              {props.t("Both mains and private water supplies")}
            </Radio>
          </MultiChoice>
        </Fieldset>
      </ContentItem.B_45_30>
      <ContentItem.B_30_15>
        <HiddenTextAccessible
          id="hiddenTextWaterSupply"
          summary={props.t("I don't know if I have a private water supply")}
          {...props}
        >
          <span>
            {props.t(
              "If you are not registered with a water supply company or paying a bill for water, this is an indication that your water supply could be private."
            )}
          </span>
        </HiddenTextAccessible>
      </ContentItem.B_30_15>
      <ContinueButton {...props} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(SessionWrapper(WaterSupply));

WaterSupply.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
