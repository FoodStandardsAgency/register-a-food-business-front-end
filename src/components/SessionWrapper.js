const SessionWrapper = Page => {
  const wrapper = props => <Page {...props} />;
  wrapper.getInitialProps = ({ req }) => {
    const editModeFirstPage =
      req && req.query && req.query.edit ? `/${req.query.edit}` : undefined;

    const acceptAllCookies =
      req && req.cookies && req.cookies.acceptAllCookies
        ? req.cookies.acceptAllCookies
        : undefined;

    const currentPage = req.url.split("/")[2];

    const formAction = editModeFirstPage
      ? `/edit/continue/${currentPage}`
      : `/continue/${currentPage}`;

    const initialProps = {
      acceptAllCookies,
      editModeFirstPage,
      formAction,
      cumulativeFullAnswers:
        req && req.session && req.session.cumulativeFullAnswers
          ? req.session.cumulativeFullAnswers
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
        req && req.session && req.session.emailFbo ? req.session.emailFbo : {},
      lcConfig:
        req && req.session && req.session.lcConfig ? req.session.lcConfig : {},
      addressLookups:
        req && req.session && req.session.addressLookups
          ? req.session.addressLookups
          : {}
    };

    return initialProps;
  };

  return wrapper;
};

export default SessionWrapper;
