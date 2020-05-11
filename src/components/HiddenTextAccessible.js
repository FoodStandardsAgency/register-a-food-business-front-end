import { Details } from "govuk-react";
import PropTypes from "prop-types";
import { ContentItem } from "./";
// import InvisibleLink from "./InvisibleLink";

// IMPORTANT / TODO JMB: The InvisibleLink elements are for accessibility purposes to allow screen reader users
// to skip the (very repetitive) additional information on Internet Explorer, which does not support
// HTML5 summary/details elements. However, this appeared not to work as planned during user testing
// with screen reader (JAWS) users. The TODO is to explore why this did not work, and to resolve.

const HiddenTextAccessible = (props) => (
  <ContentItem.B_30_15>
    <Details summary={`Additional Information`} {...props}>
      {props.children}
    </Details>
  </ContentItem.B_30_15>
);

HiddenTextAccessible.defaultProps = {
  hiddentextindex: 0
};

HiddenTextAccessible.propTypes = {
  hiddentextindex: PropTypes.number
};

export default HiddenTextAccessible;
