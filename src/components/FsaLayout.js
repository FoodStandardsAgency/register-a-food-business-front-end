import FsaHeader from "./FsaHeader";
import { GridRow, GridCol, Main } from "govuk-react";
import FsaFooter from "./FsaFooter";

const FsaLayout = props => (
  <div>
    <FsaHeader {...props} />
    <Main>
      <GridRow>
        <GridCol columnTwoThirds>{props.children}</GridCol>
      </GridRow>
    </Main>
    <FsaFooter />
  </div>
);

export default FsaLayout;
