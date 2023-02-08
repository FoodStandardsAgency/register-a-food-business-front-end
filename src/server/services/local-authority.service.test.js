jest.mock(
  "../connectors/local-authority-lookup/local-authority-lookup-api.connector"
);
jest.mock("../services/statusEmitter.service");
jest.mock(
  "../connectors/local-authority-lookup/local-authority-lookup-api.connector",
  () => ({
    getLocalAuthorityIDByPostcode: jest.fn(),
    getCouncilDataByMapitID: jest.fn()
  })
);
jest.mock("./local-authority.service", () => ({
  getLocalAuthorityByPostcode: jest.fn()
}));

const { Validator } = require("jsonschema");
const v = new Validator();

const {
  getLocalAuthorityIDByPostcode
} = require("../connectors/local-authority-lookup/local-authority-lookup-api.connector");
const { getLocalAuthorityByPostcode } = require("./local-authority.service");
const {
  getCouncilDataByID,
  getCouncilDataByMapitID
} = require("../connectors/config-db/config-db.connector");
const { statusEmitter } = require("../services/statusEmitter.service");
const { logEmitter } = require("./logging.service");

describe("local-authority.service getLocalAuthorityByPostcode()", () => {
  let response;
  const postcode = "NR14 7PZ";

  describe("given a postcode argument", () => {
    beforeEach(async () => {
      getLocalAuthorityByPostcode.mockImplementation(() => postcode);
      response = await getLocalAuthorityIDByPostcode(postcode);
    });

    it("calls getLocalAuthorityIDByPostcode with 'uk', a postcode", () => {
      expect(getLocalAuthorityIDByPostcode).toHaveBeenCalledWith("NR14 7PZ");
    });
  });

  describe("given the connector throws an error", () => {
    beforeEach(async () => {
      getLocalAuthorityByPostcode.mockImplementation(() => {
        throw new Error("Some error");
      });

      try {
        response = await getLocalAuthorityIDByPostcode("NR14 7PZ");
      } catch (err) {
        response = err;
      }
    });

    it("Should return undefined", () => {
      expect(response).toEqual(undefined);
    });
  });
});
