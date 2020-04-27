import FsaHeader from "./FsaHeader";
import { GridRow, GridCol, Page } from "govuk-react";
import FsaFooter from "./FsaFooter";
import styled from "@emotion/styled";
import React from "react";
import { MEDIA_QUERIES } from "@govuk-react/constants";
import BrowserUnsupportedBanner from "./BrowserUnsupportedBanner";

const GridRowZeroMargin = styled(GridRow)`
    margin: 0px;
`;
const GridColZeroPadding = styled(GridCol)`
    ${MEDIA_QUERIES.LARGESCREEN} {
        padding-right: 0px;
        padding-left: 0px;
    }
`;

const FsaLayout = (props) => (
    <React.Fragment>
        <Page header={<FsaHeader {...props} />}>
            <GridRowZeroMargin>
                <GridColZeroPadding setWidth="two-thirds">
                    {!props.isBrowserSupported &&
                    props.isBrowserVersionVerified ? (
                        <BrowserUnsupportedBanner
                            browser={props.browser}
                            version={props.browserVersion}
                        />
                    ) : null}
                    {props.children}
                </GridColZeroPadding>
            </GridRowZeroMargin>
        </Page>
        <FsaFooter />
    </React.Fragment>
);

export default FsaLayout;
