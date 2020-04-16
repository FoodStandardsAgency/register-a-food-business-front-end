import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  HiddenTextAccessible,
} from "../src/components";
import { Header, InputField, Paragraph } from "govuk-react";
import PropTypes from "prop-types";

const EstablishmentTradingName = (props) => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Header level={1} size="LARGE">
      Trading name
    </Header>

    <HiddenTextAccessible summaryText={"What is an establishment?"}>
      <Paragraph mb={0}>
        An establishment is the location of your food business, and the food
        activities taking place there. If it is a mobile food business, please
        use the location where it is normally stored overnight.
      </Paragraph>
    </HiddenTextAccessible>

    <form action={props.formAction} method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "establishment_trading_name",
              defaultValue:
                props.cumulativeFullAnswers.establishment_trading_name,
            }}
            id="establishment_trading_name"
            hint={[
              "A trading name is what your customers will call your business.",
            ]}
            meta={{
              touched: true,
              error: props.validatorErrors["establishment_trading_name"],
            }}
          >
            What is the trading name of this establishment?
          </InputField>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>

      <ContinueButton {...props} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(EstablishmentTradingName);

EstablishmentTradingName.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string),
};
