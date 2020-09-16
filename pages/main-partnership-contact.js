import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  PartnershipDescription,
  PostForm
} from "../src/components";
import { Fieldset, Radio, MultiChoice, HintText } from "govuk-react";
import PropTypes from "prop-types";

const PartnersList = (props) => {
  let list = [];
  const partners = props.cumulativeFullAnswers.partners;

  for (let id in partners) {
    list.push(
      <Radio
        name="main_partnership_contact"
        value={partners[id]}
        id={`partner-${id}`}
        key={id}
        defaultChecked={
          props.cumulativeFullAnswers.main_partnership_contact === partners[id]
        }
      >
        {partners[id]}
      </Radio>
    );
  }
  return list;
};

const PrimaryPartner = (props) => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />

    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <ContentItem.B_45_30>
        <Fieldset>
          <Fieldset.Legend
            size="LARGE"
            isPageHeading
            style={{ marginBottom: "30px" }}
          >
            Who is the main point of contact?
          </Fieldset.Legend>
          <ContentItem.B_30_15>
            <HintText>
              Please select the partner who will be the main point of contact
              for this business
            </HintText>
          </ContentItem.B_30_15>
          <PartnershipDescription />
          <MultiChoice
            label=""
            meta={{
              touched: true,
              error: props.validatorErrors.partner_is_primary
            }}
          >
            <PartnersList {...props} />
          </MultiChoice>
        </Fieldset>
      </ContentItem.B_45_30>

      <ContinueButton {...props} />
    </PostForm>
  </FsaLayout>
);

export default SessionWrapper(PrimaryPartner);

PrimaryPartner.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
