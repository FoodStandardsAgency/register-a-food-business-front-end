const cheerio = require("cheerio");
const nunjucks = require("nunjucks");
const i18n = require("i18n");
const { configureAxe } = require("jest-axe");
const { initialiseNunjucksEnvironment } = require("./src/server/nunjucksFunctions");

// For accessibility testing
const axe = configureAxe({
  rules: {
    "skip-link": { enabled: false },
    region: { enabled: false }
  }
});

module.exports = axe;

i18n.configure({
  locales: ["en", "cy"],
  fallbacks: { nl: "de" },
  //directory: './locales',
  register: global,

  // where to store json files - defaults to './locales'
  directory: __dirname + "/public/static/locales"
});

const env = nunjucks.configure(["node_modules/govuk-frontend/", "pages", "components"], {
  trimBlocks: true,
  lstripBlocks: true
});
env.addFilter("t", i18n.__);
initialiseNunjucksEnvironment(env, i18n);

/**
 * Render a page for testing
 * @param {string} pageName
 * @param {string} params parameters that are used in the component macro
 * @returns {function} returns cheerio (jQuery) instance of the macro for easy DOM querying
 */
function renderPage(pageName, params) {
  if (typeof params === "undefined") {
    throw new Error("Parameters passed to `render` should be an object but are undefined");
  }

  const output = nunjucks.render(pageName + ".njk", { props: params });
  return cheerio.load(output);
}

/**
 * Render a page for testing
 * @param {string} pageName
 * @param {string} params parameters that are used in the component macro
 * @param {any} children any child components or text, pass the children to the macro
 * @returns {function} returns cheerio (jQuery) instance of the macro for easy DOM querying
 */
function renderComponent(pageName, params, children = false) {
  if (typeof params === "undefined") {
    throw new Error("Parameters passed to `render` should be an object but are undefined");
  }

  const macroParams = JSON.stringify(params, null, 2);

  let macroString = `{%- from "pages/${pageName}.njk" import ${pageName} -%}`;

  if (children) {
    macroString += `{%- call ${pageName}(${macroParams}) -%}${children}{%- endcall -%}`;
  } else {
    macroString += `{{- ${pageName}(${macroParams}) -}}`;
  }

  const output = nunjucks.renderString(macroString);
  return cheerio.load(output);
}

const getPageDetails = {
  getRadioButtons: function ($) {
    const radioButtonsList = $(":radio");
    return radioButtonsList;
  },
  getInputLabelText: function ($, index) {
    const inputLabelText = $(".govuk-label").contents().get(index).data.trim();
    return inputLabelText;
  },
  getMainHeading: function ($) {
    const mainHeading = $("h1");
    return mainHeading;
  },
  getH2Heading: function ($) {
    const h2Heading = $(".govuk-heading-2").text().trim();
    return h2Heading;
  },
  getAreaHeading: function ($) {
    const AreaHeading = $("h2");
    return AreaHeading;
  },
  getInsetText: function ($) {
    const insetText = $(".govuk-inset-text").contents().get(0).data;
    return insetText.trim();
  },
  getDetailsText: function ($) {
    const detailsText = $(".govuk-details__text").contents().get(0).data;
    return detailsText.trim();
  },
  getBacklinkHref: function ($) {
    const backlink = $(".govuk-back-link").get(0).attribs.href.trim();
    return backlink;
  },
  getButtonText: function ($) {
    const buttonText = $(".govuk-button").contents().get(1).data.trim();
    return buttonText;
  },
  getErrorSummaryLinks: function ($) {
    const errorLinks = $(".govuk-error-summary__list a");
    return errorLinks;
  },
  getCheckboxes: function ($) {
    const checkboxList = $(":checkbox");
    return checkboxList;
  },
  getSelectionBox: function ($) {
    const selected = $(":selected");
    return selected;
  },
  getHintText: function ($) {
    const insetText = $(".govuk-hint").contents().get(0).data;
    return insetText.trim();
  }
};

module.exports = {
  axe,
  renderPage,
  renderComponent,
  getPageDetails
};
