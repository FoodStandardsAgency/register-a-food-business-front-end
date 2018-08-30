import SessionWrapper from "../components/SessionWrapper";
import renderer from "react-test-renderer";

const ExampleComponent = () => (
  <div>
    <h1>A title</h1>
    <p>Some paragraph text</p>
  </div>
);

describe("<SessionWrapper />", () => {
  describe("the wrapper function", () => {
    it("returns the same component that it is passed", () => {
      const WrappedComponent = SessionWrapper(ExampleComponent);
      const treeWrapped = renderer.create(<WrappedComponent />).toJSON();
      const treeOriginal = renderer.create(<ExampleComponent />).toJSON();
      expect(JSON.stringify(treeOriginal)).toEqual(JSON.stringify(treeWrapped));
    });

    it("returns some initial props via getInitialProps when passed a session object", () => {
      const WrappedComponent = SessionWrapper(ExampleComponent);
      const initialProps = WrappedComponent.getInitialProps({
        req: { session: {} }
      });
      expect(typeof initialProps).toBe("object");
    });

    it("returns a 'cumulativeAnswers' object as part of the initial props", () => {
      const WrappedComponent = SessionWrapper(ExampleComponent);
      const initialProps = WrappedComponent.getInitialProps({
        req: { session: {} }
      });
      expect(typeof initialProps.cumulativeAnswers).toBe("object");
    });

    it("returns a 'validatorErrors' object as part of the initial props", () => {
      const WrappedComponent = SessionWrapper(ExampleComponent);
      const initialProps = WrappedComponent.getInitialProps({
        req: { session: {} }
      });
      expect(typeof initialProps.validatorErrors).toBe("object");
    });

    it("returns a 'switches' object as part of the initial props", () => {
      const WrappedComponent = SessionWrapper(ExampleComponent);
      const initialProps = WrappedComponent.getInitialProps({
        req: { session: {} }
      });
      expect(typeof initialProps.switches).toBe("object");
    });

    it("returns an 'addressLookups object as part of the initial props", () => {
      const WrappedComponent = SessionWrapper(ExampleComponent);
      const initialProps = WrappedComponent.getInitialProps({
        req: { session: {} }
      });
      expect(typeof initialProps.addressLookups).toBe("object");
    });

    it("returns a 'submissionDate' object as part of the initial props", () => {
      const WrappedComponent = SessionWrapper(ExampleComponent);
      const initialProps = WrappedComponent.getInitialProps({
        req: { session: {} }
      });
      expect(typeof initialProps.submissionDate).toBe("string");
    });

    it("returns a 'emailFbo' object as part of the initial props", () => {
      const WrappedComponent = SessionWrapper(ExampleComponent);
      const initialProps = WrappedComponent.getInitialProps({
        req: { session: {} }
      });
      expect(typeof initialProps.emailFbo).toBe("object");
    });

    it("returns a 'lcConfig' object as part of the initial props", () => {
      const WrappedComponent = SessionWrapper(ExampleComponent);
      const initialProps = WrappedComponent.getInitialProps({
        req: { session: {} }
      });
      expect(typeof initialProps.lcConfig).toBe("object");
    });

    it("returns a 'acceptAllCookies' as undefined as part of the initial props", () => {
      const WrappedComponent = SessionWrapper(ExampleComponent);
      const initialProps = WrappedComponent.getInitialProps({
        req: { session: {} }
      });
      expect(typeof initialProps.acceptAllCookies).toBe("undefined");
    });

    describe("given a url query that includes an edit value", () => {
      it("returns an editMode value that is true", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: {}, query: { edit: "on" } }
        });
        expect(initialProps.editMode).toBe(true);
      });
    });

    describe("given a url query that does not include an edit value", () => {
      it("returns an editMode value that is false", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: {}, query: {} }
        });
        expect(initialProps.editMode).toBe(false);
      });
    });

    it("returns session data even if req is undefined", () => {
      const WrappedComponent = SessionWrapper(ExampleComponent);
      const initialProps = WrappedComponent.getInitialProps({});
      expect(typeof initialProps.validatorErrors).toBe("object");
      expect(typeof initialProps.cumulativeAnswers).toBe("object");
      expect(typeof initialProps.switches).toBe("object");
      expect(typeof initialProps.addressLookups).toBe("object");
      expect(typeof initialProps.submissionDate).toBe("string");
      expect(typeof initialProps.fsaRegistrationNumber).toBe("string");
      expect(typeof initialProps.emailFbo).toBe("object");
      expect(typeof initialProps.lcConfig).toBe("object");
    });
  });

  describe("the resulting child component", () => {
    describe("given that req.session.cumulativeAnswers is undefined", () => {
      it("props.cumulativeAnswers is an empty object", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: {} }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.cumulativeAnswers).toEqual({});
      });
    });

    describe("given that req.session.validatorErrors is undefined", () => {
      it("props.validatorErrors is an empty object", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: {} }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.validatorErrors).toEqual({});
      });
    });

    describe("given that req.session.switches is undefined", () => {
      it("props.switches is object with an editMode property", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: {} }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.editMode).toBeDefined();
      });
    });

    describe("given that req.session.lc_config is undefined", () => {
      it("props.lcConfig is defined", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: {} }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.lcConfig).toBeDefined();
      });
    });

    describe("given that req.session.email_fbo is undefined", () => {
      it("props.emailFbo is defined", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: {} }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.emailFbo).toBeDefined();
      });
    });

    describe("given that req.session.addressLookups is undefined", () => {
      it("props.addressLookups is defined", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: {} }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.addressLookups).toEqual({});
      });
    });

    describe("given that req.session.acceptAllCookies is undefined", () => {
      it("props.acceptAllCookies is defined", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: {} }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.acceptAllCookies).toEqual(undefined);
      });
    });

    describe("given that req.session.cumulativeAnswers is defined", () => {
      it("props.cumulativeAnswers is the same as the session.cumulativeAnswers", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const exampleCumulativeAnswers = { test: "value" };
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: { cumulativeAnswers: exampleCumulativeAnswers } }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.cumulativeAnswers).toBe(exampleCumulativeAnswers);
      });
    });

    describe("given that req.session.validatorErrors is defined", () => {
      it("props.validatorErrors is the same as the session.validatorErrors", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const exampleValidatorErrors = { test: "value" };
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: { validatorErrors: exampleValidatorErrors } }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.validatorErrors).toBe(exampleValidatorErrors);
      });
    });

    describe("given that req.session.submissionDate is defined", () => {
      it("props.submissionDate is the same as the session.submissionDate", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const exampleSubmissionDate = "Date";
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: { submissionDate: exampleSubmissionDate } }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.submissionDate).toBe(exampleSubmissionDate);
      });
    });

    describe("given that req.session.fsaRegistrationNumber is defined", () => {
      it("props.fsaRegistrationNumber is the same as the session.fsaRegistrationNumber", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const exampleFsaRegistrationNumber = "12345678";
        const initialProps = WrappedComponent.getInitialProps({
          req: {
            session: { fsaRegistrationNumber: exampleFsaRegistrationNumber }
          }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.fsaRegistrationNumber).toBe(
          exampleFsaRegistrationNumber
        );
      });
    });

    describe("given that req.session.email_fbo is defined", () => {
      it("props.emailFbo is the same as the session.emailFbo", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const exampleEmailFbo = { success: true, recipient: "fbo@example.com" };
        const initialProps = WrappedComponent.getInitialProps({
          req: {
            session: { email_fbo: exampleEmailFbo }
          }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.emailFbo).toBe(exampleEmailFbo);
      });
    });

    describe("given that req.session.lc_config is defined", () => {
      it("props.lcConfig is the same as the session.lcConfig", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const exampleLcConfig = { example: "data" };
        const initialProps = WrappedComponent.getInitialProps({
          req: {
            session: { lc_config: exampleLcConfig }
          }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.lcConfig).toBe(exampleLcConfig);
      });
    });

    describe("given that req.session.switches is defined", () => {
      it("props.switches is the same as the session.switches but with an editMode property", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const exampleSwitches = { test: true };
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: { switches: exampleSwitches } }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.switches.test).toBe(true);
        expect(componentProps.editMode).toBeDefined();
      });
    });

    describe("given that req.session.addressLookups is defined", () => {
      it("props.addressLookups is the same as the session.addressLookups", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const exampleAddressLookup = { test: [] };
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: { addressLookups: exampleAddressLookup } }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.addressLookups).toBe(exampleAddressLookup);
      });
    });

    describe("given that req.cookies.acceptAllCookies is defined", () => {
      it("props.acceptAllCookies is the same as the cookies.acceptAllCookies", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const initialProps = WrappedComponent.getInitialProps({
          req: { cookies: { acceptAllCookies: "true" } }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.acceptAllCookies).toBe("true");
      });
    });
  });
});
