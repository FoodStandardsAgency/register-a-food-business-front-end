const establishmentTradingName = require("../pages/establishment-opening-status.njk");
const { axe, renderPage } = require("../testHelpers")

describe("Establishment-Opening-Status", () => {
  it("renders without crashing", () => {
    const $ = renderPage("establishment-opening-status", "language: 'en'");
    
    const $mainHeading = $('#main-heading')
    expect($mainHeading.get(0).tagName).toEqual('h1')
  });

  it('passes accessibility tests', async () => {
    const $ = renderPage('establishment-opening-status', "language: 'en'")

    const results = await axe($.html())
    expect(results).toHaveNoViolations()
  })

  it('Heading text correct', async () => {
    const $ = renderPage('establishment-opening-status', "language: 'en'")

    const $mainHeading = $('#main-heading')
    expect($mainHeading.get(0).children[0].data).toBe("Is this establishment already trading?")
});

  describe('Radio boxes have correct value', () =>{
    it('Already trading radio has correct value', async () => {
      const $ = renderPage('establishment-opening-status', "language: 'en'")
      const $mainHeadingTrading = $('#establishment_opening_status_already_trading')
      expect($mainHeadingTrading.get(0).attribs.value).toBe("Establishment is already trading")
    });
    it('Not trading radio has correct value', async () => {
      const $ = renderPage('establishment-opening-status', "language: 'en'")
      const $mainHeadingNotTrading = $('#establishment_opening_status_not_trading')
      expect($mainHeadingNotTrading.get(0).attribs.value).toBe("Establishment due to trade")
    });
  })
})



