//////// IMPORTANT ///////////////////////////////////////////////
// This custom _document file is based on the official Zeit (Next.js) example of Next with Emotion:
// https://github.com/zeit/next.js/blob/master/examples/with-emotion/pages/_document.js
// The injectGlobal CSS styles can be edited if required, as well as the page title.
// Any other changes should not be undertaken without an understanding of how the custom _document.js file works.
//////// IMPORTANT ///////////////////////////////////////////////

/** @jsx jsx */
import { jsx } from "@emotion/core";
import Document, { Head, Main, NextScript } from "next/document";
import { extractCritical } from "emotion-server";
import { hydrate, Global } from "@emotion/core";
import NormalizeCSS from "../src/components/NormalizeCSS";
import AccessibleAutocompleteCSS from "../src/components/AccessibleAutocompleteCSS";

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined" && typeof __NEXT_DATA__ !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

if (typeof window === "undefined") {
  global.window = {};
}

export default class MyDocument extends Document {
  static getInitialProps({ renderPage, req }) {
    const page = renderPage();
    const styles = extractCritical(page.html);
    const gtmAuth = process.env.GTM_AUTH;
    const cookies = req && req.cookies ? req.cookies : null;
    return { ...page, ...styles, gtmAuth, cookies };
  }

  constructor(props) {
    super(props);
    const { __NEXT_DATA__ = {}, ids } = props;

    if (ids) {
      __NEXT_DATA__.ids = ids;
    }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <Global styles={[AccessibleAutocompleteCSS, NormalizeCSS]} />
          {/* Start Google Tag Manager */}
          {this.props.cookies &&
          this.props.cookies.acceptAllCookies === "false" ? null : (
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '${this.props.gtmAuth}';f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PKW3XC7');
            `,
              }}
            />
          )}
          {/* End Google Tag Manager */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
            charSet="UTF-8"
          />
          <meta name="format-detection" content="telephone=no" />
          {/*<title>Register a food business</title>*/}
          <link rel="stylesheet" href="/_next/static/style.css" />
          <style
            data-emotion-css={this.props.ids.join(" ")}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
