import { Details } from "govuk-react";
import PropTypes from "prop-types";
import { ContentItem } from "./";

const HiddenTextAccessible = (props) => (
  <ContentItem.B_30_15>
    <Details summary={props.summary} mb={0} aria-label="Additional information">
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
