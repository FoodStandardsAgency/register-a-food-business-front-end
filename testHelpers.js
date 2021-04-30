const cheerio = require('cheerio')
const nunjucks = require('nunjucks')
const i18n = require('i18n');

i18n.configure({
    locales: ['en', 'cy'],
    fallbacks: { nl: 'de' },
    //directory: './locales',
    register: global,


  // where to store json files - defaults to './locales'
  directory: __dirname + "/public/static/locales"
});

const env = nunjucks.configure(["node_modules/govuk-frontend/", "pages", "components"], {
    trimBlocks: true,
    lstripBlocks: true
  })
env.addGlobal("__", i18n.__);
env.addFilter("t", i18n.__);

/**
 * Render a component's macro for testing
 * @param {string} pageName
 * @param {string} params parameters that are used in the component macro
 * @param {any} children any child components or text, pass the children to the macro
 * @returns {function} returns cheerio (jQuery) instance of the macro for easy DOM querying
 */
 function render (pageName, params, children = false) {
    if (typeof params === 'undefined') {
      throw new Error('Parameters passed to `render` should be an object but are undefined')
    }
  
    const macroParams = JSON.stringify(params, null, 2)
  
    let macroString = `{%- from "pages/${pageName}.njk" import ${pageName} -%}`
  
    if (children) {
      macroString += `{%- call ${pageName}(${macroParams}) -%}${children}{%- endcall -%}`
    } else {
      macroString += `{{- ${pageName}(${macroParams}) -}}`
    }
  
    const output = nunjucks.render(pageName + ".njk", macroParams);
    //const output = nunjucks.renderString(macroString)
    return cheerio.load(output)
  }

  module.exports = { render }