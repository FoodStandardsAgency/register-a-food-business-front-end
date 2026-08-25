#!/usr/bin/env node
/*
 * Renders the App Gateway custom 403 error page (pages/waf-403.njk) from the
 * service's own nunjucks layout, components, compiled CSS and locale files.
 *
 * Usage:  node scripts/render-waf-403.js
 *
 * Output: src/server/static/error-pages/waf-403.html (committed; served at
 * /error-pages/waf-403.html, which is the URL the gateway's 403
 * customErrorConfigurations points at). Re-run and re-commit whenever layout,
 * branding or the page's strings change; the gateway re-fetches the page only
 * when its config is re-applied.
 *
 * A Welsh page (waf-403-cy.html) is only emitted once EVERY string on the page
 * has a real entry in public/static/locales/cy.json — no machine translation,
 * no silent English fallback in a page presented as Welsh.
 */
const path = require("path");
const fs = require("fs");
const nunjucks = require("nunjucks");

const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "src/server/static/error-pages");

const locales = {
  en: JSON.parse(fs.readFileSync(path.join(ROOT, "public/static/locales/en.json"), "utf8")),
  cy: JSON.parse(fs.readFileSync(path.join(ROOT, "public/static/locales/cy.json"), "utf8"))
};
let missing = { en: new Set(), cy: new Set() };

// Same search paths as src/server/server.js.
const env = nunjucks.configure(
  ["node_modules/govuk-frontend/dist", "node_modules/@ons/design-system/", "pages", "components"].map(
    (p) => path.join(ROOT, p)
  ),
  { autoescape: true }
);
// Minimal stand-ins for src/server/nunjucksFunctions.js globals used by the layout chain.
env.addGlobal("__", (phrase, locale) => {
  const table = locales[locale] || locales.en;
  if (table[phrase] !== undefined) return table[phrase];
  missing[locale in locales ? locale : "en"].add(phrase);
  return locales.en[phrase] !== undefined ? locales.en[phrase] : phrase;
});
env.addGlobal("mergeObjects", (orig, extra) => ({ ...orig, ...extra }));
env.addGlobal("exists", (list, item) => (list || []).includes(item));

function render(language) {
  const html = env.render("waf-403.njk", {
    props: {
      language,
      acceptAllCookies: "true", // suppress the cookie banner: this page sets no cookies
      currentPageTitle: "Sorry, there is a problem with the service"
    }
  });
  const css = fs
    .readFileSync(path.join(ROOT, "src/server/css/app.css"), "utf8")
    .replace(/\/\*# sourceMappingURL=[\s\S]*?\*\//g, "");
  return (
    html
      // Frozen page must not depend on the app serving its stylesheet.
      .replace(/<link href="\/css\/app\.css"[^>]*>/, () => `<style>\n${css}\n</style>`)
      // No-JS page: drop the js-enabled bootstrap so non-JS styling applies consistently.
      .replace(/<script[^>]*>[\s\S]{0,300}?js-enabled[\s\S]{0,100}?<\/script>/g, "")
  );
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const en = render("en");
const outEn = path.join(OUT_DIR, "waf-403.html");
fs.writeFileSync(outEn, en);
console.log(
  `${outEn} written — ${(Buffer.byteLength(en) / 1024).toFixed(0)} KB (App GW limit 1024 KB)`
);
if (missing.en.size) {
  console.log(`\n${missing.en.size} strings on the page are not in en.json (the literal key is used; add them):`);
  for (const s of missing.en) console.log("  - " + JSON.stringify(s));
}

// Welsh gate.
missing.cy = new Set();
const cy = render("cy");
if (missing.cy.size) {
  console.log(`\nNOT emitting waf-403-cy.html — ${missing.cy.size} strings have no Welsh entry in cy.json:`);
  for (const s of missing.cy) console.log("  - " + JSON.stringify(s));
  console.log("Send these through the FSA translation route, add them to cy.json, re-run.");
} else {
  const outCy = path.join(OUT_DIR, "waf-403-cy.html");
  fs.writeFileSync(outCy, cy);
  console.log(`${outCy} written — all strings translated.`);
}
