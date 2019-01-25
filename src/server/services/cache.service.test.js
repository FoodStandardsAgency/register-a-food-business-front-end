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
});
