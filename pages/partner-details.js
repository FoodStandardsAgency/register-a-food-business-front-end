import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  PostForm
} from "../src/components";
import { Button, Heading, InputField } from "@slice-and-dice/govuk-react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PartnerDetails = (props) => (
  <FsaLayout {...props} backHref={props.partnerDetailsBackUrl}>
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
      id="partner_name"
    />
    <Heading as="h1" size="LARGE">
      {props.t(
        `${
          props.cumulativeFullAnswers.partners[
            props.cumulativeFullAnswers.targetPartner
          ]
            ? "Edit "
            : "Add "
        }partner's name`
      )}
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
            errorPrefix={`${props.t("Error")}: `}
            id="partner_name"
            meta={{
              touched: true,
              error: props.t(props.validatorErrors["partnerName"])
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
            {props.t(
              `${
                props.cumulativeFullAnswers.partners[
                  props.cumulativeFullAnswers.targetPartner
                ]
                  ? "Save"
                  : "Add"
              } partner`
            )}
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
