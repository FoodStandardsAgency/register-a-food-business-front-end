jest.mock("../server", () => ({
    app: {
        render: jest.fn()
    }
}));
jest.mock("winston", () => ({
    error: jest.fn()
}));

const { errorHandler } = require("../middleware/errorHandler");
const { app } = require("../server");
const { error } = require("winston");

describe("errorHandler", () => {
    app.render.mockImplementation();
    it("should call Next", () => {
        errorHandler();

        expect(app.render).toHaveBeenCalled();
    });

    describe("when response is defined", () => {
        describe("when err and res are not defined", () => {
            error.mockImplementation();
            it("should emit statusCode: null", () => {
                errorHandler("no error");

                expect(error).toHaveBeenNthCalledWith(3, "no error");
                expect(error).toHaveBeenNthCalledWith(
                    4,
                    "statusCode: undefined"
                );
            });
        });
    });
});
