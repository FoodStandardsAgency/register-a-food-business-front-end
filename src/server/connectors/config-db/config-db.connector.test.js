const mongodb = require("mongodb");
const {
  getPathConfigByVersion,
  getLocalCouncils,
  clearPathConfigCache,
  getCouncilData
} = require("./config-db.connector");
const { clearCosmosConnection } = require("../cosmos.client");
const pathConfigMock = require("../../../__mocks__/pathConfigMock.json");
const { configVersionCollectionDouble } = require("./config-db.double");

jest.mock("mongodb");
jest.mock("./config-db.double");
jest.mock("../../services/statusEmitter.service");

describe("Function: getPathConfigByVersion", () => {
  let result;
  beforeEach(async () => {
    clearCosmosConnection();
    clearPathConfigCache();
  });
  describe("given the request has not yet been run during this process (empty cache)", () => {
    describe("When: connection to mongo is successful", () => {
      beforeEach(async () => {
        mongodb.MongoClient.connect.mockImplementation(() => ({
          db: () => ({
            collection: () => ({
              findOne: () => pathConfigMock
            })
          })
        }));
        result = await getPathConfigByVersion("1.0.0");
      });

      it("Should return an object", () => {
        expect(typeof result).toBe("object");
      });
    });
    describe("given the request throws an error", () => {
      beforeEach(async () => {
        process.env.DOUBLE_MODE = false;
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

    describe("given the request returns null", () => {
      beforeEach(async () => {
        process.env.DOUBLE_MODE = false;
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

    describe("When: topology is invalid", () => {
      const closeConnection = jest.fn();
      let result1, result2;
      beforeEach(async () => {
        mongodb.MongoClient.connect.mockImplementation(() => ({
          db: () => ({
            collection: () => ({
              findOne: () => pathConfigMock
            })
          }),
          topology: null,
          close: () => closeConnection()
        }));
        result1 = await getPathConfigByVersion("1.0.0");
        clearPathConfigCache();
        result2 = await getPathConfigByVersion("1.0.0");
      });

      it("Should close broken connection", () => {
        expect(closeConnection).toHaveBeenCalledTimes(1);
      });
      it("Should return identical, valid results both times", () => {
        expect(typeof result1).toBe("object");
        expect(typeof result2).toBe("object");
        expect(result1).toEqual(result2);
      });
    });

    describe("When: connection is lost", () => {
      const closeConnection = jest.fn();
      let result1, result2;
      beforeEach(async () => {
        mongodb.MongoClient.connect.mockImplementation(() => ({
          db: () => ({
            collection: () => ({
              findOne: () => pathConfigMock
            })
          }),
          topology: {
            isConnected: () => false
          },
          close: () => closeConnection()
        }));
        result1 = await getPathConfigByVersion("1.0.0");
        clearPathConfigCache();
        result2 = await getPathConfigByVersion("1.0.0");
      });

      it("Should close broken connection", () => {
        expect(closeConnection).toHaveBeenCalledTimes(1);
      });
      it("Should return identical, valid results both times", () => {
        expect(typeof result1).toBe("object");
        expect(typeof result2).toBe("object");
        expect(result1).toEqual(result2);
      });
    });

    describe("when running in double mode", () => {
      beforeEach(() => {
        process.env.DOUBLE_MODE = true;
        configVersionCollectionDouble.findOne.mockImplementation(
          () => pathConfigMock
        );
      });

      it("should resolve with the data from the double's findOne() response", async () => {
        await expect(getPathConfigByVersion("1.0.0")).resolves.toEqual(
          pathConfigMock
        );
      });
    });

    describe("When: two db calls are made", () => {
      const closeConnection = jest.fn();
      let result1, result2;
      beforeEach(async () => {
        process.env.DOUBLE_MODE = false;
        mongodb.MongoClient.connect.mockImplementation(() => ({
          db: () => ({
            collection: () => ({
              findOne: () => pathConfigMock
            })
          }),
          topology: {
            isConnected: () => true
          },
          close: () => closeConnection()
        }));
        result1 = await getPathConfigByVersion("1.0.0");
        clearPathConfigCache();
        result2 = await getPathConfigByVersion("1.0.0");
      });

      it("Should return identical, valid results both times", () => {
        expect(typeof result1).toBe("object");
        expect(typeof result2).toBe("object");
        expect(result1).toEqual(result2);
      });
      it("Should not close connection", () => {
        expect(closeConnection).toHaveBeenCalledTimes(0);
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
        }),
        topology: {
          isConnected: () => true
        }
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

describe("Function: getLocalCouncils", () => {
  let result;
  beforeEach(async () => {
    clearCosmosConnection();
  });
  describe("given the request throws an error", () => {
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

    describe("when the error shows that the connection has failed", () => {
      it("should throw mongoConnectionError error", () => {
        expect(result.name).toBe("mongoConnectionError");
        expect(result.message).toBe("example mongo error");
      });
    });
  });

  describe("given the request returns null", () => {
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

    it("should throw mongoConnectionError error", () => {
      expect(result.name).toBe("mongoConnectionError");
      expect(result.message).toBe("Cannot read property 'length' of null");
    });
  });

  describe("given the request is successful", () => {
    const localCouncilsObjs = [
      { local_council_url: "cardiff" },
      { local_council_url: "the-vale-of-glamorgan" }
    ];

    const localCouncilsMock = ["cardiff", "the-vale-of-glamorgan"];

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

    beforeEach(() => {
      mongodb.MongoClient.connect.mockImplementation(() => ({
        db: () => ({
          collection: () => ({
            find: () => mongoCursor
          })
        })
      }));
    });

    it("should return an empty array and not throw an exception", async () => {
      await expect(getLocalCouncils()).resolves.toEqual(localCouncilsMock);
    });
  });
});

describe("Function: getCouncilData", () => {
  let result;
  beforeEach(async () => {
    clearCosmosConnection();
  });
  describe("given the request throws an error", () => {
    beforeEach(async () => {
      mongodb.MongoClient.connect.mockImplementation(() => {
        throw new Error("example mongo error");
      });

      try {
        await getCouncilData("cardiff");
      } catch (err) {
        result = err;
      }
    });

    it("should throw mongoConnectionError error", () => {
      expect(result.name).toBe("mongoConnectionError");
      expect(result.message).toBe("example mongo error");
    });
  });
  describe("given the request returns null", () => {
    beforeEach(async () => {
      mongodb.MongoClient.connect.mockImplementation(() => ({
        db: () => ({
          collection: () => ({
            findOne: () => null
          })
        })
      }));

      try {
        await getCouncilData("cardiff");
      } catch (err) {
        result = err;
      }
    });

    it("should throw mongoConnectionError error with custom message", () => {
      expect(result.name).toBe("mongoConnectionError");
      expect(result.message).toBe("getCouncilData retrieved null");
    });
  });
  describe("given the request is successful", () => {
    const exampleResult = {
      local_council_url: "cardiff",
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
      await expect(getCouncilData("cardiff")).resolves.toEqual(exampleResult);
    });
  });
});
