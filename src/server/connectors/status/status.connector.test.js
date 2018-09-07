const { getStoredStatus } = require("./status.connector");

describe("Function: getStoredStatus", () => {
  let result;

  beforeEach(() => {
    result = getStoredStatus();
  });

  it("Should return an object", () => {
    expect(typeof result).toBe("object");
  });
});
