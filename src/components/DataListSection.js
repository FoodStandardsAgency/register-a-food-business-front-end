import { css } from "@emotion/core";
import { Input, Paragraph } from "govuk-react";
import distinctBusinessTypes from "./distinct-business-types.json";

const autocompleteErrorStyling = css`
  border-left: 4px solid #b10e1e;
  padding-left: 10px;
  .autocomplete__input {
    border: 3px solid #b10e1e;
  }
`;

const fullWidth = {
  width: "100%",
};

const BusinessTypeOptions = () => {
  let options = [];
  distinctBusinessTypes.forEach((type) => {
    options.push(
      <option key={type} value={type}>
        {type}
      </option>
    );
  });
  return options;
};

const DataListSection = (props) => (
  <div id="dataListSection">
    <Paragraph>
      Search and select the most fitting business type from the suggestions
    </Paragraph>
    <div aria-label="business type autocomplete, type and then choose from results">
      <Input
        name="business_type"
        className={
          props.validatorErrors.business_type ? autocompleteErrorStyling : null
        }
        style={fullWidth}
        list="business-types"
      />
      <datalist id="business-types">
        <BusinessTypeOptions />
      </datalist>
    </div>
  </div>
);

export default DataListSection;
