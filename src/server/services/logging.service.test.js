const cls = require("cls-hooked");
const { logger } = require("./winston");
const {
  logEmitter,
  FUNCTION_CALL,
  FUNCTION_CALL_WITH,
  FUNCTION_SUCCESS,
  FUNCTION_SUCCESS_WITH,
  FUNCTION_FAIL,
  DOUBLE_MODE
} = require("./logging.service");

const noSession = {
  session_id: null,
  status: "no-session"
};

jest.mock("./winston", () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn()
  }
}));

describe("logEmitter", () => {
  /* eslint-disable */
  let clsNamespace;

  beforeEach(async () => {
    clsNamespace = cls.createNamespace("rafbfe");
  });
  afterEach(async () => {
    cls.reset();
  });
  /* eslint-enable */
  describe("on functionCall event", () => {
    it("should call winston info", async () => {
      let message = FUNCTION_CALL;
      let moduleMessage = "someModule";
      let funcMessage = "someFunction";
      let expected = `${moduleMessage}: ${funcMessage} called`;
      logger.info.mockImplementation(() => {});

      await logEmitter.emit(message, moduleMessage, funcMessage);

      await expect(logger.info).toBeCalledWith(expected, noSession);
    });
  });

  //broken seems to not call the right log message
  describe("on functionCallWith event", () => {
    it("should call winston info", async () => {
      let message = FUNCTION_CALL_WITH;
      let moduleMessage = "someModule";
      let funcMessage = "someFunction";
      let someData = { data: "data" };
      let expected = `${moduleMessage}: ${funcMessage} called with: ${someData}`;

      logger.info.mockImplementation(() => {});

      await logEmitter.emit(message, moduleMessage, funcMessage, someData);

      await expect(logger.info).toBeCalledWith(expected, noSession);
    });
  });

  describe("on functionSuccess event", () => {
    it("should call winston info", async () => {
      let message = FUNCTION_SUCCESS;
      let moduleMessage = "someModule";
      let funcMessage = "someFunction";
      let expected = `${moduleMessage}: ${funcMessage} successful`;
      logger.info.mockImplementation(() => {});

      await logEmitter.emit(message, moduleMessage, funcMessage);

      await expect(logger.info).toBeCalledWith(expected, noSession);
    });
  });

  describe("on functionSuccess event", () => {
    it("should call winston info", async () => {
      let message = FUNCTION_SUCCESS_WITH;
      let moduleMessage = "someModule";
      let funcMessage = "someFunction";
      let someData = { data: "data" };
      let expected = `${moduleMessage}: ${funcMessage} called with: ${someData}`;
      logger.info.mockImplementation(() => {});
      await logEmitter.emit(message, moduleMessage, funcMessage, someData);

      await expect(logger.info).toBeCalledWith(expected, noSession);
    });
  });

  describe("on functionFail event", () => {
    it("should call winston info", async () => {
      let message = FUNCTION_FAIL;
      let moduleMessage = "someModule";
      let funcMessage = "someFunction";
      let err = new Error("test");
      let expected = `${moduleMessage}: ${funcMessage} failed with: ${err.message}`;
      logger.error.mockImplementation(() => {});

      await logEmitter.emit(message, moduleMessage, funcMessage, err);

      await expect(logger.error).toBeCalledWith(expected, noSession);
    });
  });

  describe("on doubleMode event", () => {
    it("should call winston info", async () => {
      let message = DOUBLE_MODE;
      let moduleMessage = "someModule";
      let funcMessage = "someFunction";
      let expected = `${moduleMessage}: ${funcMessage}: running in double mode`;
      logger.info.mockImplementation(() => {});

      await logEmitter.emit(message, moduleMessage, funcMessage);

      await expect(logger.info).toBeCalledWith(expected, noSession);
    });
  });
});
