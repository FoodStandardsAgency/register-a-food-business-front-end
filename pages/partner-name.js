import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  PartnersTable,
  PartnershipDescription
} from "../src/components";
import { Header, Button, HintText } from "govuk-react";
import styled from "react-emotion";
import PropTypes from "prop-types";

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonsRow = props => (
  <StyledRow>
    {!props.cumulativeFullAnswers.partners ||
    props.cumulativeFullAnswers.partners.length < 5 ? (
      <ContentItem.B_30_15>
        <a
          id="addPartnerLink"
          href={props.partnerDetailsUrl}
          style={{ textDecoration: "none" }}
        >
          <Button type="submit" id="addPartnerButton">
            Add partner
          </Button>
        </a>
      </ContentItem.B_30_15>
    ) : null}
    {props.cumulativeFullAnswers.partners &&
    props.cumulativeFullAnswers.partners.length >= 2 ? (
      <form action={props.partnerDetailsContinueFormAction} method="post">
        <ContinueButton {...props} />
      </form>
    ) : null}
  </StyledRow>
);

const PartnerName = props => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Header level={1} size="LARGE">
      What are the partners' names?
    </Header>
    <ContentItem.B_30_15>
      <HintText>
        Please advise your local authority directly if more than 5 partners are
        responsible for this food business
      </HintText>
    </ContentItem.B_30_15>
    <PartnershipDescription />
    <form action={props.partnerDetailsDeleteFormAction} method="post">
      {props.cumulativeFullAnswers.partners &&
      props.cumulativeFullAnswers.partners.length > 0 ? (
        <PartnersTable {...props} />
      ) : null}
    </form>
    <ButtonsRow {...props} />
  </FsaLayout>
);

export default SessionWrapper(PartnerName);

PartnerName.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
