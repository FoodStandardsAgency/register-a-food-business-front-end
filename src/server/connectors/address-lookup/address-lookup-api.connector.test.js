jest.mock("axios");
jest.mock("./address-lookup-api.double");

const { Validator } = require("jsonschema");
const { getAddressesByPostcode } = require("./address-lookup-api.connector");
const axios = require("axios");
const smallAddressResponseJSON = require("./smallAddressResponseMock.json");
const regularIntegrationResponse = require("./regularIntegrationResponse.json");
const addressSchema = require("./addressSchema");
const { addressLookupDouble } = require("./address-lookup-api.double");

const v = new Validator();

let responseJSON;

describe("Connector: lookupAPI: ", () => {
  beforeEach(() => {
    process.env.DOUBLE_MODE = "false";
  });

  describe("Given a valid UK postcode:", () => {
    beforeEach(async () => {
      axios.mockResolvedValue({
        data: smallAddressResponseJSON,
        status: 200
      });

      responseJSON = await getAddressesByPostcode("NR14 7PZ");
    });

    it("is in a valid format", () => {
      expect(v.validate(responseJSON, addressSchema).errors.length).toBe(0);
    });

    describe("When DOUBLE_MODE is set", () => {
      beforeEach(async () => {
        process.env.DOUBLE_MODE = "true";
        addressLookupDouble.mockImplementation(() => ({
          data: regularIntegrationResponse,
          status: 200
        }));

        responseJSON = await getAddressesByPostcode("BS249ST");
      });

      afterEach(() => {
        process.env.DOUBLE_MODE = "false";
      });

      it("should return the regular integration response", () => {
        expect(responseJSON).toEqual(regularIntegrationResponse);
      });
    });

    describe("When given a non-200 response from the API", () => {
      beforeEach(async () => {
        axios.mockResolvedValue({
          status: 500
        });
      });

      it("should throw an error", async () => {
        let result;
        try {
          await getAddressesByPostcode("BS249ST", 100);
        } catch (err) {
          result = err;
        }
        expect(result.message).toBe(
          "Address lookup API responded with non-200 status: 500"
        );
      });
    });
    describe("When premium service returns no addresses but standard service returns some addresses", () => {
      beforeEach(async () => {
        axios.mockResolvedValue({
          status: 200,
          data: regularIntegrationResponse
        });
        axios.mockResolvedValueOnce({
          status: 200,
          data: []
        });
        responseJSON = await getAddressesByPostcode("BS249ST");
      });

      it("should return the regular integration response", () => {
        expect(responseJSON).toEqual(regularIntegrationResponse);
      });
    });
    describe("When given a non-200 response from the API on second attempt", () => {
      beforeEach(async () => {
        axios.mockResolvedValue({
          status: 500
        });
        axios.mockResolvedValueOnce({
          status: 200,
          data: []
        });
      });

      it("should throw an error", async () => {
        let result;
        try {
          await getAddressesByPostcode("BS249ST", 100);
        } catch (err) {
          result = err;
        }
        expect(result.message).toBe(
          "Address lookup API responded with non-200 status: 500"
        );
      });
    });
  });

  describe("Given an invalid UK postcode:", () => {
    beforeEach(async () => {
      axios.mockResolvedValue({
        data: [],
        status: 200
      });

      responseJSON = await getAddressesByPostcode("invalid postcode");
    });

    it("should return an empty array", () => {
      expect(responseJSON).toEqual([]);
    });

    describe("When DOUBLE_MODE is set", () => {
      beforeEach(async () => {
        process.env.DOUBLE_MODE = "true";
        addressLookupDouble.mockImplementation(() => ({
          data: [],
          status: 200
        }));

        responseJSON = await getAddressesByPostcode("invalid postcode");
      });

      afterEach(() => {
        process.env.DOUBLE_MODE = "false";
      });

      it("should return an empty array", () => {
        expect(responseJSON).toEqual([]);
      });
    });
  });
});
