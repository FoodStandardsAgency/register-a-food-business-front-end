import {
  FsaLayout,
  SessionWrapper,
  ContinueButton,
  ContentItem,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  PostForm
} from "../src/components";
import { Heading, TextArea } from "@slice-and-dice/govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

const OtherDetails = (props) => (
  <FsaLayout {...props}>
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Heading as="h1" size="LARGE">
      {props.t("Other details")}
    </Heading>

    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <TextArea
            input={{
              name: "business_other_details",
              defaultValue: props.cumulativeFullAnswers.business_other_details,
              id: "business_other_details"
            }}
            errorPrefix={`${props.t("Error")}: `}
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.business_other_details)
            }}
          >
            {props.t(
              "Is there anything else you need to tell us about this establishment? (optional)"
            )}
          </TextArea>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>
      <ContinueButton {...props} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(SessionWrapper(OtherDetails));

OtherDetails.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
