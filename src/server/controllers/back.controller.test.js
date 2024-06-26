jest.mock("../services/path.service");
const { moveAlongPath, editPath } = require("../services/path.service");
const pathConfigMock = require("../../__mocks__/pathConfigMock.json");
const backController = require("./back.controller");

describe("Function: backController: ", () => {
  let result;

  describe("When the back controller is called with the current page", () => {
    beforeEach(() => {
      editPath.mockImplementation(() => ({
        "/previous-page": {
          on: true,
          switches: {}
        },
        "/current-page": {
          on: true,
          switches: {}
        }
      }));
      moveAlongPath.mockImplementation(() => "/previous-page");
      result = backController("/current-page", {}, pathConfigMock);
    });

    it("Should return a result", () => {
      expect(result).toBeDefined();
    });

    it("Should set the redirectRoute to the result of moveAlongPath", () => {
      expect(result).toBe("/previous-page");
    });

    it("Should call editPath with the three required args", () => {
      expect(editPath).toHaveBeenLastCalledWith({}, "/current-page", pathConfigMock);
    });

    describe("When previousAnswers is undefined", () => {
      result = backController("/current-page", undefined, pathConfigMock);

      it("Should return a result", () => {
        expect(result).toBeDefined();
      });

      it("Should set the redirectRoute to the result of moveAlongPath", () => {
        expect(result).toBe("/previous-page");
      });
    });

    describe("When one of the services throws an error", () => {
      beforeEach(() => {
        editPath.mockImplementation(() => {
          throw new Error("Some error");
        });

        try {
          result = backController("/current-page", {}, pathConfigMock);
        } catch (err) {
          result = err;
        }
      });
      it("Should throw the error", () => {
        expect(result.message).toBe("Some error");
      });
    });
  });
});
