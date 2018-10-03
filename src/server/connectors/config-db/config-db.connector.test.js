const mongodb = require("mongodb");
const {
  getPathConfigByVersion,
  clearPathConfigCache
} = require("./config-db.connector");
const pathConfigMock = require("../../../__mocks__/pathConfigMock.json");
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

        result = await getPathConfigByVersion("1.0.0");
      });

      describe("when the error shows that the connection has failed", () => {
        it("should return the fallback path config", () => {
          expect(result).toEqual(pathConfigMock);
        });
      });
    });

    describe("given the request returns null", () => {
      beforeEach(async () => {
        process.env.DOUBLE_MODE = false;
        clearPathConfigCache();
        mongodb.MongoClient.connect.mockImplementation(() => ({
          db: () => ({
            collection: () => ({
              findOne: () => null
            })
          })
        }));

        result = await getPathConfigByVersion("1.0.0");
      });

      it("should return null", () => {
        expect(result).toBe(null);
      });
    });

    describe("given the request is successful", () => {
      beforeEach(() => {
        process.env.DOUBLE_MODE = false;
        clearPathConfigCache();
        mongodb.MongoClient.connect.mockImplementation(() => ({
          db: () => ({
            collection: () => ({
              findOne: () => pathConfigMock
            })
          })
        }));
      });

      it("should return the data from the findOne() response", async () => {
        await expect(getPathConfigByVersion("1.0.0")).resolves.toEqual(
          pathConfigMock
        );
      });
    });

    describe("when running in double mode", () => {
      beforeEach(() => {
        process.env.DOUBLE_MODE = true;
        clearPathConfigCache();
        pathConfigCollectionDouble.findOne.mockImplementation(
          () => pathConfigMock
        );
      });

      it("should resolve with the data from the double's findOne() response", async () => {
        await expect(getPathConfigByVersion("1.0.0")).resolves.toEqual(
          pathConfigMock
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
            findOne: () => pathConfigMock
          })
        })
      }));
    });

    it("returns the correct value", async () => {
      // clear the cache
      clearPathConfigCache();

      // run one request
      await expect(getPathConfigByVersion("1.0.0")).resolves.toEqual(
        pathConfigMock
      );

      // run a second request without clearing the cache
      await expect(getPathConfigByVersion("1.0.0")).resolves.toEqual(
        pathConfigMock
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
