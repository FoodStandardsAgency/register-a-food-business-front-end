const dateFilter = require("./filters/nunjucks-moment-date-filter.js");

const initialiseNunjucksEnvironment = (env, i18n) => {
  env.addFilter("date", dateFilter);
  env.addGlobal("__", (phrase, locale) => {
    return i18n.__({ phrase, locale });
  });
  env.addFilter("addressSelectItems", (findResults) =>
    findResults.map((address, index) => ({
      value: index,
      text: address.summaryline
    }))
  );
  env.addFilter("selectValidationErrors", (validationErrors, language) =>
    Object.entries(validationErrors).map(([k, v]) => ({
      text: i18n.__({ phrase: v, locale: language }),
      href: "#" + k
    }))
  );
  env.addGlobal("mergeObjects", (orig, additionalProps) => ({
    ...orig,
    ...additionalProps
  }));
  env.addGlobal("exists", (list, item) => (list || []).includes(item));
  env.addGlobal("getEstablishmentPrimaryNumber", (answers, switches) => {
    if (switches && switches.reuseOperatorContactDetails) {
      if (answers.registration_role === "SOLETRADER") {
        return answers.operator_primary_number;
      } else if (answers.registration_role === "PARTNERSHIP") {
        return answers.main_partner_primary_number;
      } else {
        return answers.contact_representative_number;
      }
    } else {
      return answers.establishment_primary_number;
    }
  });
  env.addGlobal("getEstablishmentSecondaryNumber", (answers, switches) => {
    if (switches && switches.reuseOperatorContactDetails) {
      if (answers.registration_role === "SOLETRADER") {
        return answers.operator_secondary_number;
      } else if (answers.registration_role === "PARTNERSHIP") {
        return answers.main_partner_secondary_number;
      }
    } else {
      return answers.establishment_secondary_number;
    }
  });
  env.addGlobal("getEstablishmentEmail", (answers, switches) => {
    if (switches && switches.reuseOperatorContactDetails) {
      if (answers.registration_role === "SOLETRADER") {
        return answers.operator_email;
      } else if (answers.registration_role === "PARTNERSHIP") {
        return answers.main_partner_email;
      } else {
        return answers.contact_representative_email;
      }
    } else {
      return answers.establishment_email;
    }
  });
};

module.exports = { initialiseNunjucksEnvironment };
