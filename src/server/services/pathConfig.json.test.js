import pathJSON from "./pathConfig.json";
import { Validator } from "jsonschema";

jest.unmock("./pathConfig.json");

const v = new Validator();

const schema = {
  type: "object",
  properties: {
    on: { type: "boolean" },
    switches: { type: "object" }
  },
  required: ["on", "switches"]
};

describe("pathConfig.json", () => {
  it("is in a valid format", () => {
    for (let page in pathJSON) {
      expect(v.validate(pathJSON[page], schema).errors.length).toBe(0);
    }
  });
});
