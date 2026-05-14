jest.mock("axios");

const { Validator } = require("jsonschema");
const {
  fetchUsingPostcoderPremium,
  fetchUsingPostcoderStandard
} = require("./address-lookup-api.connector");
const axios = require("axios");
axios.defaults.validateStatus = () => true;
const smallAddressResponseJSON = require("./smallAddressResponseMock.json");
const regularIntegrationResponse = require("./regularIntegrationResponse.json");
const addressSchema = require("./addressSchema");

const v = new Validator();

let responseJSON;

describe("Connector: lookupAPI: ", () => {
  describe("Given a valid UK postcode:", () => {
    describe("Premium fetch", () => {
      beforeEach(async () => {
        axios.mockResolvedValue({
          data: smallAddressResponseJSON,
          status: 200
        });

        responseJSON = await fetchUsingPostcoderPremium("NR14 7PZ");
      });

      it("is in a valid format", () => {
        expect(v.validate(responseJSON, addressSchema).errors.length).toBe(0);
      });

      describe("When axios throws an error", () => {
        beforeEach(async () => {
          axios.mockRejectedValue(new Error("Network error"));
          responseJSON = await fetchUsingPostcoderPremium("NR14 7PZ");
        });

        it("should return null", () => {
          expect(responseJSON).toBeNull();
        });
      });
    });

    describe("Standard fetch", () => {
      describe("When given a 200 response from the API", () => {
        beforeEach(async () => {
          axios.mockResolvedValue({
            data: smallAddressResponseJSON,
            status: 200
          });

          responseJSON = await fetchUsingPostcoderStandard("NR14 7PZ");
        });

        it("is in a valid format", () => {
          expect(v.validate(responseJSON, addressSchema).errors.length).toBe(0);
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
            await fetchUsingPostcoderStandard("BS249ST");
          } catch (err) {
            result = err;
          }
          expect(result.message).toBe("Address lookup API responded with non-200 status: 500");
        });
      });
    });
  });
});
