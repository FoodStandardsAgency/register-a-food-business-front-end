import { Button } from "govuk-react";
import { ButtonArrow } from "@govuk-react/icons";
import styled from "@emotion/styled";

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
      ? "Begin registration"
      : props.type === "submit"
      ? "Submit"
      : props.editModeFirstPage
      ? "Save and continue"
      : "Continue"}
  </StyledButton>
);

export default ContinueButton;
