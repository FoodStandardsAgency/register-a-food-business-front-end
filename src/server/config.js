require("dotenv").config();
const pathConfig = {
  "/index": {
    on: true,
    switches: {}
  },
  "/establishment-address": {
    on: true,
    switches: {}
  },
  "/establishment-address-select": {
    on: true,
    switches: {}
  },
  "/establishment-address-manual": {
    on: false,
    switches: {
      establishment_address_line_1: {
        "/establishment-address-manual": true
      }
    }
  },
  "/la-selector": {
    on: false,
    switches: {
      local_authority: {
        "/la-selector": true
      }
    }
  },
  "/la-established": {
    on: true,
    switches: {}
  } /*
  "/new-or-update-registration": {
    on: true,
    switches: {
      UPDATE_REGISTRATION: {
        "/update-registration": true
      }
    }
  },
  "/update-registration": {
    on: false,
    switches: {}
  },*/,
  "/registration-role": {
    on: true,
    switches: {
      SOLETRADER: {
        "/operator-name": true,
        "/operator-contact-details": true
      },
      PARTNERSHIP: {
        "/partner-name": true,
        "/main-partnership-contact": true,
        "/partnership-contact-details": true
      },
      Representative: {
        "/operator-type": true
      }
    }
  },
  "/operator-type": {
    on: false,
    switches: {
      PERSON: {
        "/operator-name": true,
        "/operator-contact-details": true
      },
      COMPANY: {
        "/operator-company-details": true,
        "/contact-representative": true
      },
      CHARITY: {
        "/operator-charity-details": true,
        "/contact-representative": true
      }
    }
  },
  "/operator-company-details": {
    on: false,
    switches: {}
  },
  "/operator-charity-details": {
    on: false,
    switches: {}
  },
  "/operator-name": {
    on: false,
    switches: {}
  },
  "/partner-name": {
    on: false,
    switches: {}
  },
  "/main-partnership-contact": {
    on: false,
    switches: {}
  },
  "/operator-address": {
    on: true,
    switches: {}
  },
  "/operator-address-select": {
    on: true,
    switches: {}
  },
  "/operator-address-manual": {
    on: false,
    switches: {
      operator_address_line_1: {
        "/operator-address-manual": true
      }
    }
  },
  "/operator-contact-details": {
    on: false,
    switches: {}
  },
  "/partnership-contact-details": {
    on: false,
    switches: {}
  },
  "/contact-representative": {
    on: false,
    switches: {}
  },
  "/establishment-trading-name": {
    on: true,
    switches: {}
  },
  "/establishment-address-type": {
    on: true,
    switches: {}
  },
  "/establishment-contact-details": {
    on: true,
    switches: {}
  },
  "/establishment-opening-status": {
    on: true,
    switches: {
      "Establishment is already trading": {
        "/establishment-opening-date-retroactive": true
      },
      "Establishment due to trade": {
        "/establishment-opening-date-proactive": true
      }
    }
  },
  "/establishment-opening-date-proactive": {
    on: false,
    switches: {}
  },
  "/establishment-opening-date-retroactive": {
    on: false,
    switches: {}
  },
  "/opening-days-start": {
    on: true,
    switches: {
      "Every day": {
        "/opening-hours": true
      },
      "Some days": {
        "/opening-days-some": true,
        "/opening-hours": true
      },
      "Irregular days": {
        "/opening-days-irregular": true
      }
    }
  },
  "/opening-days-some": {
    on: false,
    switches: {}
  },
  "/opening-days-irregular": {
    on: false,
    switches: {}
  },
  "/opening-hours": {
    on: false,
    switches: {}
  },
  "/business-type": {
    on: true,
    switches: {}
  },
  "/business-scale": {
    on: true,
    switches: {}
  },
  "/food-type": {
    on: true,
    switches: {}
  },
  "/processing-activities": {
    on: true,
    switches: {}
  },
  "/business-water-supply": {
    on: true,
    switches: {}
  },
  "/business-other-details": {
    on: true,
    switches: {}
  },
  "/registration-summary": {
    on: true,
    switches: {}
  },
  "/declaration": {
    on: true,
    switches: {}
  }
};

module.exports = {
  QA_KEY: process.env.QA_KEY,
  SUBMIT_URL:
    process.env.SUBMIT_URL || "http://localhost:4000/api/registration/createNewRegistration",
  ADDRESS_API_URL_BASE:
    "https://ws.postcoder.com/pcw/" +
    (process.env.ADDRESS_API_KEY || "PCW45-12345-12345-1234X") +
    "/pafaddressbase",
  ADDRESS_API_URL_QUERY: "format=json&lines=3&addtags=uprn&exclude=organisation",
  ADDRESS_API_URL_BASE_STANDARD:
    "https://ws.postcoder.com/pcw/" +
    (process.env.ADDRESS_API_KEY || "PCW45-12345-12345-1234X") +
    "/address",
  ADDRESS_API_URL_QUERY_STANDARD: "format=json&lines=3&exclude=organisation",
  API_SECRET: process.env.API_SECRET,
  CLIENT_NAME: process.env.CLIENT_NAME,
  COSMOSDB_URL: process.env.COSMOSDB_URL,
  REGISTRATION_DATA_VERSION: process.env.REGISTRATION_DATA_VERSION,
  MAINTENANCE_MODE_BLOCK_NEW: process.env.MAINTENANCE_MODE_BLOCK_NEW,
  MAINTENANCE_MODE_BLOCK_ALL: process.env.MAINTENANCE_MODE_BLOCK_ALL,
  LC_CACHE_TIME_TO_LIVE: 120,
  MAX_PARTNERS: process.env.MAX_PARTNERS || 5,
  MAX_TRADING_NAMES: process.env.MAX_TRADING_NAMES || 10,
  CHROME_SUPPORTED_SINCE: process.env.CHROME_SUPPORTED_SINCE || 67,
  FIREFOX_SUPPORTED_SINCE: process.env.FIREFOX_SUPPORTED_SINCE || 60,
  EDGE_SUPPORTED_SINCE: process.env.EDGE_SUPPORTED_SINCE || 16,
  IE_SUPPORTED_SINCE: process.env.IE_SUPPORTED_SINCE || 11,
  MAC_SAFARI_SUPPORTED_SINCE: process.env.MACSAFARI_SUPPORTED_SINCE || 9,
  IOS_SAFARI_SUPPORTED_SINCE: process.env.IOSSAFARI_SUPPORTED_SINCE || 9.2,
  MAPIT_API: process.env.MAPIT_API,
  MAPIT_API_KEY: process.env.MAPIT_API_KEY,
  TRADING_STATUS_API_URL: process.env.TRADING_STATUS_API_URL,
  FUTURE_DELIVERY_EMAIL: "fsatestemail.valid@gmail.com",
  pathConfig: pathConfig
};
