import dynamic from "next/dynamic";
import "accessible-autocomplete/dist/accessible-autocomplete.min.css";
import "./BusinessTypeLookup.css";

import {
  findMatches,
  inputValueFunction,
  suggestionFunction
} from "./BusinessTypeLookupFunctions";

import { ErrorText, HintText } from "govuk-react";

const Autocomplete = dynamic(import("accessible-autocomplete/react"));

const templates = {
  inputValue: inputValueFunction,
  suggestion: suggestionFunction
};

const lineHeight = {
  lineHeight: "1.6em",
  padding: 0
};

const BusinessTypeLookup = props => (
  <div className={props.validatorErrors.business_type ? "errorStyling" : null}>
    <HintText style={lineHeight}>
      For example cafe, hospital canteen or commercial bakery
    </HintText>
    {props.validatorErrors.business_type ? (
      <ErrorText style={lineHeight}>
        {props.validatorErrors.business_type}
      </ErrorText>
    ) : null}
    <Autocomplete
      source={findMatches}
      templates={templates}
      autoselect={true}
      confirmOnBlur={false}
      name="business_type"
      defaultValue={props.cumulativeAnswers.business_type}
    />
  </div>
);

export default BusinessTypeLookup;
