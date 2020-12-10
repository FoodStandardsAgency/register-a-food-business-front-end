import { css } from "@emotion/core";
import ContentItem from "./ContentItem";
import { Input, Label, UnorderedList, HintText, Paragraph } from "govuk-react";
import distinctBusinessTypesEn from "./distinct-business-type-en.json";
import distinctBusinessTypesCy from "./distinct-business-type-cy.json";
import { i18n } from "../../i18n";
import { withTranslation } from "../../i18n.js";
import ListItemConsistentSize from "./ListItemConsistentSize";

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
  (i18n.language === "en"
    ? distinctBusinessTypesEn
    : distinctBusinessTypesCy
  ).forEach((type) => {
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
      Search with your own keywords and then select the most fitting business
      type from the suggestions
    </Paragraph>
    <ContentItem.B_30_15>
      <HintText>
        For example
        <UnorderedList>
          <ListItemConsistentSize>cafe</ListItemConsistentSize>
          <ListItemConsistentSize>food delivery service</ListItemConsistentSize>
          <ListItemConsistentSize>commercial bakery</ListItemConsistentSize>
          <ListItemConsistentSize>
            meat product manufacturer
          </ListItemConsistentSize>
        </UnorderedList>
      </HintText>
    </ContentItem.B_30_15>
    <Label style={{ paddingTop: "0px" }}>
      <div
        aria-label={props.t(
          "business type autocomplete, type and then choose from results"
        )}
      >
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

export default withTranslation("common")(DataListSection);
