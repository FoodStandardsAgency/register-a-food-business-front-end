import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  PostForm
} from "../src/components";
import { Button, Heading, InputField } from "govuk-react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";
import LanguageChangeButton from "../src/components/LanguageChangeButton";

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PartnerDetails = (props) => (
  <FsaLayout {...props}>
    <LanguageChangeButton />
    <BackButton href={props.partnerDetailsBackUrl} {...props} t={props.t} />
    <ProcessedErrorSummary
      t={props.t}
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Heading as="h1" size="LARGE">
      {props.cumulativeFullAnswers.partners[
        props.cumulativeFullAnswers.targetPartner
      ]
        ? "Edit "
        : "Add "}
      {props.t("partner's name")}
    </Heading>
    <PostForm
      action={props.partnerDetailsSaveFormAction}
      csrfToken={props.csrfToken}
    >
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "partner_name",
              autoComplete: "name",
              defaultValue:
                props.cumulativeFullAnswers.partners[
                  props.cumulativeFullAnswers.targetPartner
                ]
            }}
            id="partner_name"
            meta={{
              touched: true,
              error: `${props.t(props.validatorErrors["partnerName"])}`
            }}
          >
            {props.t("Full name")}
          </InputField>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>
      <StyledRow>
        <ContentItem.B_30_15>
          <Button
            onClick={props.onClick}
            disabled={props.disabled}
            id="continue-button"
            type="submit"
          >
            {props.cumulativeFullAnswers.partners[
              props.cumulativeFullAnswers.targetPartner
            ]
              ? "Save"
              : "Add"}{" "}
            {props.t("partner")}
          </Button>
        </ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <a
            href={props.partnerDetailsBackUrl}
            style={{ textDecoration: "none" }}
          >
            <Button type="button" id="cancelButton">
              {props.t("Cancel")}
            </Button>
          </a>
        </ContentItem.B_30_15>
      </StyledRow>
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(SessionWrapper(PartnerDetails));

PartnerDetails.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.number
    ])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
