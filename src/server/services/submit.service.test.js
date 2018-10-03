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
      result = await submit({ data: "data" }, "dummy path config");
    });

    it("Should call sendRequest with stringified data and path config", () => {
      expect(sendRequest).toBeCalledWith(
        '{"data":"data"}',
        "dummy path config"
      );
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
      result = await submit({ data: "data" }, "dummy path config");
    });

    it("Should catch the error", () => {
      expect(result.message).toBe("FAIL");
    });
  });
});
