import React from "react";
import ContentItem from "./ContentItem";
import DataListSection from "./DataListSection";
import SelectListSection from "./SelectListSection";
import { css } from "@emotion/core";
import {
  findMatches,
  inputValueFunction,
  suggestionFunction
} from "./BusinessTypeLookupFunctions";
import {
  ErrorText,
  HintText,
  UnorderedList,
  Paragraph,
  Label
} from "govuk-react";
import ListItemConsistentSize from "./ListItemConsistentSize";
import { withTranslation } from "../../i18n.js";
import Autocomplete from "accessible-autocomplete/react";

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

// 05/02/2021 - comment needed due to cloudflare caching next.js files
export class BusinessTypeLookup extends React.Component {
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
        {props.browser === "IE" ? (
          <SelectListSection {...props} />
        ) : (
          <div>
            {this.state && this.state.renderAutoCompleteSection ? (
              <div id="autocompleteSection">
                <Paragraph>
                  {props.t(
                    "Search with your own keywords and then select the most fitting business type from the suggestions"
                  )}
                </Paragraph>
                <ContentItem.B_30_15>
                  <HintText>
                    {props.t("For example")}
                    <UnorderedList>
                      <ListItemConsistentSize>
                        {props.t("cafe")}
                      </ListItemConsistentSize>
                      <ListItemConsistentSize>
                        {props.t("food delivery service")}
                      </ListItemConsistentSize>
                      <ListItemConsistentSize>
                        {props.t("commercial bakery")}
                      </ListItemConsistentSize>
                      <ListItemConsistentSize>
                        {props.t("meat product manufacturer")}
                      </ListItemConsistentSize>
                    </UnorderedList>
                  </HintText>
                </ContentItem.B_30_15>
                <Label>
                  {props.t("Select business type")}
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
                        {props.t(props.validatorErrors.business_type)}
                      </ErrorText>
                    ) : null}
                    <div
                      aria-label={props.t(
                        "business type autocomplete, type and then choose from results"
                      )}
                    >
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
                </Label>
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
        )}
      </div>
    );
  }
}

export default withTranslation("common")(BusinessTypeLookup);
