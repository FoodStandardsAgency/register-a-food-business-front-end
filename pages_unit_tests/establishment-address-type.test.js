const establishmentTradingName = require("../pages/establishment-address-type.njk");
const { axe, renderPage } = require("../testHelpers")

describe("Establishment-Address-Type", () => {
  it("renders without crashing", () => {
    const $ = renderPage("establishment-address-type", "language: 'en'");
    
    const $mainHeading = $('#main-heading')
    expect($mainHeading.get(0).tagName).toEqual('h1')
  });

  it('passes accessibility tests', async () => {
    const $ = renderPage('establishment-address-type', "language: 'en'")

    const results = await axe($.html())
    expect(results).toHaveNoViolations()
  })

  it('Heading text correct', async () => {
    const $ = renderPage('establishment-address-type', "language: 'en'")

    const $mainHeading = $('#main-heading')
    expect($mainHeading.get(0).children[0].data).toBe("Where is this establishment located?")
});

  describe('Radio boxes have correct value', () =>{
    it('Mobile radio has correct value', async () => {
      const $ = renderPage('establishment-address-type', "language: 'en'")
      const $mainHeadingMobile = $('#establishment_type_mobile_moveable')
      expect($mainHeadingMobile.get(0).attribs.value).toBe("MOBILE")
    });
    it('Domestic radio has correct value', async () => {
      const $ = renderPage('establishment-address-type', "language: 'en'")
      const $mainHeadingDomestic = $('#establishment_type_home_domestic')
      expect($mainHeadingDomestic.get(0).attribs.value).toBe("DOMESTIC")
    });
    it('Commercial radio has correct value', async () => {
      const $ = renderPage('establishment-address-type', "language: 'en'")
      const $mainHeadingCommercial = $('#establishment_type_business_commercial')
      expect($mainHeadingCommercial.get(0).attribs.value).toBe("COMMERCIAL")
    });
  })
})



