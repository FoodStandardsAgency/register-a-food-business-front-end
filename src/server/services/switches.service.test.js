const changeSwitch = require("./switches.service");

describe("switches.service changeSwitch()", () => {
  describe("given an invalid action", () => {
    it("Should throw an error", () => {
      expect(() => changeSwitch("not a valid action")).toThrow(Error);
    });
  });

  describe("given a valid action and an existing switch state", () => {
    describe("given an 'on' action", () => {
      describe("given any existing switch state", () => {
        const existingSwitchStates = [undefined, true, false];

        it("Should set the switch to true", () => {
          existingSwitchStates.forEach((switchState) => {
            const response = changeSwitch.changeSwitch("on", switchState);
            expect(response).toEqual(true);
          });
        });
      });
    });

    describe("given an 'off' action", () => {
      describe("given any existing switch state", () => {
        const existingSwitchStates = [undefined, true, false];

        it("Should set the switch to false", () => {
          existingSwitchStates.forEach((switchState) => {
            const response = changeSwitch.changeSwitch("off", switchState);
            expect(response).toEqual(false);
          });
        });
      });
    });

    describe("given a 'toggle' action", () => {
      describe("given any existing switch state", () => {
        const existingSwitchStates = [undefined, true, false];

        it("Should set the switch to the opposite of what it was", () => {
          existingSwitchStates.forEach((switchState) => {
            const response = changeSwitch.changeSwitch("toggle", switchState);
            expect(response).toEqual(!switchState);
          });
        });
      });
    });
  });

  describe("given a valid action but no existing switch state", () => {
    describe("given an 'on' action", () => {
      it("Should set the switch to true", () => {
        const response = changeSwitch.changeSwitch("on");
        expect(response).toEqual(true);
      });
    });

    describe("given an 'off' action", () => {
      it("Should set the switch to false", () => {
        const response = changeSwitch.changeSwitch("off");
        expect(response).toEqual(false);
      });
    });

    describe("given a 'toggle' action", () => {
      it("Should set the switch to true", () => {
        const response = changeSwitch.changeSwitch("toggle");
        expect(response).toEqual(true);
      });
    });
  });

  describe("given missing or invalid arguments", () => {
    it("Should throw an error", () => {
      expect(() => changeSwitch.changeSwitch(undefined, true)).toThrow(Error);
      expect(() => changeSwitch.changeSwitch("on", "hello")).toThrow(Error);
      expect(() => changeSwitch.changeSwitch()).toThrow(Error);
    });
  });
});
