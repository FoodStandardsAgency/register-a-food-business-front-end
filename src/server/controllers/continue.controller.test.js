jest.mock("../services/path.service");
jest.mock("../services/validation.service");
jest.mock("../services/session-management.service");

const {
  moveAlongPath,
  editPath,
  switchOffManualAddressInput
} = require("../services/path.service");
const { validate } = require("../services/validation.service");
const {
  cleanInactivePathAnswers,
  cleanEmptiedAnswers,
  cleanSwitches
} = require("../services/session-management.service");
const pathConfigMock = require("../../__mocks__/pathConfigMock.json");
const continueController = require("./continue.controller");

describe("Function: continueController: ", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanInactivePathAnswers.mockImplementation(input => input);
    cleanEmptiedAnswers.mockImplementation(
      (previousAnswers, newAnswersArray) =>
        newAnswersArray.length > 0 ? previousAnswers : null
    );
    cleanSwitches.mockImplementation(() => ({}));
    editPath.mockImplementation(() => ({
      "/some-page": {
        on: true,
        switches: {}
      },
      "/final-page": {
        on: true,
        switches: {}
      }
    }));
    switchOffManualAddressInput.mockImplementation(() => ({
      "/some-page": {
        on: true,
        switches: {}
      },
      "/final-page": {
        on: true,
        switches: {}
      }
    }));
    validate.mockImplementation(() => ({
      errors: {}
    }));
  });

  let response;

  const exampleSwitches = { switch1: true, switch2: false };

  const exampleAnswers = {
    answer: "answer-pathAnswer"
  };

  describe("When there are no new answers on the originator page: ", () => {
    beforeEach(() => {
      validate.mockImplementation(() => ({
        errors: {}
      }));
      response = continueController(
        "/some-page",
        exampleAnswers,
        {},
        exampleSwitches,
        pathConfigMock
      );
    });

    it("Should clean the cumulativeAnswers", () => {
      expect(response.cumulativeAnswers).toEqual({});
    });

    it("Should return an empty validatorErrors object", () => {
      expect(response.validatorErrors).toEqual({});
    });
  });

  describe("When newAnswers is undefined", () => {
    beforeEach(() => {
      validate.mockImplementation(() => ({
        errors: {}
      }));
      response = continueController(
        "/some-page",
        exampleAnswers,
        undefined,
        exampleSwitches,
        pathConfigMock
      );
    });
    it("Should return a response", () => {
      expect(response).toBeDefined();
    });
  });

  describe("When newAnswers contains answers with empty spaces", () => {
    beforeEach(() => {
      validate.mockImplementation(() => ({
        errors: {}
      }));

      const testNewAnswersWithSpaces = {
        operator_secondary_number: "       ",
        operator_first_name: "  name  "
      };

      response = continueController(
        "/some-page",
        exampleAnswers,
        testNewAnswersWithSpaces,
        exampleSwitches,
        pathConfigMock
      );
    });
    it("Should return a response", () => {
      expect(response.cumulativeAnswers.operator_first_name).toBe("name");
      expect(response.cumulativeAnswers.operator_secondary_number).toBe("");
    });
  });

  describe("When there are no validator errors: ", () => {
    describe("When the current page is at the end of the path", () => {
      beforeEach(() => {
        validate.mockImplementation(() => ({
          errors: {}
        }));
        moveAlongPath.mockImplementation(() => "/submit");
        response = continueController(
          "/final-page",
          {},
          exampleAnswers,
          exampleSwitches,
          pathConfigMock
        );
      });

      it("Should set redirect route to /submit", () => {
        expect(response.redirectRoute).toBe("/submit");
      });
    });

    describe("When the switches are undefined", () => {
      beforeEach(() => {
        validate.mockImplementation(() => ({
          errors: {}
        }));
        moveAlongPath.mockImplementation(() => "/nextPage");
        response = continueController(
          "/index",
          {},
          exampleAnswers,
          undefined,
          pathConfigMock
        );
      });

      it("Should return a redirect route", () => {
        expect(response.redirectRoute).toBeDefined();
      });
    });

    describe("When the current page is NOT at the end of the path", () => {
      beforeEach(() => {
        validate.mockImplementation(() => ({
          errors: {}
        }));
        moveAlongPath.mockImplementation(() => "/nextPage");
        response = continueController(
          "/some-page",
          {},
          exampleAnswers,
          exampleSwitches,
          pathConfigMock
        );
      });

      it("Should return a controllerResponse", () => {
        expect(response.validatorErrors).toBeDefined();
        expect(response.redirectRoute).toBeDefined();
        expect(response.cumulativeAnswers).toBeDefined();
      });

      it("Should use cumulativePathAnswers and the path from session to create the newPath", () => {
        expect(editPath).toHaveBeenLastCalledWith(
          exampleAnswers,
          "/some-page",
          pathConfigMock
        );
      });

      it("Should set the redirectRoute to the response of moveAlongPath", () => {
        expect(response.redirectRoute).toBe("/nextPage");
      });
    });
  });

  describe("When there are validator errors: ", () => {
    beforeEach(() => {
      validate.mockImplementation(() => ({
        errors: { some: "error" }
      }));
      response = continueController(
        "/mock-page-1",
        {},
        exampleAnswers,
        exampleSwitches,
        pathConfigMock
      );
    });

    it("should set redirectRoute to the currentPage", () => {
      expect(response.validatorErrors).toEqual({ some: "error" });
    });

    it("should set redirectRoute to the currentPage", () => {
      expect(response.redirectRoute).toBe("/mock-page-1");
    });

    describe("when there are switches and validator errors", () => {
      beforeEach(() => {
        cleanSwitches.mockImplementation(() => ({
          switch1: false,
          switch2: true
        }));
      });

      it("should clean the switches as usual", () => {
        response = continueController(
          "/mock-page-1",
          {},
          exampleAnswers,
          exampleSwitches,
          pathConfigMock
        );
        expect(response.switches).toEqual({ switch1: false, switch2: true });
      });
    });
  });

  describe("When there are no switches: ", () => {
    cleanSwitches.mockImplementation(() => {});

    it("should return an empty switches object", () => {
      const exampleEmptySwitches = [{}, undefined, null];

      response = continueController(
        "/mock-page-1",
        {},
        exampleAnswers,
        exampleEmptySwitches,
        pathConfigMock
      );

      expect(response.switches).toEqual({});
    });
  });

  describe("When switches are passed in: ", () => {
    beforeEach(() => {
      cleanSwitches.mockImplementation(() => exampleSwitches);
    });

    it("should return the same object keys", () => {
      response = continueController(
        "/mock-page-1",
        {},
        exampleAnswers,
        exampleSwitches,
        pathConfigMock
      );

      const originalSwitchesKeyArray = Object.keys(exampleSwitches);
      const responseSwitchesKeyArray = Object.keys(response.switches);

      expect(originalSwitchesKeyArray).toEqual(responseSwitchesKeyArray);
    });

    it("should return boolean values", () => {
      response = continueController(
        "/mock-page-1",
        {},
        exampleAnswers,
        exampleSwitches,
        pathConfigMock
      );

      const responseSwitchesValueArray = Object.values(response.switches);

      responseSwitchesValueArray.forEach(value => {
        expect(typeof value).toBe("boolean");
      });
    });

    describe("when cleanSwitches changes the switches that were passed in", () => {
      beforeEach(() => {
        cleanSwitches.mockImplementation(() => ({
          switch1: false,
          switch2: true
        }));
      });

      it("should return the result of cleanSwitches, not the original values", () => {
        response = continueController(
          "/mock-page-1",
          {},
          exampleAnswers,
          exampleSwitches,
          pathConfigMock
        );

        expect(response.switches).toEqual({ switch1: false, switch2: true });
      });
    });
  });

  describe("When one of the services throws an error", () => {
    beforeEach(() => {
      cleanEmptiedAnswers.mockImplementation(() => {
        throw new Error("Some error");
      });

      try {
        response = continueController(
          "/final-page",
          {},
          exampleAnswers,
          exampleSwitches,
          pathConfigMock
        );
      } catch (err) {
        response = err;
      }
    });

    it("should throw an error", () => {
      expect(response.message).toBe("Some error");
    });
  });
});
