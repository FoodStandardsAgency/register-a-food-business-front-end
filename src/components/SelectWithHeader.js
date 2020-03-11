import styled from "@emotion/styled";
import { Select } from "govuk-react";

const SelectWithHeader = styled(Select)`
  span {
    font-size: 24px;
    line-height: 1.25em;
    padding: 0;
    margin: 0;
    margin-bottom: 20px;
    font-weight: bold;
  }
`;

module.exports = SelectWithHeader;
