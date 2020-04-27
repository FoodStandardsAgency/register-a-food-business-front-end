import React from "react";
import { Table, Link, Button } from "govuk-react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import ContentItem from "./ContentItem";

const AccessibleChangeCell = (props) => (
    <Table.Cell role="cell" className="partnersTableChangeCell" {...props}>
        {props.children}
    </Table.Cell>
);

const GridRow = styled(Table.Row)`
    display: grid;
    grid-template-columns: 1fr 1fr 120px;
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

const AccessibleTable = (props) => (
    <FsaStyledTable role="table" {...props}>
        {props.children}
    </FsaStyledTable>
);

const AccessibleTableRow = (props) => (
    <GridRow role="row" {...props}>
        {props.children}
    </GridRow>
);

const AccessibleCell = (props) => (
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

const PartnerRows = (props) => {
    let children = [];
    const partners = props.cumulativeFullAnswers.partners;
    const hasGETParams =
        props.partnerDetailsUrl && props.partnerDetailsUrl.indexOf("?") >= 0;

    for (let i = 0; i < partners.length; i++) {
        children.push(
            <AccessibleTableRow key={`partnerRow${i}`} id={`partnerRow${i}`}>
                <AccessibleCell id={`partner${i}`}>
                    {partners[i]}
                </AccessibleCell>
                <AccessibleChangeCell>
                    <Link
                        id={`partner${i}RowChange`}
                        href={`${props.partnerDetailsUrl}${
                            hasGETParams ? "&" : "?"
                        }id=${i}`}
                        aria-label="Change partner name"
                    >
                        Change
                    </Link>
                </AccessibleChangeCell>
                <AccessibleChangeCell>
                    <ContentItem.B_30_15>
                        <Button
                            type="submit"
                            name="index"
                            value={i}
                            id={`deletePartnerButton${i}`}
                        >
                            Delete partner
                        </Button>
                    </ContentItem.B_30_15>
                </AccessibleChangeCell>
            </AccessibleTableRow>
        );
    }
    return children;
};

const TableBody = (props) => (
    <React.Fragment>
        <ColumnHeaders />
        <PartnerRows {...props} />
    </React.Fragment>
);

const PartnersTable = (props) => (
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
