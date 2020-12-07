import { Button } from "govuk-react";
import { ButtonArrow } from "@govuk-react/icons";
import styled from "@emotion/styled";
import { withTranslation } from "../../i18n.js";

const StyledButton = styled(Button)`
  margin-bottom: 18px;
`;

const ContinueButton = (props) => (
  <StyledButton
    onClick={props.onClick}
    disabled={props.disabled}
    id="continue-button"
    type="submit"
    icon={props.type === "begin" ? <ButtonArrow /> : null}
    start={props.type === "begin"}
  >
    {props.type === "begin"
      ? props.t("Begin registration")
      : props.type === "submit"
      ? props.t("Submit")
      : props.editModeFirstPage
      ? props.t("Save and continue")
      : "Continue"}
  </StyledButton>
);

export default withTranslation("common")(ContinueButton);
