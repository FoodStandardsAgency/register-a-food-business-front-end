import React from "react";
import { Table, asAnchor, Button } from "govuk-react";
import PropTypes from "prop-types";
import * as COLOUR from "govuk-colours";
import styled from "react-emotion";
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

const AccessibleChangeCell = props => (
  <Table.Cell role="cell" className="partnersTableChangeCell" {...props}>
    {props.children}
  </Table.Cell>
);

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
      Partner name
    </Table.CellHeader>
    <Table.CellHeader scope="col" role="columnheader">
      Edit
    </Table.CellHeader>
    <Table.CellHeader scope="col" role="columnheader">
      Remove
    </Table.CellHeader>
  </InvisibleRow>
);

const AnchorTag = asAnchor("a");

const PartnerRows = props => {
  let children = [];
  const partners = props.cumulativeFullAnswers.partners;

  for (let i = 0; i < partners.length; i++) {
    children.push(
      <AccessibleTableRow id="partnerRow">
        <AccessibleCell id={`partner${i}`}>{partners[i]}</AccessibleCell>
        <AccessibleChangeCell>
          <AnchorTag
            id={`partner${i}Row`}
            href={`/partnership/partner-details?id=${i}`}
            aria-label="Change partner name"
          >
            Change
          </AnchorTag>
        </AccessibleChangeCell>
        <AccessibleChangeCell>
          <Button type="submit" name="index" value={i} id="deletePartnerButton">
            Delete partner
          </Button>
        </AccessibleChangeCell>
      </AccessibleTableRow>
    );
  }
  return children;
};

const TableBody = props => (
  <React.Fragment>
    <ColumnHeaders />
    <PartnerRows {...props} />
  </React.Fragment>
);

const PartnersTable = props => (
  <React.Fragment>
    <ContentItem.B_45_30>
      <AccessibleTable
        id="partnersTable"
        caption="Partners"
        body={<TableBody {...props} />}
      />
    </ContentItem.B_45_30>
  </React.Fragment>
);

export default PartnersTable;

PartnersTable.propTypes = {
  partners: PropTypes.array
};
