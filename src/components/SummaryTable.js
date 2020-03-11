import React from "react";
import { Table, Link } from "govuk-react";
import PropTypes from "prop-types";
import * as COLOUR from "govuk-colours";
import moment from "moment";
import styled from "@emotion/styled";
import ContentItem from "./ContentItem";

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
  tr:nth-of-type(2) {
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
            <Link
              id="changeOperatorTypeRow"
              href="/edit/registration-role"
              aria-label="Change operator type"
            >
              Change
            </Link>
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
            <Link
              id="changeOperatorCompanyNameRow"
              href="/edit/operator-company-details"
              aria-label="Change operator company name"
            >
              Change
            </Link>
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
            <Link
              id="changeOperatorCompaniesHouseRow"
              href="/edit/operator-company-details"
              aria-label="Change operator companies house"
            >
              Change
            </Link>
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
            <Link
              id="changeOperatorCharityNameRow"
              href="/edit/operator-charity-details"
              aria-label="Change operator charity name"
            >
              Change
            </Link>
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
            <Link
              id="changeOperatorCharityNumberRow"
              href="/edit/operator-charity-details"
              aria-label="Change operator charity number"
            >
              Change
            </Link>
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
            <Link
              id="changeOperatorNameRow"
              href="/edit/operator-name"
              aria-label="Change operator name"
            >
              Change
            </Link>
          </AccessibleChangeCell>
        )}
      </AccessibleTableRow>
    ) : null}

    {props.operator_address_line_1 ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="operatorAddressRow"
      >
        <AccessibleRowHeader>
          {props.operator_type === "Partnership"
            ? "Partnership contact address"
            : "Operator address"}
        </AccessibleRowHeader>
        <AccessibleCell>
          <div id="operator_address_line_1">
            {props.operator_address_line_1}
          </div>
          <div id="operator_address_line_2">
            {props.operator_address_line_2 || null}
          </div>
          <div id="operator_address_line_3">
            {props.operator_address_line_3 || null}
          </div>
          <div id="operator_town">{props.operator_town}</div>
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
            <Link
              id="changeOperatorContactDetailsRow"
              href="/edit/operator-contact-details"
              aria-label="Change operator contact details"
            >
              Change
            </Link>
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
            <Link
              id="changeOperatorEmailRow"
              href="/edit/operator-contact-details"
              aria-label="Change operator email"
            >
              Change
            </Link>
          </AccessibleChangeCell>
        )}
      </AccessibleTableRow>
    ) : null}

    {props.partners ? (
      <React.Fragment>
        <AccessibleTableRow
          acPage={props.applicationCompletePage}
          id="operatorMainPartnerRow"
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
              <Link
                id="changeOperatorMainPartnerRow"
                href="/edit/main-partnership-contact"
                aria-label="Change main partnership contact"
              >
                Change
              </Link>
            </AccessibleChangeCell>
          )}
        </AccessibleTableRow>
        <AccessibleTableRow
          acPage={props.applicationCompletePage}
          id="operatorPartnersRow"
        >
          <AccessibleRowHeader>Partners</AccessibleRowHeader>
          <AccessibleCell>
            <div>
              {props.partners.map((partner, index) => {
                return <div key={`partner_${index}`}>{partner}</div>;
              })}
            </div>
          </AccessibleCell>
          {props.applicationCompletePage ? null : (
            <AccessibleChangeCell>
              <Link
                id="changeOperatorPartnersRow"
                href="/edit/partner-name"
                aria-label="Change partner details"
              >
                Change
              </Link>
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
            <Link
              id="changeContactRepresentativeRow"
              href="/edit/contact-representative"
              aria-label="Change contact representative"
            >
              Change
            </Link>
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
            <Link
              id="changeEstablishmentTradingNameRow"
              href="/edit/establishment-trading-name"
              aria-label="Change establishment trading name"
            >
              Change
            </Link>
          </AccessibleChangeCell>
        )}
      </AccessibleTableRow>
    ) : null}

    {props.establishment_address_line_1 ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="establishmentAddressRow"
      >
        <AccessibleRowHeader>Establishment address</AccessibleRowHeader>
        <AccessibleCell>
          <div id="establishment_address_line_1">
            {props.establishment_address_line_1}
          </div>
          <div id="establishment_address_line_2">
            {props.establishment_address_line_2 || null}
          </div>
          <div id="establishment_address_line_3">
            {props.establishment_address_line_3 || null}
          </div>
          <div id="establishment_town">{props.establishment_town}</div>
          <div id="establishment_postcode">{props.establishment_postcode}</div>
        </AccessibleCell>
        {props.applicationCompletePage ? null : (
          <AccessibleCell>
            <Link>
              <div />
            </Link>
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
            <Link
              id="changeEstablishmentAddressTypeRow"
              href="/edit/establishment-address-type"
              aria-label="Change establishment address type"
            >
              Change
            </Link>
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
            <Link
              id="changeEstablishmentContactDetailsRow"
              href="/edit/establishment-contact-details"
              aria-label="Change establishment contact details"
            >
              Change
            </Link>
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
            <Link
              id="changeEstablishmentEmailRow"
              href="/edit/establishment-contact-details"
              aria-label="Change establishment email"
            >
              Change
            </Link>
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
            <Link
              id="changeEstablishmentOpeningDateRow"
              href="/edit/establishment-opening-status"
              aria-label="Change establishment opening date"
            >
              Change
            </Link>
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
          <Link
            id="changeEstablishmentOpeningDaysRow"
            href="/edit/opening-days-start"
            aria-label="Change establishment opening days"
          >
            Change
          </Link>
        </AccessibleChangeCell>
      )}
    </AccessibleTableRow>
    {!props.opening_days_irregular ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="establishmentOpeningHoursRow"
      >
        <AccessibleRowHeader>Opening hours</AccessibleRowHeader>
        <AccessibleCell>
          <div>
            {props.opening_hours_monday ? (
              <div id="opening_hours_monday">
                Monday: {props.opening_hours_monday}
              </div>
            ) : null}
            {props.opening_hours_tuesday ? (
              <div id="opening_hours_tuesday">
                Tuesday: {props.opening_hours_tuesday}
              </div>
            ) : null}
            {props.opening_hours_wednesday ? (
              <div id="opening_hours_wednesday">
                Wednesday: {props.opening_hours_wednesday}
              </div>
            ) : null}
            {props.opening_hours_thursday ? (
              <div id="opening_hours_thursday">
                Thursday: {props.opening_hours_thursday}
              </div>
            ) : null}
            {props.opening_hours_friday ? (
              <div id="opening_hours_friday">
                Friday: {props.opening_hours_friday}
              </div>
            ) : null}
            {props.opening_hours_saturday ? (
              <div id="opening_hours_saturday">
                Saturday: {props.opening_hours_saturday}
              </div>
            ) : null}
            {props.opening_hours_sunday ? (
              <div id="opening_hours_sunday">
                Sunday: {props.opening_hours_sunday}
              </div>
            ) : null}
          </div>
        </AccessibleCell>
        {props.applicationCompletePage ? null : (
          <AccessibleChangeCell>
            <Link
              id="changeEstablishmentOpeningHoursRow"
              href="/edit/opening-hours"
              aria-label="Change establishment opening hours"
            >
              Change
            </Link>
          </AccessibleChangeCell>
        )}
      </AccessibleTableRow>
    ) : null}
    {props.water_supply ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="waterSupplyRow"
      >
        <AccessibleRowHeader>Water supply</AccessibleRowHeader>
        <AccessibleCell id="water_supply">{props.water_supply}</AccessibleCell>
        {props.applicationCompletePage ? null : (
          <AccessibleChangeCell>
            <Link
              id="changeWaterSupplyRow"
              href="/edit/business-water-supply"
              aria-label="Change water supply"
            >
              Change
            </Link>
          </AccessibleChangeCell>
        )}
      </AccessibleTableRow>
    ) : null}
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
            <Link
              id="changeActivitiesCustomersRow"
              href="/edit/customer-type"
              aria-label="Change activities customer type"
            >
              Change
            </Link>
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
            <Link
              id="changeBusinessTypeRow"
              href="/edit/business-type"
              aria-label="Change business type"
            >
              Change
            </Link>
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
            <Link
              id="changeActivitiesBusinessImportExportRow"
              href="/edit/business-import-export"
              aria-label="Change business activities import export"
            >
              Change
            </Link>
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
            <Link
              id="changeBusinessOtherDetailsRow"
              href="/edit/business-other-details"
              aria-label="Change business other details"
            >
              Change
            </Link>
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
    {props.feedback1 ? (
      <AccessibleTableRow
        acPage={props.applicationCompletePage}
        id="feedback1Row"
      >
        <AccessibleRowHeader>
          <span id="feedback1">{props.feedback1}</span>
        </AccessibleRowHeader>
        <AccessibleCell>Accepted</AccessibleCell>
      </AccessibleTableRow>
    ) : null}
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
  operator_address_line_1: PropTypes.string,
  operator_address_line_2: PropTypes.string,
  operator_address_line_3: PropTypes.string,
  operator_town: PropTypes.string,
  operator_postcode: PropTypes.string,
  operator_first_name: PropTypes.string,
  operator_last_name: PropTypes.string,
  registration_role: PropTypes.string,
  establishment_trading_name: PropTypes.string,
  establishment_address_line_1: PropTypes.string,
  establishment_address_line_2: PropTypes.string,
  establishment_address_line_3: PropTypes.string,
  establishment_town: PropTypes.string,
  establishment_postcode: PropTypes.string,
  customer_type: PropTypes.string,
  import_export_activities: PropTypes.string
};
