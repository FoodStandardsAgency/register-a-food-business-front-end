import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  PostForm
} from "../src/components";
import { Heading, InputField, HintText } from "@slice-and-dice/govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

const OpeningHours = (props) => (
  <FsaLayout {...props}>
    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <ProcessedErrorSummary
        validatorErrors={props.validatorErrors}
        onHandleErrorClick={OnHandleErrorClick}
      />
      <Heading as="h1" size="LARGE">
        {props.t("Opening hours")}
      </Heading>
      <ContentItem.B_30_15>
        <HintText>
          {props.t(
            "Fill in the expected opening times for this establishment using 24 hour clocks."
          )}
        </HintText>
      </ContentItem.B_30_15>
      {props.cumulativeFullAnswers.opening_days_start === "Every day" ||
      props.cumulativeFullAnswers.opening_day_monday ? (
        <ContentItem.B_20_20>
          <InputField
            input={{
              name: "opening_hours_monday",
              defaultValue: props.cumulativeFullAnswers.opening_hours_monday
            }}
            id="opening_hours_monday"
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.opening_hours_monday)
            }}
            style={{ fontWeight: "bold", fontSize: "24px" }}
          >
            {props.t("Monday")}
          </InputField>
        </ContentItem.B_20_20>
      ) : null}
      {props.cumulativeFullAnswers.opening_days_start === "Every day" ||
      props.cumulativeFullAnswers.opening_day_tuesday ? (
        <ContentItem.B_20_20>
          <InputField
            input={{
              name: "opening_hours_tuesday",
              defaultValue: props.cumulativeFullAnswers.opening_hours_tuesday
            }}
            id="opening_hours_tuesday"
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.opening_hours_tuesday)
            }}
            style={{ fontWeight: "bold", fontSize: "24px" }}
          >
            {props.t("Tuesday")}
          </InputField>
        </ContentItem.B_20_20>
      ) : null}
      {props.cumulativeFullAnswers.opening_days_start === "Every day" ||
      props.cumulativeFullAnswers.opening_day_wednesday ? (
        <ContentItem.B_20_20>
          <InputField
            input={{
              name: "opening_hours_wednesday",
              defaultValue: props.cumulativeFullAnswers.opening_hours_wednesday
            }}
            id="opening_hours_wednesday"
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.opening_hours_wednesday)
            }}
            style={{ fontWeight: "bold", fontSize: "24px" }}
          >
            {props.t("Wednesday")}
          </InputField>
        </ContentItem.B_20_20>
      ) : null}
      {props.cumulativeFullAnswers.opening_days_start === "Every day" ||
      props.cumulativeFullAnswers.opening_day_thursday ? (
        <ContentItem.B_20_20>
          <InputField
            input={{
              name: "opening_hours_thursday",
              defaultValue: props.cumulativeFullAnswers.opening_hours_thursday
            }}
            id="opening_hours_thursday"
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.opening_hours_thursday)
            }}
            style={{ fontWeight: "bold", fontSize: "24px" }}
          >
            {props.t("Thursday")}
          </InputField>
        </ContentItem.B_20_20>
      ) : null}
      {props.cumulativeFullAnswers.opening_days_start === "Every day" ||
      props.cumulativeFullAnswers.opening_day_friday ? (
        <ContentItem.B_20_20>
          <InputField
            input={{
              name: "opening_hours_friday",
              defaultValue: props.cumulativeFullAnswers.opening_hours_friday
            }}
            id="opening_hours_friday"
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.opening_hours_friday)
            }}
            style={{ fontWeight: "bold", fontSize: "24px" }}
          >
            {props.t("Friday")}
          </InputField>
        </ContentItem.B_20_20>
      ) : null}
      {props.cumulativeFullAnswers.opening_days_start === "Every day" ||
      props.cumulativeFullAnswers.opening_day_saturday ? (
        <ContentItem.B_20_20>
          <InputField
            input={{
              name: "opening_hours_saturday",
              defaultValue: props.cumulativeFullAnswers.opening_hours_saturday
            }}
            id="opening_hours_saturday"
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.opening_hours_saturday)
            }}
            style={{ fontWeight: "bold", fontSize: "24px" }}
          >
            {props.t("Saturday")}
          </InputField>
        </ContentItem.B_20_20>
      ) : null}
      {props.cumulativeFullAnswers.opening_days_start === "Every day" ||
      props.cumulativeFullAnswers.opening_day_sunday ? (
        <ContentItem.B_20_20>
          <InputField
            input={{
              name: "opening_hours_sunday",
              defaultValue: props.cumulativeFullAnswers.opening_hours_sunday
            }}
            id="opening_hours_sunday"
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.opening_hours_sunday)
            }}
            style={{ fontWeight: "bold", fontSize: "24px" }}
          >
            {props.t("Sunday")}
          </InputField>
        </ContentItem.B_20_20>
      ) : null}
      <ContinueButton {...props} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(SessionWrapper(OpeningHours));

OpeningHours.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
