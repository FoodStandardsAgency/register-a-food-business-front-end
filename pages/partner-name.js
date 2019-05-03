import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  PartnersTable
} from "../src/components";
import { Header, Button, GridRow, GridCol, HintText } from "govuk-react";
import PropTypes from "prop-types";
import PartnershipCommon from "./common/partnership-common";

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
    {PartnershipCommon.whatIsAPartnership()}
    <form action={props.partnerDetailsDeleteFormAction} method="post">
      {props.cumulativeFullAnswers.partners ? (
        <PartnersTable {...props} />
      ) : null}
    </form>
    <GridRow>
      <GridCol>
        {!props.cumulativeFullAnswers.partners ||
        props.cumulativeFullAnswers.partners.length < 5 ? (
          <ContentItem.B_30_15>
            <a
              href={props.partnerDetailsUrl}
              style={{ textDecoration: "none" }}
            >
              <Button type="submit" id="addPartnerButton">
                Add partner
              </Button>
            </a>
          </ContentItem.B_30_15>
        ) : null}
      </GridCol>
      <GridCol>
        <form action={props.partnerDetailsContinueFormAction} method="post">
          {props.cumulativeFullAnswers.partners ? (
            props.cumulativeFullAnswers.partners.length >= 2 ? (
              <ContinueButton {...props} />
            ) : null
          ) : null}
        </form>
      </GridCol>
    </GridRow>
  </FsaLayout>
);

export default SessionWrapper(PartnerName);

PartnerName.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
