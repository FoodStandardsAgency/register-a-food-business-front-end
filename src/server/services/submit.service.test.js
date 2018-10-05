const { submit } = require("./submit.service");
jest.mock("../connectors/registration/registration.connector");
const {
  sendRequest
} = require("../connectors/registration/registration.connector");

describe("Function: submit", () => {
  let result;

  describe("When sendRequest succeeds", () => {
    beforeEach(async () => {
      sendRequest.mockImplementation(() => {
        return { json: jest.fn() };
      });
      result = await submit({ data: "data" }, "1.0.0");
    });

    it("Should call sendRequest with stringified data and path config", () => {
      expect(sendRequest).toBeCalledWith('{"data":"data"}', "1.0.0");
    });

    it("Should return the response", () => {
      expect(result.json).toBeDefined();
    });
  });

  describe("When sendRequest errors", () => {
    beforeEach(async () => {
      sendRequest.mockImplementation(() => {
        throw new Error("FAIL");
      });
      result = await submit({ data: "data" }, "1.0.0");
    });

    it("Should catch the error", () => {
      expect(result.message).toBe("FAIL");
    });
  });
});
