import { css } from "@emotion/core";
import { Label } from "@slice-and-dice/govuk-react";
import { SelectInput } from "@slice-and-dice/govuk-react-select";
import { businessTypeEnum } from "@slice-and-dice/register-a-food-business-validation";
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

const BusinessTypeOptions = (props) => {
  let options = [];
  [
    ...new Set(
      Object.keys(businessTypeEnum).map((bt) =>
        props.t(businessTypeEnum[bt].value.en)
      )
    )
  ].forEach((type) => {
    options.push(
      <option key={type} value={type} selected={type==props.cumulativeFullAnswers.business_type ? "selected" : ""}>
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
          <BusinessTypeOptions {...props} />
        </SelectInput>
      </div>
    </Label>
  </div>
);

export default withTranslation("common")(SelectListSection);
