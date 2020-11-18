import { css } from "@emotion/core";
import { Label } from "govuk-react";
import { SelectInput } from "@govuk-react/select";
import distinctBusinessTypes from "./distinct-business-types.json";
import { withTranslation } from "../../i18n.js";

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

const SelectListSection = (props) => (
  <div id="selectListSection">
    <Label style={{ paddingTop: "0px" }}>
      {props.t("Select the most fitting business type from the suggestions")}
      <div
        aria-label={props.t(
          "business type select, click and choose from dropdown"
        )}
      >
        <SelectInput
          name="business_type"
          style={style}
          className={
            props.validatorErrors.business_type
              ? autocompleteErrorStyling
              : null
          }
        >
          <BusinessTypeOptions />
        </SelectInput>
      </div>
    </Label>
  </div>
);

export default withTranslation(SelectListSection);
