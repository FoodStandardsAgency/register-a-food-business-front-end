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
        id="opening_hours_monday"
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
            errorPrefix={`${props.t("Error")}: `}
            id="opening_hours_monday"
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.opening_hours_monday)
            }}
          >
            <Heading as="h4" mb={1} size="MEDIUM">
              {props.t("Monday")}
            </Heading>
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
            errorPrefix={`${props.t("Error")}: `}
            id="opening_hours_tuesday"
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.opening_hours_tuesday)
            }}
          >
            <Heading as="h4" mb={1} size="MEDIUM">
              {props.t("Tuesday")}
            </Heading>
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
            errorPrefix={`${props.t("Error")}: `}
            id="opening_hours_wednesday"
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.opening_hours_wednesday)
            }}
          >
            <Heading as="h4" mb={1} size="MEDIUM">
              {props.t("Wednesday")}
            </Heading>
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
            errorPrefix={`${props.t("Error")}: `}
            id="opening_hours_thursday"
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.opening_hours_thursday)
            }}
          >
            <Heading as="h4" mb={1} size="MEDIUM">
              {props.t("Thursday")}
            </Heading>
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
            errorPrefix={`${props.t("Error")}: `}
            id="opening_hours_friday"
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.opening_hours_friday)
            }}
          >
            <Heading as="h4" mb={1} size="MEDIUM">
              {props.t("Friday")}
            </Heading>
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
            errorPrefix={`${props.t("Error")}: `}
            id="opening_hours_saturday"
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.opening_hours_saturday)
            }}
          >
            <Heading as="h4" mb={1} size="MEDIUM">
              {props.t("Saturday")}
            </Heading>
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
            errorPrefix={`${props.t("Error")}: `}
            id="opening_hours_sunday"
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.opening_hours_sunday)
            }}
          >
            <Heading as="h4" mb={1} size="MEDIUM">
              {props.t("Sunday")}
            </Heading>
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
