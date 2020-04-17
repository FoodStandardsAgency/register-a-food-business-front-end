import { css } from "@emotion/core";
import { Paragraph } from "govuk-react";
import { SelectInput } from "@govuk-react/select";
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

const SelectListSection = (props) => (
  <div id="selectListSection">
    <Paragraph>
      Select the most fitting business type from the suggestions
    </Paragraph>
    <div aria-label="business type select, click and choose from dropdown">
      <SelectInput
        name="business_type"
        style={fullWidth}
        className={
          props.validatorErrors.business_type ? autocompleteErrorStyling : null
        }
      >
        <BusinessTypeOptions />
      </SelectInput>
    </div>
  </div>
);

export default SelectListSection;
