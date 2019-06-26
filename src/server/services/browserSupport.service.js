const useragent = require("express-useragent");

const earliestVersion = {
  chrome: 67,
  firefox: 60,
  edge: 16,
  ie: 11,
  macSafari: 9,
  iOSSafari: 9.2
};

/**
 * Returns true if a supported browser
 *
 * @param {*} req - The request object
 */
const checkBrowserSupported = req => {
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
