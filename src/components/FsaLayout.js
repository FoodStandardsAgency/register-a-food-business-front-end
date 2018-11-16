import FsaHeader from "./FsaHeader";
import { GridRow, GridCol, Page } from "govuk-react";
import FsaFooter from "./FsaFooter";
import styled from "react-emotion";
import React from "react";
import { MEDIA_QUERIES } from "@govuk-react/constants";

const GridRowZeroMargin = styled(GridRow)`
  margin: 0px;
`;
const GridColZeroPadding = styled(GridCol)`
  ${MEDIA_QUERIES.LARGESCREEN} {
    padding-right: 0px;
    padding-left: 0px;
  }
`;

const FsaLayout = props => (
  <React.Fragment>
    <Page header={<FsaHeader {...props} />}>
      <GridRowZeroMargin>
        <GridColZeroPadding columnTwoThirds>
          {props.children}
        </GridColZeroPadding>
      </GridRowZeroMargin>
    </Page>
    <FsaFooter />
  </React.Fragment>
);

export default FsaLayout;
