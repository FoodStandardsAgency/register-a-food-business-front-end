import { Details } from "govuk-react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const StyledDiv = styled("div")`
  margin-bottom: 30px;
`;

const HiddenTextAccessible = (props) => (
  <StyledDiv>
    <Details summary={props.summary} mb={0} aria-label="Additional information">
      {props.children}
    </Details>
  </StyledDiv>
);

HiddenTextAccessible.defaultProps = {
  hiddentextindex: 0
};

HiddenTextAccessible.propTypes = {
  hiddentextindex: PropTypes.number
};

export default HiddenTextAccessible;
