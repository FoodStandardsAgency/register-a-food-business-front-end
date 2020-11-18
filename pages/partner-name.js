import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  PartnersTable,
  PartnershipDescription,
  PostForm
} from "../src/components";
import { Heading, Button, HintText } from "govuk-react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { withTranslation } from '../i18n';

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonsRow = (props) => (
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
            {props.t("Add partner")}
          </Button>
        </a>
      </ContentItem.B_30_15>
    ) : null}
    {props.cumulativeFullAnswers.partners &&
    props.cumulativeFullAnswers.partners.length >= 2 ? (
      <PostForm
        action={props.partnerDetailsContinueFormAction}
        csrfToken={props.csrfToken}
      >
        <ContinueButton {...props} />
      </PostForm>
    ) : null}
  </StyledRow>
);

const PartnerName = (props) => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Heading as="h1" size="LARGE">
      {props.t("What are the partners' names?")}
    </Heading>
    <ContentItem.B_30_15>
      <HintText>
        {props.t("Please advise your local authority directly if more than 5 partners are responsible for this food business")}
      </HintText>
    </ContentItem.B_30_15>
    <PartnershipDescription />
    <PostForm
      action={props.partnerDetailsDeleteFormAction}
      csrfToken={props.csrfToken}
    >
      {props.cumulativeFullAnswers.partners &&
      props.cumulativeFullAnswers.partners.length > 0 ? (
        <PartnersTable {...props} />
      ) : null}
    </PostForm>
    <ButtonsRow {...props} />
  </FsaLayout>
);

export default withTranslation('SessionWrapper(PartnerName)')(SessionWrapper(PartnerName));

PartnerName.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
