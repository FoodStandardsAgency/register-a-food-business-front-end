import {
  FsaLayout,
  SessionWrapper,
  BackButton,
  ContinueButton,
  ContentItem
} from "../src/components";
import { Header, TextArea, HintText, Paragraph } from "govuk-react";
import PropTypes from "prop-types";

const OtherDaysIrregular = props => (
  <FsaLayout {...props}>
    <BackButton editModePage={props.editModePage} originator="opening-days-irregular" />
    <Header level={2}>Opening days</Header>

    <form
      action={`/continue/opening-days-irregular/${props.editModePage}`}
      method="post"
    >
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <Paragraph mb={0}>
            When will this establishment be open and serving or preparing food?
          </Paragraph>
          <HintText mb={3}>For example:</HintText>
          <HintText mb={3}>
            "Only serving food during December at Christmas markets." <br />
            "Open at weekends from June and August"
          </HintText>
          <TextArea
            input={{
              name: "opening_days_irregular",
              defaultValue: props.cumulativeAnswers.opening_days_irregular,
              id: "opening_days_irregular"
            }}
            meta={{
              touched: true,
              error: props.validatorErrors.opening_days_irregular
            }}
          />
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>
      <ContinueButton editModePage={props.editModePage} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(OtherDaysIrregular);

OtherDaysIrregular.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
