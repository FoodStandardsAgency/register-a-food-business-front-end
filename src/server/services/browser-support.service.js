/**
 * Provides function for verifying browser support
 * @module services/browser-support
 */

const useragent = require("express-useragent");
const { logEmitter } = require("./logging.service");

const earliestVersion = {
  chrome: 67,
  firefox: 60,
  edge: 16,
  ie: 11,
  macSafari: 9,
  iOSSafari: 9.2
};

/**
 * Compares user's browser version with the earliest supported
 *
 * @param {object} req - The request object
 *
 * @returns {boolean} True if supported, false if not
 */
const checkBrowserSupported = req => {
  logEmitter.emit(
    "functionCall",
    "browser-support.service",
    "checkBrowserSupported"
  );
  const source = req.headers["user-agent"];
  const ua = useragent.parse(source);
  const version = parseFloat(ua.version);
  if (ua.isChrome) {
    return version >= earliestVersion.chrome;
  } else if (ua.isFirefox) {
    return version >= earliestVersion.firefox;
  } else if (ua.isEdge) {
    return version >= earliestVersion.edge;
  } else if (ua.isIE) {
    return version >= earliestVersion.ie;
  } else if (ua.isSafari) {
    if (ua.isMobile) {
      return version >= earliestVersion.iOSSafari;
    } else {
      return version >= earliestVersion.macSafari;
    }
  } else {
    return false;
  }
};

module.exports = { checkBrowserSupported };
