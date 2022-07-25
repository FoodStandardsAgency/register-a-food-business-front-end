const {
  removeOrganisationFromAddressLookup
} = require("./removeOrganisationFromAddressLookup");

describe("Function: removeOrganisationFromAddressLookup", () => {
  describe("when address list has organisation", () => {
    const addressLookup = removeOrganisationFromAddressLookup([
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
    it("should return address list without organisation", () => {
      expect(addressLookup).toEqual([
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
  });

  describe("when address list without organisation", () => {
    const addressLookup = removeOrganisationFromAddressLookup([
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
    it("should return unchanged address list", () => {
      expect(addressLookup).toEqual([
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
  });

  describe("when address list has organisation key, but not in summaryline", () => {
    const addressLookup = removeOrganisationFromAddressLookup([
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
    it("should return address list without organisation key", () => {
      expect(addressLookup).toEqual([
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
  });

  describe("when address list has organisation as empty string", () => {
    const addressLookup = removeOrganisationFromAddressLookup([
      {
        summaryline:
          ", Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
        organisation: ""
      }
    ]);
    it("should return address list without organisation", () => {
      expect(addressLookup).toEqual([
        {
          summaryline:
            "Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ"
        }
      ]);
    });
  });

  describe("when address list has 3 address and 2 of them has organisation", () => {
    const addressLookup = removeOrganisationFromAddressLookup([
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
    it("should return address list of 3 without organisation", () => {
      expect(addressLookup).toEqual([
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
  });

  describe("when address list has organisation key and it is not string", () => {
    asUndefined = removeOrganisationFromAddressLookup([
      {
        summaryline:
          "Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
        organisation: undefined
      }
    ]);
    asNull = removeOrganisationFromAddressLookup([
      {
        summaryline:
          "Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
        organisation: null
      }
    ]);
    asBoolean = removeOrganisationFromAddressLookup([
      {
        summaryline:
          "Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
        organisation: true
      }
    ]);
    it("should return address list without organisation key", () => {
      expect(asUndefined).toEqual([
        {
          summaryline:
            "Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ"
        }
      ]);
      expect(asNull).toEqual([
        {
          summaryline:
            "Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ"
        }
      ]);
      expect(asBoolean).toEqual([
        {
          summaryline:
            "Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ"
        }
      ]);
    });
  });

  describe("when address list has multiple organisation at same address", () => {
    const addressLookup = removeOrganisationFromAddressLookup([
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
    it("should return address list without organisation and without duplicate address", () => {
      expect(addressLookup).toEqual([
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
  });

  describe("when address list is empty", () => {
    const addressLookup = removeOrganisationFromAddressLookup([]);
    it("should return empty address list", () => {
      expect(addressLookup).toEqual([]);
    });
  });
});
