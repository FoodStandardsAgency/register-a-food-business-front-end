import {
  FsaLayout,
  SessionWrapper,
  BackButton,
  ContinueButton,
  ContentItem,
  ProcessedErrorSummary,
  OnHandleErrorClick,
} from "../src/components";
import ListItemConsistentSize from "../src/components/ListItemConsistentSize";
import {
  Heading,
  TextArea,
  HintText,
  Paragraph,
  UnorderedList,
} from "govuk-react";
import PropTypes from "prop-types";

const OtherDaysIrregular = (props) => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Heading as="h1" size="LARGE">
      Opening days
    </Heading>

    <form action={props.formAction} method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <Paragraph mb={3}>
            When will this establishment be open and serving or preparing food?
          </Paragraph>
          <HintText mb={3}>
            For example
            <UnorderedList>
              <ListItemConsistentSize>
                only serving food during December at Christmas markets
              </ListItemConsistentSize>
              <ListItemConsistentSize>
                open at weekends in June and August between 10:00 and 19:00
              </ListItemConsistentSize>
            </UnorderedList>
          </HintText>
          <TextArea
            input={{
              name: "opening_days_irregular",
              defaultValue: props.cumulativeFullAnswers.opening_days_irregular,
              id: "opening_days_irregular",
            }}
            meta={{
              touched: true,
              error: props.validatorErrors.opening_days_irregular,
            }}
          />
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>
      <ContinueButton {...props} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(OtherDaysIrregular);

OtherDaysIrregular.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string),
};
