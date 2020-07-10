jest.mock("../../db/db", () => ({
  Council: {
    findOne: jest.fn(),
    findAll: jest.fn()
  }
}));

const { Council } = require("../../db/db");

const {
  getAllCouncils,
  getCouncilById,
  getCouncilByUrl
} = require("./councils-db.connector");

describe("Councils-db connector", () => {
  let result;
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Function: getAllCouncils", () => {
    describe("When Council.findAll fails", () => {
      beforeEach(async () => {
        Council.findAll.mockImplementation(() => {
          throw new Error("Failed");
        });
        try {
          await getAllCouncils();
        } catch (err) {
          result = err;
        }
      });

      it("Should return the error", () => {
        expect(result.message).toBe("Failed");
      });
    });

    describe("When Council.findAll succeeds", () => {
      beforeEach(async () => {
        Council.findAll.mockImplementation(() => {
          return "success";
        });
        result = await getAllCouncils();
      });

      it("Should return the response", () => {
        expect(result).toBe("success");
      });
    });
  });

  describe("Function: getCouncilById", () => {
    describe("When Council.findOne fails", () => {
      beforeEach(async () => {
        Council.findOne.mockImplementation(() => {
          throw new Error("Failed");
        });
        try {
          await getCouncilById("4500");
        } catch (err) {
          result = err;
        }
      });

      it("Should return the error", () => {
        expect(result.message).toBe("Failed");
      });
    });

    describe("When Council.findOne succeeds", () => {
      beforeEach(async () => {
        Council.findOne.mockImplementation(() => {
          return "success";
        });
        result = await getCouncilById("4500");
      });

      it("Should return the response", () => {
        expect(result).toBe("success");
      });

      it("Should call the findOne model with query", () => {
        expect(Council.findOne).toBeCalledWith({
          where: { local_council_id: "4500" },
          transaction: null
        });
      });
    });
  });

  describe("Function: getCouncilByurl", () => {
    describe("When Council.findOne fails", () => {
      beforeEach(async () => {
        Council.findOne.mockImplementation(() => {
          throw new Error("Failed");
        });
        try {
          await getCouncilByUrl("cardiff");
        } catch (err) {
          result = err;
        }
      });

      it("Should return the error", () => {
        expect(result.message).toBe("Failed");
      });
    });

    describe("When Council.findOne succeeds", () => {
      beforeEach(async () => {
        Council.findOne.mockImplementation(() => {
          return "success";
        });
        result = await getCouncilByUrl("cardiff");
      });

      it("Should return the response", () => {
        expect(result).toBe("success");
      });

      it("Should call the findOne model with query", () => {
        expect(Council.findOne).toBeCalledWith({
          where: { local_council_url: "cardiff" },
          transaction: null
        });
      });
    });
  });
});
