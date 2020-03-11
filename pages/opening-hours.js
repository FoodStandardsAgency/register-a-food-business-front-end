import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick
} from "../src/components";
import { Heading, InputField, HintText } from "govuk-react";
import PropTypes from "prop-types";

const OpeningHours = props => (
  <FsaLayout {...props}>
    <form action={props.formAction} method="post">
      <BackButton {...props} />
      <ProcessedErrorSummary
        validatorErrors={props.validatorErrors}
        onHandleErrorClick={OnHandleErrorClick}
      />
      <Heading as="h1" size="LARGE">
        Opening hours
      </Heading>
      <ContentItem.B_30_15>
        <HintText>
          Fill in the expected opening times for this establishment using 24
          hour clocks. For example, 09:30 to 19:00.
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
              Monday
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
              Tuesday
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
              Wednesday
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
              Thursday
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
              Friday
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
              Saturday
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
              Sunday
            </Heading>
          </InputField>
        </ContentItem.B_20_20>
      ) : null}
      <ContinueButton {...props} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(OpeningHours);

OpeningHours.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
