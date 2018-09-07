jest.mock("../connectors/status/status.connector");

const {
  getStatus,
  setStatus,
  incrementStatusCount
} = require("./status.service");

const { getStoredStatus } = require("../connectors/status/status.connector");

describe("status.service getStatus()", () => {
  let result;

  describe("given a statusName is provided", () => {
    beforeEach(() => {
      getStoredStatus.mockImplementation(() => ({
        registrationsStarted: 0
      }));
      result = getStatus("registrationsStarted");
    });

    it("should return the value of that status name", () => {
      expect(result).toBe(0);
    });
  });

  describe("given a statusName is provided that does not exist", () => {
    beforeEach(() => {
      getStoredStatus.mockImplementation(() => ({
        exampleValid: "status value"
      }));
      result = getStatus("notValid");
    });

    it("should return undefined", () => {
      expect(result).toBe(undefined);
    });
  });

  describe("given a statusName is not provided", () => {
    beforeEach(() => {
      getStoredStatus.mockImplementation(() => ({
        registrationsStarted: 0,
        submissionsSucceeded: 0
      }));
      result = getStatus();
    });

    it("should return the entire status object", () => {
      expect(result).toEqual({
        registrationsStarted: 0,
        submissionsSucceeded: 0
      });
    });
  });
});

describe("status.service setStatus()", () => {
  let result;

  describe("given a the supplied statusName does not exist", () => {
    beforeEach(() => {
      getStoredStatus.mockImplementation(() => ({
        newStatusItem: "old value"
      }));
      result = setStatus("newStatusItem", "new value");
    });

    it("should return the new value of the status name", () => {
      expect(result).toBe("new value");
    });
  });

  describe("given a the supplied statusName already exists", () => {
    beforeEach(() => {
      getStoredStatus.mockImplementation(() => ({
        mostRecentSubmitSucceeded: true
      }));
      result = setStatus("mostRecentSubmitSucceeded", false);
    });

    it("should return the new value of the status name", () => {
      expect(result).toBe(false);
    });
  });
});

describe("status.service incrementStatusCount()", () => {
  let result;

  describe("given existing status value is an integer", () => {
    beforeEach(() => {
      getStoredStatus.mockImplementation(() => ({
        submissionsSucceeded: 0
      }));
      result = incrementStatusCount("submissionsSucceeded");
    });

    it("should return the updated value of the status name", () => {
      expect(result).toBe(1);
    });
  });

  describe("given existing status value is not an integer", () => {
    beforeEach(() => {
      getStoredStatus.mockImplementation(() => ({
        mostRecentSubmitSucceeded: true
      }));
      try {
        result = incrementStatusCount("mostRecentSubmitSucceeded");
      } catch (err) {
        result = err.message;
      }
    });

    it("should throw an error", () => {
      expect(result).toBe(
        `Status name "mostRecentSubmitSucceeded" is not an integer. Unable to increment.`
      );
    });
  });
});
