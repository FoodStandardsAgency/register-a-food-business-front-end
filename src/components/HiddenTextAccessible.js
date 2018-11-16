import { HiddenText } from "govuk-react";
import PropTypes from "prop-types";
import InvisibleLink from "./InvisibleLink";

const HiddenTextAccessible = props => (
  <HiddenText aria-label="Additional information" {...props}>
    <InvisibleLink href={`#skipAdditionalInfo_${props.hiddentextindex}`}>
      Skip this additional information
    </InvisibleLink>
    {props.children}
    <div
      aria-hidden="true"
      id={`skipAdditionalInfo_${props.hiddentextindex}`}
    />
  </HiddenText>
);

HiddenTextAccessible.defaultProps = {
  hiddentextindex: 0
};

HiddenTextAccessible.propTypes = {
  hiddentextindex: PropTypes.number
};

export default HiddenTextAccessible;
