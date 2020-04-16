import styled from "react-emotion";
import { BREAKPOINTS, FONT_SIZE } from "@govuk-react/constants";
import { ListItem } from "govuk-react";

const MediaQueryMobile = `@media only screen and (max-width: ${BREAKPOINTS.LARGESCREEN})`;

const MediaQueryDesktop = `@media only screen and (min-width: ${BREAKPOINTS.LARGESCREEN})`;

const ListItemConsistentSize = styled(ListItem)`
  ${MediaQueryMobile} {
    font-size: ${FONT_SIZE.SIZE_16};
  }
  ${MediaQueryDesktop} {
    font-size: ${FONT_SIZE.SIZE_19};
  }
`;

export default ListItemConsistentSize;
