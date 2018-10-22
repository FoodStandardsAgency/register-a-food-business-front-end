const {
  moveAlongPath,
  getPathPagesToSwitch,
  switchOffManualAddressInput,
  moveAlongEditPath,
  editPathInEditMode
} = require("./path.service");
const pathConfigMock = require("../../__mocks__/pathConfigMock.json");
const pathMock = pathConfigMock.path;

describe("path.service editPathInEditMode()", () => {
  let result;

  describe("given valid input", () => {
    describe("given that an answer triggers a switch and is in both the full and edit answers", () => {
      beforeEach(() => {
        const cumulativeFullAnswers = {
          registration_role: "Representative"
        };
        const cumulativeEditAnswers = {
          registration_role: "Representative"
        };
        const pathFromSession = {
          "/registration-role": {
            on: true,
            switches: {
              Representative: { "/representative-details": true }
            }
          },
          "/representative-details": {
            on: false,
            switches: {}
          }
        };

        const editModeFirstPage = "/registration-role";
        const currentPage = "/registration-role";
        const args = [
          cumulativeFullAnswers,
          cumulativeEditAnswers,
          pathFromSession,
          editModeFirstPage,
          currentPage
        ];
        result = editPathInEditMode(...args);
      });
      it("should return both 'on' and 'inEditPath' as true for the switched page", () => {
        expect(result["/representative-details"].on).toBe(true);
        expect(result["/representative-details"].inEditPath).toBe(true);
      });
      it("should return 'inEditPath' as true for the first page in the edit path", () => {
        expect(result["/registration-role"].inEditPath).toBe(true);
      });
    });

    describe("given that an answer triggers a switch and is only in the full answers", () => {
      beforeEach(() => {
        const cumulativeFullAnswers = {
          registration_role: "Representative",
          another_answer: "Value"
        };
        const cumulativeEditAnswers = {
          another_answer: "Value"
        };
        const pathFromSession = {
          "/registration-role": {
            on: true,
            switches: {
              Representative: { "/representative-details": true }
            }
          },
          "/representative-details": {
            on: false,
            switches: {}
          }
        };
        const editModeFirstPage = "/registration-role";
        const currentPage = "/registration-role";
        const args = [
          cumulativeFullAnswers,
          cumulativeEditAnswers,
          pathFromSession,
          editModeFirstPage,
          currentPage
        ];
        result = editPathInEditMode(...args);
      });
      it("should return 'on' as true and 'inEditPath' as false for the switched page", () => {
        expect(result["/representative-details"].on).toBe(true);
        expect(result["/representative-details"].inEditPath).toBe(false);
      });
      it("should return 'inEditPath' as true for the first page in the edit path", () => {
        expect(result["/registration-role"].inEditPath).toBe(true);
      });
    });
  });
});

describe("path.service moveAlongEditPath()", () => {});

describe("path.service moveAlongPath()", () => {
  describe("Given valid input", () => {
    it("returns a string beginning with '/'", () => {
      const result = moveAlongPath(pathMock, "/index");
      expect(typeof result).toBe("string");
      expect(result.slice(0, 1)).toBe("/");
    });

    it("returns a key name from the path JSON", () => {
      const result = moveAlongPath(pathMock, "/index");
      expect(Object.keys(pathMock)).toContain(result);
    });

    it("returns a switched-on key name for 'continue' and 'back'", () => {
      const result1 = moveAlongPath(pathMock, "/index", 1);
      expect(result1).toBe("/mock-page-1");

      const result2 = moveAlongPath(pathMock, "/mock-page-1", 1);
      expect(result2).toBe("/mock-page-2");

      const result3 = moveAlongPath(pathMock, "/mock-page-1", -1);
      expect(result3).toBe("/index");

      const result4 = moveAlongPath(pathMock, "/mock-page-2", -2);
      expect(result4).toBe("/index");
    });
  });
  describe("Given invalid input", () => {
    it("throws an error when an attempt is made to move beyond the ends of the path", () => {
      expect(() => moveAlongPath(pathMock, "/mock-page-2", +2)).toThrow(Error);
      expect(() => moveAlongPath(pathMock, "/mock-page-1", -5)).toThrow(Error);
    });
  });
});

describe("path.service getPathPagesToSwitch()", () => {
  describe("Given valid input", () => {
    // it("does not reassign the input object", () => {
    //   const result = getPathPagesToSwitch({}, "/index", pathMock);
    //   expect(result).not.toBe(pathMock);
    // });

    // it("returns a valid JavaScipt object", () => {
    //   const result = getPathPagesToSwitch({ example: "A1" }, "/index", pathMock);
    //   expect(typeof result).toBe("object");
    // });

    // it("does not change any of the object keys", () => {
    //   const result = getPathPagesToSwitch({ example: "A1" }, "/mock-page-1", pathMock);
    //   const getObjectKeys = json => {
    //     const arrayOfKeys = Object.keys(json);
    //     arrayOfKeys.forEach(key => {
    //       if (typeof json[key] === "object") {
    //         Object.keys(json[key]).forEach(nestedKey => {
    //           if (typeof json[key][nestedKey] === "object") {
    //             arrayOfKeys.push(...Object.keys(json[key][nestedKey]));
    //           }
    //         });
    //         arrayOfKeys.push(...Object.keys(json[key]));
    //       }
    //     });
    //     return arrayOfKeys;
    //   };
    //   const objectKeysOriginal = getObjectKeys(pathMock);
    //   const objectKeysEdited = getObjectKeys(result);
    //   expect(objectKeysOriginal).toEqual(objectKeysEdited);
    // });

    it("returns pages that should be activated", () => {
      const result1 = getPathPagesToSwitch(
        { example1: "A2", example2: "A4" },
        "/mock-page-1",
        pathMock
      );
      expect(result1).toContain("/mock-page-1");
      expect(result1).toContain("/mock-page-2");
    });

    it("prioritises switches in the order that they appear in the JSON", () => {
      const result1 = getPathPagesToSwitch(
        { example1: "A4", example2: "A6" },
        "/mock-page-1",
        pathMock
      );
      expect(result1).toContain("/mock-page-2");

      // same test but with array order reversed
      const result2 = getPathPagesToSwitch(
        { example1: "A6", example2: "A4" },
        "/mock-page-1",
        pathMock
      );
      expect(result2).toContain("/mock-page-2");
    });

    it("can activate the current page", () => {
      const result = getPathPagesToSwitch(
        { example: "turnOnCurrentPageTest" },
        "/mock-page-off",
        pathMock
      );
      expect(result).toContain("/mock-page-off");
    });

    describe("given that the answer is not in the path switches", () => {
      it("does not change the path", () => {
        const result = getPathPagesToSwitch(
          { example: "Not in the path" },
          "/mock-page-3",
          pathMock
        );
        expect(result.length).toBe(0);
      });
    });
  });

  describe("Given valid input where the object keys in cumulativeAnswers affect the path", () => {
    it("edits the path if the value is truthy", () => {
      const result = getPathPagesToSwitch(
        {
          answer_name_that_affects_path:
            "the value is truthy but not used to calculate the path"
        },
        "/index",
        pathMock
      );
      expect(result).toContain("/mock-page-2");
    });

    it("does not edit the path if the string is empty", () => {
      const result = getPathPagesToSwitch(
        {
          answer_name_that_affects_path: ""
        },
        "/index",
        pathMock
      );
      expect(result).not.toContain("/mock-page-2");
    });
  });

  describe("Given invalid input", () => {
    it("throws an error if an answer object is not provided", () => {
      expect(() => getPathPagesToSwitch(null, "/index", pathMock)).toThrow(
        Error
      );
      expect(() => getPathPagesToSwitch(true, "/index", pathMock)).toThrow(
        Error
      );
    });
  });

  describe("Given an answer that is from a switch further ahead than the current page in the path", () => {
    it("ignores the switch/answer", () => {
      const result = getPathPagesToSwitch(
        { example: "A6" },
        "/index",
        pathMock
      );
      expect(result).not.toContain("/mock-page-2");
    });
  });
});

describe("path.service switchOffManualAddressInput()", () => {
  const examplePath = {
    "/establishment-address-manual": {
      on: true,
      switches: {}
    },
    "/operator-address-manual": {
      on: true,
      switches: {}
    }
  };

  describe("given a path and '/establishment-address-select'", () => {
    it("returns the original path with '/establishment-address-manual' switched off", () => {
      const result = switchOffManualAddressInput(
        examplePath,
        "/establishment-address-select"
      );
      expect(result["/establishment-address-manual"].on).toBe(false);
      expect(result["/operator-address-manual"].on).toBe(true);
    });
  });

  describe("given a path and '/operator-address-select'", () => {
    it("returns the original path with '/operator-address-manual' switched off", () => {
      const result = switchOffManualAddressInput(
        examplePath,
        "/operator-address-select"
      );
      expect(result["/operator-address-manual"].on).toBe(false);
      expect(result["/establishment-address-manual"].on).toBe(true);
    });
  });

  describe("given a path and a currentPage argument that is not used for editing", () => {
    it("returns a path that is identical to the original path", () => {
      const result = switchOffManualAddressInput(
        examplePath,
        "/some-page-not-used-for-editing"
      );
      expect(result).toEqual(examplePath);
    });
  });
});
