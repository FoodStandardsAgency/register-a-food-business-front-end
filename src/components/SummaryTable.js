import React from "react";
import { Table, asAnchor } from "govuk-react";
import PropTypes from "prop-types";
import * as COLOUR from "govuk-colours";
import moment from "moment";
import styled from "react-emotion";
import ContentItem from "./ContentItem";
import roles from "../../pages/helpers/registration-roles";

import {
  FONT_SIZE,
  LINE_HEIGHT,
  MEDIA_QUERIES,
  NTA_LIGHT
} from "@govuk-react/constants";

const StyledTableRow = styled("div")({
  fontFamily: NTA_LIGHT,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  fontWeight: 400,
  display: "inline-flex",
  textTransform: "none",
  fontSize: FONT_SIZE.SIZE_16,
  lineHeight: LINE_HEIGHT.SIZE_16,
  [MEDIA_QUERIES.LARGESCREEN]: {
    fontSize: FONT_SIZE.SIZE_19,
    lineHeight: LINE_HEIGHT.SIZE_19
  },
  color: `${COLOUR.GREY_1}`
});

const GridRow = styled(Table.Row)`
  display: grid;
  ${props =>
    props.acPage
      ? "grid-template-columns: 1fr 1fr;"
      : "grid-template-columns: 1fr 1fr 70px;"};
`;

const FsaStyledTable = styled(Table)`
  tr:nth-child(2) {
    border-top: 1px solid #bfc1c3;
    margin-top: 12px;
  }
`;

const TableCellBold = styled(Table.Cell)`
  font-weight: bold;
`;

const AccessibleTable = props => (
  <FsaStyledTable role="table" {...props}>
    {props.children}
  </FsaStyledTable>
);

const AccessibleTableRow = props => (
  <GridRow role="row" {...props}>
    {props.children}
  </GridRow>
);

const AccessibleRowHeader = props => (
  <Table.CellHeader scope="row" role="rowheader" {...props}>
    {props.children}
  </Table.CellHeader>
);

const AccessibleCell = props => (
  <TableCellBold role="cell" className="summaryTableDataCell" {...props}>
    {props.children}
  </TableCellBold>
);

const AccessibleChangeCell = props => (
  <Table.Cell role="cell" className="summaryTableChangeCell" {...props}>
    {props.children}
  </Table.Cell>
);

const InvisibleRow = styled(Table.Row)`
  color: #ffffff00;
  color: transparent;
  z-index: -1000;
  td,
  th {
    border: none;
    position: absolute;
  }
`;

const ColumnHeaders = () => (
  <InvisibleRow>
    <Table.CellHeader scope="col" role="columnheader">
      The question
    </Table.CellHeader>
    <Table.CellHeader scope="col" role="columnheader">
      Your answer
    </Table.CellHeader>
    <Table.CellHeader scope="col" role="columnheader">
      Change your answer
    </Table.CellHeader>
  </InvisibleRow>
);

const AnchorTag = asAnchor("a");

const OperatorDetailsTable = props => (
  <React.Fragment>
    <ColumnHeaders />
    {props.operator_type ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="operatorTypeRow"
      >
        <AccessibleRowHeader>Operator type</AccessibleRowHeader>
        <AccessibleCell id="operator_type">
          {props.operator_type}
        </AccessibleCell>
        {props.applicationCompletePage ? null : (
          <AccessibleChangeCell>
            <AnchorTag
              id="changeOperatorTypeRow"
              href="/edit/registration-role"
              aria-label="Change operator type"
            >
              Change
            </AnchorTag>
          </AccessibleChangeCell>
        )}
      </AccessibleTableRow>
    ) : null}

    {props.operator_company_name ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="operatorCompanyNameRow"
      >
        <AccessibleRowHeader>Company name</AccessibleRowHeader>
        <AccessibleCell id="operator_company_name">
          {props.operator_company_name}
        </AccessibleCell>
        {props.applicationCompletePage ? null : (
          <AccessibleChangeCell>
            <AnchorTag
              id="changeOperatorCompanyNameRow"
              href="/edit/operator-company-details"
              aria-label="Change operator company name"
            >
              Change
            </AnchorTag>
          </AccessibleChangeCell>
        )}
      </AccessibleTableRow>
    ) : null}

    {props.operator_company_house_number ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="operatorCompaniesHouseRow"
      >
        <AccessibleRowHeader>Company number</AccessibleRowHeader>
        <AccessibleCell id="operator_company_house_number">
          {props.operator_company_house_number}
        </AccessibleCell>
        {props.applicationCompletePage ? null : (
          <AccessibleChangeCell>
            <AnchorTag
              id="changeOperatorCompaniesHouseRow"
              href="/edit/operator-company-details"
              aria-label="Change operator companies house"
            >
              Change
            </AnchorTag>
          </AccessibleChangeCell>
        )}
      </AccessibleTableRow>
    ) : null}

    {props.operator_charity_name ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="operatorCharityNameRow"
      >
        <AccessibleRowHeader>Charity name</AccessibleRowHeader>
        <AccessibleCell id="operator_charity_name">
          {props.operator_charity_name}
        </AccessibleCell>
        {props.applicationCompletePage ? null : (
          <AccessibleChangeCell>
            <AnchorTag
              id="changeOperatorCharityNameRow"
              href="/edit/operator-charity-details"
              aria-label="Change operator charity name"
            >
              Change
            </AnchorTag>
          </AccessibleChangeCell>
        )}
      </AccessibleTableRow>
    ) : null}

    {props.operator_charity_number ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="operatorCharityNumberRow"
      >
        <AccessibleRowHeader>Charity number</AccessibleRowHeader>
        <AccessibleCell id="operator_charity_number">
          {props.operator_charity_number}
        </AccessibleCell>
        {props.applicationCompletePage ? null : (
          <AccessibleChangeCell>
            <AnchorTag
              id="changeOperatorCharityNumberRow"
              href="/edit/operator-charity-details"
              aria-label="Change operator charity number"
            >
              Change
            </AnchorTag>
          </AccessibleChangeCell>
        )}
      </AccessibleTableRow>
    ) : null}

    {props.operator_first_name ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="operatorNameRow"
      >
        <AccessibleRowHeader>Name</AccessibleRowHeader>
        <AccessibleCell>
          <span id="operator_first_name">{props.operator_first_name}</span>{" "}
          <span id="operator_last_name">{props.operator_last_name}</span>
        </AccessibleCell>
        {props.applicationCompletePage ? null : (
          <AccessibleChangeCell>
            <AnchorTag
              id="changeOperatorNameRow"
              href="/edit/operator-name"
              aria-label="Change operator name"
            >
              Change
            </AnchorTag>
          </AccessibleChangeCell>
        )}
      </AccessibleTableRow>
    ) : null}

    {props.operator_first_line ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="operatorAddressRow"
      >
        <AccessibleRowHeader>
          {roles.role(props.operator_type)[2]} address
        </AccessibleRowHeader>
        <AccessibleCell>
          <div id="operator_first_line">{props.operator_first_line}</div>
          <div id="operator_street">{props.operator_street || null}</div>
          <div id="operator_town">{props.operator_town || null}</div>
          <div id="operator_postcode">{props.operator_postcode}</div>
        </AccessibleCell>
        {props.applicationCompletePage ? null : (
          <AccessibleCell>
            <div />
          </AccessibleCell>
        )}
      </AccessibleTableRow>
    ) : null}

    {props.operator_primary_number ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="operatorContactDetailsRow"
      >
        <AccessibleRowHeader>Phone number</AccessibleRowHeader>
        <AccessibleCell>
          <div id="operator_primary_number">
            {props.operator_primary_number}
          </div>
          <div id="operator_secondary_number">
            {props.operator_secondary_number || null}
          </div>
        </AccessibleCell>
        {props.applicationCompletePage ? null : (
          <AccessibleChangeCell>
            <AnchorTag
              id="changeOperatorContactDetailsRow"
              href="/edit/operator-contact-details"
              aria-label="Change operator contact details"
            >
              Change
            </AnchorTag>
          </AccessibleChangeCell>
        )}
      </AccessibleTableRow>
    ) : null}

    {props.operator_email ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="operatorEmailRow"
      >
        <AccessibleRowHeader>Email address</AccessibleRowHeader>
        <AccessibleCell id="operator_email">
          {props.operator_email}
        </AccessibleCell>
        {props.applicationCompletePage ? null : (
          <AccessibleChangeCell>
            <AnchorTag
              id="changeOperatorEmailRow"
              href="/edit/operator-contact-details"
              aria-label="Change operator email"
            >
              Change
            </AnchorTag>
          </AccessibleChangeCell>
        )}
      </AccessibleTableRow>
    ) : null}

    {props.partners ? (
      <React.Fragment>
        <AccessibleTableRow
          acPage={props.applicationCompletePage}
          id="operatorPartnersRow"
        >
          <AccessibleRowHeader>Main partnership contact</AccessibleRowHeader>
          <AccessibleCell>
            <div>
              <div id="main_partnership_contact">
                {props.main_partnership_contact}
              </div>
            </div>
          </AccessibleCell>
          {props.applicationCompletePage ? null : (
            <AccessibleChangeCell>
              <AnchorTag
                id="changeMainPartnershipContact"
                href="/edit/main-partnership-contact"
                aria-label="Change main partnership contact"
              >
                Change
              </AnchorTag>
            </AccessibleChangeCell>
          )}
        </AccessibleTableRow>
        <AccessibleTableRow>
          <AccessibleRowHeader>Partner Names</AccessibleRowHeader>
          <AccessibleCell>
            <div>
              {props.partners.map((partner, index) => {
                return (
                  <div key={`partner_${index}`}>
                    {partner}
                    {props.partners.findIndex(primary => {
                      return primary === props.main_partnership_contact;
                    }) === index
                      ? " (main contact)"
                      : null}
                  </div>
                );
              })}
            </div>
          </AccessibleCell>
          {props.applicationCompletePage ? null : (
            <AccessibleChangeCell>
              <AnchorTag
                id="changeOperatorPartnersRow"
                href="/edit/partner-name"
                aria-label="Change partner details"
              >
                Change
              </AnchorTag>
            </AccessibleChangeCell>
          )}
        </AccessibleTableRow>
      </React.Fragment>
    ) : null}

    {props.contact_representative_email ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="contactRepresentativeRow"
      >
        <AccessibleRowHeader>Designated contact</AccessibleRowHeader>
        <AccessibleCell>
          <StyledTableRow>
            <div id="contact_representative_name">
              {props.contact_representative_name}
            </div>
          </StyledTableRow>
          <StyledTableRow>
            <div id="contact_representative_role">
              {props.contact_representative_role
                ? `\u2000\u2022 ${props.contact_representative_role}`
                : null}
            </div>
          </StyledTableRow>
          <div id="contact_representative_number">
            {props.contact_representative_number}
          </div>
          <div id="contact_representative_email">
            {props.contact_representative_email}
          </div>
        </AccessibleCell>
        {props.applicationCompletePage ? null : (
          <AccessibleChangeCell>
            <AnchorTag
              id="changeContactRepresentativeRow"
              href="/edit/contact-representative"
              aria-label="Change contact representative"
            >
              Change
            </AnchorTag>
          </AccessibleChangeCell>
        )}
      </AccessibleTableRow>
    ) : null}
  </React.Fragment>
);

const EstablishmentDetailsTable = props => (
  <React.Fragment>
    <ColumnHeaders />
    {props.establishment_trading_name ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="establishmentTradingNameRow"
      >
        <AccessibleRowHeader>Trading name</AccessibleRowHeader>
        <AccessibleCell id="establishment_trading_name">
          {props.establishment_trading_name}
        </AccessibleCell>
        {props.applicationCompletePage ? null : (
          <AccessibleChangeCell>
            <AnchorTag
              id="changeEstablishmentTradingNameRow"
              href="/edit/establishment-trading-name"
              aria-label="Change establishment trading name"
            >
              Change
            </AnchorTag>
          </AccessibleChangeCell>
        )}
      </AccessibleTableRow>
    ) : null}

    {props.establishment_first_line ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="establishmentAddressRow"
      >
        <AccessibleRowHeader>Establishment address</AccessibleRowHeader>
        <AccessibleCell>
          <div id="establishment_first_line">
            {props.establishment_first_line}
          </div>
          <div id="establishment_street">
            {props.establishment_street || null}
          </div>
          <div id="establishment_town">{props.establishment_town || null}</div>
          <div id="establishment_postcode">{props.establishment_postcode}</div>
        </AccessibleCell>
        {props.applicationCompletePage ? null : (
          <AccessibleCell>
            <div />
          </AccessibleCell>
        )}
      </AccessibleTableRow>
    ) : null}

    {props.establishment_type ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="establishmentAddressTypeRow"
      >
        <AccessibleRowHeader>Address type</AccessibleRowHeader>
        <AccessibleCell id="establishment_type">
          {props.establishment_type}
        </AccessibleCell>
        {props.applicationCompletePage ? null : (
          <AccessibleChangeCell>
            <AnchorTag
              id="changeEstablishmentAddressTypeRow"
              href="/edit/establishment-address-type"
              aria-label="Change establishment address type"
            >
              Change
            </AnchorTag>
          </AccessibleChangeCell>
        )}
      </AccessibleTableRow>
    ) : null}

    {props.establishment_primary_number ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="establishmentContactDetailsRow"
      >
        <AccessibleRowHeader>Phone number</AccessibleRowHeader>
        <AccessibleCell>
          <div id="establishment_primary_number">
            {props.establishment_primary_number}
          </div>
          <div id="establishment_secondary_number">
            {props.establishment_secondary_number || null}
          </div>
        </AccessibleCell>
        {props.applicationCompletePage ? null : (
          <AccessibleChangeCell>
            <AnchorTag
              id="changeEstablishmentContactDetailsRow"
              href="/edit/establishment-contact-details"
              aria-label="Change establishment contact details"
            >
              Change
            </AnchorTag>
          </AccessibleChangeCell>
        )}
      </AccessibleTableRow>
    ) : null}

    {props.establishment_email ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="establishmentEmailRow"
      >
        <AccessibleRowHeader>Email address</AccessibleRowHeader>
        <AccessibleCell id="establishment_email">
          {props.establishment_email}
        </AccessibleCell>
        {props.applicationCompletePage ? null : (
          <AccessibleChangeCell>
            <AnchorTag
              id="changeEstablishmentEmailRow"
              href="/edit/establishment-contact-details"
              aria-label="Change establishment email"
            >
              Change
            </AnchorTag>
          </AccessibleChangeCell>
        )}
      </AccessibleTableRow>
    ) : null}

    {props.establishment_opening_date ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="establishmentOpeningDateRow"
      >
        <AccessibleRowHeader>Trading date</AccessibleRowHeader>
        <AccessibleCell id="establishment_opening_date">
          {moment(props.establishment_opening_date).format("DD MMM YYYY")}
        </AccessibleCell>
        {props.applicationCompletePage ? null : (
          <AccessibleChangeCell>
            <AnchorTag
              id="changeEstablishmentOpeningDateRow"
              href="/edit/establishment-opening-status"
              aria-label="Change establishment opening date"
            >
              Change
            </AnchorTag>
          </AccessibleChangeCell>
        )}
      </AccessibleTableRow>
    ) : null}

    <AccessibleTableRow
      acPage={props.applicationCompletePage}
      id="establishmentOpeningDaysRow"
    >
      <AccessibleRowHeader>Opening days</AccessibleRowHeader>
      <AccessibleCell>
        {props.opening_days_irregular ||
          props.open_some_days_summary_table || (
            <div>
              <div id="opening_day_monday">{props.opening_day_monday}</div>
              <div id="opening_day_tuesday">{props.opening_day_tuesday}</div>
              <div id="opening_day_wednesday">
                {props.opening_day_wednesday}
              </div>
              <div id="opening_day_thursday">{props.opening_day_thursday}</div>
              <div id="opening_day_friday">{props.opening_day_friday}</div>
              <div id="opening_day_saturday">{props.opening_day_saturday}</div>
              <div id="opening_day_sunday">{props.opening_day_sunday}</div>
            </div>
          )}
      </AccessibleCell>
      {props.applicationCompletePage ? null : (
        <AccessibleChangeCell>
          <AnchorTag
            id="changeEstablishmentOpeningDaysRow"
            href="/edit/opening-days-start"
            aria-label="Change establishment opening days"
          >
            Change
          </AnchorTag>
        </AccessibleChangeCell>
      )}
    </AccessibleTableRow>
  </React.Fragment>
);

const FoodActivitiesTable = props => (
  <React.Fragment>
    <ColumnHeaders />
    {props.customer_type ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="activitiesCustomersRow"
      >
        <AccessibleRowHeader>Customers</AccessibleRowHeader>
        <AccessibleCell id="customer_type">
          {props.customer_type}
        </AccessibleCell>
        {props.applicationCompletePage ? null : (
          <AccessibleChangeCell>
            <AnchorTag
              id="changeActivitiesCustomersRow"
              href="/edit/customer-type"
              aria-label="Change activities customer type"
            >
              Change
            </AnchorTag>
          </AccessibleChangeCell>
        )}
      </AccessibleTableRow>
    ) : null}

    {props.business_type ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="businessTypeRow"
      >
        <AccessibleRowHeader>Business type</AccessibleRowHeader>
        <AccessibleCell id="business_type">
          {props.business_type}
        </AccessibleCell>
        {props.applicationCompletePage ? null : (
          <AccessibleChangeCell>
            <AnchorTag
              id="changeBusinessTypeRow"
              href="/edit/business-type"
              aria-label="Change business type"
            >
              Change
            </AnchorTag>
          </AccessibleChangeCell>
        )}
      </AccessibleTableRow>
    ) : null}

    {props.import_export_activities ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="activitiesBusinessImportExportRow"
      >
        <AccessibleRowHeader>Import and export</AccessibleRowHeader>
        <AccessibleCell id="import_export_activities">
          {props.import_export_activities}
        </AccessibleCell>
        {props.applicationCompletePage ? null : (
          <AccessibleChangeCell>
            <AnchorTag
              id="changeActivitiesBusinessImportExportRow"
              href="/edit/business-import-export"
              aria-label="Change business activities import export"
            >
              Change
            </AnchorTag>
          </AccessibleChangeCell>
        )}
      </AccessibleTableRow>
    ) : null}

    {props.business_other_details ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="businessOtherDetailsRow"
      >
        <AccessibleRowHeader>Additional details</AccessibleRowHeader>
        <AccessibleCell id="business_other_details">
          {props.business_other_details}
        </AccessibleCell>
        {props.applicationCompletePage ? null : (
          <AccessibleChangeCell>
            <AnchorTag
              id="changeBusinessOtherDetailsRow"
              href="/edit/business-other-details"
              aria-label="Change business other details"
            >
              Change
            </AnchorTag>
          </AccessibleChangeCell>
        )}
      </AccessibleTableRow>
    ) : null}
  </React.Fragment>
);

const DeclarationTable = props => (
  <React.Fragment>
    <ColumnHeaders />
    <AccessibleTableRow
      acPage={props.applicationCompletePage}
      id="declaration1Row"
    >
      <AccessibleRowHeader>
        <span id="declaration1">{props.declaration1}</span>
      </AccessibleRowHeader>
      <AccessibleCell>Accepted</AccessibleCell>
    </AccessibleTableRow>

    <AccessibleTableRow
      acPage={props.applicationCompletePage}
      id="declaration2Row"
    >
      <AccessibleRowHeader>
        <span id="declaration2">{props.declaration2}</span>
      </AccessibleRowHeader>
      <AccessibleCell>Accepted</AccessibleCell>
    </AccessibleTableRow>

    <AccessibleTableRow
      acPage={props.applicationCompletePage}
      id="declaration3Row"
    >
      <AccessibleRowHeader>
        <span id="declaration3">{props.declaration3}</span>
      </AccessibleRowHeader>
      <AccessibleCell>Accepted</AccessibleCell>
    </AccessibleTableRow>
  </React.Fragment>
);

const SummaryTable = props => (
  <React.Fragment>
    <ContentItem.B_45_30>
      <AccessibleTable
        id="operatorDetailsTable"
        caption="Operator details"
        body={<OperatorDetailsTable {...props} />}
      />
    </ContentItem.B_45_30>
    <ContentItem.B_45_30>
      <AccessibleTable
        id="establishmentDetailsTable"
        caption="Establishment details"
        body={<EstablishmentDetailsTable {...props} />}
      />
    </ContentItem.B_45_30>
    <ContentItem.B_45_30>
      <AccessibleTable
        id="foodActivitiesTable"
        caption="Activities"
        body={<FoodActivitiesTable {...props} />}
      />
    </ContentItem.B_45_30>
    {props.applicationCompletePage ? (
      <ContentItem.B_45_30>
        <AccessibleTable
          id="declarationTable"
          caption="Declaration"
          body={<DeclarationTable {...props} />}
        />
      </ContentItem.B_45_30>
    ) : null}
  </React.Fragment>
);

export default SummaryTable;

SummaryTable.propTypes = {
  operator_company_name: PropTypes.string,
  operator_company_house_number: PropTypes.string,
  operator_charity_name: PropTypes.string,
  operator_charity_number: PropTypes.string,
  operator_first_line: PropTypes.string,
  operator_street: PropTypes.string,
  operator_town: PropTypes.string,
  operator_postcode: PropTypes.string,
  operator_first_name: PropTypes.string,
  operator_last_name: PropTypes.string,
  registration_role: PropTypes.string,
  establishment_trading_name: PropTypes.string,
  establishment_first_line: PropTypes.string,
  establishment_street: PropTypes.string,
  establishment_town: PropTypes.string,
  establishment_postcode: PropTypes.string,
  customer_type: PropTypes.string,
  import_export_activities: PropTypes.string
};
