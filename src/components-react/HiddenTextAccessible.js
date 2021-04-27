import { Details } from "@slice-and-dice/govuk-react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { withTranslation } from "../../i18n.js";
import InsetText from "./InsetText";

const StyledDiv = styled("div")`
  margin-bottom: 30px;
`;

const HiddenTextAccessible = (props) => {
  return (
    <>
      {props.browser === "IE" || props.browser === "Edge" ? (
        <StyledDiv>
          <InsetText aria-label={props.t("Additional information")}>
            <p className="bold">{props.summary}</p>
            <p>{props.children}</p>
          </InsetText>
        </StyledDiv>
      ) : (
        <StyledDiv>
          <Details
            summary={props.summary}
            mb={0}
            aria-label={props.t("Additional information")}
          >
            {props.children}
          </Details>
        </StyledDiv>
      )}
    </>
  );
};

HiddenTextAccessible.defaultProps = {
  hiddentextindex: 0
};

HiddenTextAccessible.propTypes = {
  hiddentextindex: PropTypes.number
};

export default withTranslation("common")(HiddenTextAccessible);
