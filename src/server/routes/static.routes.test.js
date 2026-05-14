jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn()
  }))
}));

jest.mock("../propsGenerator", () =>
  jest.fn((req) => ({
    language: req.query?.lang || "en",
    currentPage: req.url
  }))
);

const { staticRouter } = require("./static.route");
const PropsGenerator = require("../propsGenerator");

describe("Static routes: ", () => {
  let router, res;

  beforeEach(() => {
    jest.clearAllMocks();
    router = staticRouter();
    res = {
      render: jest.fn(),
      redirect: jest.fn()
    };
  });

  const buildReq = (url, lang) => ({
    url,
    query: { lang: lang || "en" },
    session: {},
    cookies: {},
    headers: {
      "user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0"
    },
    csrfToken: jest.fn()
  });

  describe("GET /cookie-policy", () => {
    let handler;

    beforeEach(() => {
      handler = router.get.mock.calls.find((call) => call[0] === "/cookie-policy")[1];
    });

    it("should render cookie-policy template", () => {
      const req = buildReq("/cookie-policy");
      handler(req, res);
      expect(res.render).toHaveBeenCalledWith(
        "cookie-policy",
        expect.objectContaining({
          props: expect.objectContaining({ hideback: true })
        })
      );
    });

    it("should call PropsGenerator with the request", () => {
      const req = buildReq("/cookie-policy");
      handler(req, res);
      expect(PropsGenerator).toHaveBeenCalledWith(req);
    });

    it("should pass hideback: true in props", () => {
      const req = buildReq("/cookie-policy");
      handler(req, res);
      const props = res.render.mock.calls[0][1].props;
      expect(props.hideback).toBe(true);
    });

    it("should pass the correct language when lang=cy", () => {
      const req = buildReq("/cookie-policy?lang=cy", "cy");
      handler(req, res);
      const props = res.render.mock.calls[0][1].props;
      expect(props.language).toBe("cy");
    });
  });

  describe("GET /privacy-notice", () => {
    let handler;

    beforeEach(() => {
      handler = router.get.mock.calls.find((call) => call[0] === "/privacy-notice")[1];
    });

    it("should render privacy-notice template", () => {
      const req = buildReq("/privacy-notice");
      handler(req, res);
      expect(res.render).toHaveBeenCalledWith(
        "privacy-notice",
        expect.objectContaining({
          props: expect.objectContaining({ hideback: true })
        })
      );
    });

    it("should call PropsGenerator with the request", () => {
      const req = buildReq("/privacy-notice");
      handler(req, res);
      expect(PropsGenerator).toHaveBeenCalledWith(req);
    });

    it("should pass hideback: true in props", () => {
      const req = buildReq("/privacy-notice");
      handler(req, res);
      const props = res.render.mock.calls[0][1].props;
      expect(props.hideback).toBe(true);
    });

    it("should pass the correct language when lang=cy", () => {
      const req = buildReq("/privacy-notice?lang=cy", "cy");
      handler(req, res);
      const props = res.render.mock.calls[0][1].props;
      expect(props.language).toBe("cy");
    });
  });

  describe("GET /accessibility", () => {
    let handler;

    beforeEach(() => {
      handler = router.get.mock.calls.find((call) => call[0] === "/accessibility")[1];
    });

    it("should render accessibility template", () => {
      const req = buildReq("/accessibility");
      handler(req, res);
      expect(res.render).toHaveBeenCalledWith(
        "accessibility",
        expect.objectContaining({
          props: expect.any(Object)
        })
      );
    });

    it("should call PropsGenerator with the request", () => {
      const req = buildReq("/accessibility");
      handler(req, res);
      expect(PropsGenerator).toHaveBeenCalledWith(req);
    });

    it("should not pass hideback in props", () => {
      const req = buildReq("/accessibility");
      handler(req, res);
      const props = res.render.mock.calls[0][1].props;
      expect(props.hideback).toBeUndefined();
    });

    it("should pass the correct language when lang=cy", () => {
      const req = buildReq("/accessibility?lang=cy", "cy");
      handler(req, res);
      const props = res.render.mock.calls[0][1].props;
      expect(props.language).toBe("cy");
    });
  });
});
