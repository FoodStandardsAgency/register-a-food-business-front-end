const _error = require("../pages/_error.njk");
const { axe, renderPage } = require("../testHelpers")

describe("Error", () => {
  it("renders without crashing", () => {
    const $ = renderPage("_error", "language: 'en'");
    
    const $mainHeading = $('#main-heading')
    expect($mainHeading.get(0).tagName).toEqual('h1')
  });

  it('passes accessibility tests', async () => {
    const $ = renderPage('_error', "language: 'en'")

    const results = await axe($.html())
    expect(results).toHaveNoViolations()
  })

  it('Heading text correct', async () => {
    const $ = renderPage('_error', "language: 'en'")

    const $mainHeading = $('#main-heading')
    expect($mainHeading.get(0).children[0].data).toBe("Page Not Found")
});
})
