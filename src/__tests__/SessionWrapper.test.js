import SessionWrapper from "../components/SessionWrapper";
import renderer from "react-test-renderer";

const ExampleComponent = () => (
  <div>
    <h1>A title</h1>
    <p>Some paragraph text</p>
  </div>
);
let req = { url: "", session: {}, url: "", query: {}, cookies: {} };

let initialProps;
const WrappedComponent = SessionWrapper(ExampleComponent);

describe("<SessionWrapper />", () => {
  describe("the wrapper function", () => {
    it("returns the same component that it is passed", () => {
      const treeWrapped = renderer.create(<WrappedComponent />).toJSON();
      const treeOriginal = renderer.create(<ExampleComponent />).toJSON();
      expect(JSON.stringify(treeOriginal)).toEqual(JSON.stringify(treeWrapped));
    });

    it("returns some initial props via getInitialProps when passed a session object", () => {
      initialProps = WrappedComponent.getInitialProps({
        req
      });
      expect(typeof initialProps).toBe("object");
    });

    it("returns a 'cumulativeAnswers' object as part of the initial props", () => {
      initialProps = WrappedComponent.getInitialProps({
        req
      });
      expect(typeof initialProps.cumulativeAnswers).toBe("object");
    });

    it("returns a 'validatorErrors' object as part of the initial props", () => {
      initialProps = WrappedComponent.getInitialProps({
        req
      });
      expect(typeof initialProps.validatorErrors).toBe("object");
    });

    it("returns a 'transformedData' object as part of the initial props", () => {
      initialProps = WrappedComponent.getInitialProps({
        req
      });
      expect(typeof initialProps.transformedData).toBe("object");
    });

    it("returns a 'switches' object as part of the initial props", () => {
      initialProps = WrappedComponent.getInitialProps({
        req
      });
      expect(typeof initialProps.switches).toBe("object");
    });

    it("returns an 'addressLookups object as part of the initial props", () => {
      initialProps = WrappedComponent.getInitialProps({
        req
      });
      expect(typeof initialProps.addressLookups).toBe("object");
    });

    it("returns a 'submissionDate' object as part of the initial props", () => {
      initialProps = WrappedComponent.getInitialProps({
        req
      });
      expect(typeof initialProps.submissionDate).toBe("string");
    });

    it("returns a 'emailFbo' object as part of the initial props", () => {
      initialProps = WrappedComponent.getInitialProps({
        req
      });
      expect(typeof initialProps.emailFbo).toBe("object");
    });

    it("returns a 'lcConfig' object as part of the initial props", () => {
      initialProps = WrappedComponent.getInitialProps({
        req
      });
      expect(typeof initialProps.lcConfig).toBe("object");
    });

    it("returns a 'acceptAllCookies' as undefined as part of the initial props", () => {
      initialProps = WrappedComponent.getInitialProps({
        req
      });
      expect(typeof initialProps.acceptAllCookies).toBe("undefined");
    });

    describe("given a url query that includes an edit value", () => {
      it("returns an editModePage value that is true", () => {
        req.query.edit = "on";
        initialProps = WrappedComponent.getInitialProps(req);
        expect(initialProps.editModePage).toBe(true);
      });
    });

    describe("given a url query that does not include an edit value", () => {
      it("returns an editModePage value that is false", () => {
        req.query.edit = undefined;
        initialProps = WrappedComponent.getInitialProps(req);
        expect(initialProps.editModePage).toBe(false);
      });
    });

    it("returns session data even if req is undefined", () => {
      initialProps = WrappedComponent.getInitialProps({});
      expect(typeof initialProps.validatorErrors).toBe("object");
      expect(typeof initialProps.cumulativeAnswers).toBe("object");
      expect(typeof initialProps.switches).toBe("object");
      expect(typeof initialProps.addressLookups).toBe("object");
      expect(typeof initialProps.submissionDate).toBe("string");
      expect(typeof initialProps.fsaRegistrationNumber).toBe("string");
      expect(typeof initialProps.emailFbo).toBe("object");
      expect(typeof initialProps.lcConfig).toBe("object");
      expect(typeof initialProps.transformedData).toBe("object");
    });
  });

  describe("the resulting child component", () => {
    describe("given that req.session.cumulativeAnswers is undefined", () => {
      it("props.cumulativeAnswers is an empty object", () => {
        initialProps = WrappedComponent.getInitialProps({
          req
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.cumulativeAnswers).toEqual({});
      });
    });

    describe("given that req.session.validatorErrors is undefined", () => {
      it("props.validatorErrors is an empty object", () => {
        initialProps = WrappedComponent.getInitialProps({
          req
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.validatorErrors).toEqual({});
      });
    });

    describe("given that req.session.switches is undefined", () => {
      it("props.switches is object with an editModePage property", () => {
        initialProps = WrappedComponent.getInitialProps({
          req
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.editModePage).toBeDefined();
      });
    });

    describe("given that req.session.lc_config is undefined", () => {
      it("props.lcConfig is defined", () => {
        initialProps = WrappedComponent.getInitialProps({
          req
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.lcConfig).toBeDefined();
      });
    });

    describe("given that req.session.email_fbo is undefined", () => {
      it("props.emailFbo is defined", () => {
        initialProps = WrappedComponent.getInitialProps({
          req
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.emailFbo).toBeDefined();
      });
    });

    describe("given that req.session.addressLookups is undefined", () => {
      it("props.addressLookups is defined", () => {
        initialProps = WrappedComponent.getInitialProps({
          req
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.addressLookups).toEqual({});
      });
    });

    describe("given that req.session.acceptAllCookies is undefined", () => {
      it("props.acceptAllCookies is defined", () => {
        initialProps = WrappedComponent.getInitialProps({
          req
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.acceptAllCookies).toEqual(undefined);
      });
    });

    describe("given that req.session.transformedData is undefined", () => {
      it("props.transformedData is defined", () => {
        initialProps = WrappedComponent.getInitialProps({
          req
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.transformedData).toEqual({});
      });
    });

    describe("given that req.session.cumulativeAnswers is defined", () => {
      it("props.cumulativeAnswers is the same as the session.cumulativeAnswers", () => {
        const exampleCumulativeAnswers = { test: "value" };
        req = {
          url: "",
          session: { cumulativeAnswers: exampleCumulativeAnswers }
        };

        initialProps = WrappedComponent.getInitialProps(req);
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.cumulativeAnswers).toBe(exampleCumulativeAnswers);
      });
    });

    describe("given that req.session.validatorErrors is defined", () => {
      it("props.validatorErrors is the same as the session.validatorErrors", () => {
        const exampleValidatorErrors = { test: "value" };
        req = { url: "", session: { validatorErrors: exampleValidatorErrors } };
        initialProps = WrappedComponent.getInitialProps(req);
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.validatorErrors).toBe(exampleValidatorErrors);
      });
    });

    describe("given that req.session.submissionDate is defined", () => {
      it("props.submissionDate is the same as the session.submissionDate", () => {
        const exampleSubmissionDate = "Date";
        req = { url: "", session: { submissionDate: exampleSubmissionDate } };
        initialProps = WrappedComponent.getInitialProps(req);
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.submissionDate).toBe(exampleSubmissionDate);
      });
    });

    describe("given that req.session.fsaRegistrationNumber is defined", () => {
      it("props.fsaRegistrationNumber is the same as the session.fsaRegistrationNumber", () => {
        const exampleFsaRegistrationNumber = "12345678";
        req = {
          url: "",
          session: { fsaRegistrationNumber: exampleFsaRegistrationNumber }
        };
        initialProps = WrappedComponent.getInitialProps(req);
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.fsaRegistrationNumber).toBe(
          exampleFsaRegistrationNumber
        );
      });
    });

    describe("given that req.session.email_fbo is defined", () => {
      it("props.emailFbo is the same as the session.emailFbo", () => {
        const exampleEmailFbo = { success: true, recipient: "fbo@example.com" };
        req = {
          url: "",
          session: { email_fbo: exampleEmailFbo }
        };
        initialProps = WrappedComponent.getInitialProps(req);
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.emailFbo).toBe(exampleEmailFbo);
      });
    });

    describe("given that req.session.lc_config is defined", () => {
      it("props.lcConfig is the same as the session.lcConfig", () => {
        const exampleLcConfig = { example: "data" };
        req = {
          url: "",
          session: { lc_config: exampleLcConfig }
        };
        initialProps = WrappedComponent.getInitialProps(req);
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.lcConfig).toBe(exampleLcConfig);
      });
    });

    describe("given that req.session.transformedData is defined", () => {
      it("props.lcConfig is the same as the session.lcConfig", () => {
        const exampleTransformedData = { example: "transformed data" };
        req = {
          url: "",
          session: { transformedData: exampleTransformedData }
        };
        initialProps = WrappedComponent.getInitialProps(req);
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.transformedData).toBe(exampleTransformedData);
      });
    });

    describe("given that req.session.switches is defined", () => {
      it("props.switches is the same as the session.switches but with an editModePage property", () => {
        const exampleSwitches = { test: true };
        req = { url: "", session: { switches: exampleSwitches } };

        initialProps = WrappedComponent.getInitialProps(req);
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.switches.test).toBe(true);
        expect(componentProps.editModePage).toBeDefined();
      });
    });

    describe("given that req.session.addressLookups is defined", () => {
      it("props.addressLookups is the same as the session.addressLookups", () => {
        const exampleAddressLookup = { test: [] };
        req = { url: "", session: { addressLookups: exampleAddressLookup } };
        initialProps = WrappedComponent.getInitialProps(req);
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.addressLookups).toBe(exampleAddressLookup);
      });
    });

    describe("given that req.cookies.acceptAllCookies is defined", () => {
      it("props.acceptAllCookies is the same as the cookies.acceptAllCookies", () => {
        req = { cookies: { acceptAllCookies: "true" } };
        initialProps = WrappedComponent.getInitialProps(req);
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.acceptAllCookies).toBe("true");
      });
    });
  });

  describe("the formAction value", () => {
    describe("given req.url is /west-dorset/operator-name", () => {
      beforeEach(() => {
        req = {
          url: "/west-dorset/operator-name",
          query: {}
        };
      });

      describe("given that editModePage is truthy", () => {
        beforeEach(() => {
          req.query.edit = "some-page-name";
          initialProps = WrappedComponent.getInitialProps({ req });
        });

        it("should return initialProps that contains a formAction value of /edit/continue/operator-name", () => {
          expect(initialProps.formAction).toBe("/edit/continue/operator-name");
        });
      });

      describe("given that editModePage is falsy", () => {
        beforeEach(() => {
          req.query.edit = undefined;
          initialProps = WrappedComponent.getInitialProps({ req });
        });

        it("should return initialProps that contains a formAction value of /continue/operator-name", () => {
          expect(initialProps.formAction).toBe("/continue/operator-name");
        });
      });
    });

    describe("given req.url is /west-dorset/another-page", () => {
      beforeEach(() => {
        req = {
          url: "/west-dorset/another-page",
          query: {}
        };
        initialProps = WrappedComponent.getInitialProps({ req });
      });

      it("should return initialProps that contains a formAction value that includes the string another-page", () => {
        expect(initialProps.formAction.includes("another-page")).toBe(true);
      });
    });
  });
});
