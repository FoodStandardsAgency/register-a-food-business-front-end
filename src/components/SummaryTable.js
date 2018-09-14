import React from "react";
import { Table, Paragraph, asAnchor } from "govuk-react";
import PropTypes from "prop-types";
import * as COLOUR from "govuk-colours";
import moment from "moment";
import styled from "react-emotion";

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

const AnchorTag = asAnchor("a");

const OperatorDetailsTable = props => (
  <React.Fragment>
    {props.applicationCompletePage ? (
      <Table.Row>
        <Table.CellHeader>
          <div />
        </Table.CellHeader>
        <Table.Cell>
          <div />
        </Table.Cell>
      </Table.Row>
    ) : null}

    <Table.Row TITLE>
      <Table.CellHeader>
        <Paragraph mb={0}>**Operator details**</Paragraph>
      </Table.CellHeader>
      <Table.Cell>
        <div />
      </Table.Cell>
      {props.applicationCompletePage ? null : (
        <Table.Cell>
          <div />
        </Table.Cell>
      )}
    </Table.Row>

    {props.operator_type ? (
      <Table.Row id="operatorTypeRow">
        <Table.CellHeader>Operator type</Table.CellHeader>
        <Table.Cell className="summaryTableDataCell">
          <div className="bold" id="operator_type">
            {props.operator_type}
          </div>
        </Table.Cell>
        {props.applicationCompletePage ? null : (
          <Table.Cell>
            <div />
          </Table.Cell>
        )}
      </Table.Row>
    ) : null}

    {props.operator_company_name ? (
      <Table.Row id="operatorCompanyNameRow">
        <Table.CellHeader>Company name</Table.CellHeader>
        <Table.Cell className="summaryTableDataCell">
          <div id="operator_company_name" className="bold">
            {props.operator_company_name}
          </div>
        </Table.Cell>
        {props.applicationCompletePage ? null : (
          <Table.Cell className="summaryTableChangeCell">
            <AnchorTag
              id="changeOperatorCompanyNameRow"
              href="/edit/operator-company-details"
            >
              Change
            </AnchorTag>
          </Table.Cell>
        )}
      </Table.Row>
    ) : null}

    {props.operator_company_house_number ? (
      <Table.Row id="operatorCompaniesHouseRow">
        <Table.CellHeader>Company number</Table.CellHeader>
        <Table.Cell className="summaryTableDataCell">
          <div id="operator_company_house_number" className="bold">
            {props.operator_company_house_number}
          </div>
        </Table.Cell>
        {props.applicationCompletePage ? null : (
          <Table.Cell className="summaryTableChangeCell">
            <AnchorTag
              id="changeOperatorCompaniesHouseRow"
              href="/edit/operator-company-details"
            >
              Change
            </AnchorTag>
          </Table.Cell>
        )}
      </Table.Row>
    ) : null}

    {props.operator_charity_name ? (
      <Table.Row id="operatorCharityNameRow">
        <Table.CellHeader>Charity name</Table.CellHeader>
        <Table.Cell className="summaryTableDataCell">
          <div id="operator_charity_name" className="bold">
            {props.operator_charity_name}
          </div>
        </Table.Cell>
        {props.applicationCompletePage ? null : (
          <Table.Cell className="summaryTableChangeCell">
            <AnchorTag
              id="changeOperatorCharityNameRow"
              href="/edit/operator-charity-details"
            >
              Change
            </AnchorTag>
          </Table.Cell>
        )}
      </Table.Row>
    ) : null}

    {props.operator_charity_number ? (
      <Table.Row id="operatorCharityNumberRow">
        <Table.CellHeader>Charity number</Table.CellHeader>
        <Table.Cell className="summaryTableDataCell">
          <div id="operator_charity_number" className="bold">
            {props.operator_charity_number}
          </div>
        </Table.Cell>
        {props.applicationCompletePage ? null : (
          <Table.Cell className="summaryTableChangeCell">
            <AnchorTag
              id="changeOperatorCharityNumberRow"
              href="/edit/operator-charity-details"
            >
              Change
            </AnchorTag>
          </Table.Cell>
        )}
      </Table.Row>
    ) : null}

    {props.operator_first_name ? (
      <Table.Row id="operatorNameRow">
        <Table.CellHeader>Name</Table.CellHeader>
        <Table.Cell className="summaryTableDataCell">
          <div className="bold">
            <span id="operator_first_name">{props.operator_first_name}</span>{" "}
            <span id="operator_last_name">{props.operator_last_name}</span>
          </div>
        </Table.Cell>
        {props.applicationCompletePage ? null : (
          <Table.Cell className="summaryTableChangeCell">
            <AnchorTag id="changeOperatorNameRow" href="/edit/operator-name">
              Change
            </AnchorTag>
          </Table.Cell>
        )}
      </Table.Row>
    ) : null}

    {props.operator_first_line ? (
      <Table.Row id="operatorAddressRow">
        <Table.CellHeader>Operator address</Table.CellHeader>
        <Table.Cell className="summaryTableDataCell">
          <div className="bold">
            <div id="operator_first_line">{props.operator_first_line}</div>
            <div id="operator_street">{props.operator_street || null}</div>
            <div id="operator_town">{props.operator_town || null}</div>
            <div id="operator_postcode">{props.operator_postcode}</div>
          </div>
        </Table.Cell>
        {props.applicationCompletePage ? null : (
          <Table.Cell>
            <div />
          </Table.Cell>
        )}
      </Table.Row>
    ) : null}

    {props.operator_primary_number ? (
      <Table.Row id="operatorContactDetailsRow">
        <Table.CellHeader>Phone number</Table.CellHeader>
        <Table.Cell className="summaryTableDataCell">
          <div className="bold">
            <div id="operator_primary_number">
              {props.operator_primary_number}
            </div>
            <div id="operator_secondary_number">
              {props.operator_secondary_number || null}
            </div>
          </div>
        </Table.Cell>
        {props.applicationCompletePage ? null : (
          <Table.Cell className="summaryTableChangeCell">
            <AnchorTag
              id="changeOperatorContactDetailsRow"
              href="/edit/operator-contact-details"
            >
              Change
            </AnchorTag>
          </Table.Cell>
        )}
      </Table.Row>
    ) : null}

    {props.operator_email ? (
      <Table.Row id="operatorEmailRow">
        <Table.CellHeader>Email address</Table.CellHeader>
        <Table.Cell className="summaryTableDataCell">
          <div className="bold" id="operator_email">
            {props.operator_email}
          </div>
        </Table.Cell>
        {props.applicationCompletePage ? null : (
          <Table.Cell className="summaryTableChangeCell">
            <AnchorTag
              id="changeOperatorEmailRow"
              href="/edit/operator-contact-details"
            >
              Change
            </AnchorTag>
          </Table.Cell>
        )}
      </Table.Row>
    ) : null}

    {props.contact_representative_email ? (
      <Table.Row id="contactRepresentativeRow">
        <Table.CellHeader>Designated contact</Table.CellHeader>
        <Table.Cell className="summaryTableDataCell">
          <StyledTableRow>
            <div display id="contact_representative_name">
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
          <div className="bold" id="contact_representative_number">
            {props.contact_representative_number}
          </div>
          <div className="bold" id="contact_representative_email">
            {props.contact_representative_email}
          </div>
        </Table.Cell>
        {props.applicationCompletePage ? null : (
          <Table.Cell className="summaryTableChangeCell">
            <AnchorTag
              id="changeContactRepresentativeRow"
              href="/edit/contact-representative"
            >
              Change
            </AnchorTag>
          </Table.Cell>
        )}
      </Table.Row>
    ) : null}
  </React.Fragment>
);

const EstablishmentDetailsTable = props => (
  <React.Fragment>
    <Table.Row TITLE>
      <Table.CellHeader>
        <Paragraph mb={0}>**Establishment details**</Paragraph>
      </Table.CellHeader>
      <Table.Cell>
        <div />
      </Table.Cell>
      {props.applicationCompletePage ? null : (
        <Table.Cell>
          <div />
        </Table.Cell>
      )}
    </Table.Row>

    {props.establishment_trading_name ? (
      <Table.Row id="establishmentTradingNameRow">
        <Table.CellHeader>Trading name</Table.CellHeader>
        <Table.Cell className="summaryTableDataCell">
          <div className="bold" id="establishment_trading_name">
            {props.establishment_trading_name}
          </div>
        </Table.Cell>
        {props.applicationCompletePage ? null : (
          <Table.Cell className="summaryTableChangeCell">
            <AnchorTag
              id="changeEstablishmentTradingNameRow"
              href="/edit/establishment-trading-name"
            >
              Change
            </AnchorTag>
          </Table.Cell>
        )}
      </Table.Row>
    ) : null}

    {props.establishment_first_line ? (
      <Table.Row id="establishmentAddressRow">
        <Table.CellHeader>Establishment address</Table.CellHeader>
        <Table.Cell className="summaryTableDataCell">
          <div className="bold">
            <div id="establishment_first_line">
              {props.establishment_first_line}
            </div>
            <div id="establishment_street">
              {props.establishment_street || null}
            </div>
            <div id="establishment_town">
              {props.establishment_town || null}
            </div>
            <div id="establishment_postcode">
              {props.establishment_postcode}
            </div>
          </div>
        </Table.Cell>
        {props.applicationCompletePage ? null : (
          <Table.Cell>
            <div />
          </Table.Cell>
        )}
      </Table.Row>
    ) : null}

    {props.establishment_type ? (
      <Table.Row id="establishmentAddressTypeRow">
        <Table.CellHeader>Address type</Table.CellHeader>
        <Table.Cell className="summaryTableDataCell">
          <div className="bold" id="establishment_type">
            {props.establishment_type}
          </div>
        </Table.Cell>
        {props.applicationCompletePage ? null : (
          <Table.Cell className="summaryTableChangeCell">
            <AnchorTag
              id="changeEstablishmentAddressTypeRow"
              href="/edit/establishment-address-type"
            >
              Change
            </AnchorTag>
          </Table.Cell>
        )}
      </Table.Row>
    ) : null}

    {props.establishment_primary_number ? (
      <Table.Row id="establishmentContactDetailsRow">
        <Table.CellHeader>Phone number</Table.CellHeader>
        <Table.Cell className="summaryTableDataCell">
          <div className="bold">
            <div id="establishment_primary_number">
              {props.establishment_primary_number}
            </div>
            <div id="establishment_secondary_number">
              {props.establishment_secondary_number || null}
            </div>
          </div>
        </Table.Cell>
        {props.applicationCompletePage ? null : (
          <Table.Cell className="summaryTableChangeCell">
            <AnchorTag
              id="changeEstablishmentContactDetailsRow"
              href="/edit/establishment-contact-details"
            >
              Change
            </AnchorTag>
          </Table.Cell>
        )}
      </Table.Row>
    ) : null}

    {props.establishment_email ? (
      <Table.Row id="establishmentEmailRow">
        <Table.CellHeader>Email address</Table.CellHeader>
        <Table.Cell className="summaryTableDataCell">
          <div className="bold" id="establishment_email">
            {props.establishment_email}
          </div>
        </Table.Cell>
        {props.applicationCompletePage ? null : (
          <Table.Cell className="summaryTableChangeCell">
            <AnchorTag
              id="changeEstablishmentEmailRow"
              href="/edit/establishment-contact-details"
            >
              Change
            </AnchorTag>
          </Table.Cell>
        )}
      </Table.Row>
    ) : null}

    {props.establishment_opening_date ? (
      <Table.Row id="establishmentOpeningDateRow">
        <Table.CellHeader>Trading date</Table.CellHeader>
        <Table.Cell className="summaryTableDataCell">
          <div className="bold" id="establishment_opening_date">
            {moment(props.establishment_opening_date).format("DD MMM YYYY")}
          </div>
        </Table.Cell>
        {props.applicationCompletePage ? null : (
          <Table.Cell>
            <div />
          </Table.Cell>
        )}
      </Table.Row>
    ) : null}
  </React.Fragment>
);

const FoodActivitiesTable = props => (
  <React.Fragment>
    <Table.Row TITLE>
      <Table.CellHeader>
        <Paragraph mb={0}>**Activities**</Paragraph>
      </Table.CellHeader>
      <Table.Cell>
        <div />
      </Table.Cell>
      {props.applicationCompletePage ? null : (
        <Table.Cell>
          <div />
        </Table.Cell>
      )}
    </Table.Row>

    {props.customer_type ? (
      <Table.Row id="activitiesCustomersRow">
        <Table.CellHeader>Customers</Table.CellHeader>
        <Table.Cell className="summaryTableDataCell">
          <div className="bold" id="customer_type">
            {props.customer_type}
          </div>
        </Table.Cell>
        {props.applicationCompletePage ? null : (
          <Table.Cell className="summaryTableChangeCell">
            <AnchorTag
              id="changeActivitiesCustomersRow"
              href="/edit/customer-type"
            >
              Change
            </AnchorTag>
          </Table.Cell>
        )}
      </Table.Row>
    ) : null}

    {props.business_type ? (
      <Table.Row id="businessTypeRow">
        <Table.CellHeader>Business type</Table.CellHeader>
        <Table.Cell className="summaryTableDataCell">
          <div className="bold" id="business_type">
            {props.business_type}
          </div>
          {/* TODO JMB: uncomment the below if user testing shows that displaying the search term is beneficial */}
          {/* {props.business_type_search_term ? (
            <div
              style={{ fontSize: "0.8em", color: "#6f777b" }}
              id="business_type_search_term"
            >
              {props.business_type_search_term}
            </div>
          ) : null} */}
        </Table.Cell>
        {props.applicationCompletePage ? null : (
          <Table.Cell className="summaryTableChangeCell">
            <AnchorTag id="changeBusinessTypeRow" href="/edit/business-type">
              Change
            </AnchorTag>
          </Table.Cell>
        )}
      </Table.Row>
    ) : null}

    {props.import_export_activities ? (
      <Table.Row id="activitiesBusinessImportExportRow">
        <Table.CellHeader>Import and export</Table.CellHeader>
        <Table.Cell className="summaryTableDataCell">
          <div className="bold" id="import_export_activities">
            {props.import_export_activities}
          </div>
        </Table.Cell>
        {props.applicationCompletePage ? null : (
          <Table.Cell className="summaryTableChangeCell">
            <AnchorTag
              id="changeActivitiesBusinessImportExportRow"
              href="/edit/business-import-export"
            >
              Change
            </AnchorTag>
          </Table.Cell>
        )}
      </Table.Row>
    ) : null}

    {props.business_other_details ? (
      <Table.Row id="businessOtherDetailsRow">
        <Table.CellHeader>Additional details</Table.CellHeader>
        <Table.Cell className="summaryTableDataCell">
          <div className="bold" id="business_other_details">
            {props.business_other_details}
          </div>
        </Table.Cell>
        {props.applicationCompletePage ? null : (
          <Table.Cell className="summaryTableChangeCell">
            <AnchorTag
              id="changeBusinessOtherDetailsRow"
              href="/edit/business_other_details"
            >
              Change
            </AnchorTag>
          </Table.Cell>
        )}
      </Table.Row>
    ) : null}
  </React.Fragment>
);

const DeclarationTable = props => (
  <React.Fragment>
    <Table.Row TITLE>
      <Table.CellHeader>
        <Paragraph mb={0}>**Declaration**</Paragraph>
      </Table.CellHeader>
      <Table.Cell>
        <div />
      </Table.Cell>
    </Table.Row>

    <Table.Row id="declaration1Row">
      <Table.CellHeader>
        <span id="declaration1">{props.declaration1}</span>
      </Table.CellHeader>
      <Table.Cell className="summaryTableDataCell">
        <div className="bold">Accepted</div>
      </Table.Cell>
    </Table.Row>

    <Table.Row id="declaration2Row">
      <Table.CellHeader>
        <span id="declaration2">{props.declaration2}</span>
      </Table.CellHeader>
      <Table.Cell className="summaryTableDataCell">
        <div className="bold">Accepted</div>
      </Table.Cell>
    </Table.Row>

    <Table.Row id="declaration3Row">
      <Table.CellHeader>
        <span id="declaration3">{props.declaration3}</span>
      </Table.CellHeader>
      <Table.Cell className="summaryTableDataCell">
        <div className="bold">Accepted</div>
      </Table.Cell>
    </Table.Row>
  </React.Fragment>
);

const SummaryTable = props => (
  <Table
    body={
      <React.Fragment>
        <OperatorDetailsTable {...props} />
        <EstablishmentDetailsTable {...props} />
        <FoodActivitiesTable {...props} />
        {props.applicationCompletePage ? <DeclarationTable {...props} /> : null}
      </React.Fragment>
    }
  />
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
