import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ProcessedErrorSummary,
  OnHandleErrorClick
} from "../src/components";
import { Button, Header, InputField } from "govuk-react";
import styled from "react-emotion";
import PropTypes from "prop-types";

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PartnerDetails = props => (
  <FsaLayout {...props}>
    <BackButton href={props.partnerDetailsBackUrl} {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Header level={1} size="LARGE">
      {props.cumulativeFullAnswers.partners[
        props.cumulativeFullAnswers.targetPartner
      ]
        ? "Edit "
        : "Add "}
      partner's name
    </Header>
    <form action={props.partnerDetailsSaveFormAction} method="post">
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
              error: props.validatorErrors["partnerName"]
            }}
          >
            Full name
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
            partner
          </Button>
        </ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <a
            href={props.partnerDetailsBackUrl}
            style={{ textDecoration: "none" }}
          >
            <Button type="button" id="cancelButton">
              Cancel
            </Button>
          </a>
        </ContentItem.B_30_15>
      </StyledRow>
    </form>
  </FsaLayout>
);

export default SessionWrapper(PartnerDetails);

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
