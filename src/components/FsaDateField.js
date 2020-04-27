import { DateField } from "govuk-react";
import styled from "@emotion/styled";

const FsaDateField = styled(DateField)`
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type="number"] {
        -moz-appearance: textfield;
    }
`;

export default FsaDateField;
