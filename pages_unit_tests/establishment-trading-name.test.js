const establishmentTradingName = require("../pages/establishment-trading-name.njk");
const { axe, renderPage } = require("../testHelpers")

describe("Establishment-Trading-Name", () => {
  it("renders without crashing", () => {
    const $ = renderPage("establishment-trading-name", "language: 'en'");
    
    const $mainHeading = $('#main-heading')
    expect($mainHeading.get(0).tagName).toEqual('h1')
  });

  it('passes accessibility tests', async () => {
    const $ = renderPage('establishment-trading-name', "language: 'en'")

    const results = await axe($.html())
    expect(results).toHaveNoViolations()
  })

  it('Heading text correct', async () => {
    const $ = renderPage('establishment-trading-name', "language: 'en'")

    const $mainHeading = $('#main-heading')
    expect($mainHeading.get(0).children[0].data).toBe("Trading name")
});

it('Input box is correct length', async () => {
  const $ = renderPage('establishment-trading-name', "language: 'en'")

  const $mainHeading = $('#establishment_trading_name')
  expect($mainHeading.length).toBe(1)
});
})



