const SessionWrapper = Page => {
  const wrapper = props => <Page {...props} />;

  wrapper.getInitialProps = ({ req }) => {
    const initialProps = {
      cumulativeAnswers:
        req && req.session && req.session.cumulativeAnswers
          ? req.session.cumulativeAnswers
          : {},
      transformedData:
        req && req.session && req.session.transformedData
          ? req.session.transformedData
          : {},
      validatorErrors:
        req && req.session && req.session.validatorErrors
          ? req.session.validatorErrors
          : {},
      switches:
        req && req.session && req.session.switches ? req.session.switches : {},
      fsaRegistrationNumber:
        req && req.session && req.session.fsaRegistrationNumber
          ? req.session.fsaRegistrationNumber
          : "",
      submissionDate:
        req && req.session && req.session.submissionDate
          ? req.session.submissionDate
          : "",
      emailFbo:
        req && req.session && req.session.email_fbo
          ? req.session.email_fbo
          : {},
      lcConfig:
        req && req.session && req.session.lc_config
          ? req.session.lc_config
          : {},
      addressLookups:
        req && req.session && req.session.addressLookups
          ? req.session.addressLookups
          : {},
      acceptAllCookies:
        req && req.cookies && req.cookies.acceptAllCookies
          ? req.cookies.acceptAllCookies
          : undefined,
      editModePage:
        req && req.query && req.query.edit ? req.query.edit : undefined
    };

    return initialProps;
  };

  return wrapper;
};

export default SessionWrapper;
