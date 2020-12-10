import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  PostForm
} from "../src/components";
import { Heading, InputField, HintText } from "govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

const OpeningHours = (props) => (
  <FsaLayout {...props}>
    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <BackButton {...props} t={props.t} />
      <ProcessedErrorSummary
        t={props.t}
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
              error: props.validatorErrors.opening_hours_monday
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
            id="opening_hours_tuesday"
            meta={{
              touched: true,
              error: props.validatorErrors.opening_hours_tuesday
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
            id="opening_hours_wednesday"
            meta={{
              touched: true,
              error: props.validatorErrors.opening_hours_wednesday
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
            id="opening_hours_thursday"
            meta={{
              touched: true,
              error: props.validatorErrors.opening_hours_thursday
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
            id="opening_hours_friday"
            meta={{
              touched: true,
              error: props.validatorErrors.opening_hours_friday
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
            id="opening_hours_saturday"
            meta={{
              touched: true,
              error: props.validatorErrors.opening_hours_saturday
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
            id="opening_hours_sunday"
            meta={{
              touched: true,
              error: props.validatorErrors.opening_hours_sunday
            }}
          >
            <Heading as="h4" mb={1} size="MEDIUM">
              {props.t("Sunday")}
            </Heading>
          </InputField>
        </ContentItem.B_20_20>
      ) : null}
      <ContinueButton {...props} t={props.t} />
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
