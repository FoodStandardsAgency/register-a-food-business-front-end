import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton
} from "../src/components";
import { Header, Checkbox, MultiChoice, Paragraph } from "govuk-react";
import PropTypes from "prop-types";

const OpeningSomeDays = props => (
  <FsaLayout {...props}>
    <form
      action={props.formAction}
      method="post"
    >
      <BackButton editModeFirstPage={props.editModeFirstPage} originator="opening-days-some" />
      <Header level={2}>Opening days</Header>
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
            value="Monday"
            defaultChecked={props.cumulativeAnswers.opening_day_monday}
          >
            Monday
          </Checkbox>
          <Checkbox
            name="opening_day_tuesday"
            id="opening_day_tuesday"
            value="Tuesday"
            defaultChecked={props.cumulativeAnswers.opening_day_tuesday}
          >
            Tuesday
          </Checkbox>
          <Checkbox
            name="opening_day_wednesday"
            id="opening_day_wednesday"
            value="Wednesday"
            defaultChecked={props.cumulativeAnswers.opening_day_wednesday}
          >
            Wednesday
          </Checkbox>
          <Checkbox
            name="opening_day_thursday"
            id="opening_day_thursday"
            value="Thursday"
            defaultChecked={props.cumulativeAnswers.opening_day_thursday}
          >
            Thursday
          </Checkbox>
          <Checkbox
            name="opening_day_friday"
            id="opening_day_friday"
            value="Friday"
            defaultChecked={props.cumulativeAnswers.opening_day_friday}
          >
            Friday
          </Checkbox>
          <Checkbox
            name="opening_day_saturday"
            id="opening_day_saturday"
            value="Saturday"
            defaultChecked={props.cumulativeAnswers.opening_day_saturday}
          >
            Saturday
          </Checkbox>
          <Checkbox
            name="opening_day_sunday"
            id="opening_day_sunday"
            value="Sunday"
            defaultChecked={props.cumulativeAnswers.opening_day_sunday}
          >
            Sunday
          </Checkbox>
        </MultiChoice>
      </ContentItem.B_30_15>
      <ContinueButton editModeFirstPage={props.editModeFirstPage} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(OpeningSomeDays);

OpeningSomeDays.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
