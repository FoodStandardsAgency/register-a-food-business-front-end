jest.mock("express-useragent");
const useragent = require("express-useragent");
const { getBrowserInfo } = require("./browser-support.service");

const req = {
    headers: {
        "user-agent": "anything"
    }
};

describe("browserSupportService", () => {
    describe("checkBrowserSupported", () => {
        describe("Chrome browser", () => {
            it("before v67 fails", () => {
                const ua = {
                    isChrome: true,
                    version: 66,
                    browser: "Chrome"
                };
                useragent.parse.mockImplementation((input) => ua);
                expect(getBrowserInfo(req.headers["user-agent"])).toEqual({
                    browser: "Chrome",
                    browserVersion: 66,
                    isBrowserSupported: false,
                    isBrowserVersionVerified: true
                });
            });

            it("after v67 succeeds", () => {
                const ua = {
                    isChrome: true,
                    version: 67,
                    browser: "Chrome"
                };
                useragent.parse.mockImplementation((input) => ua);
                expect(getBrowserInfo(req.headers["user-agent"])).toEqual({
                    browser: "Chrome",
                    browserVersion: 67,
                    isBrowserSupported: true,
                    isBrowserVersionVerified: true
                });
            });
        });

        describe("Firefox browser", () => {
            it("before v60 fails", () => {
                const ua = {
                    isChrome: false,
                    isFirefox: true,
                    version: 59,
                    browser: "Firefox"
                };
                useragent.parse.mockImplementation((input) => ua);
                expect(getBrowserInfo(req.headers["user-agent"])).toEqual({
                    browser: "Firefox",
                    browserVersion: 59,
                    isBrowserSupported: false,
                    isBrowserVersionVerified: true
                });
            });

            it("after v60 succeeds", () => {
                const ua = {
                    isChrome: false,
                    isFirefox: true,
                    version: 60,
                    browser: "Firefox",
                    isBrowserVersionVerified: true
                };
                useragent.parse.mockImplementation((input) => ua);
                expect(getBrowserInfo(req.headers["user-agent"])).toEqual({
                    browser: "Firefox",
                    browserVersion: 60,
                    isBrowserSupported: true,
                    isBrowserVersionVerified: true
                });
            });
        });

        describe("Edge browser", () => {
            it("before v16 fails", () => {
                const ua = {
                    isChrome: false,
                    isFirefox: false,
                    isEdge: true,
                    version: 15,
                    browser: "Edge"
                };
                useragent.parse.mockImplementation((input) => ua);
                expect(getBrowserInfo(req.headers["user-agent"])).toEqual({
                    browser: "Edge",
                    browserVersion: 15,
                    isBrowserSupported: false,
                    isBrowserVersionVerified: true
                });
            });

            it("after v16 succeeds", () => {
                const ua = {
                    isChrome: false,
                    isFirefox: false,
                    isEdge: true,
                    version: 16,
                    browser: "Edge"
                };
                useragent.parse.mockImplementation((input) => ua);
                expect(getBrowserInfo(req.headers["user-agent"])).toEqual({
                    browser: "Edge",
                    browserVersion: 16,
                    isBrowserSupported: true,
                    isBrowserVersionVerified: true
                });
            });
        });

        describe("IE browser", () => {
            it("before v11 fails", () => {
                const ua = {
                    isChrome: false,
                    isFirefox: false,
                    isEdge: false,
                    isIE: true,
                    version: 10,
                    browser: "IE"
                };
                useragent.parse.mockImplementation((input) => ua);
                expect(getBrowserInfo(req.headers["user-agent"])).toEqual({
                    browser: "IE",
                    browserVersion: 10,
                    isBrowserSupported: false,
                    isBrowserVersionVerified: true
                });
            });

            it("after v11 succeeds", () => {
                const ua = {
                    isChrome: false,
                    isFirefox: false,
                    isEdge: false,
                    isIE: true,
                    version: 11,
                    browser: "IE"
                };
                useragent.parse.mockImplementation((input) => ua);
                expect(getBrowserInfo(req.headers["user-agent"])).toEqual({
                    browser: "IE",
                    browserVersion: 11,
                    isBrowserSupported: true,
                    isBrowserVersionVerified: true
                });
            });
        });

        describe("Safari browser", () => {
            describe("mobile", () => {
                it("before v9.2 fails", () => {
                    const ua = {
                        isChrome: false,
                        isFirefox: false,
                        isEdge: false,
                        isIE: false,
                        isSafari: true,
                        isMobile: true,
                        version: 9.1,
                        browser: "Safari"
                    };
                    useragent.parse.mockImplementation((input) => ua);
                    expect(getBrowserInfo(req.headers["user-agent"])).toEqual({
                        browser: "Safari",
                        browserVersion: 9.1,
                        isBrowserSupported: false,
                        isBrowserVersionVerified: true
                    });
                });

                it("after v9.2 succeeds", () => {
                    const ua = {
                        isChrome: false,
                        isFirefox: false,
                        isEdge: false,
                        isIE: false,
                        isSafari: true,
                        isMobile: true,
                        version: 9.2,
                        browser: "Safari"
                    };
                    useragent.parse.mockImplementation((input) => ua);
                    expect(getBrowserInfo(req.headers["user-agent"])).toEqual({
                        browser: "Safari",
                        browserVersion: 9.2,
                        isBrowserSupported: true,
                        isBrowserVersionVerified: true
                    });
                });
            });

            describe("desktop", () => {
                it("before v9 fails", () => {
                    const ua = {
                        isChrome: false,
                        isFirefox: false,
                        isEdge: false,
                        isIE: false,
                        isSafari: true,
                        isMobile: false,
                        version: 8.9,
                        browser: "Safari"
                    };
                    useragent.parse.mockImplementation((input) => ua);
                    expect(getBrowserInfo(req.headers["user-agent"])).toEqual({
                        browser: "Safari",
                        browserVersion: 8.9,
                        isBrowserSupported: false,
                        isBrowserVersionVerified: true
                    });
                });

                it("after v9 succeeds", () => {
                    const ua = {
                        isChrome: false,
                        isFirefox: false,
                        isEdge: false,
                        isIE: false,
                        isSafari: true,
                        isMobile: false,
                        version: 9,
                        browser: "Safari"
                    };
                    useragent.parse.mockImplementation((input) => ua);
                    expect(getBrowserInfo(req.headers["user-agent"])).toEqual({
                        browser: "Safari",
                        browserVersion: 9,
                        isBrowserSupported: true,
                        isBrowserVersionVerified: true
                    });
                });
            });
        });

        it("Other browser fails", () => {
            const ua = {
                isChrome: false,
                isFirefox: false,
                isEdge: false,
                isIE: false,
                isSafari: false,
                version: 10,
                browser: ""
            };
            useragent.parse.mockImplementation((input) => ua);
            expect(getBrowserInfo(req.headers["user-agent"])).toEqual({
                browser: "",
                browserVersion: 10,
                isBrowserSupported: false,
                isBrowserVersionVerified: true
            });
        });
    });
});
