/**
 * Sends requests to a connector
 * @module services/trading-status
 */

const { sendTradingStatus } = require("../connectors/trading-status/trading-status.connector");
const { logEmitter } = require("./logging.service");

const tradingStatus = async (fsaId, encryptedId, confirmedTrading) => {
  logEmitter.emit("functionCall", "trading-status.service", "tradingStatus");

  try {
    const response = await sendTradingStatus(fsaId, encryptedId, confirmedTrading);
    logEmitter.emit("functionSuccess", "trading-status.service", "tradingStatus");
    return response;
  } catch (err) {
    logEmitter.emit("functionFail", "trading-status.service", "tradingStatus", err);
    return err;
  }
};

module.exports = { tradingStatus };
