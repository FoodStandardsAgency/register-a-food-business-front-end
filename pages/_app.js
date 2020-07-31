import React from "react";
import Head from "next/head";
import { PageTitles } from "../src/components";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>
          {pageProps.currentPageTitle || PageTitles.defaultPageTitle}
        </title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
