jest.mock("axios");
jest.mock("./local-authority-lookup-api.connector");
jest.mock("./local-authority-lookup-api.connector", () => ({
  getLocalAuthorityIDByPostcode: jest.fn(),
  getCouncilDataByMapitID: jest.fn(),
  fetchUsingMapItApi: jest.fn()
}));

const { Validator } = require("jsonschema");
const axios = require("axios");
axios.defaults.validateStatus = () => true;
const {
  getLocalAuthorityIDByPostcode
} = require("./local-authority-lookup-api.connector");
const {
  fetchUsingMapItApi
} = require("./local-authority-lookup-api.connector");
const addressSchema = require("../address-lookup/addressSchema");
const smallAddressResponseJSON = require("../address-lookup/smallAddressResponseMock.json");
const v = new Validator();

const testPostcode = "NR14 7PZ";

let responseJSON;
let res;

describe("Local Authority Lookup API Connector", () => {
  describe("Given a valid UK postcode:", () => {
    beforeEach(async () => {
      axios.mockResolvedValue({
        data: smallAddressResponseJSON,
        status: 200
      });
      responseJSON = await getLocalAuthorityIDByPostcode(testPostcode);
    });
    it("is in a valid format", () => {
      expect(v.validate(responseJSON, addressSchema).errors.length).toBe(0);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
  });

  describe("Given a valid UK postcode:", () => {
    beforeEach(async () => {
      fetchUsingMapItApi.mockResolvedValue({
        data: testPostcode,
        status: 200
      });

      res = await fetchUsingMapItApi(testPostcode);
    });
    it("is returning an correct api response", () => {
      expect(res.data).toBe(testPostcode);
    });
    it("is returning a correct api response status code", () => {
      expect(res.status).toBe(200);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
  });

  /*
  describe("When given a non-200 response from the API", () => {
    let result;
    beforeEach(async () => {
      axios.mockResolvedValue({
        status: 500
      });
      result = await fetchUsingMapItApi(testPostcode);
    });

    it("should throw an error", async () => {
      expect(result).toBe("MapIt API responded with non-200 status: 500");
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
  });
  */
  describe("Given the return value of getLocalAuthorityIDByPostcode", () => {
    beforeEach(async () => {
      fetchUsingMapItApi.mockResolvedValue({
        data: testPostcode,
        status: 200
      });

      res = getLocalAuthorityIDByPostcode(testPostcode);
    });

    it("it returns the local authority id", () => {
      expect(res)
        .toBe //local authoriy id);
        ();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
  });
});
