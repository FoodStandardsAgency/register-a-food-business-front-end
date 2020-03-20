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
        operator_type: "Sole trader"
      },
      premise: {
        establishment_postcode: "SW12 9RQ",
        establishment_address_line_1: "123",
        establishment_adress_line_2: "Street",
        establishment_town: "London",
        establishment_type: "Somewhere"
      },
      activities: {
        customer_type: "End consumer",
        business_type: "Livestock farm",
        business_type_search_term: "Example",
        import_export_activities: "None"
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
        operator_type: "Sole trader"
      },
      premise: {
        establishment_postcode: "SW12 9RQ",
        establishment_address_line_1: "123",
        establishment_adress_line_2: "Street",
        establishment_town: "London",
        establishment_type: "Somewhere"
      },
      activities: {
        customer_type: "End consumer",
        business_type: "Livestock farm",
        business_type_search_term: "Example",
        import_export_activities: "None"
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
        process.env.DOUBLE_MODE = false;
        const realResponse = await sendRequest(JSON.stringify(validBody));
        process.env.DOUBLE_MODE = true;
        const doubleResponse = await sendRequest(JSON.stringify(validBody));
        expect(realResponse.status).toBe(doubleResponse.status);
      });

      it("should return the same result from res.json()", async () => {
        process.env.DOUBLE_MODE = false;
        const realResponse = await sendRequest(JSON.stringify(validBody));
        process.env.DOUBLE_MODE = true;
        const doubleResponse = await sendRequest(JSON.stringify(validBody));
        const realJsonResponse = await realResponse.json();
        const doubleJsonResponse = doubleResponse.json();
        expect(typeof realJsonResponse.regId).toBe(
          typeof doubleJsonResponse.regId
        );
        expect(typeof realJsonResponse["fsa-rn"]).toBe(
          typeof doubleJsonResponse["fsa-rn"]
        );
        expect(typeof realJsonResponse.tascomiResponse.id).toEqual(
          typeof doubleJsonResponse.tascomiResponse.id
        );
        expect(
          typeof realJsonResponse.tascomiResponse.online_reference
        ).toEqual(typeof doubleJsonResponse.tascomiResponse.online_reference);
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
          typeof realJsonResponse.lcConfig.hygieneAndStandards.local_council
        ).toEqual(
          typeof doubleJsonResponse.lcConfig.hygieneAndStandards.local_council
        );
        expect(
          typeof realJsonResponse.lcConfig.hygieneAndStandards
            .local_council_email
        ).toEqual(
          typeof doubleJsonResponse.lcConfig.hygieneAndStandards
            .local_council_email
        );
      });
    });

    describe("given a local council that has a separate council for standards", () => {
      beforeEach(() => {
        validBody.local_council_url = "west-dorset";
      });

      it("should return the same result from res.json()", async () => {
        process.env.DOUBLE_MODE = false;
        const realResponse = await sendRequest(JSON.stringify(validBody));
        process.env.DOUBLE_MODE = true;
        const doubleResponse = await sendRequest(JSON.stringify(validBody));
        const realJsonResponse = await realResponse.json();
        const doubleJsonResponse = doubleResponse.json();

        expect(typeof realJsonResponse.email_lc.hygiene.recipient).toEqual(
          typeof doubleJsonResponse.email_lc.hygiene.recipient
        );
        expect(typeof realJsonResponse.lcConfig.hygiene.local_council).toEqual(
          typeof doubleJsonResponse.lcConfig.hygiene.local_council
        );
        expect(
          typeof realJsonResponse.lcConfig.hygiene.local_council_email
        ).toEqual(
          typeof doubleJsonResponse.lcConfig.hygiene.local_council_email
        );
        expect(typeof realJsonResponse.email_lc.standards.recipient).toEqual(
          typeof doubleJsonResponse.email_lc.standards.recipient
        );
        expect(
          typeof realJsonResponse.lcConfig.standards.local_council
        ).toEqual(typeof doubleJsonResponse.lcConfig.standards.local_council);
        expect(
          typeof realJsonResponse.lcConfig.standards.local_council_email
        ).toEqual(
          typeof doubleJsonResponse.lcConfig.standards.local_council_email
        );
      });
    });
  });

  describe("Invalid requests", () => {
    it("Should return the same status", async () => {
      process.env.DOUBLE_MODE = false;
      const realResponse = await sendRequest(JSON.stringify(invalidBody));
      process.env.DOUBLE_MODE = true;
      const doubleResponse = await sendRequest(JSON.stringify(invalidBody));
      expect(realResponse.status).toBe(doubleResponse.status);
    });
    it("should return the same result from res.json()", async () => {
      process.env.DOUBLE_MODE = false;
      const realResponse = await sendRequest(JSON.stringify(invalidBody));
      process.env.DOUBLE_MODE = true;
      const doubleResponse = await sendRequest(JSON.stringify(invalidBody));
      const realJsonResponse = await realResponse.json();
      const doubleJsonResponse = doubleResponse.json();
      expect(realJsonResponse).toEqual(doubleJsonResponse);
    });
  });
});
