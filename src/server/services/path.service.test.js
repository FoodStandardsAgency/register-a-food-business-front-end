const {
    editPath,
    editPathInEditMode,
    moveAlongPath,
    moveAlongEditPath,
    getPathPagesToSwitch,
    switchOffManualAddressInput,
    switchOffCompanyAndCharityDetails
} = require("./path.service");
const pathConfigMock = require("../../__mocks__/pathConfigMock.json");
const pathMock = pathConfigMock.path;

describe("path.service editPath()", () => {
    let result;

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

    describe("given valid input", () => {
        describe("given that an answer triggers a switch and is only in the full answers", () => {
            beforeEach(() => {
                const cumulativeFullAnswers = {
                    registration_role: "Representative",
                    another_answer: "Value"
                };
                const currentPage = "/registration-role";
                const args = [
                    cumulativeFullAnswers,
                    currentPage,
                    pathFromSession
                ];
                result = editPath(...args);
            });
            it("should return 'on' as true for the switched page", () => {
                expect(result["/representative-details"].on).toBe(true);
            });
        });
    });
});

describe("path.service editPathInEditMode()", () => {
    let result;

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

    describe("given valid input", () => {
        describe("given that an answer triggers a switch and is in both the full and edit answers", () => {
            beforeEach(() => {
                const cumulativeFullAnswers = {
                    registration_role: "Representative"
                };
                const cumulativeEditAnswers = {
                    registration_role: "Representative"
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
                expect(result["/representative-details"].inEditPath).toBe(
                    false
                );
            });
            it("should return 'inEditPath' as true for the first page in the edit path", () => {
                expect(result["/registration-role"].inEditPath).toBe(true);
            });
        });
    });
});

describe("path.service moveAlongPath()", () => {
    let result;
    const path = {
        "/page-not-in-path": {
            on: false,
            switches: {}
        },
        "/registration-role": {
            on: true,
            switches: {
                Representative: { "/representative-details": true }
            }
        },
        "/page-to-skip": {
            on: false,
            switches: {}
        },
        "/representative-details": {
            on: true,
            switches: {}
        },
        "/another-page": {
            on: false,
            switches: {}
        }
    };

    describe("Given valid input", () => {
        describe("given a movement of +1", () => {
            beforeEach(() => {
                const currentPage = "/registration-role";
                const movement = 1;
                const args = [path, currentPage, movement];
                result = moveAlongPath(...args);
            });
            it("returns the next active page in the path", () => {
                expect(result).toBe("/representative-details");
            });
        });

        describe("given a movement of -1", () => {
            beforeEach(() => {
                const currentPage = "/representative-details";
                const movement = -1;
                const args = [path, currentPage, movement];
                result = moveAlongPath(...args);
            });
            it("returns the previous active page in the path", () => {
                expect(result).toBe("/registration-role");
            });
        });

        describe("given a movement of +1 when there are no further active pages in the path", () => {
            beforeEach(() => {
                const currentPage = "/representative-details";
                const movement = 1;
                const args = [path, currentPage, movement];
                result = moveAlongPath(...args);
            });
            it("returns '/submit' as the next page", () => {
                expect(result).toBe("/submit");
            });
        });
    });

    describe("Given invalid input", () => {
        describe("given a movement of -1 when there are no previous active pages in the path", () => {
            beforeEach(() => {
                const currentPage = "/registration-role";
                const movement = -1;
                const args = [path, currentPage, movement];
                try {
                    result = moveAlongPath(...args);
                } catch (err) {
                    result = err;
                }
            });
            it("throws an error", () => {
                expect(result instanceof Error).toBe(true);
            });
        });
    });
});

describe("path.service moveAlongEditPath()", () => {
    let result;
    const path = {
        "/page-not-in-edit-path": {
            on: true,
            inEditPath: false,
            switches: {}
        },
        "/registration-role": {
            on: true,
            inEditPath: true,
            switches: {
                Representative: { "/representative-details": true }
            }
        },
        "/page-to-skip": {
            on: true,
            inEditPath: false,
            switches: {}
        },
        "/representative-details": {
            on: true,
            inEditPath: true,
            switches: {}
        },
        "/another-page": {
            on: false,
            inEditPath: false,
            switches: {}
        }
    };

    describe("Given valid input", () => {
        describe("given a movement of +1", () => {
            beforeEach(() => {
                const currentPage = "/registration-role";
                const movement = 1;
                const args = [path, currentPage, movement];
                result = moveAlongEditPath(...args);
            });
            it("returns the next active page in the edit path", () => {
                expect(result).toBe("/representative-details");
            });
        });

        describe("given a movement of -1", () => {
            beforeEach(() => {
                const currentPage = "/representative-details";
                const movement = -1;
                const args = [path, currentPage, movement];
                result = moveAlongEditPath(...args);
            });
            it("returns the previous active page in the edit path", () => {
                expect(result).toBe("/registration-role");
            });
        });

        describe("given a movement of +1 when there are no further active pages in the edit path", () => {
            beforeEach(() => {
                const currentPage = "/representative-details";
                const movement = 1;
                const args = [path, currentPage, movement];
                result = moveAlongEditPath(...args);
            });
            it("returns '/registration-summary' as the next page", () => {
                expect(result).toBe("/registration-summary");
            });
        });
    });

    describe("Given invalid input", () => {
        describe("given a movement of -1 when there are no previous active pages in the edit path", () => {
            beforeEach(() => {
                const currentPage = "/registration-role";
                const movement = -1;
                const args = [path, currentPage, movement];
                try {
                    result = moveAlongEditPath(...args);
                } catch (err) {
                    result = err;
                }
            });
            it("throws an error", () => {
                expect(result instanceof Error).toBe(true);
            });
        });
    });
});

describe("path.service getPathPagesToSwitch()", () => {
    describe("Given valid input", () => {
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

    describe("Given valid input where the object keys in cumulativeFullAnswers affect the path", () => {
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
            expect(() =>
                getPathPagesToSwitch(null, "/index", pathMock)
            ).toThrow(Error);
            expect(() =>
                getPathPagesToSwitch(true, "/index", pathMock)
            ).toThrow(Error);
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

describe("path.service switchOffCompanyAndCharityDetails()", () => {
    const examplePath = {
        "/operator-company-details": {
            on: true,
            switches: {}
        },
        "/operator-charity-details": {
            on: true,
            switches: {}
        }
    };

    describe("given a path and Sole Trader", () => {
        it("returns the original path with '/operator-company-details' and '/operator-charity-details' switched off", () => {
            const answers = { registration_role: "Sole Trader" };
            const result = switchOffCompanyAndCharityDetails(
                answers,
                examplePath
            );
            expect(result["/operator-company-details"].on).toBe(false);
            expect(result["/operator-charity-details"].on).toBe(false);
        });
    });

    describe("given a path and Partnership", () => {
        it("returns the original path with '/operator-company-details' and '/operator-charity-details' switched off", () => {
            const answers = { registration_role: "Partnership" };
            const result = switchOffCompanyAndCharityDetails(
                answers,
                examplePath
            );
            expect(result["/operator-company-details"].on).toBe(false);
            expect(result["/operator-charity-details"].on).toBe(false);
        });
    });

    describe("given a path and Representative", () => {
        it("returns the original path with '/operator-company-details' and '/operator-charity-details' left switched on", () => {
            const answers = { registration_role: "Representative" };
            const result = switchOffCompanyAndCharityDetails(
                answers,
                examplePath
            );
            expect(result["/operator-company-details"].on).toBe(true);
            expect(result["/operator-charity-details"].on).toBe(true);
        });
    });
});
