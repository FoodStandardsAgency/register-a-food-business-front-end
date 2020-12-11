import {
  FsaLayout,
  SessionWrapper,
  BackButton,
  ContinueButton,
  BusinessTypeLookup,
  ContentItem,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  PostForm
} from "../src/components";
import { Heading } from "govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

const BusinessType = (props) => (
  <FsaLayout {...props}>
    <BackButton {...props} t={props.t} />
    <ProcessedErrorSummary
      t={props.t}
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Heading as="h1" size="LARGE">
      {props.t("What kind of food business are you registering?")}
    </Heading>
    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <BusinessTypeLookup id="businessTypeLookup" {...props} t={props.t} />
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>
      <ContinueButton {...props} t={props.t} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(SessionWrapper(BusinessType));

BusinessType.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
