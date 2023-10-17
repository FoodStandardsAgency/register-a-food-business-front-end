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
        establishment_email: "fsatestemail.valid@gmail.com",
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
  local_council_url: "this is set during the tests"
};

const invalidBody = {
  registration: {
    establishment: {
      establishment_details: {
        establishment_trading_name: "Itsu",
        establishment_primary_number: "329857245",
        establishment_secondary_number: "84345245",
        establishment_email: "dsdf",
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
        operator_type: "invalid"
      },
      premise: {
        establishment_postcode: "SW12 9RQ",
        establishment_address_line_1: "123",
        establishment_adress_line_2: "Street",
        establishment_town: "London",
        establishment_type: "invalid"
      },
      activities: {
        customer_type: "invalid",
        business_type: "invalid",
        business_type_search_term: "Example",
        import_export_activities: "invalid"
      }
    },
    declaration: {
      declaration1: "Declaration",
      declaration2: "Declaration",
      declaration3: "Declaration"
    }
  },
  local_council_url: "cardiff"
};

describe("Registration contract", () => {
  describe("Valid requests", () => {
    describe("given a local council that manages hygiene and standards", () => {
      beforeEach(() => {
        validBody.local_council_url = "cardiff";
      });

      it("Should return the same status", async () => {
        const realResponse = await sendRequest(validBody);
        const doubleResponse = await sendRequest(validBody);

        expect(realResponse.status).toBe(doubleResponse.status);
      });

      it("should return the same result from res.data", async () => {
        const realResponse = await sendRequest(validBody);
        const doubleResponse = await sendRequest(validBody);
        const realJsonResponse = realResponse.config.data;
        const doubleJsonResponse = doubleResponse.config.data;
        expect(typeof realJsonResponse.regId).toBe(
          typeof doubleJsonResponse.regId
        );
        expect(typeof realJsonResponse["fsa-rn"]).toBe(
          typeof doubleJsonResponse["fsa-rn"]
        );
        expect(realJsonResponse.reg_submission_date).toEqual(
          doubleJsonResponse.reg_submission_date
        );
        expect(typeof realJsonResponse.emailFbo.recipient).toEqual(
          typeof doubleJsonResponse.emailFbo.recipient
        );
        expect(
          typeof realJsonResponse.email_lc.hygieneAndStandards.recipient
        ).toEqual(
          typeof doubleJsonResponse.email_lc.hygieneAndStandards.recipient
        );
        expect(
          typeof realJsonResponse.laConfig.hygieneAndStandards.local_council
        ).toEqual(
          typeof doubleJsonResponse.laConfig.hygieneAndStandards.local_council
        );
        expect(
          typeof realJsonResponse.laConfig.hygieneAndStandards
            .local_council_email
        ).toEqual(
          typeof doubleJsonResponse.laConfig.hygieneAndStandards
            .local_council_email
        );
      });
    });

    describe("given a local council that has a separate council for standards", () => {
      beforeEach(() => {
        validBody.local_council_url = "west-dorset";
      });

      it("should return the same result from res.data", async () => {
        const realResponse = await sendRequest(validBody);
        const doubleResponse = await sendRequest(validBody);
        const realJsonResponse = realResponse.data;
        const doubleJsonResponse = doubleResponse.data;

        expect(typeof realJsonResponse.email_lc.hygiene.recipient).toEqual(
          typeof doubleJsonResponse.email_lc.hygiene.recipient
        );
        expect(typeof realJsonResponse.laConfig.hygiene.local_council).toEqual(
          typeof doubleJsonResponse.laConfig.hygiene.local_council
        );
        expect(
          typeof realJsonResponse.laConfig.hygiene.local_council_email
        ).toEqual(
          typeof doubleJsonResponse.laConfig.hygiene.local_council_email
        );
        expect(typeof realJsonResponse.email_lc.standards.recipient).toEqual(
          typeof doubleJsonResponse.email_lc.standards.recipient
        );
        expect(
          typeof realJsonResponse.laConfig.standards.local_council
        ).toEqual(typeof doubleJsonResponse.laConfig.standards.local_council);
        expect(
          typeof realJsonResponse.laConfig.standards.local_council_email
        ).toEqual(
          typeof doubleJsonResponse.laConfig.standards.local_council_email
        );
      });
    });
  });

  describe("Invalid requests", () => {
    it("Should return the same status", async () => {
      const realResponse = await sendRequest(invalidBody);
      const doubleResponse = await sendRequest(invalidBody);
      expect(realResponse.status).toBe(doubleResponse.status);
    });
    it("should return the same result from res.data", async () => {
      const realResponse = await sendRequest(invalidBody);
      const doubleResponse = await sendRequest(invalidBody);
      const realJsonResponse = realResponse.data;
      const doubleJsonResponse = doubleResponse.data;
      expect(realJsonResponse).toEqual(doubleJsonResponse);
    });
  });
});
