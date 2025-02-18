jest.mock("mongodb");

const mongodb = require("mongodb");
const { getLocalCouncils, getCouncilDataByID } = require("./config-db.connector");
const { clearCosmosConnection } = require("../cosmos.client");

describe("Function: getLocalCouncils", () => {
  let result;
  beforeEach(async () => {
    clearCosmosConnection();
  });
  describe("given the connection request throws an error", () => {
    beforeEach(async () => {
      mongodb.MongoClient.connect.mockImplementation(() => {
        throw new Error("example mongo error");
      });

      try {
        await getLocalCouncils();
      } catch (err) {
        result = err;
      }
    });

    it("should throw mongoConnectionError error", () => {
      expect(result.message).toBe("example mongo error");
    });
  });

  describe("given the collection request returns null", () => {
    beforeEach(async () => {
      const mongoCursor = {
        project: () => {
          return {
            toArray: () => {
              return null;
            }
          };
        }
      };
      mongodb.MongoClient.connect.mockImplementation(() => ({
        db: () => ({
          collection: () => ({
            find: () => mongoCursor
          })
        })
      }));
      try {
        await getLocalCouncils();
      } catch (err) {
        result = err;
      }
    });

    it("should throw null collection error", () => {
      expect(result.message).toBe("Cannot read properties of null (reading 'length')");
    });
  });

  describe("given the request is successful", () => {
    const localCouncilsObjs = [
      { local_council_url: "cardiff", local_council: "Fakes cardiff council" },
      {
        local_council_url: "the-vale-of-glamorgan",
        local_council: "Fakes vale of G council"
      }
    ];

    const localCouncilsMock = [
      { local_council_url: "cardiff", local_council: "Fakes cardiff council" },
      {
        local_council_url: "the-vale-of-glamorgan",
        local_council: "Fakes vale of G council"
      }
    ];

    const mongoCursor = {
      project: () => {
        return {
          toArray: () => {
            return localCouncilsObjs;
          }
        };
      }
    };

    beforeEach(() => {
      mongodb.MongoClient.connect.mockImplementation(() => ({
        db: () => ({
          collection: () => ({
            find: () => mongoCursor
          })
        })
      }));
    });

    it("should return the array of councils", async () => {
      await expect(getLocalCouncils()).resolves.toEqual(localCouncilsMock);
    });
  });

  describe("given there are no lc configuration records", () => {
    const localCouncilsObjs = [];
    const localCouncilsMock = [];

    const mongoCursor = {
      project: () => {
        return {
          toArray: () => {
            return localCouncilsObjs;
          }
        };
      }
    };

    beforeEach(async () => {
      mongodb.MongoClient.connect.mockImplementation(() => ({
        db: () => ({
          collection: () => ({
            find: () => mongoCursor
          })
        })
      }));

      try {
        await getLocalCouncils();
      } catch (err) {
        result = err;
      }
    });

    it("should throw missing LA error", () => {
      expect(result.message).toBe("Local Authorities not found");
    });
  });
});

describe("Function: getCouncilDataByID", () => {
  let result;
  beforeEach(async () => {
    clearCosmosConnection();
  });
  describe("given the connection request throws an error", () => {
    beforeEach(async () => {
      mongodb.MongoClient.connect.mockImplementation(() => {
        throw new Error("example mongo error");
      });

      try {
        await getCouncilDataByID(8015);
      } catch (err) {
        result = err;
      }
    });

    it("should throw mongo connection error", () => {
      expect(result.message).toBe("example mongo error");
    });
  });
  describe("given the LA request returns null", () => {
    beforeEach(async () => {
      mongodb.MongoClient.connect.mockImplementation(() => ({
        db: () => ({
          collection: () => ({
            findOne: () => null
          })
        })
      }));

      try {
        await getCouncilDataByID(8015);
      } catch (err) {
        result = err;
      }
    });

    it("should throw error with appropriate message", () => {
      expect(result.message).toBe("LA not found (8015)");
    });
  });
  describe("given the request is successful", () => {
    const exampleResult = {
      _id: 8015,
      country: "wales",
      local_council: "Cardiff Council"
    };
    beforeEach(() => {
      mongodb.MongoClient.connect.mockClear();
      mongodb.MongoClient.connect.mockImplementation(() => ({
        db: () => ({
          collection: () => ({
            findOne: () => exampleResult
          })
        })
      }));
    });

    it("returns the correct value", async () => {
      await expect(getCouncilDataByID(8015)).resolves.toEqual(exampleResult);
    });
  });
});
