import React from "react";
import Head from "next/head";
import App from "next/app";
import { PageTitles } from "../src/components";
import { withTranslation, appWithTranslation } from "../i18n";

function MyApp({ Component, pageProps, t }) {
  return (
    <>
      <Head>
        <title>
          {t(pageProps.currentPageTitle || PageTitles.defaultPageTitle)}
        </title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default appWithTranslation(withTranslation("pageTitles")(MyApp));
