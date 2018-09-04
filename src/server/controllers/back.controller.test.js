jest.mock("../services/path.service");
const { moveAlongPath, editPath } = require("../services/path.service");
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
      result = backController("/current-page", {});
    });

    it("Should return a result", () => {
      expect(result).toBeDefined();
    });

    it("Should set the redirectRoute to the result of moveAlongPath", () => {
      expect(result).toBe("/previous-page");
    });

    describe("When previousAnswers is undefined", () => {
      result = backController("/current-page");

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
          result = backController("/current-page");
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
