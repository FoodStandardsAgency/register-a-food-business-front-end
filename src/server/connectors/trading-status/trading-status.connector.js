/**
 * @module connectors/trading-status
 */

const axios = require("axios");
axios.defaults.validateStatus = () => true;
const { TRADING_STATUS_API_URL, API_SECRET, CLIENT_NAME } = require("../../config");
const { logEmitter } = require("../../services/logging.service");

/**
 * Calls the confirmed-trading or stopped-trading APIs on the back-end service
 *
 * @param {string} fsaid The FSA ID of the registration
 * @param {string} encryptedId The encrypted record ID of the registration
 * @param {boolean} confirmedTrading True if the business is still trading, false if it is no longer trading
 *
 * @returns {object} The back-end service response
 */
const sendTradingStatus = async (fsaId, encryptedId, confirmedTrading) => {
  try {
    let res;
    logEmitter.emit("functionCallWith", "trading-status.connector", "sendTradingStatus", fsaId);
    let apiUrl = `${TRADING_STATUS_API_URL}/${confirmedTrading ? "confirmed-trading" : "stopped-trading"}`;
    logEmitter.emit("info", "trading-status.connector", "sendTradingStatus", `API URL: ${apiUrl}`);
    const headers = {
      "Content-Type": "application/json",
      "api-secret": API_SECRET,
      "client-name": CLIENT_NAME
    };
    res = await axios(`${apiUrl}/${fsaId}?id=${encryptedId}`, {
      method: "POST",
      headers
    });
    logEmitter.emit("functionSuccess", "trading-status.connector", "sendTradingStatus");
    return res;
  } catch (err) {
    logEmitter.emit("functionFail", "trading-status.connector", "sendTradingStatus", err);
    return err;
  }
};

module.exports = { sendTradingStatus };
