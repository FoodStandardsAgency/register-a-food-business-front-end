var businessTypeFunctions = require('./BusinessTypeLookupFunctions.js');

var accessibleAutocomplete = require('./accessible-autocomplete.min.js');
     
const templates = {
    inputValue: businessTypeFunctions.businessTypeFunctions.inputValueFunction,
    suggestion: businessTypeFunctions.businessTypeFunctions.suggestionFunction
  };

accessibleAutocomplete({
    element: document.querySelector('#autocompleteContainer'),
    id: 'my-autocomplete', // To match it to the existing <label>.
    source: businessTypeFunctions.businessTypeFunctions.findMatches,
    templates: templates,
    confirmOnBlur: false,
    name: "business_type",
    defaultValue: window.business_type_default
  })