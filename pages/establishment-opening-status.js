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

const EstablishmentOpeningStatus = (props) => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Heading as="h1" size="LARGE">
      Is this establishment already trading?
    </Heading>
    <ContentItem.B_30_15>
      <HintText>
        It is trading if it is already producing or serving food, or if the new
        operator has already taken control
      </HintText>
    </ContentItem.B_30_15>
    <HiddenTextAccessible summary={"What is an establishment?"}>
      <Paragraph mb={0}>
        An establishment is the location of your food business, and the food
        activities taking place there. If it is a mobile food business, please
        use the location where it is normally stored overnight.
      </Paragraph>
    </HiddenTextAccessible>
    <form action={props.formAction} method="post">
      <ContentItem.B_45_30>
        <MultiChoice
          label=""
          meta={{
            touched: true,
            error: props.validatorErrors.establishment_opening_status
          }}
        >
          <Radio
            name="establishment_opening_status"
            value="Establishment is already trading"
            id="establishment_opening_status_already_trading"
            defaultChecked={
              props.cumulativeFullAnswers.establishment_opening_status ===
              "Establishment is already trading"
            }
          >
            Yes, it is already trading
          </Radio>
          <Radio
            name="establishment_opening_status"
            value="Establishment is not trading yet"
            id="establishment_opening_status_not_trading"
            defaultChecked={
              props.cumulativeFullAnswers.establishment_opening_status ===
              "Establishment is not trading yet"
            }
          >
            No, it is not trading yet
          </Radio>
        </MultiChoice>
      </ContentItem.B_45_30>

      <ContinueButton {...props} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(EstablishmentOpeningStatus);

EstablishmentOpeningStatus.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
