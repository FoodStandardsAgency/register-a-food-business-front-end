import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  PostForm
} from "../src/components";
import { Heading, Checkbox, MultiChoice, Paragraph } from "govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

const OpeningSomeDays = (props) => (
  <FsaLayout {...props}>
    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <ProcessedErrorSummary
        validatorErrors={props.validatorErrors}
        onHandleErrorClick={OnHandleErrorClick}
      />
      <Heading as="h1" size="LARGE">
        {props.t("Opening days")}
      </Heading>
      <Paragraph>
        {props.t(
          "What days will this establishment be producing or serving food?"
        )}
      </Paragraph>
      <Paragraph>{props.t("Select all that apply")}</Paragraph>
      <ContentItem.B_30_15>
        <MultiChoice
          label=""
          language = {props.t("en")}
          meta={{
            touched: true,
            error: props.t(props.validatorErrors.opening_days_some)
          }}
        >
          <Checkbox
            name="opening_day_monday"
            id="opening_day_monday"
            value="Monday"
            defaultChecked={props.cumulativeFullAnswers.opening_day_monday}
          >
            {props.t("Monday")}
          </Checkbox>
          <Checkbox
            name="opening_day_tuesday"
            id="opening_day_tuesday"
            value="Tuesday"
            defaultChecked={props.cumulativeFullAnswers.opening_day_tuesday}
          >
            {props.t("Tuesday")}
          </Checkbox>
          <Checkbox
            name="opening_day_wednesday"
            id="opening_day_wednesday"
            value="Wednesday"
            defaultChecked={props.cumulativeFullAnswers.opening_day_wednesday}
          >
            {props.t("Wednesday")}
          </Checkbox>
          <Checkbox
            name="opening_day_thursday"
            id="opening_day_thursday"
            value="Thursday"
            defaultChecked={props.cumulativeFullAnswers.opening_day_thursday}
          >
            {props.t("Thursday")}
          </Checkbox>
          <Checkbox
            name="opening_day_friday"
            id="opening_day_friday"
            value="Friday"
            defaultChecked={props.cumulativeFullAnswers.opening_day_friday}
          >
            {props.t("Friday")}
          </Checkbox>
          <Checkbox
            name="opening_day_saturday"
            id="opening_day_saturday"
            value="Saturday"
            defaultChecked={props.cumulativeFullAnswers.opening_day_saturday}
          >
            {props.t("Saturday")}
          </Checkbox>
          <Checkbox
            name="opening_day_sunday"
            id="opening_day_sunday"
            value="Sunday"
            defaultChecked={props.cumulativeFullAnswers.opening_day_sunday}
          >
            {props.t("Sunday")}
          </Checkbox>
        </MultiChoice>
      </ContentItem.B_30_15>
      <ContinueButton {...props} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(SessionWrapper(OpeningSomeDays));

OpeningSomeDays.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
