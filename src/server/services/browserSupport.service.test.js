jest.mock("express-useragent");
const useragent = require("express-useragent");
const { checkBrowserSupported } = require("./browser-support.service");

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
          version: 66
        };
        useragent.parse.mockImplementation(input => ua);
        expect(checkBrowserSupported(req)).toBeFalsy();
      });

      it("after v67 succeeds", () => {
        const ua = {
          isChrome: true,
          version: 67
        };
        useragent.parse.mockImplementation(input => ua);
        expect(checkBrowserSupported(req)).toBeTruthy();
      });
    });

    describe("Firefox browser", () => {
      it("before v60 fails", () => {
        const ua = {
          isChrome: false,
          isFirefox: true,
          version: 59
        };
        useragent.parse.mockImplementation(input => ua);
        expect(checkBrowserSupported(req)).toBeFalsy();
      });

      it("after v60 succeeds", () => {
        const ua = {
          isChrome: false,
          isFirefox: true,
          version: 60
        };
        useragent.parse.mockImplementation(input => ua);
        expect(checkBrowserSupported(req)).toBeTruthy();
      });
    });

    describe("Edge browser", () => {
      it("before v16 fails", () => {
        const ua = {
          isChrome: false,
          isFirefox: false,
          isEdge: true,
          version: 15
        };
        useragent.parse.mockImplementation(input => ua);
        expect(checkBrowserSupported(req)).toBeFalsy();
      });

      it("after v16 succeeds", () => {
        const ua = {
          isChrome: false,
          isFirefox: false,
          isEdge: true,
          version: 16
        };
        useragent.parse.mockImplementation(input => ua);
        expect(checkBrowserSupported(req)).toBeTruthy();
      });
    });

    describe("IE browser", () => {
      it("before v11 fails", () => {
        const ua = {
          isChrome: false,
          isFirefox: false,
          isEdge: false,
          isIE: true,
          version: 10
        };
        useragent.parse.mockImplementation(input => ua);
        expect(checkBrowserSupported(req)).toBeFalsy();
      });

      it("after v11 succeeds", () => {
        const ua = {
          isChrome: false,
          isFirefox: false,
          isEdge: false,
          isIE: true,
          version: 11
        };
        useragent.parse.mockImplementation(input => ua);
        expect(checkBrowserSupported(req)).toBeTruthy();
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
            version: 9.1
          };
          useragent.parse.mockImplementation(input => ua);
          expect(checkBrowserSupported(req)).toBeFalsy();
        });

        it("after v9.2 succeeds", () => {
          const ua = {
            isChrome: false,
            isFirefox: false,
            isEdge: false,
            isIE: false,
            isSafari: true,
            isMobile: true,
            version: 9.2
          };
          useragent.parse.mockImplementation(input => ua);
          expect(checkBrowserSupported(req)).toBeTruthy();
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
            version: 8.9
          };
          useragent.parse.mockImplementation(input => ua);
          expect(checkBrowserSupported(req)).toBeFalsy();
        });

        it("after v9 succeeds", () => {
          const ua = {
            isChrome: false,
            isFirefox: false,
            isEdge: false,
            isIE: false,
            isSafari: true,
            isMobile: false,
            version: 9
          };
          useragent.parse.mockImplementation(input => ua);
          expect(checkBrowserSupported(req)).toBeTruthy();
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
        version: 10
      };
      useragent.parse.mockImplementation(input => ua);
      expect(checkBrowserSupported(req)).toBeFalsy();
    });
  });
});
