/**
 * Provides function for verifying browser support
 * @module services/browser-support
 */

const useragent = require("express-useragent");
const { logEmitter } = require("./logging.service");
const {
  CHROME_SUPPORTED_SINCE,
  FIREFOX_SUPPORTED_SINCE,
  EDGE_SUPPORTED_SINCE,
  IE_SUPPORTED_SINCE,
  IOS_SAFARI_SUPPORTED_SINCE,
  MAC_SAFARI_SUPPORTED_SINCE
} = require("../config");

/**
 * Compares user's browser version with the earliest supported
 *
 * @param {string} userAgentHeader - user-agent request header
 *
 * @returns {boolean} True if supported, false if not
 */
const getBrowserInfo = userAgentHeader => {
  logEmitter.emit(
    "functionCallWith",
    "browser-support.service",
    "checkBrowserSupported",
    userAgentHeader
  );
  const response = {
    browser: "",
    browserVersion: "",
    isBrowserSupported: false,
    isBrowserVersionVerified: true
  };
  const ua = useragent.parse(userAgentHeader);
  response.browser = ua.browser;
  response.browserVersion = ua.version;
  const version = parseFloat(ua.version);

  if (ua.isChrome) {
    response.isBrowserSupported = version >= CHROME_SUPPORTED_SINCE;
  } else if (ua.isFirefox) {
    response.isBrowserSupported = version >= FIREFOX_SUPPORTED_SINCE;
  } else if (ua.isEdge) {
    response.isBrowserSupported = version >= EDGE_SUPPORTED_SINCE;
  } else if (ua.isIE) {
    response.isBrowserSupported = version >= IE_SUPPORTED_SINCE;
  } else if (ua.isSafari) {
    if (ua.isMobile) {
      response.isBrowserSupported = version >= IOS_SAFARI_SUPPORTED_SINCE;
    } else {
      response.isBrowserSupported = version >= MAC_SAFARI_SUPPORTED_SINCE;
    }
  }
  logEmitter.emit(
    "functionSuccessWith",
    "browser-support.service",
    "getBrowserInfo",
    JSON.stringify(response)
  );
  return response;
};

module.exports = { getBrowserInfo };
