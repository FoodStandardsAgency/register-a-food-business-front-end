const { Cache } = require("./cache.service");
const { logEmitter } = require("./logging.service");

jest.mock("./logging.service");

describe("cache.service get()", () => {
  const obj1 = { a: 123, 123: "a" };
  const obj2 = { b: 321, 321: "b" };
  describe("given value is not cached", () => {
    let result;
    let mockResult = obj1;
    const cache = Cache(1000, true, true, () => {
      return Promise.resolve(mockResult);
    });
    beforeEach(() => {
      mockResult = obj2;
      return cache.get().then(value => {
        result = value;
      });
    });

    it("should return the new object", () => {
      expect(result).toEqual(obj2);
    });
  });
  describe("given value is already cached", () => {
    let result;
    let mockResult = obj1;
    const cache = Cache(1000, true, true, () => {
      return Promise.resolve(mockResult);
    });
    beforeEach(() => {
      return cache.get().then(() => {
        mockResult = obj2;
        return cache.get().then(value => {
          result = value;
        });
      });
    });

    it("should return the old object", () => {
      expect(result).toEqual(obj1);
    });
  });
  describe("given deleteOnExpire is enabled", () => {
    const ttl = 0.6;
    const deleteOnExpire = true;
    const waitTimeForCacheToExpire = 700;
    const waitTimeForValueToAutoRetrieve = 400;
    const delay = t => new Promise(resolve => setTimeout(resolve, t));
    beforeEach(() => {
      logEmitter.emit.mockClear();
    });
    describe("given autoRetrieveOnExpire is enabled", () => {
      const autoRetrieveOnExpire = true;
      let mockResult = obj1;
      describe("when getValue is successful", () => {
        const cache = Cache(ttl, deleteOnExpire, autoRetrieveOnExpire, () => {
          return Promise.resolve(mockResult);
        });
        let result;
        beforeEach(() => {
          return cache.get().then(() => {
            mockResult = obj2;
            return delay(waitTimeForCacheToExpire).then(() => {
              if (cache.isEmpty()) {
                return delay(waitTimeForValueToAutoRetrieve).then(() => {
                  return cache.get().then(value => {
                    result = Promise.resolve(value);
                  });
                });
              } else {
                return cache.get().then(value => {
                  result = Promise.resolve(value);
                });
              }
            });
          });
        });
        it("should return new auto-retrieved object from cache", () => {
          return result.then(r => {
            expect(r).toEqual(obj2);
            expect(logEmitter.emit).toHaveBeenNthCalledWith(
              1,
              "functionCall",
              "cache.service",
              "get (from db)"
            );
            expect(logEmitter.emit).toHaveBeenNthCalledWith(
              2,
              "functionCallWith",
              "cache.service",
              "on",
              "expired",
              obj1
            );
            expect(logEmitter.emit).toHaveBeenNthCalledWith(
              3,
              "functionCall",
              "cache.service",
              "get (from cache)"
            );
          });
        });
      });
      describe("when getValue fails", () => {
        let cacheInitialised = false;
        let mockResult = obj1;
        const cache = Cache(ttl, deleteOnExpire, autoRetrieveOnExpire, () => {
          if (cacheInitialised) {
            throw new Error("example error");
          } else {
            return Promise.resolve(mockResult);
          }
        });
        let result;
        beforeEach(() => {
          return cache.get().then(() => {
            mockResult = obj2;
            cacheInitialised = true;
            return delay(waitTimeForCacheToExpire).then(() => {
              if (cache.isEmpty()) {
                return delay(waitTimeForValueToAutoRetrieve).then(() => {
                  return cache.get().then(value => {
                    result = Promise.resolve(value);
                  });
                });
              } else {
                return cache.get().then(value => {
                  result = Promise.resolve(value);
                });
              }
            });
          });
        });
        it("should return the old value", () => {
          return result.then(r => {
            expect(r).toEqual(obj1);
            expect(logEmitter.emit).toHaveBeenNthCalledWith(
              1,
              "functionCall",
              "cache.service",
              "get (from db)"
            );
            expect(logEmitter.emit).toHaveBeenNthCalledWith(
              2,
              "functionCallWith",
              "cache.service",
              "on",
              "expired",
              obj1
            );
            expect(logEmitter.emit).toHaveBeenNthCalledWith(
              3,
              "functionFail",
              "cache.service",
              "cache.on(expired)",
              Error("example error")
            );
            expect(logEmitter.emit).toHaveBeenNthCalledWith(
              4,
              "functionCall",
              "cache.service",
              "get (from cache)"
            );
          });
        });
      });
    });
    describe("given autoRetrieveOnExpiry is disabled", () => {
      const autoRetrieveOnExpiry = false;
      let mockResult = obj1;
      const cache = Cache(ttl, deleteOnExpire, autoRetrieveOnExpiry, () => {
        return Promise.resolve(mockResult);
      });

      let result;
      beforeEach(() => {
        return cache.get().then(() => {
          return delay(waitTimeForCacheToExpire).then(() => {
            if (cache.isEmpty()) {
              return delay(waitTimeForValueToAutoRetrieve).then(() => {
                return cache.get().then(value => {
                  result = Promise.resolve(value);
                });
              });
            } else {
              return cache.get().then(value => {
                result = Promise.resolve(value);
              });
            }
          });
        });
      });
      it("should return old object from db", () => {
        return result.then(r => {
          expect(r).toEqual(obj1);
          expect(logEmitter.emit).toHaveBeenNthCalledWith(
            1,
            "functionCall",
            "cache.service",
            "get (from db)"
          );
          expect(logEmitter.emit).toHaveBeenNthCalledWith(
            2,
            "functionCallWith",
            "cache.service",
            "on",
            "expired",
            obj1
          );
          expect(logEmitter.emit).toHaveBeenNthCalledWith(
            3,
            "functionCall",
            "cache.service",
            "get (from db)"
          );
        });
      });
    });
  });
});
