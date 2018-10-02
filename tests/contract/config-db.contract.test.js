const {
  getPathConfigByVersion
} = require("../../src/server/connectors/config-db/config-db.connector");

let realResponse;
let doubleResponse;

describe("config-db.connector contract: getPathConfigByVersion", () => {
  describe("Given a valid request", () => {
    beforeEach(async () => {
      process.env.DOUBLE_MODE = false;
      realResponse = await getPathConfigByVersion("1.0.0");

      process.env.DOUBLE_MODE = true;
      doubleResponse = await getPathConfigByVersion("1.0.0");
    });

    it("real and double responses should both return path data", () => {
      expect(realResponse["/index"].on).toBeDefined();
      expect(realResponse["/index"].switches).toBeDefined();

      expect(doubleResponse["/index"].on).toBeDefined();
      expect(doubleResponse["/index"].switches).toBeDefined();
    });
  });

  describe("Given a valid request that does not match a known version", () => {
    beforeEach(async () => {
      process.env.DOUBLE_MODE = false;
      realResponse = await getPathConfigByVersion("0.0.0");

      process.env.DOUBLE_MODE = true;
      doubleResponse = await getPathConfigByVersion("0.0.0");
    });

    it("real and double responses should match", () => {
      expect(realResponse).toEqual(doubleResponse);
    });
  });
});
