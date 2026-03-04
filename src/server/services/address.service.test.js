jest.mock("../connectors/address-lookup/address-lookup-api.connector");
jest.mock("../services/logging.service", () => ({
  logEmitter: {
    emit: jest.fn()
  }
}));

const { logEmitter } = require("./logging.service");
const { Validator } = require("jsonschema");
const { getUkAddressesByPostcode } = require("./address.service");
const {
  fetchUsingPostcoderPremium,
  fetchUsingPostcoderStandard
} = require("../connectors/address-lookup/address-lookup-api.connector");
const service = require("./address.service");

const smallAddressResponseJSON = require("../connectors/address-lookup/smallAddressResponseMock.json");
const addressSchema = require("../connectors/address-lookup/addressSchema.js");

const v = new Validator();

describe("address.service getUkAddressesByPostcode()", () => {
  let response;

  describe("given a postcode argument", () => {
    beforeEach(async () => {
      fetchUsingPostcoderPremium.mockResolvedValue(smallAddressResponseJSON);
      fetchUsingPostcoderStandard.mockResolvedValue([]);

      response = await getUkAddressesByPostcode("NR14 7PZ");
    });

    it("returns an array", () => {
      expect(Array.isArray(response)).toBe(true);
    });

    it("does not modify the response of the lookup API such that it is in an invalid format", () => {
      expect(v.validate(response, addressSchema).errors.length).toBe(0);
    });

    it("returns the same number of addresses as the response of the lookup API", () => {
      expect(response.length).toEqual(smallAddressResponseJSON.length);
    });

    it("calls fetchUsingPostcoderPremium with a valid postcode", () => {
      expect(fetchUsingPostcoderPremium).toHaveBeenCalledWith("NR14 7PZ");
    });
  });

  describe("given the connector throws an error", () => {
    beforeEach(async () => {
      fetchUsingPostcoderPremium.mockResolvedValue([]);
      fetchUsingPostcoderStandard.mockImplementation(() => {
        throw new Error("Some error");
      });

      try {
        response = await getUkAddressesByPostcode("NR14 7PZ");
      } catch (err) {
        response = err;
      }
    });

    it("Should return an empty array", () => {
      expect(response).toEqual([]);
    });
  });

  describe("given the postcoder premium fails and standard succeeds", () => {
    beforeEach(async () => {
      fetchUsingPostcoderPremium.mockResolvedValue([]);
      fetchUsingPostcoderStandard.mockResolvedValue(smallAddressResponseJSON);

      response = await getUkAddressesByPostcode("NR14 7PZ");
    });

    it("standard should return a valid response", () => {
      expect(fetchUsingPostcoderStandard).toHaveBeenCalled();
      expect(response.length).toBe(smallAddressResponseJSON.length);
    });
  });

  describe("given the function filters out incomplete addresses", () => {
    beforeEach(async () => {
      fetchUsingPostcoderPremium.mockResolvedValue([
        { addressline1: "1 High Street", posttown: "Norwich" },
        { addressline1: "", posttown: "Norwich" },
        { addressline1: "1 High Street", posttown: "   " }
      ]);
      fetchUsingPostcoderStandard.mockResolvedValue([]);

      response = await getUkAddressesByPostcode("NR14 7PZ");
    });

    it("only valid addresses should be returned", () => {
      expect(response.length).toBe(1);
      expect(response[0].addressline1).toBe("1 High Street");
      expect(response[0].posttown).toBe("Norwich");
    });
  });

  describe("given we want to differentiate between no returned addresses and no complete returned addresses", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("logs display 'no addresses' when there are no addresses in the API response", async () => {
      fetchUsingPostcoderPremium.mockResolvedValue([]);
      fetchUsingPostcoderStandard.mockResolvedValue([]);

      response = await getUkAddressesByPostcode("NR14 7PZ");

      expect(response).toEqual([]);

      expect(logEmitter.emit).toHaveBeenCalledWith("info", "Postcoder returned no addresses", {
        postcode: "NR14 7PZ"
      });

      expect(logEmitter.emit).not.toHaveBeenCalledWith(
        "info",
        "Postcoder returned no complete addresses",
        {
          postcode: "NR14 7PZ"
        }
      );
    });

    it("logs display 'no complete addresses' when there are no COMPLETE addresses in the API response", async () => {
      fetchUsingPostcoderPremium.mockResolvedValue([
        { addressline1: "", posttown: "Norwich" },
        { addressline1: "1 High Street", posttown: "" }
      ]);

      const response = await getUkAddressesByPostcode("NR14 7PZ");

      expect(response).toEqual([]);

      expect(logEmitter.emit).toHaveBeenCalledWith(
        "info",
        "Postcoder returned no complete addresses",
        { postcode: "NR14 7PZ" }
      );

      expect(logEmitter.emit).not.toHaveBeenCalledWith("info", "Postcoder returned no addresses", {
        postcode: "NR14 7PZ"
      });
    });
  });

  describe("given the Postcoder returns a null", () => {
    it("response is an empty array", async () => {
      fetchUsingPostcoderPremium.mockResolvedValue(null);
      fetchUsingPostcoderStandard.mockResolvedValue(null);

      response = await getUkAddressesByPostcode("NR14 7PZ");

      expect(response).toEqual([]);
    });

    it("filterOutIncompleteAddresses is not called", async () => {
      fetchUsingPostcoderPremium.mockResolvedValue(null);
      fetchUsingPostcoderStandard.mockResolvedValue(null);

      const spy = jest.spyOn(service, "filterOutIncompleteAddresses");

      await service.getUkAddressesByPostcode("NR14 7PZ");

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
