import dynamic from "next/dynamic";
import ContentItem from "./ContentItem";
import { css } from "emotion";
import {
  findMatches,
  inputValueFunction,
  suggestionFunction
} from "./BusinessTypeLookupFunctions";
import { ErrorText, HintText } from "govuk-react";

// dynamic import used because Autocomplete component from AlphaGov uses the document object on import.
// Therefore it must be imported on the client side not on the server side.
// TODO JMB: contribute back to the AlphaGov repository to avoid or delay reliance on the document object.
const Autocomplete = dynamic(import("accessible-autocomplete/react"));

const autocompleteErrorStyling = css`
  border-left: 4px solid #b10e1e;
  padding-left: 10px;
  .autocomplete__input {
    border: 3px solid #b10e1e;
  }
`;

const templates = {
  inputValue: inputValueFunction,
  suggestion: suggestionFunction
};

const lineHeight = {
  lineHeight: "1.6em",
  padding: 0
};

const BusinessTypeLookup = props => (
  <div>
    <ContentItem.B_30_15>
      <HintText>
        For example: <br /> Cafe <br /> Food delivery service <br /> Commercial
        bakery <br /> Beef jerky manufacturer
      </HintText>
    </ContentItem.B_30_15>
    <div
      id="autocompleteContainer"
      className={
        props.validatorErrors.business_type ? autocompleteErrorStyling : null
      }
    >
      {props.validatorErrors.business_type ? (
        <ErrorText style={lineHeight}>
          {props.validatorErrors.business_type}
        </ErrorText>
      ) : null}
      <Autocomplete
        source={findMatches}
        templates={templates}
        autoselect={true}
        displayMenu="overlay"
        confirmOnBlur={false}
        name="business_type"
        defaultValue={props.cumulativeFullAnswers.business_type}
      />
    </div>
  </div>
);

export default BusinessTypeLookup;
