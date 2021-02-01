import React from "react";
import App from "next/app";
import { PageTitles } from "../src/components";
import { appWithTranslation } from "../i18n";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

function MyApp({ Component, pageProps }) {
  const { t, i18n } = useTranslation("pageTitles");
  return (
    <>
      <Helmet htmlAttributes={{ lang: i18n.language }}>
        <title>
          {t(pageProps.currentPageTitle || PageTitles.defaultPageTitle)}
        </title>
      </Helmet>
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default appWithTranslation(MyApp);
