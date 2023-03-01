jest.mock("axios");
const { logEmitter } = require("../../services/logging.service");
const connector = require("./local-authority-lookup-api.connector");
const mockAxios = require("axios");
const {
  getLocalAuthorityIDByPostcode
} = require("./local-authority-lookup-api.connector");
const {
  fetchUsingMapItApi
} = require("./local-authority-lookup-api.connector");

const testPostcode = "NR147PZ";

describe("Local Authority Lookup API Connector", () => {
  let res;
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe("given 200 response and shortcuts.council", () => {
    beforeEach(async () => {
      const mockResponse = {
        data: { shortcuts: { council: 123 } },
        status: 200
      };
      mockAxios.mockResolvedValue(mockResponse);

      res = await connector.getLocalAuthorityIDByPostcode(testPostcode);
    });
    it("should return mapit id for local authority", () => {
      expect(res).toEqual(123);
    });
  });

  describe("given 200 response and shortcuts.council.district", () => {
    beforeEach(async () => {
      const mockResponse = {
        data: { shortcuts: { council: { district: 123 } } },
        status: 200
      };
      mockAxios.mockResolvedValue(mockResponse);

      res = await connector.getLocalAuthorityIDByPostcode(testPostcode);
    });
    it("should return mapit id for local authority", () => {
      expect(res).toEqual(123);
    });
  });

  describe("given 200 response and missing shortcuts.council", () => {
    beforeEach(async () => {
      const mockResponse = {
        data: { shortcuts: {} },
        status: 200
      };
      mockAxios.mockResolvedValue(mockResponse);

      res = await connector.getLocalAuthorityIDByPostcode(testPostcode);
    });
    it("should return false", () => {
      expect(res).toBe(false);
    });
  });

  describe("given non 200 response", () => {
    beforeEach(async () => {
      const mockResponse = {
        data: { shortcuts: { council: { district: 123 } } },
        status: 500
      };
      mockAxios.mockResolvedValue(mockResponse);

      res = await connector.getLocalAuthorityIDByPostcode(testPostcode);
    });
    it("should return false", () => {
      expect(res).toBe(false);
    });
  });

  describe("given 200 response and shortcuts.council is not a number", () => {
    beforeEach(async () => {
      const mockResponse = {
        data: { shortcuts: { council: "NaN" } },
        status: 200
      };
      mockAxios.mockResolvedValue(mockResponse);

      res = await connector.getLocalAuthorityIDByPostcode(testPostcode);
    });
    it("should return false", () => {
      expect(res).toBe(false);
    });
  });

  describe("given the api throws an error", () => {
    let spy;
    beforeEach(async () => {
      mockAxios.mockImplementationOnce(() => {
        throw new Error("Some error");
      });
      spy = jest.spyOn(logEmitter, "emit");
      res = await connector.getLocalAuthorityIDByPostcode(testPostcode);
    });
    it("has catch error, log it and return false", () => {
      expect(res).toBe(false);
      expect(spy).toHaveBeenLastCalledWith(
        "functionFail",
        "local-authority-lookup-api.connector",
        "getLocalAuthorityIDByPostcode",
        "fetchUsingMapItApi response is empty"
      );
    });
  });
});
