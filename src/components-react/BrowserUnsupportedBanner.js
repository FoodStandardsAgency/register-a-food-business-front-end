import { WarningText } from "@slice-and-dice/govuk-react";
import styled from "@emotion/styled";
import { withTranslation } from "../../i18n.js";

const StyledWarning = styled(WarningText)`
  border: 3px solid black;
  background-color: #dee0e2;
  padding: 10px 10px;
`;

const WarningWrapper = styled("div")`
  padding-bottom: 20px;
`;

const BrowserUnsupportedBanner = (props) => (
  <WarningWrapper id="warningWrapper">
    <StyledWarning>
      {`${props.t("Your web browser ")}
      ${props.browser} v${props.version}
      ${props.t(
        " is out of date. You may not be able to complete the registration. Update your browser for more security, speed and the best experience on this site."
      )}`}
    </StyledWarning>
  </WarningWrapper>
);

export default withTranslation("common")(BrowserUnsupportedBanner);
