require("dotenv").config();

module.exports = {
  QA_KEY: process.env.QA_KEY,
  SUBMIT_URL:
    process.env.SUBMIT_URL ||
    "http://localhost:4000/api/registration/createNewRegistration",
  ADDRESS_API_URL_BASE:
    "https://ws.postcoder.com/pcw/" +
    (process.env.ADDRESS_API_KEY || "PCW45-12345-12345-1234X") +
    "/pafaddressbase",
  ADDRESS_API_URL_QUERY:
    "format=json&lines=3&addtags=uprn&exclude=organisation",
  ADDRESS_API_URL_BASE_STANDARD:
    "https://ws.postcoder.com/pcw/" +
    (process.env.ADDRESS_API_KEY || "PCW45-12345-12345-1234X") +
    "/address",
  ADDRESS_API_URL_QUERY_STANDARD: "format=json&lines=3",
  API_SECRET: process.env.API_SECRET,
  CLIENT_NAME: process.env.CLIENT_NAME,
  COSMOSDB_URL: process.env.COSMOSDB_URL,
  REGISTRATION_DATA_VERSION: process.env.REGISTRATION_DATA_VERSION,
  MAINTENANCE_MODE_BLOCK_NEW: process.env.MAINTENANCE_MODE_BLOCK_NEW,
  MAINTENANCE_MODE_BLOCK_ALL: process.env.MAINTENANCE_MODE_BLOCK_ALL,
  LC_CACHE_TIME_TO_LIVE: 120,
  MAX_PARTNERS: process.env.MAX_PARTNERS || 5,
  CHROME_SUPPORTED_SINCE: process.env.CHROME_SUPPORTED_SINCE || 67,
  FIREFOX_SUPPORTED_SINCE: process.env.FIREFOX_SUPPORTED_SINCE || 60,
  EDGE_SUPPORTED_SINCE: process.env.EDGE_SUPPORTED_SINCE || 16,
  IE_SUPPORTED_SINCE: process.env.IE_SUPPORTED_SINCE || 11,
  MAC_SAFARI_SUPPORTED_SINCE: process.env.MACSAFARI_SUPPORTED_SINCE || 9,
  IOS_SAFARI_SUPPORTED_SINCE: process.env.IOSSAFARI_SUPPORTED_SINCE || 9.2
};
