jest.mock("../connectors/address-lookup/address-lookup-api.connector");
jest.mock("../services/statusEmitter.service");

const { Validator } = require("jsonschema");
const { getUkAddressesByPostcode } = require("./address.service");
const {
  getAddressesByPostcode
} = require("../connectors/address-lookup/address-lookup-api.connector");
const smallAddressResponseJSON = require("../connectors/address-lookup/smallAddressResponseMock.json");
const addressSchema = require("../connectors/address-lookup/addressSchema.js");

const v = new Validator();

describe("address.service getUkAddressesByPostcode()", () => {
  let response;

  describe("given a postcode argument", () => {
    beforeEach(async () => {
      getAddressesByPostcode.mockImplementation(() => smallAddressResponseJSON);

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

    it("calls getAddressesByPostcode with 'uk', a postcode, and a address limit of 500", () => {
      expect(getAddressesByPostcode).toHaveBeenCalledWith("NR14 7PZ", 500);
    });
  });

  describe("given the connector throws an error", () => {
    beforeEach(async () => {
      getAddressesByPostcode.mockImplementation(() => {
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
