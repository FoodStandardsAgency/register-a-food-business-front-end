import { css } from "@emotion/core";
import { Input, Label } from "govuk-react";
import distinctBusinessTypes from "./distinct-business-types.json";

const autocompleteErrorStyling = css`
  border-left: 4px solid #b10e1e;
  padding-left: 10px;
  .autocomplete__input {
    border: 3px solid #b10e1e;
  }
`;

const style = {
  width: "100%",
  marginTop: "20px"
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
    <Label style={{ paddingTop: "0px" }}>
      Search and select the most fitting business type from the suggestions
      <div aria-label="business type autocomplete, type and then choose from results">
        <Input
          name="business_type"
          className={
            props.validatorErrors.business_type
              ? autocompleteErrorStyling
              : null
          }
          style={style}
          list="business-types"
        />
        <datalist id="business-types">
          <BusinessTypeOptions />
        </datalist>
      </div>
    </Label>
  </div>
);

export default DataListSection;
