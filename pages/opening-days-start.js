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
import { Fieldset, Radio, MultiChoice, Paragraph } from "@slice-and-dice/govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

const OpeningDaysStart = (props) => (
  <FsaLayout {...props}>
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <ContentItem.B_30_15>
        <Fieldset>
          <Fieldset.Legend
            size="LARGE"
            isPageHeading
            style={{ marginBottom: "30px" }}
          >
            {props.t(
              "What days will this establishment be open and producing or serving food?"
            )}
          </Fieldset.Legend>
          <MultiChoice
            label=""
            language={props.t("en")}
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.opening_days_start)
            }}
          >
            <Radio
              name="opening_days_start"
              value="Every day"
              id="opening_days_start_everyday"
              defaultChecked={
                props.cumulativeFullAnswers.opening_days_start === "Every day"
              }
            >
              {props.t("Every day")}
            </Radio>
            <Radio
              name="opening_days_start"
              value="Some days"
              id="opening_days_start_some_days"
              defaultChecked={
                props.cumulativeFullAnswers.opening_days_start === "Some days"
              }
            >
              {props.t("Some days a week")}
            </Radio>
            <Radio
              name="opening_days_start"
              value="Irregular days"
              id="opening_days_start_irregular_days"
              defaultChecked={
                props.cumulativeFullAnswers.opening_days_start ===
                "Irregular days"
              }
            >
              {props.t("Irregular days or seasonal")}
            </Radio>
          </MultiChoice>
        </Fieldset>
      </ContentItem.B_30_15>
      <HiddenTextAccessible
        summary={props.t("I don't know what days to select")}
        {...props}
      >
        <Paragraph mb={0}>
          {props.t(
            "The food business will have irregular opening days if it isn't open the same days every week. This could include seasonal establishments such as summer ice-cream vendors. It can also include establishments which only open for events such as football matches."
          )}
        </Paragraph>
      </HiddenTextAccessible>

      <ContinueButton {...props} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(SessionWrapper(OpeningDaysStart));

OpeningDaysStart.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
