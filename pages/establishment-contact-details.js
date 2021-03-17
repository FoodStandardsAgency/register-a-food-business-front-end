import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  HiddenTextAccessible,
  PostForm
} from "../src/components";
import { operatorTypeEnum } from "@slice-and-dice/register-a-food-business-validation";
import {
  Heading,
  InputField,
  Paragraph,
  Button,
  InsetText,
  Table
} from "@slice-and-dice/govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";
import styled from "@emotion/styled";

const GridRow = styled(Table.Row)`
  display: grid;
  ${(props) =>
    props.acPage
      ? "grid-template-columns: 1fr 1fr;"
      : "grid-template-columns: 1fr 1fr 70px;"};
`;

const TableCellBold = styled(Table.Cell)`
  font-weight: bold;
`;

const AccessibleTableRow = (props) => (
  <GridRow role="row" {...props}>
    {props.children}
  </GridRow>
);

const AccessibleRowHeader = (props) => (
  <Table.CellHeader scope="row" role="rowheader" {...props}>
    {props.children}
  </Table.CellHeader>
);

const AccessibleCell = (props) => (
  <TableCellBold role="cell" className="summaryTableDataCell" {...props}>
    {props.children}
  </TableCellBold>
);

const EstablishmentContactDetails = (props) => (
  <FsaLayout {...props}>
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Heading as="h1" size="LARGE">
      {props.t("Establishment contact details")}
    </Heading>
    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <InsetText>
        <Table>
          <AccessibleTableRow>
            <AccessibleRowHeader style={{ color: "grey" }}>
              {props.t(
                `${
                  props.cumulativeFullAnswers.registration_role ===
                  operatorTypeEnum.PARTNERSHIP.key
                    ? "Partnership"
                    : "Operator"
                } contact details`
              )}
            </AccessibleRowHeader>
          </AccessibleTableRow>
          <AccessibleTableRow>
            <AccessibleRowHeader style={{ color: "grey" }}>
              {props.t("Main phone number")}
            </AccessibleRowHeader>
            <AccessibleCell style={{ color: "grey" }}>
              <div id="operator_primary_number">
                {props.cumulativeFullAnswers.operator_primary_number
                  ? props.cumulativeFullAnswers.operator_primary_number
                  : props.cumulativeFullAnswers.contact_representative_number}
              </div>
            </AccessibleCell>
          </AccessibleTableRow>

          {props.cumulativeFullAnswers.operator_secondary_number ? (
            <AccessibleTableRow>
              <AccessibleRowHeader style={{ color: "grey" }}>
                {props.t("Secondary phone number")}
              </AccessibleRowHeader>
              <AccessibleCell style={{ color: "grey" }}>
                <div id="operator_secondary_number">
                  {props.cumulativeFullAnswers.operator_secondary_number}
                </div>
              </AccessibleCell>
            </AccessibleTableRow>
          ) : null}

          <AccessibleTableRow>
            <AccessibleRowHeader style={{ color: "grey" }}>
              {props.t("Email address")}
            </AccessibleRowHeader>
            <AccessibleCell style={{ color: "grey" }}>
              <div id="operator_email_address">
                {props.cumulativeFullAnswers.operator_email
                  ? props.cumulativeFullAnswers.operator_email
                  : props.cumulativeFullAnswers.contact_representative_email}
              </div>
            </AccessibleCell>
          </AccessibleTableRow>
        </Table>
        <Button
          type="submit"
          formAction="/switches/reuseOperatorContactDetails/on/establishment-contact-details#establishment_primary_number"
          id="reuseButton"
        >
          {props.t(
            `Re-use ${
              props.cumulativeFullAnswers.registration_role ===
              operatorTypeEnum.PARTNERSHIP.key
                ? "partnership"
                : "operator"
            } contact details`
          )}
        </Button>
      </InsetText>

      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "establishment_primary_number",
              defaultValue: props.switches.reuseOperatorContactDetails
                ? props.cumulativeFullAnswers.operator_primary_number ||
                  props.cumulativeFullAnswers.contact_representative_number
                : props.cumulativeFullAnswers.establishment_primary_number,
              autoComplete: "tel"
            }}
            errorPrefix={`${props.t("Error")}: `}
            id="establishment_primary_number"
            meta={{
              touched: true,
              error: props.t(
                props.validatorErrors["establishment_primary_number"]
              )
            }}
          >
            {props.t("Establishment main phone number")}
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "establishment_secondary_number",
              defaultValue: props.switches.reuseOperatorContactDetails
                ? props.cumulativeFullAnswers.operator_secondary_number
                : props.cumulativeFullAnswers.establishment_secondary_number,
              autoComplete: "off"
            }}
            errorPrefix={`${props.t("Error")}: `}
            id="establishment_secondary_number"
            meta={{
              touched: true,
              error: props.t(
                props.validatorErrors["establishment_secondary_number"]
              )
            }}
          >
            {props.t("Establishment secondary phone number (optional)")}
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "establishment_email",
              defaultValue: props.switches.reuseOperatorContactDetails
                ? props.cumulativeFullAnswers.operator_email ||
                  props.cumulativeFullAnswers.contact_representative_email
                : props.cumulativeFullAnswers.establishment_email,
              autoComplete: "email"
            }}
            errorPrefix={`${props.t("Error")}: `}
            id="establishment_email"
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.establishment_email)
            }}
          >
            {props.t("Establishment email address")}
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "establishment_web_address",
              defaultValue: props.cumulativeFullAnswers.web_address,
              autoComplete: "off"
            }}
            errorPrefix={`${props.t("Error")}: `}
            id="establishment_web_address"
            meta={{
              touched: true,
              error: props.t(
                props.validatorErrors["establishment_web_address"]
              )
            }}
          >
            {props.t("Web address (optional)")}
          </InputField>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>

      <ContinueButton {...props} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(
  SessionWrapper(EstablishmentContactDetails)
);

EstablishmentContactDetails.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string),
  switches: PropTypes.objectOf(PropTypes.bool)
};
