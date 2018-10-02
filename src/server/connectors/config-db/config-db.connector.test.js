const mongodb = require("mongodb");
const {
  getPathConfigByVersion,
  clearPathConfigCache
} = require("./config-db.connector");
const mockPathConfig = require("./mockPathConfig.json");
const { pathConfigCollectionDouble } = require("./config-db.double");

jest.mock("mongodb");
jest.mock("./config-db.double");

let result;

describe("Function: getPathConfigByVersion", () => {
  describe("given the request has not yet been run during this process (empty cache)", () => {
    describe("given the request throws an error", () => {
      beforeEach(async () => {
        process.env.DOUBLE_MODE = false;
        clearPathConfigCache();
        mongodb.MongoClient.connect.mockImplementation(() => {
          throw new Error("example mongo error");
        });

        try {
          await getPathConfigByVersion("1.0.0");
        } catch (err) {
          result = err;
        }
      });

      describe("when the error shows that the connection has failed", () => {
        it("should throw mongoConnectionError error", () => {
          expect(result.name).toBe("mongoConnectionError");
          expect(result.message).toBe("example mongo error");
        });
      });
    });

    describe("given the request is successful", () => {
      beforeEach(() => {
        process.env.DOUBLE_MODE = false;
        clearPathConfigCache();
        mongodb.MongoClient.connect.mockImplementation(() => ({
          db: () => ({
            collection: () => ({
              findOne: () => mockPathConfig
            })
          })
        }));
      });

      it("should return the data from the findOne() response", async () => {
        await expect(getPathConfigByVersion("1.0.0")).resolves.toEqual(
          mockPathConfig.path
        );
      });
    });

    describe("when running in double mode", () => {
      beforeEach(() => {
        process.env.DOUBLE_MODE = true;
        clearPathConfigCache();
        pathConfigCollectionDouble.findOne.mockImplementation(
          () => mockPathConfig
        );
      });

      it("should resolve with the data from the double's findOne() response", async () => {
        await expect(getPathConfigByVersion("1.0.0")).resolves.toEqual(
          mockPathConfig.path
        );
      });
    });
  });

  describe("given the request is run more than once during this process (populated cache)", () => {
    beforeEach(() => {
      process.env.DOUBLE_MODE = false;
      mongodb.MongoClient.connect.mockClear();
      mongodb.MongoClient.connect.mockImplementation(() => ({
        db: () => ({
          collection: () => ({
            findOne: () => mockPathConfig
          })
        })
      }));
    });

    it("returns the correct value", async () => {
      // clear the cache
      clearPathConfigCache();

      // run one request
      await expect(getPathConfigByVersion("1.0.0")).resolves.toEqual(
        mockPathConfig.path
      );

      // run a second request without clearing the cache
      await expect(getPathConfigByVersion("1.0.0")).resolves.toEqual(
        mockPathConfig.path
      );
    });

    it("does not call the mongo connection function on the second function call", async () => {
      // clear the cache
      clearPathConfigCache();

      // run one request
      await getPathConfigByVersion("1.0.0");
      expect(mongodb.MongoClient.connect).toHaveBeenCalledTimes(1);

      // run a second request without clearing the cache
      await getPathConfigByVersion("1.0.0");
      expect(mongodb.MongoClient.connect).toHaveBeenCalledTimes(1);
    });
  });
});
