import styled from "@emotion/styled";

const InvisibleLink = styled("a")`
  position: absolute;
  color: #ffffff00;
  cursor: initial;
  z-index: -1000;
`;

export default InvisibleLink;
