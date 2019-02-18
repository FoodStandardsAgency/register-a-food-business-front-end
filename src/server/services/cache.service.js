/**
 * Provides a class for temporary data storage (caching)
 * @module services/cache
 */

const NodeCache = require("node-cache");
const { logEmitter } = require("./logging.service");

/**
 *
 * @param {Number} stdTTL Standard TimeToLive in seconds (0 = unlimited)
 * @param {boolean} deleteOnExpire Whether cache variables are to be deleted upon expiry
 * @param {boolean} autoRetrieveOnExpire Whether to obtain and cache value upon expiry
 * @param {Function} getValue Function to use to obtain value if not in cache
 */
const Cache = (stdTTL, deleteOnExpire, autoRetrieveOnExpire, getValue) => {
  const cache = new NodeCache({ stdTTL, deleteOnExpire });

  // Enforce one variable per Cache object
  const key = "x";

  const get = async () => {
    const value = cache.get(key);

    if (value) {
      logEmitter.emit("functionCall", "cache.service", "get (from cache)");
      return Promise.resolve(value);
    }

    return getValue().then(result => {
      logEmitter.emit("functionCall", "cache.service", "get (from db)");
      cache.set(key, result);
      return result;
    });
  };

  cache.on("expired", (k, v) => {
    logEmitter.emit("functionCallWith", "cache.service", "on", "expired", v);
    if (autoRetrieveOnExpire) {
      return getValue().then(result => {
        cache.set(key, result);
      });
    }
  });

  const isEmpty = () => {
    return cache.get("x") === undefined;
  };

  return Object.freeze({ get, isEmpty });
};

module.exports = { Cache };
