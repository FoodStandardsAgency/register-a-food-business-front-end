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
const checkBrowserSupported = userAgentHeader => {
  logEmitter.emit(
    "functionCallWith",
    "browser-support.service",
    "checkBrowserSupported",
    userAgentHeader
  );
  const ua = useragent.parse(userAgentHeader);
  const version = parseFloat(ua.version);
  if (ua.isChrome) {
    return version >= CHROME_SUPPORTED_SINCE;
  } else if (ua.isFirefox) {
    return version >= FIREFOX_SUPPORTED_SINCE;
  } else if (ua.isEdge) {
    return version >= EDGE_SUPPORTED_SINCE;
  } else if (ua.isIE) {
    return version >= IE_SUPPORTED_SINCE;
  } else if (ua.isSafari) {
    if (ua.isMobile) {
      return version >= IOS_SAFARI_SUPPORTED_SINCE;
    } else {
      return version >= MAC_SAFARI_SUPPORTED_SINCE;
    }
  } else {
    return false;
  }
};

module.exports = { checkBrowserSupported };
