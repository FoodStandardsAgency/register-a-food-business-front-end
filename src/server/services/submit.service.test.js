jest.mock("../connectors/registration/registration.connector");

const { submit } = require("./submit.service");
const { sendRequest } = require("../connectors/registration/registration.connector");

describe("Function: submit", () => {
  let result;

  describe("When sendRequest succeeds", () => {
    beforeEach(async () => {
      sendRequest.mockImplementation(() => {
        return { data: {} };
      });
      result = await submit({ data: "data" }, "1.0.0", "s3s51onI6");
    });

    it("Should call sendRequest with data and path config", () => {
      expect(sendRequest).toBeCalledWith({ data: "data" }, "1.0.0", "s3s51onI6");
    });

    it("Should return the response", () => {
      expect(result.data).toBeDefined();
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
