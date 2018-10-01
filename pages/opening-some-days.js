import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton
} from "../src/components";
import {
  Header,
  Checkbox,
  MultiChoice,
  Paragraph,
  HiddenText,
  HintText
} from "govuk-react";
import PropTypes from "prop-types";

const OpeningSomeDays = props => (
  <FsaLayout {...props}>
    <form
      action={`/continue/opening-some-days/${props.editMode}`}
      method="post"
    >
      <BackButton editMode={props.editMode} originator="opening-some-days" />
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
            error: props.validatorErrors.opening_some_days
          }}
        >
          <Checkbox
            name="monday"
            id="opening_some_days_monday"
            value="Monday"
            defaultChecked={props.cumulativeAnswers.opening_some_days_monday}
          >
            Monday
          </Checkbox>
          <Checkbox
            name="tuesday"
            id="opening_some_days_tuesday"
            value="Tuesday"
            defaultChecked={props.cumulativeAnswers.opening_some_days_tuesday}
          >
            Tuesday
          </Checkbox>
          <Checkbox
            name="wednesday"
            id="opening_some_days_wednesday"
            value="wednesday"
            defaultChecked={props.cumulativeAnswers.opening_some_days_wednesday}
          >
            Wednesday
          </Checkbox>
          <Checkbox
            name="thursday"
            id="opening_some_days_thursday"
            value="Thuesday"
            defaultChecked={props.cumulativeAnswers.opening_some_days_thursday}
          >
            Thursday
          </Checkbox>
          <Checkbox
            name="friday"
            id="opening_some_days_friday"
            value="Friday"
            defaultChecked={props.cumulativeAnswers.opening_some_days_friday}
          >
            Friday
          </Checkbox>
          <Checkbox
            name="saturday"
            id="opening_some_days_saturday"
            value="Saturday"
            defaultChecked={props.cumulativeAnswers.opening_some_days_saturday}
          >
            Saturday
          </Checkbox>
          <Checkbox
            name="sunday"
            id="opening_some_days_sunday"
            value="Sunday"
            defaultChecked={props.cumulativeAnswers.opening_some_days_sunday}
          >
            Sunday
          </Checkbox>
        </MultiChoice>
      </ContentItem.B_30_15>
      <ContinueButton editMode={props.editMode} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(OpeningSomeDays);

OpeningSomeDays.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
