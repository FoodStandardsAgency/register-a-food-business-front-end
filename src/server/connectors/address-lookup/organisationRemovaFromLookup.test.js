const {
  organisationRemovalFromLookup
} = require("./organisationRemovalFromLookup");

describe("Function: organisationRemovalFromLookup", () => {
  beforeEach(() => {
    addressListWithOrganisation = organisationRemovalFromLookup([
      {
        addressline1: "Manor Farm Barns",
        addressline2: "Fox Road",
        addressline3: "Framingham Pigot",
        summaryline:
          "Brasteds Lodge, Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
        organisation: "Brasteds Lodge",
        buildingname: "Manor Farm Barns",
        premise: "Manor Farm Barns",
        street: "Fox Road",
        dependentlocality: "Framingham Pigot",
        posttown: "Norwich",
        county: "Norfolk",
        postcode: "NR14 7PZ"
      }
    ]);
    addressWithoutOrganisation = organisationRemovalFromLookup([
      {
        addressline1: "Room 36",
        addressline2: "Block 1 Arthur Vick",
        addressline3: "Gibbet Hill Road",
        summaryline:
          "Room 36, Block 1 Arthur Vick, Gibbet Hill Road, Coventry, West Midlands, CV4 7AL",
        subbuildingname: "Room 36",
        buildingname: "Block 1 Arthur Vick",
        premise: "Room 36, Block 1 Arthur Vick",
        street: "Gibbet Hill Road",
        posttown: "Norwich",
        county: "Norfolk",
        postcode: "NR14 7PZ"
      }
    ]);
    addressWithOrganisationButNotInSummaryline = organisationRemovalFromLookup([
      {
        addressline1: "Room 36",
        addressline2: "Block 1 Arthur Vick",
        addressline3: "Gibbet Hill Road",
        summaryline:
          "Room 36, Block 1 Arthur Vick, Gibbet Hill Road, Coventry, West Midlands, CV4 7AL",
        organisation: "Brasteds Lodge",
        subbuildingname: "Room 36",
        buildingname: "Block 1 Arthur Vick",
        premise: "Room 36, Block 1 Arthur Vick",
        street: "Gibbet Hill Road",
        posttown: "Norwich",
        county: "Norfolk",
        postcode: "NR14 7PZ"
      }
    ]);
    addressWithOrganisationAsEmptyString = organisationRemovalFromLookup([
      {
        summaryline:
          ", Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
        organisation: ""
      }
    ]);
    addressWithMultipleOrganisations = organisationRemovalFromLookup([
      {
        summaryline:
          "Org1, 1Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
        organisation: "Org1"
      },
      {
        summaryline:
          "Org2, 2Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
        organisation: "Org2"
      },
      {
        summaryline:
          "3Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ"
      }
    ]);
    addressWithOrganisationAsUndefined = organisationRemovalFromLookup([
      {
        summaryline:
          "Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
        organisation: undefined
      }
    ]);
    addressWithOrganisationAsNull = organisationRemovalFromLookup([
      {
        summaryline:
          "Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
        organisation: null
      }
    ]);
    addressWithOrganisationAsBoolean = organisationRemovalFromLookup([
      {
        summaryline:
          "Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
        organisation: true
      }
    ]);
    addressWithMultipleOrganisationAtSameAddress =
      organisationRemovalFromLookup([
        {
          addressline1: "Manor Farm Barns",
          addressline2: "Fox Road",
          addressline3: "Framingham Pigot",
          summaryline:
            "Allies Computing Ltd, Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
          organisation: "Allies Computing Ltd",
          buildingname: "Manor Farm Barns",
          premise: "Manor Farm Barns",
          street: "Fox Road",
          dependentlocality: "Framingham Pigot",
          posttown: "Norwich",
          county: "Norfolk",
          postcode: "NR14 7PZ"
        },
        {
          addressline1: "Manor Farm Barns",
          addressline2: "Fox Road",
          addressline3: "Framingham Pigot",
          summaryline:
            "B 2 B Cashflow Solutions Ltd, Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
          organisation: "B 2 B Cashflow Solutions Ltd",
          buildingname: "Manor Farm Barns",
          premise: "Manor Farm Barns",
          street: "Fox Road",
          dependentlocality: "Framingham Pigot",
          posttown: "Norwich",
          county: "Norfolk",
          postcode: "NR14 7PZ"
        },
        {
          addressline1: "Manor Farm Barns",
          addressline2: "Fox Road",
          addressline3: "Framingham Pigot",
          summaryline:
            "Brasteds Lodge, Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
          organisation: "Brasteds Lodge",
          buildingname: "Manor Farm Barns",
          premise: "Manor Farm Barns",
          street: "Fox Road",
          dependentlocality: "Framingham Pigot",
          posttown: "Norwich",
          county: "Norfolk",
          postcode: "NR14 7PZ"
        },
        {
          addressline1: "1 Penns Cottages",
          addressline2: "Fox Road",
          addressline3: "Framingham Pigot",
          summaryline:
            "1 Penns Cottages, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
          buildingname: "1 Penns Cottages",
          premise: "1 Penns Cottages",
          street: "Fox Road",
          dependentlocality: "Framingham Pigot",
          posttown: "Norwich",
          county: "Norfolk",
          postcode: "NR14 7PZ"
        }
      ]);
    emptyAddressList = organisationRemovalFromLookup([]);
  });

  it("should return address list without organisation", () => {
    expect(addressListWithOrganisation).toEqual([
      {
        addressline1: "Manor Farm Barns",
        addressline2: "Fox Road",
        addressline3: "Framingham Pigot",
        summaryline:
          "Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
        buildingname: "Manor Farm Barns",
        premise: "Manor Farm Barns",
        street: "Fox Road",
        dependentlocality: "Framingham Pigot",
        posttown: "Norwich",
        county: "Norfolk",
        postcode: "NR14 7PZ"
      }
    ]);
  });
  it("should return unchanged address list", () => {
    expect(addressWithoutOrganisation).toEqual([
      {
        addressline1: "Room 36",
        addressline2: "Block 1 Arthur Vick",
        addressline3: "Gibbet Hill Road",
        summaryline:
          "Room 36, Block 1 Arthur Vick, Gibbet Hill Road, Coventry, West Midlands, CV4 7AL",
        subbuildingname: "Room 36",
        buildingname: "Block 1 Arthur Vick",
        premise: "Room 36, Block 1 Arthur Vick",
        street: "Gibbet Hill Road",
        posttown: "Norwich",
        county: "Norfolk",
        postcode: "NR14 7PZ"
      }
    ]);
  });
  it("should return address list without organisation key", () => {
    expect(addressWithOrganisationButNotInSummaryline).toEqual([
      {
        addressline1: "Room 36",
        addressline2: "Block 1 Arthur Vick",
        addressline3: "Gibbet Hill Road",
        summaryline:
          "Room 36, Block 1 Arthur Vick, Gibbet Hill Road, Coventry, West Midlands, CV4 7AL",
        subbuildingname: "Room 36",
        buildingname: "Block 1 Arthur Vick",
        premise: "Room 36, Block 1 Arthur Vick",
        street: "Gibbet Hill Road",
        posttown: "Norwich",
        county: "Norfolk",
        postcode: "NR14 7PZ"
      }
    ]);
  });
  it("should return address list without organisation if empty string", () => {
    expect(addressWithOrganisationAsEmptyString).toEqual([
      {
        summaryline:
          "Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ"
      }
    ]);
  });
  it("should return address list of 3 without organisation", () => {
    expect(addressWithMultipleOrganisations).toEqual([
      {
        summaryline:
          "1Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ"
      },
      {
        summaryline:
          "2Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ"
      },
      {
        summaryline:
          "3Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ"
      }
    ]);
  });
  it("should return address list without organisation if undefined", () => {
    expect(addressWithOrganisationAsUndefined).toEqual([
      {
        summaryline:
          "Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ"
      }
    ]);
  });
  it("should return address list without organisation if null", () => {
    expect(addressWithOrganisationAsNull).toEqual([
      {
        summaryline:
          "Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ"
      }
    ]);
  });
  it("should return address list without organisation if boolean", () => {
    expect(addressWithOrganisationAsBoolean).toEqual([
      {
        summaryline:
          "Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ"
      }
    ]);
  });
  it("should return address list without multiple same addresses", () => {
    expect(addressWithMultipleOrganisationAtSameAddress).toEqual([
      {
        addressline1: "Manor Farm Barns",
        addressline2: "Fox Road",
        addressline3: "Framingham Pigot",
        summaryline:
          "Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
        buildingname: "Manor Farm Barns",
        premise: "Manor Farm Barns",
        street: "Fox Road",
        dependentlocality: "Framingham Pigot",
        posttown: "Norwich",
        county: "Norfolk",
        postcode: "NR14 7PZ"
      },
      {
        addressline1: "1 Penns Cottages",
        addressline2: "Fox Road",
        addressline3: "Framingham Pigot",
        summaryline:
          "1 Penns Cottages, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
        buildingname: "1 Penns Cottages",
        premise: "1 Penns Cottages",
        street: "Fox Road",
        dependentlocality: "Framingham Pigot",
        posttown: "Norwich",
        county: "Norfolk",
        postcode: "NR14 7PZ"
      }
    ]);
  });
  it("should return empty address list", () => {
    expect(emptyAddressList).toEqual([]);
  });
});
