jest.mock("axios");
jest.mock("../services/statusEmitter.service");
jest.mock("../services/logging.service");
jest.mock("./local-authority.service");
jest.mock(
  "../connectors/local-authority-lookup/local-authority-lookup-api.connector"
);
jest.mock("../connectors/config-db/config-db.connector");

const mockAxios = require("axios");

const { getLocalAuthorityByPostcode } = require("./local-authority.service");
const {
  getLocalAuthorityIDByPostcode
} = require("../connectors/local-authority-lookup/local-authority-lookup-api.connector");
const {
  getCouncilDataByMapitID
} = require("../connectors/config-db/config-db.connector");
const { response } = require("express");

describe("local-authority.service getLocalAuthorityByPostcode()", () => {
  let localAuthorityMapitID, councilRecord, res;
  const postcode = "NR14 7PZ";
  const mapItID = 2000;
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("given a valid postcode argument", () => {
    beforeEach(async () => {
      let mockResponse = {
        data: { councilRecord: { local_council_url: "test url" } },
        status: 200
      };
      mockAxios.mockResolvedValue(mockResponse);

      getLocalAuthorityIDByPostcode.mockImplementationOnce(() => postcode);
      localAuthorityMapitID = await getLocalAuthorityIDByPostcode(postcode);

      getCouncilDataByMapitID.mockImplementationOnce(() => mapItID);
      councilRecord = await getCouncilDataByMapitID(localAuthorityMapitID);

      res = await getLocalAuthorityByPostcode(postcode);
    });
    it("returns a local authority map it id", () => {
      expect(getLocalAuthorityByPostcode).toHaveBeenCalledWith(postcode);
    });

    it("should return with a local authoity", async () => {
      expect(res).toHaveBeenCalledWith("test url");
    });
  });

  describe("given a invalid postcode argument", () => {
    beforeEach(async () => {
      getLocalAuthorityIDByPostcode.mockImplementationOnce(() => null);
      getCouncilDataByMapitID.mockImplementationOnce(() => null);

      res = await getLocalAuthorityByPostcode(postcode);
    });
    it("returns a local authority map it id", async () => {
      expect(res).toEqual(false);
    });

    it("should return with a local authoity", async () => {
      expect(res).not.toHaveBeenCalledWith();
    });
  });
});
/*
  describe("given the connector throws an error", () => {
    beforeEach(async () => {
      getLocalAuthorityByPostcode.mockImplementationOnce(() => {
        throw new Error("Some error");
      });

      try {
        res = await getLocalAuthorityByPostcode("NR14 7PZ");
      } catch (err) {
        res = err;
      }
    });

    it("Should return that error", () => {
      expect(res).toEqual(res);
    });
  });
  });
  */
