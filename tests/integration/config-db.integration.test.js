const {
    getPathConfigByVersion,
    clearPathConfigCache
} = require("../../src/server/connectors/config-db/config-db.connector");

let response;

describe("config-db.connector integration: getPathConfigByVersion", () => {
    beforeEach(() => {
        process.env.DOUBLE_MODE = true;
        clearPathConfigCache();
    });

    describe("Given a valid request", () => {
        beforeEach(async () => {
            response = await getPathConfigByVersion("1.0.0");
        });

        it("should return path data", () => {
            expect(response.path["/index"].on).toBeDefined();
            expect(response.path["/index"].switches).toBeDefined();
        });

        it("should return a version _id", () => {
            expect(typeof response._id).toBe("string");
        });
    });

    describe("Given a valid request that does not match a known version", () => {
        beforeEach(async () => {
            response = await getPathConfigByVersion("0.0.0");
        });

        it("should return null", () => {
            expect(response).toBe(null);
        });
    });
});
