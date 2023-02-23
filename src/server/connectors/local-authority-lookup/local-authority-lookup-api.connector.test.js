jest.mock("axios");
const connector = require("./local-authority-lookup-api.connector");
const mockAxios = require("axios");
const {
  getLocalAuthorityIDByPostcode
} = require("./local-authority-lookup-api.connector");
const {
  fetchUsingMapItApi
} = require("./local-authority-lookup-api.connector");

const testPostcode = "NR147PZ";
let res;

describe("Local Authority Lookup API Connector", () => {
  it("should return local authority id when response status is 200", async () => {
    const mockResponse = {
      data: { shortcuts: { council: 123 } },
      status: 200
    };
    mockAxios.mockResolvedValue(mockResponse);

    const localAuthorityID = await connector.getLocalAuthorityIDByPostcode(
      testPostcode
    );

    expect(localAuthorityID).toEqual(123);
    expect(mockResponse.status).toBe(200);
  });

  describe("getLocalAuthorityIDByPostcode", () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it("returns the local authority id when the API response is valid", async () => {
      const mockResponse = {
        data: { shortcuts: { council: { district: 123 } } },
        status: 200
      };
      mockAxios.mockResolvedValue(mockResponse);

      const localAuthorityID = await connector.getLocalAuthorityIDByPostcode(
        testPostcode
      );
      //console.log(localAuthorityID);
      expect(localAuthorityID).toEqual(123);
    });

    it("returns false when the API response is missing the local authority id when council is empty", async () => {
      const mockResponse = {
        shortcuts: {
          council: {}
        }
      };
      mockAxios.mockResolvedValueOnce(mockResponse);

      const result = await fetchUsingMapItApi("AB12 3CD");

      expect(result).toBeFalsy();
    });
    it("returns false when the API response is missing the local authority id when district is empty", async () => {
      const nAn = "not a number";
      const mockResponse = {
        shortcuts: {
          council: { district: { nAn } }
        }
      };
      mockAxios.mockResolvedValueOnce(mockResponse);

      const result = await fetchUsingMapItApi("AB12 3CD");

      expect(result).toBeFalsy();
    });

    it("returns false when the API response is empty", async () => {
      // Set up the mock API response
      mockAxios.mockResolvedValueOnce(null);

      // Call the function
      const result = await getLocalAuthorityIDByPostcode("AB12 3CD", 1);

      // Assert that the result is false
      expect(result).toBeFalsy();
    });

    it("returns false when the API call fails", async () => {
      // Set up the mock API response
      mockAxios.mockRejectedValueOnce(new Error("API error"));

      // Call the function
      const result = await getLocalAuthorityIDByPostcode("AB12 3CD", 1);

      // Assert that the result is false
      expect(result).toBeFalsy();
      expect.hasAssertions();
    });
    describe("Given Invalid inputs:", () => {
      it("given a 500 should return false", async () => {
        const mockResponse = {
          data: {
            postcode: testPostcode,
            status: 500
          }
        };
        mockAxios.mockResolvedValue(mockResponse);

        res = await connector.fetchUsingMapItApi(testPostcode);

        expect(res).toEqual(false);
      });
      afterEach(() => {
        jest.clearAllMocks();
      });
    });
  });
});
