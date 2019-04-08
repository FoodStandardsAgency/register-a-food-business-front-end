import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  HiddenTextAccessible,
  PartnersTable
} from "../src/components";
import { Header, Paragraph, Button } from "govuk-react";
import PropTypes from "prop-types";

const PartnerName = props => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Header level={1} size="LARGE">
      What is the partner's name?
    </Header>
    <HiddenTextAccessible summaryText={"What is a food business partner?"}>
      <Paragraph mb={0}>The partner is the person or people... TODO</Paragraph>
    </HiddenTextAccessible>
    <form action="/partnership/delete-partner" method="post">
      {props.cumulativeFullAnswers.partners ? (
        <PartnersTable {...props} />
      ) : null}
    </form>
    <form action="" method="get">
      {!props.cumulativeFullAnswers.partners ||
      props.cumulativeFullAnswers.partners.length < 5 ? (
        <ContentItem.B_30_15>
          <Button
            type="submit"
            formAction="/partnership/partner-details"
            id="addPartnerButton"
          >
            Add partner
          </Button>
        </ContentItem.B_30_15>
      ) : null}
    </form>
    <form action="/partnership/continue" method="post">
      {props.cumulativeFullAnswers.partners ? (
        props.cumulativeFullAnswers.partners.length >= 2 ? (
          <ContinueButton {...props} />
        ) : null
      ) : null}
    </form>
  </FsaLayout>
);

export default SessionWrapper(PartnerName);

PartnerName.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
