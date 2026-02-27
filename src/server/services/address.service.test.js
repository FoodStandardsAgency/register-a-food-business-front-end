jest.mock("../connectors/address-lookup/address-lookup-api.connector");

const { Validator } = require("jsonschema");
const { getUkAddressesByPostcode } = require("./address.service");
const {
  fetchUsingPostcoderPremium,
  fetchUsingPostcoderStandard
} = require("../connectors/address-lookup/address-lookup-api.connector");

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
});
