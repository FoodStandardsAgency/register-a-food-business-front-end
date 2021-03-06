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
import { Heading, InputField, Paragraph } from "@slice-and-dice/govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

const EstablishmentTradingName = (props) => (
  <FsaLayout {...props}>
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Heading as="h1" size="LARGE">
      {props.t("Trading name")}
    </Heading>
    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "establishment_trading_name",
              defaultValue:
                props.cumulativeFullAnswers.establishment_trading_name
            }}
            id="establishment_trading_name"
            hint={props.t(
              "A trading name is what your customers will call your business."
            )}
            errorPrefix={`${props.t("Error")}: `}
            meta={{
              touched: true,
              error: props.t(
                props.validatorErrors["establishment_trading_name"]
              )
            }}
          >
            {props.t("What is the trading name of this establishment?")}
          </InputField>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>

      <ContinueButton {...props} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(
  SessionWrapper(EstablishmentTradingName)
);

EstablishmentTradingName.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
