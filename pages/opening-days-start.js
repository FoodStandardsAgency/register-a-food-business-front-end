import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  HiddenTextAccessible
} from "../src/components";
import { Heading, Radio, MultiChoice, Paragraph } from "govuk-react";
import PropTypes from "prop-types";

const OpeningDaysStart = props => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Heading as="h1" size="LARGE">
      What days will this establishment be open and producing or serving food?
    </Heading>

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
            Irregular days or seasonal
          </Radio>
        </MultiChoice>
      </ContentItem.B_30_15>
      <HiddenTextAccessible summary={"I don't know what days to select"}>
        <Paragraph mb={0}>
          The food business will have irregular opening days if it isn't open
          the same days every week. This could include seasonal establishments
          such as summer ice-cream vendors. It can also include establishments
          which only open for events such as football matches.
        </Paragraph>
      </HiddenTextAccessible>

      <ContinueButton {...props} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(OpeningDaysStart);

OpeningDaysStart.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
