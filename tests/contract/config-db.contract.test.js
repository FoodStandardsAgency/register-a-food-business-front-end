const {
    getPathConfigByVersion
} = require("../../src/server/connectors/config-db/config-db.connector");

describe("config-db.connector contract: getPathConfigByVersion", () => {
    let realResponse;
    let doubleResponse;

    describe("Given a valid request", () => {
        beforeEach(async () => {
            process.env.DOUBLE_MODE = false;
            realResponse = await getPathConfigByVersion("1.0.0");

            process.env.DOUBLE_MODE = true;
            doubleResponse = await getPathConfigByVersion("1.0.0");
        });

        it("real and double responses should both return path data", () => {
            expect(realResponse.path["/index"].on).toBeDefined();
            expect(realResponse.path["/index"].switches).toBeDefined();

            expect(doubleResponse.path["/index"].on).toBeDefined();
            expect(doubleResponse.path["/index"].switches).toBeDefined();
        });

        it("real and double responses should both return a version _id", () => {
            expect(typeof doubleResponse._id).toEqual(typeof realResponse._id);
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
            expect(doubleResponse).toEqual(realResponse);
        });
    });
});
