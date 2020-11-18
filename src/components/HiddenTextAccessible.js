import { Details } from "govuk-react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { withTranslation } from "../../i18n.js";

const StyledDiv = styled("div")`
  margin-bottom: 30px;
`;

const HiddenTextAccessible = (props) => (
  <StyledDiv>
    <Details
      summary={props.summary}
      mb={0}
      aria-label={props.t("Additional information")}
    >
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

export default withTranslation(HiddenTextAccessible);
