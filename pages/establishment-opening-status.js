import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  HiddenTextAccessible,
  PostForm
} from "../src/components";
import { Radio, MultiChoice, HintText, Paragraph, Fieldset } from "govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

const EstablishmentOpeningStatus = (props) => (
  <FsaLayout {...props}>
    <BackButton {...props} />
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
            {props.t("Is this establishment already trading?")}
          </Fieldset.Legend>
          <ContentItem.B_30_15>
            <HintText>
              {props.t(
                "It is trading if it is already producing or serving food, or if the new operator has already taken control"
              )}
            </HintText>
          </ContentItem.B_30_15>
          <MultiChoice
            label=""
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.establishment_opening_status)
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
              {props.t("Yes, it is already trading")}
            </Radio>
            <Radio
              name="establishment_opening_status"
              value="Establishment due to trade"
              id="establishment_opening_status_not_trading"
              defaultChecked={
                props.cumulativeFullAnswers.establishment_opening_status ===
                "Establishment due to trade"
              }
            >
              {props.t("No, it is not trading yet")}
            </Radio>
          </MultiChoice>
        </Fieldset>
      </ContentItem.B_45_30>

      <ContinueButton {...props} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(
  SessionWrapper(EstablishmentOpeningStatus)
);

EstablishmentOpeningStatus.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
