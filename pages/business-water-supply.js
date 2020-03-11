import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  HiddenTextAccessible
} from "../src/components";
import { Heading, Radio, MultiChoice, HintText, Paragraph } from "govuk-react";
import PropTypes from "prop-types";

const WaterSupply = props => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Heading as="h1" size="LARGE">
      What type of water supply does this establishment use?
    </Heading>
    <HiddenTextAccessible summary={"What is an establishment?"}>
      <Paragraph mb={0}>
        An establishment is the location of your food business, and the food
        activities taking place there. If it is a mobile food business, please
        use the location where it is normally stored overnight.
      </Paragraph>
    </HiddenTextAccessible>
    <ContentItem.B_30_15>
      <HintText>
        The water supply is where you get your tap water from. It has a private
        water supply if it uses water that you take up from the ground by
        yourself. For example from a well.
      </HintText>
    </ContentItem.B_30_15>
    <form action={props.formAction} method="post">
      <ContentItem.B_45_30>
        <MultiChoice
          label=""
          meta={{
            touched: true,
            error: props.validatorErrors.water_supply
          }}
        >
          <Radio
            name="water_supply"
            value="Private"
            id="water_supply_private"
            defaultChecked={
              props.cumulativeFullAnswers.water_supply === "Private"
            }
          >
            Private water supply
          </Radio>
          <Radio
            name="water_supply"
            value="Public"
            id="water_supply_public"
            defaultChecked={
              props.cumulativeFullAnswers.water_supply === "Public"
            }
          >
            Public water supply
          </Radio>
          <Radio
            name="water_supply"
            value="Public and private"
            id="water_supply_public_and_private"
            defaultChecked={
              props.cumulativeFullAnswers.water_supply === "Public and private"
            }
          >
            Both private and public water supply
          </Radio>
        </MultiChoice>
      </ContentItem.B_45_30>
      <ContentItem.B_30_15>
        <HiddenTextAccessible
          id="hiddenTextWaterSupply"
          summary={"I don't know if I have a private water supply"}
        >
          <span>
            If you are not registered with a water supply company or paying a
            bill for water, this is an indication that your water supply could
            be private.
          </span>
        </HiddenTextAccessible>
      </ContentItem.B_30_15>
      <ContinueButton {...props} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(WaterSupply);

WaterSupply.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
