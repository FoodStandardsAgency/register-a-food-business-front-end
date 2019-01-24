/**
 * Provides a class for temporary data storage (caching)
 * @module services/cache
 */

const NodeCache = require("node-cache");
const { logEmitter } = require("./logging.service");

// Enforce one variable per Cache object
const key = "x";

class Cache {
  /**
   * Class constructor
   * @param {Number} stdTTL Standard TimeToLive in seconds (0 = unlimited)
   * @param {boolean} deleteOnExpire Whether cache variables are to be deleted upon expiry
   * @param {boolean} autoRetrieveOnExpiry Whether to obtain and cache value upon expiry
   * @param {function} getValue Function to use to obtain value if not in cache
   */
  constructor(
    stdTTL,
    deleteOnExpire = true,
    autoRetrieveOnExpiry = false,
    getValue = () => {
      return null;
    }
  ) {
    this.getValue = getValue;
    this.cache = new NodeCache({
      stdTTL,
      checkperiod: stdTTL * 0.2,
      deleteOnExpire
    });

    if (autoRetrieveOnExpiry) {
      this.cache.on("expired", () => {
        return getValue().then(result => {
          this.cache.set(key, result);
        });
      });
    }
  }

  /**
   * Retrieves value of the Cache object
   * If no value is found in cache, object's getValue function is executed and result automatically saved to cache
   * @returns {any} Cache object's value
   */
  get() {
    logEmitter.emit("functionCall", "cache.service", "get");

    const value = this.cache.get(key);
    if (value) {
      return Promise.resolve(value);
    }

    return this.getValue().then(result => {
      this.cache.set(key, result);
      return result;
    });
  }
}

module.exports = { Cache };
