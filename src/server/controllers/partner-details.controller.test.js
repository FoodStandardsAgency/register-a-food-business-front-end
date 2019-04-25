jest.mock("../services/validation.service");
jest.mock("../services/logging.service");
jest.mock("../config");

const { validate } = require("../services/validation.service");
const partnerDetailsController = require("./partner-details.controller");

const currentPage = "/current";
const council = "cardiff";

describe("When given valid submission data on save", () => {
  let response;
  beforeEach(async () => {
    validate.mockImplementation(() => ({
      errors: {}
    }));

    try {
      response = await partnerDetailsController(
        currentPage,
        { partners: ["partner one"] },
        { partner_name: "partner two" },
        council,
        "save"
      );
    } catch (err) {
      response = err;
    }
  });

  it("Should set redirectRoute back to the same page", () => {
    expect(response.redirectRoute).toBe("/new/cardiff/partner-name");
  });
  it("Should return cumulativeFullAnswers including the previous answers and the new partner", () => {
    expect(response.cumulativeFullAnswers).toEqual({
      partners: ["partner one", "partner two"],
      targetPartner: null
    });
  });

  it("Should return empty validatorErrors", () => {
    expect(response.validatorErrors).toEqual({});
  });
});

describe("When given valid submission data on edit-save", () => {
  let response;
  beforeEach(async () => {
    validate.mockImplementation(() => ({
      errors: {}
    }));

    try {
      response = await partnerDetailsController(
        currentPage,
        { partners: ["partner one", "partner two"] },
        { partner_name: "partner new name", index: 0 },
        council,
        "save"
      );
    } catch (err) {
      response = err;
    }
  });

  it("Should set redirectRoute back to the same page", () => {
    expect(response.redirectRoute).toBe("/new/cardiff/partner-name");
  });
  it("Should return cumulativeFullAnswers including the previous answers and the new partner", () => {
    expect(response.cumulativeFullAnswers).toEqual({
      partners: ["partner new name", "partner two"],
      targetPartner: null
    });
  });

  it("Should return empty validatorErrors", () => {
    expect(response.validatorErrors).toEqual({});
  });
});

describe("When given too many partners on save", () => {
  let response;
  beforeEach(async () => {
    validate.mockImplementation(() => ({
      errors: {}
    }));

    try {
      response = await partnerDetailsController(
        currentPage,
        {
          partners: [
            "partner 1",
            "partner 2",
            "partner 3",
            "partner 4",
            "partner 5"
          ]
        },
        { partner_name: "partner 6" },
        council,
        "save"
      );
    } catch (err) {
      response = err;
    }
  });

  it("Should set redirectRoute back to the same page", () => {
    expect(response.redirectRoute).toBe("/new/cardiff/partner-name");
  });
  it("Should return cumulativeFullAnswers including the previous answers without the new partner", () => {
    expect(response.cumulativeFullAnswers).toEqual({
      partners: [
        "partner 1",
        "partner 2",
        "partner 3",
        "partner 4",
        "partner 5"
      ],
      targetPartner: null
    });
  });

  it("Should return empty validatorErrors", () => {
    expect(response.validatorErrors).toEqual({});
  });
});

describe("When given invalid submission data on save", () => {
  let response;
  beforeEach(async () => {
    validate.mockImplementation(() => ({
      errors: { example: "error" }
    }));

    try {
      response = await partnerDetailsController(
        currentPage,
        { partners: ["partner one"] },
        { targetPartner: null },
        council,
        "save"
      );
    } catch (err) {
      response = err;
    }
  });

  it("Should set redirectRoute back to the same page", () => {
    expect(response.redirectRoute).toBe(`/partnership${currentPage}`);
  });

  it("Should return non empty validatorErrors", () => {
    expect(response.validatorErrors).toEqual({ example: "error" });
  });

  it("Should return cumulativeFullAnswers", () => {
    expect(response.cumulativeFullAnswers).toEqual({
      partners: ["partner one"]
    });
  });
});

describe("Given a service thrown an error", () => {
  let response;
  beforeEach(async () => {
    validate.mockImplementation(() => {
      throw new Error("Some error");
    });

    try {
      response = await partnerDetailsController(
        currentPage,
        { partners: ["partner one"] },
        { partner_name: "partner two" },
        council,
        "save"
      );
    } catch (err) {
      response = err;
    }
  });

  it("Should throw the error", () => {
    expect(response.message).toBe("Some error");
  });
});

describe("When given valid submission data on delete", () => {
  let response;
  beforeEach(async () => {
    validate.mockImplementation(() => ({
      errors: {}
    }));

    try {
      response = await partnerDetailsController(
        currentPage,
        { partners: ["partner one", "partner two", "partner three"] },
        { index: 1 },
        council,
        "delete"
      );
    } catch (err) {
      response = err;
    }
  });

  it("Should set redirectRoute back to the same page", () => {
    expect(response.redirectRoute).toBe("/new/cardiff/partner-name");
  });
  it("Should return cumulativeFullAnswers including the previous answers without the deleted partner", () => {
    expect(response.cumulativeFullAnswers).toEqual({
      partners: ["partner one", "partner three"],
      targetPartner: null
    });
  });

  describe("When given valid submission data on delete, buta validation on partners", () => {
    let response;
    beforeEach(async () => {
      validate.mockImplementation(() => ({
        errors: { partners: "error" }
      }));

      try {
        response = await partnerDetailsController(
          currentPage,
          { partners: ["partner one", "partner two", "partner three"] },
          { index: 1 },
          council,
          "delete"
        );
      } catch (err) {
        response = err;
      }
    });

    it("Should set redirectRoute back to the same page", () => {
      expect(response.redirectRoute).toBe("/new/cardiff/partner-name");
    });
    it("Should return cumulativeFullAnswers including the previous answers without the deleted partner", () => {
      expect(response.cumulativeFullAnswers).toEqual({
        partners: ["partner one", "partner three"],
        targetPartner: null
      });
    });
  });

  describe("When a validation error occurs on delete", () => {
    let response;
    beforeEach(async () => {
      validate.mockImplementation(() => ({
        errors: { errors: "error" }
      }));

      try {
        response = await partnerDetailsController(
          currentPage,
          { partners: ["partner one", "partner two", "partner three"] },
          { index: 1 },
          council,
          "delete"
        );
      } catch (err) {
        response = err;
      }
    });

    it("Should set redirectRoute back to the same page", () => {
      expect(response.redirectRoute).toBe("/partnership/current?id=1");
    });
    it("Should return cumulativeFullAnswers with no changes", () => {
      expect(response.cumulativeFullAnswers).toEqual({
        partners: ["partner one", "partner two", "partner three"]
      });
    });

    it("Should return non-empty validatorErrors", () => {
      expect(response.validatorErrors).toEqual({ errors: "error" });
    });
  });
});

describe("When given invalid index data on delete", () => {
  let response;
  beforeEach(async () => {
    validate.mockImplementation(() => ({
      errors: {}
    }));

    try {
      response = await partnerDetailsController(
        currentPage,
        { partners: ["partner one", "partner two", "partner three"] },
        { index: -1 },
        council,
        "delete"
      );
    } catch (err) {
      response = err;
    }
  });

  it("Should set redirectRoute back to the same page", () => {
    expect(response.redirectRoute).toBe("/new/cardiff/partner-name");
  });
  it("Should return cumulativeFullAnswers including the previous answers wwith no changes", () => {
    expect(response.cumulativeFullAnswers).toEqual({
      partners: ["partner one", "partner two", "partner three"],
      targetPartner: null
    });
  });

  it("Should return empty validatorErrors", () => {
    expect(response.validatorErrors).toEqual({});
  });
});

describe("When given invalid array data on delete", () => {
  let response;
  beforeEach(async () => {
    validate.mockImplementation(() => ({
      errors: {}
    }));

    try {
      response = await partnerDetailsController(
        currentPage,
        { partners: [] },
        { index: 0 },
        council,
        "delete"
      );
    } catch (err) {
      response = err;
    }
  });

  it("Should set redirectRoute back to the same page", () => {
    expect(response.redirectRoute).toBe("/new/cardiff/partner-name");
  });
  it("Should return cumulativeFullAnswers still with the empty array", () => {
    expect(response.cumulativeFullAnswers).toEqual({
      partners: [],
      targetPartner: null
    });
  });

  it("Should return empty validatorErrors", () => {
    expect(response.validatorErrors).toEqual({});
  });
});

describe("When given valid submission data on continue", () => {
  let response;
  let partnerArray = ["partner one", "partner two", "partner three"];

  beforeEach(async () => {
    validate.mockImplementation(() => ({
      errors: {}
    }));

    try {
      response = await partnerDetailsController(
        currentPage,
        { partners: partnerArray },
        { partners: ["array should", "be lost"] },
        council,
        "continue"
      );
    } catch (err) {
      response = err;
    }
  });

  it("Should set redirectRoute back to the main partnerhsip contact page", () => {
    expect(response.redirectRoute).toBe(
      "/new/cardiff/main-partnership-contact"
    );
  });
  it("Should return cumulativeFullAnswers including the previous answers without the deleted partner", () => {
    expect(response.cumulativeFullAnswers).toEqual({
      partners: partnerArray,
      targetPartner: null
    });
  });

  it("Should return empty validatorErrors", () => {
    expect(response.validatorErrors).toEqual({});
  });
});

describe("When a vlaidation error occurs on continue", () => {
  let response;
  let partnerArray = ["partner one", "partner two", "partner three"];

  beforeEach(async () => {
    validate.mockImplementation(() => ({
      errors: { example: "error" }
    }));

    try {
      response = await partnerDetailsController(
        currentPage,
        { partners: partnerArray },
        { partners: ["array should", "be lost"] },
        council,
        "continue"
      );
    } catch (err) {
      response = err;
    }
  });

  it("Should set redirectRoute back to the main partnerhsip contact page", () => {
    expect(response.redirectRoute).toBe("/new/cardiff/current");
  });
  it("Should return cumulativeFullAnswers including the previous answers", () => {
    expect(response.cumulativeFullAnswers).toEqual({
      partners: partnerArray
    });
  });

  it("Should return empty validatorErrors", () => {
    expect(response.validatorErrors).toEqual({ example: "error" });
  });
});
