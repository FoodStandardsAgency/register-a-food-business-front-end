jest.mock("axios");

jest.mock("../connectors/config-db/config-db.connector");

const axios = require("axios");

const { logEmitter } = require("./logging.service");

const { getLocalAuthorityByPostcode } = require("./local-authority.service");
const {
  getLocalAuthorityIDByPostcode
} = require("../connectors/local-authority-lookup/local-authority-lookup-api.connector");
const {
  getCouncilDataByMapitID
} = require("../connectors/config-db/config-db.connector");
const { response } = require("express");

describe("local-authority.service getLocalAuthorityByPostcode()", () => {
  let res;
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("given a valid postcode", () => {
    beforeEach(async () => {
      getCouncilDataByMapitID.mockResolvedValue({
        local_council: "Test council",
        local_council_url: "test-council"
      });
      axios.mockResolvedValue({
        data: { shortcuts: { council: 2350 } },
        status: 200
      });
      res = await getLocalAuthorityByPostcode("NR14 7PZ");
    });

    it("have been called with map it id", () => {
      expect(getCouncilDataByMapitID).toHaveBeenCalledWith(2350);
    });
    it("response have been defined", () => {
      expect(res).toBeDefined();
    });
    it("returns a local authority", () => {
      expect(getCouncilDataByMapitID).toHaveBeenCalledWith(2350);
      expect(res.local_council_url).toBe("test-council");
    });
  });

  describe("given that local council have generation ID", () => {
    beforeEach(async () => {
      getCouncilDataByMapitID.mockResolvedValue({
        local_council: "Test council",
        local_council_url: "test-council",
        mapit_generation: 34
      });
      axios.mockResolvedValue({
        data: { shortcuts: { council: 2350 } },
        status: 200
      });

      res = await getLocalAuthorityByPostcode("NR14 7PZ");
    });

    it("getCouncilDataByMapitID have been called twice", () => {
      expect(getCouncilDataByMapitID).toHaveBeenCalledTimes(2);
    });
    it("have been called with map it id", () => {
      expect(getCouncilDataByMapitID).toHaveBeenCalledWith(2350);
    });
    it("response have been defined", () => {
      expect(res).toBeDefined();
    });
    it("returns a local authority", () => {
      expect(getCouncilDataByMapitID).toHaveBeenCalledWith(2350);
      expect(res.local_council_url).toBe("test-council");
    });
  });

  describe("given a invalid postcode", () => {
    beforeEach(async () => {
      getCouncilDataByMapitID.mockResolvedValue({
        local_council: "Test council",
        local_council_url: "test-council",
        mapit_generation: 34
      });
      axios.mockResolvedValue({
        status: 500
      });

      res = await getLocalAuthorityByPostcode("NR14 7PZ");
    });

    it("getCouncilDataByMapitID have not been called", () => {
      expect(getCouncilDataByMapitID).toHaveBeenCalledTimes(0);
    });
    it("response have been defined", () => {
      expect(res).toBeDefined();
    });
    it("returns false", () => {
      expect(res).toBe(false);
    });
  });

  describe("given the connector throws an error", () => {
    let spy;
    beforeEach(async () => {
      getCouncilDataByMapitID.mockImplementationOnce(() => {
        throw new Error("Some error");
      });
      axios.mockResolvedValue({
        data: { shortcuts: { council: 2350 } },
        status: 200
      });

      spy = jest.spyOn(logEmitter, "emit");

      res = await getLocalAuthorityByPostcode("NR14 7PZ");
    });

    it("has catch and log error", () => {
      expect(spy).toHaveBeenLastCalledWith(
        "functionFail",
        "local-authority.service",
        "getLocalAuthorityByPostcode",
        new Error("Some error")
      );
    });
    it("response have been defined", () => {
      expect(res).toBeDefined();
    });
    it("returns false", () => {
      expect(res).toBe(false);
    });
  });
});
