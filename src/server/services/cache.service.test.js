const { Cache } = require("./cache.service");
jest.unmock("./cache.service");

describe("cache.service get()", () => {
  const obj1 = { a: 123, 123: "a" };
  const obj2 = { b: 321, 321: "b" };
  describe("given value is not cached", () => {
    let result;
    let mockResult = obj1;
    const cache = new Cache(1000, true, true, () => {
      return Promise.resolve(mockResult);
    });
    mockResult = obj2;
    cache.get().then(getResult => {
      result = getResult;
    });

    it("should return obj2", () => {
      expect(result).toEqual(obj2);
    });
  });
  describe("given value is already cached", () => {
    let result;
    let mockResult = obj1;
    const cache = new Cache(1000, true, true, () => {
      return Promise.resolve(mockResult);
    });
    cache.get().then(getResult => {
      mockResult = obj2;
      cache.get().then(getResult => {
        result = getResult;
      });
    });

    it("should return obj1", () => {
      expect(result).toEqual(obj1);
    });
  });
  describe("given deleteOnExpire is enabled", () => {
    const ttl = 0.6;
    const deleteOnExpire = true;
    const waitTimeForCacheToExpire = 700;
    describe("given autoRetrieveOnExpiry is enabled", () => {
      const waitTimeForValueToAutoRetrieve = 400;
      const autoRetrieveOnExpiry = true;
      let mockResult = obj1;
      const cache = new Cache(ttl, deleteOnExpire, autoRetrieveOnExpiry, () => {
        return Promise.resolve(mockResult);
      });

      const delay = t => new Promise(resolve => setTimeout(resolve, t));
      let result;
      beforeEach(() => {
        return cache.get().then(() => {
          mockResult = obj2;
          return delay(waitTimeForCacheToExpire).then(() => {
            if (cache.cache.get("x") === undefined) {
              return delay(waitTimeForValueToAutoRetrieve).then(() => {
                return cache.cache.get("x", (err, value) => {
                  result = Promise.resolve(value);
                });
              });
            } else {
              return cache.cache.get("x", (err, value) => {
                result = Promise.resolve(value);
              });
            }
          });
        });
      });
      it("should return new mockResult value as cache expired", () => {
        return result.then(r => expect(r).toEqual(obj2));
      });
    });
  });
});
