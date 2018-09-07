const {
  getStatus,
  setStatus,
  incrementStatusCount
} = require("./status.service");

describe("status.service getStatus()", () => {
  let result;

  describe("given a statusName is provided", () => {
    beforeEach(() => {
      result = getStatus("registrationsStarted");
    });

    it("should return the value of that status name", () => {
      expect(result).toBe(0);
    });
  });

  describe("given a statusName is provided that does not exist", () => {
    beforeEach(() => {
      result = getStatus("notValid");
    });

    it("should return undefined", () => {
      expect(result).toBe(undefined);
    });
  });

  describe("given a statusName is not provided", () => {
    beforeEach(() => {
      result = getStatus();
    });

    it("should return the entire status object", () => {
      expect(result).toEqual({
        registrationsStarted: 0,
        submissionsSucceeded: 0,
        submissionsFailed: 0,
        addressLookups: 0,
        mostRecentSubmitSucceeded: true,
        mostRecentAddressLookupSucceeded: true
      });
    });
  });
});

describe("status.service setStatus()", () => {
  let result;

  describe("given a the supplied statusName does not exist", () => {
    beforeEach(() => {
      result = setStatus("newStatusItem", "value");
    });

    it("should return the new value of the status name", () => {
      expect(result).toBe("value");
    });
  });

  describe("given a the supplied statusName already exists", () => {
    beforeEach(() => {
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
      result = incrementStatusCount("submissionsSucceeded");
    });

    it("should return the updated value of the status name", () => {
      expect(result).toBe(1);
    });
  });

  describe("given existing status value is not an integer", () => {
    beforeEach(() => {
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
