const {
  sendRequest
} = require("../../src/server/connectors/registration/registration.connector");

const validBody = {
  registration: {
    establishment: {
      establishment_details: {
        establishment_trading_name: "Itsu",
        establishment_primary_number: "329857245",
        establishment_secondary_number: "84345245",
        establishment_email: "django@uk.ibm.com",
        establishment_opening_date: "2018-06-07"
      },
      operator: {
        operator_first_name: "Fred",
        operator_last_name: "Bloggs",
        operator_postcode: "SW12 9RQ",
        operator_address_line_1: "335",
        operator_adress_line_2: "Some St.",
        operator_town: "London",
        operator_primary_number: "9827235",
        operator_email: "fsatestemail.valid@gmail.com",
        operator_type: "SOLETRADER"
      },
      premise: {
        establishment_postcode: "SW12 9RQ",
        establishment_address_line_1: "123",
        establishment_adress_line_2: "Street",
        establishment_town: "London",
        establishment_type: "DOMESTIC"
      },
      activities: {
        customer_type: "END_CONSUMER",
        business_type: "002",
        business_type_search_term: "Example",
        import_export_activities: "NONE",
        water_supply: "PUBLIC"
      }
    },
    declaration: {
      declaration1: "Declaration",
      declaration2: "Declaration",
      declaration3: "Declaration"
    }
  },
  local_council_url: "this is set in the tests"
};

describe("Registration service", () => {
  beforeEach(() => {
    process.env.DOUBLE_MODE = true;
  });

  describe("When given a valid request", () => {
    it("should return 200 response", async () => {
      validBody.local_council_url = "cardiff";
      const result = await sendRequest(JSON.stringify(validBody));

      expect(result.status).toBe(200);
    });

    describe("given a local council that manages hygiene and standards", () => {
      it("should return a json function with the required data", async () => {
        validBody.local_council_url = "cardiff";
        const result = await sendRequest(JSON.stringify(validBody));

        expect(result.json).toBeDefined();
        const resultJson = result.json();
        expect(resultJson.regId).toBeDefined();
        expect(resultJson["fsa-rn"]).toBeDefined();
        expect(resultJson.tascomiResponse.id).toBeDefined();
        expect(resultJson.tascomiResponse.online_reference).toBeDefined();
        expect(resultJson.reg_submission_date).toBeDefined();
        expect(resultJson.emailFbo.recipient).toBeDefined();
        expect(resultJson.email_lc.hygieneAndStandards.recipient).toBeDefined();
        expect(
          resultJson.lcConfig.hygieneAndStandards.local_council
        ).toBeDefined();
        expect(
          resultJson.lcConfig.hygieneAndStandards.local_council_email
        ).toBeDefined();
      });
    });

    describe("given a local council that has a separate council for standards", () => {
      it("should return a json function with the required data", async () => {
        validBody.local_council_url = "west-dorset";
        const result = await sendRequest(JSON.stringify(validBody));

        expect(result.json).toBeDefined();
        const resultJson = result.json();
        expect(resultJson.regId).toBeDefined();
        expect(resultJson["fsa-rn"]).toBeDefined();
        expect(resultJson.tascomiResponse.id).toBeDefined();
        expect(resultJson.tascomiResponse.online_reference).toBeDefined();
        expect(resultJson.reg_submission_date).toBeDefined();
        expect(resultJson.emailFbo.recipient).toBeDefined();
        expect(resultJson.email_lc.hygiene.recipient).toBeDefined();
        expect(resultJson.lcConfig.hygiene.local_council).toBeDefined();
        expect(resultJson.lcConfig.hygiene.local_council_email).toBeDefined();
        expect(resultJson.email_lc.standards.recipient).toBeDefined();
        expect(resultJson.lcConfig.standards.local_council).toBeDefined();
        expect(resultJson.lcConfig.standards.local_council_email).toBeDefined();
      });
    });
  });

  describe("When given an invalid request", () => {
    it("should return 500 response", async () => {
      const result = await sendRequest(JSON.stringify({ registration: {} }));
      expect(result.status).toBe(400);
    });

    it("should return json function with errorCode", async () => {
      const result = await sendRequest(JSON.stringify({ registration: {} }));
      expect(result.json().errorCode).toBeDefined();
    });
  });
});
