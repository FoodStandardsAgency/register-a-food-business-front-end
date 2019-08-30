const SessionWrapper = Page => {
  // Set 'wrapper' to be a function that:
  // - Takes 'props' as an argument
  // - Passes those props to 'Page', the React component taken by SessionWrapper as an argument
  // - Returns the 'Page' component with the new props
  const wrapper = props => <Page {...props} />;

  // Set the Next.js 'getInitialProps' lifecycle function:
  // https://nextjs.org/learn/basics/fetching-data-for-pages
  // The { req } (HTTP request) object from Express is automatically provided to the getInitialProps function when it is called
  wrapper.getInitialProps = ({ req }) => {
    /************************************************************************************
    Declaration of variables that require more extensive configuration or logic
    ************************************************************************************/
    const editModeFirstPage =
      req && req.query && req.query.edit ? `/${req.query.edit}` : undefined;

    const acceptAllCookies =
      req && req.cookies && req.cookies.acceptAllCookies
        ? req.cookies.acceptAllCookies
        : undefined;

    const currentPageWithQuery = `/${req.url.split("/")[2]}`;

    const formAction = editModeFirstPage
      ? `/edit/continue${currentPageWithQuery}`
      : `/continue${currentPageWithQuery}`;

    const currentPage = currentPageWithQuery.split("?")[0];

    const validatorErrorsCleaned =
      req && req.session && req.session.validatorErrors
        ? { ...req.session.validatorErrors }
        : {};

    delete validatorErrorsCleaned["undefined"];

    /************************************************************************************
    Declaration of initialProps object, containing the above variables, plus others.
    This object will ultimately be passed to the Page component.
    Therefore, any data in the initialProps object is available within a page wrapped
    with this SessionWrapper.
    E.g. inside the 'business-type.js' page, you can access 'props.cumulativeFullAnswers'.
    ************************************************************************************/
    const initialProps = {
      acceptAllCookies,
      editModeFirstPage,
      formAction,
      currentPage,
      cumulativeFullAnswers:
        req && req.session && req.session.cumulativeFullAnswers
          ? req.session.cumulativeFullAnswers
          : {},
      transformedData:
        req && req.session && req.session.transformedData
          ? req.session.transformedData
          : {},
      validatorErrors: validatorErrorsCleaned,
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
          : {},
      council:
        req && req.session && req.session.council ? req.session.council : "",
      isBrowserSupported:
        req && req.session && req.session.isBrowserSupported
          ? req.session.isBrowserSupported
          : false,
      browser:
        req && req.session && req.session.browser ? req.session.browser : "",
      browserVersion:
        req && req.session && req.session.browserVersion
          ? req.session.browserVersion
          : "",
      isBrowserVersionVerified:
        req && req.session && req.session.isBrowserVersionVerified
          ? req.session.isBrowserVersionVerified
          : false
    };

    // The getInitialProps function (a method of the 'wrapper' function) returns the initialProps object
    return initialProps;
  };

  // The SessionWrapper function returns the 'wrapper' function
  return wrapper;
};

export default SessionWrapper;
