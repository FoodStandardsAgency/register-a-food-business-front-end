jest.mock("../connectors/status-db/status-db.connector");

const {
  getStatus,
  setStatus,
  incrementStatusCount
} = require("./status.service");

const {
  getStoredStatus,
  updateStoredStatus
} = require("../connectors/status-db/status-db.connector");

describe("status.service getStatus()", () => {
  let result;

  describe("given a statusName is provided", () => {
    beforeEach(async () => {
      getStoredStatus.mockImplementation(() => ({
        registrationsStarted: 0
      }));
      result = await getStatus("registrationsStarted");
    });

    it("should return the value of that status name", () => {
      expect(result).toBe(0);
    });
  });

  describe("given a statusName is provided that does not exist", () => {
    beforeEach(async () => {
      getStoredStatus.mockImplementation(() => ({
        exampleValid: "status value"
      }));
      result = await getStatus("notValid");
    });

    it("should return undefined", () => {
      expect(result).toBe(undefined);
    });
  });

  describe("given a statusName is not provided", () => {
    beforeEach(async () => {
      getStoredStatus.mockImplementation(() => ({
        registrationsStarted: 0,
        submissionsSucceeded: 0
      }));
      result = await getStatus();
    });

    it("should return the entire status object", () => {
      expect(result).toEqual({
        registrationsStarted: 0,
        submissionsSucceeded: 0
      });
    });
  });

  describe("given getStoredStatus throws error", () => {
    beforeEach(async () => {
      jest.clearAllMocks();
      getStoredStatus.mockImplementation(() => {
        throw new Error();
      });
      result = await getStatus();
    });

    it("should throw an error", () => {
      expect(result).toStrictEqual({});
    });
  });
});

describe("status.service setStatus()", () => {
  let result;

  describe("given a the supplied statusName does not exist", () => {
    beforeEach(async () => {
      updateStoredStatus.mockImplementation(() => "new value");
      result = await setStatus("newStatusItem", "new value");
    });

    it("should return the new value of the status name", () => {
      expect(result).toBe("new value");
    });
  });

  describe("given a the supplied statusName already exists", () => {
    beforeEach(async () => {
      updateStoredStatus.mockImplementation(() => false);
      result = await setStatus("mostRecentSubmitSucceeded", false);
    });

    it("should return the new value of the status name", () => {
      expect(result).toBe(false);
    });
  });

  describe("given setStatus throws error", () => {
    beforeEach(async () => {
      jest.clearAllMocks();
      updateStoredStatus.mockImplementation(() => {
        throw new Error();
      });
      result = await setStatus();
    });

    it("should throw an error", () => {
      expect(result).toBeUndefined();
    });
  });
});

describe("status.service incrementStatusCount()", () => {
  let result;

  describe("given existing status value is an integer", () => {
    beforeEach(async () => {
      getStoredStatus.mockImplementation(() => ({
        submissionsSucceeded: 0
      }));
      updateStoredStatus.mockImplementation(() => 1);
      result = await incrementStatusCount("submissionsSucceeded");
    });

    it("should return the updated value of the status name", () => {
      expect(result).toBe(1);
    });
  });

  describe("given existing status value is not an integer", () => {
    beforeEach(async () => {
      getStoredStatus.mockImplementation(() => ({
        mostRecentSubmitSucceeded: true
      }));

      try {
        result = await incrementStatusCount("mostRecentSubmitSucceeded");
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
  describe("given getStoredStatus throws an error", () => {
    beforeEach(async () => {
      getStoredStatus.mockImplementation(() => {
        throw new Error("getStoredStatus error");
      });

      result = await incrementStatusCount("mostRecentSubmitSucceeded");
    });

    it("should catch the error", () => {
      expect(result).toBe(undefined);
    });
  });
  describe("given updateStoredStatus throws an error", () => {
    beforeEach(async () => {
      getStoredStatus.mockImplementation(() => ({
        submissionsSucceeded: 0
      }));
      updateStoredStatus.mockImplementation(() => {
        throw new Error("updateStoredStatus error");
      });
      result = await incrementStatusCount("submissionsSucceeded");
    });

    it("should catch the error", () => {
      expect(result).toBe(undefined);
    });
  });
});
