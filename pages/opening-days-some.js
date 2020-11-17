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
import { Heading, Checkbox, MultiChoice, Paragraph } from "govuk-react";
import PropTypes from "prop-types";
import { OpeningDaysEnum } from "../src/enums";

const OpeningSomeDays = (props) => (
  <FsaLayout {...props}>
    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <BackButton {...props} />
      <ProcessedErrorSummary
        validatorErrors={props.validatorErrors}
        onHandleErrorClick={OnHandleErrorClick}
      />
      <Heading as="h1" size="LARGE">
        Opening days
      </Heading>
      <Paragraph>
        What days will this establishment be producing or serving food?
      </Paragraph>
      <Paragraph>Select all that apply</Paragraph>
      <ContentItem.B_30_15>
        <MultiChoice
          label=""
          meta={{
            touched: true,
            error: props.validatorErrors.opening_days_some
          }}
        >
          <Checkbox
            name="opening_day_monday"
            id="opening_day_monday"
            value={OpeningDaysEnum.opening_day_monday.value}
            defaultChecked={props.cumulativeFullAnswers.opening_day_monday}
          >
            Monday
          </Checkbox>
          <Checkbox
            name="opening_day_tuesday"
            id="opening_day_tuesday"
            value={OpeningDaysEnum.opening_day_tuesday.value}
            defaultChecked={props.cumulativeFullAnswers.opening_day_tuesday}
          >
            Tuesday
          </Checkbox>
          <Checkbox
            name="opening_day_wednesday"
            id="opening_day_wednesday"
            value={OpeningDaysEnum.opening_day_wednesday.value}
            defaultChecked={props.cumulativeFullAnswers.opening_day_wednesday}
          >
            Wednesday
          </Checkbox>
          <Checkbox
            name="opening_day_thursday"
            id="opening_day_thursday"
            value={OpeningDaysEnum.opening_day_thursday.value}
            defaultChecked={props.cumulativeFullAnswers.opening_day_thursday}
          >
            Thursday
          </Checkbox>
          <Checkbox
            name="opening_day_friday"
            id="opening_day_friday"
            value={OpeningDaysEnum.opening_day_friday.value}
            defaultChecked={props.cumulativeFullAnswers.opening_day_friday}
          >
            Friday
          </Checkbox>
          <Checkbox
            name="opening_day_saturday"
            id="opening_day_saturday"
            value={OpeningDaysEnum.opening_day_saturday.value}
            defaultChecked={props.cumulativeFullAnswers.opening_day_saturday}
          >
            Saturday
          </Checkbox>
          <Checkbox
            name="opening_day_sunday"
            id="opening_day_sunday"
            value={OpeningDaysEnum.opening_day_sunday.value}
            defaultChecked={props.cumulativeFullAnswers.opening_day_sunday}
          >
            Sunday
          </Checkbox>
        </MultiChoice>
      </ContentItem.B_30_15>
      <ContinueButton {...props} />
    </PostForm>
  </FsaLayout>
);

export default SessionWrapper(OpeningSomeDays);

OpeningSomeDays.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
