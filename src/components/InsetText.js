import styled from "@emotion/styled";
import { InsetText } from "govuk-react";

const StyledInsetText = styled(InsetText)`
  margin: 0px;
  margin-bottom: 30px;
`;

const FSAInsetText = (props) => <StyledInsetText {...props} />;

export default FSAInsetText;
