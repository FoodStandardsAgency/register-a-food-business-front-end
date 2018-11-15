import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton
} from "../src/components";
import { Header, Radio, MultiChoice, HiddenText, Paragraph } from "govuk-react";
import PropTypes from "prop-types";

const OpeningDaysStart = props => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <Header level={1} size="LARGE">
      What days will this establishment be open and producing or serving food?
    </Header>

    <form action={props.formAction} method="post">
      <ContentItem.B_30_15>
        <MultiChoice
          label=""
          meta={{
            touched: true,
            error: props.validatorErrors.opening_days_start
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
            Every day
          </Radio>
          <Radio
            name="opening_days_start"
            value="Some days"
            id="opening_days_start_some_days"
            defaultChecked={
              props.cumulativeFullAnswers.opening_days_start === "Some days"
            }
          >
            Some days a week
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
            Irregular days
          </Radio>
        </MultiChoice>
      </ContentItem.B_30_15>
      <HiddenText summaryText={"I don't know what days to select"}>
        <Paragraph mb={0}>
          If the food business isn't open the same days every week, then the
          establishment will likely have irregular opening days. This could
          include seasonal establishments such as summer ice-cream vendors, or
          establishments which only open for events such as football matches.
        </Paragraph>
      </HiddenText>

      <ContinueButton {...props} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(OpeningDaysStart);

OpeningDaysStart.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
