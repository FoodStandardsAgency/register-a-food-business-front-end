import FsaHeader from "./FsaHeader";
import MEDIA_QUERIES from "./media-queries";
import { GridRow, GridCol, Page } from "govuk-react";
import FsaFooter from "./FsaFooter";
import styled from "react-emotion";
import React from "react";

const GridRowZeroMargin = styled(GridRow)`
  margin: 0px;
`;

const GridColMedia = styled(GridCol)`
  ${MEDIA_QUERIES.LARGE} {
    padding-right: 0px;
    padding-left: 0px;
  }
  ${MEDIA_QUERIES.EXTRA_LARGE} {
    width: 66.6%;
    flex-shrink: 0;
    flex-grow: 0;
  }
`;

const FsaLayout = props => (
  <React.Fragment>
    <Page header={<FsaHeader {...props} />}>
      <GridRowZeroMargin>
        <GridColMedia>{props.children}</GridColMedia>
      </GridRowZeroMargin>
    </Page>
    <FsaFooter />
  </React.Fragment>
);

export default FsaLayout;
