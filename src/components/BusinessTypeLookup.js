import React from "react";
import dynamic from "next/dynamic";
import ContentItem from "./ContentItem";
import { css } from "emotion";
import {
  findMatches,
  inputValueFunction,
  suggestionFunction,
} from "./BusinessTypeLookupFunctions";
import {
  ErrorText,
  HintText,
  UnorderedList,
  Input,
  Paragraph,
} from "govuk-react";
import { SelectInput } from "@govuk-react/select";
import ListItemConsistentSize from "./ListItemConsistentSize";
import distinctBusinessTypes from "./distinct-business-types.json";

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
  suggestion: suggestionFunction,
};

const lineHeight = {
  lineHeight: "1.6em",
  padding: 0,
};

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

// 26/03/2020 - comment needed due to cloudflare caching next.js files
class BusinessTypeLookup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { renderAutoCompleteSection: false };
  }

  componentDidMount() {
    // called in client-side
    // used to detect if JavaScript is enabled
    this.setState({ renderAutoCompleteSection: true });
  }

  render() {
    const props = this.props;
    return (
      <div>
        {this.state && this.state.renderAutoCompleteSection ? (
          <div id="autocompleteSection">
            <Paragraph>
              Search with your own keywords and then select the most fitting
              business type from the suggestions
            </Paragraph>
            <ContentItem.B_30_15>
              <HintText>
                For example
                <UnorderedList>
                  <ListItemConsistentSize>cafe</ListItemConsistentSize>
                  <ListItemConsistentSize>
                    food delivery service
                  </ListItemConsistentSize>
                  <ListItemConsistentSize>
                    commercial bakery
                  </ListItemConsistentSize>
                  <ListItemConsistentSize>
                    meat product manufacturer
                  </ListItemConsistentSize>
                </UnorderedList>
              </HintText>
            </ContentItem.B_30_15>
            <div
              id="autocompleteContainer"
              className={
                props.validatorErrors.business_type
                  ? autocompleteErrorStyling
                  : null
              }
            >
              {props.validatorErrors.business_type ? (
                <ErrorText style={lineHeight}>
                  {props.validatorErrors.business_type}
                </ErrorText>
              ) : null}
              <div aria-label="business type autocomplete, type and then choose from results">
                <Autocomplete
                  source={findMatches}
                  templates={templates}
                  autoselect={false}
                  displayMenu="inline"
                  confirmOnBlur={false}
                  name="business_type"
                  defaultValue={props.cumulativeFullAnswers.business_type}
                />
              </div>
            </div>
          </div>
        ) : (
          <noscript id="jsDisabledSection">
            {props.browser === "Safari" ? (
              <SelectListSection {...props} />
            ) : (
              <DataListSection {...props} />
            )}
          </noscript>
        )}
      </div>
    );
  }
}

export default BusinessTypeLookup;
