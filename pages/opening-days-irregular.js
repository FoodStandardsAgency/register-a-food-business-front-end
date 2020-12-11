import {
  FsaLayout,
  SessionWrapper,
  BackButton,
  ContinueButton,
  ContentItem,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  PostForm
} from "../src/components";
import ListItemConsistentSize from "../src/components/ListItemConsistentSize";
import {
  Heading,
  TextArea,
  HintText,
  Paragraph,
  UnorderedList
} from "govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

const OtherDaysIrregular = (props) => (
  <FsaLayout {...props}>
    <BackButton {...props} t={props.t} />
    <ProcessedErrorSummary
      t={props.t}
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Heading as="h1" size="LARGE">
      {props.t("Opening days")}
    </Heading>

    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <TextArea
            input={{
              name: "opening_days_irregular",
              defaultValue: props.cumulativeFullAnswers.opening_days_irregular,
              id: "opening_days_irregular"
            }}
            meta={{
              touched: true,
              error: `${props.t(props.validatorErrors.opening_days_irregular)}`
            }}
          >
            <Paragraph mb={3}>
              {props.t(
                "When will this establishment be open and serving or preparing food?"
              )}
            </Paragraph>
            <HintText mb={3}>
              {props.t("For example")}
              <UnorderedList>
                <ListItemConsistentSize>
                  {props.t(
                    "only serving food during December at Christmas markets"
                  )}
                </ListItemConsistentSize>
                <ListItemConsistentSize>
                  {props.t("open at weekends in June and August")}
                </ListItemConsistentSize>
              </UnorderedList>
            </HintText>
          </TextArea>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>
      <ContinueButton {...props} t={props.t} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(SessionWrapper(OtherDaysIrregular));

OtherDaysIrregular.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
