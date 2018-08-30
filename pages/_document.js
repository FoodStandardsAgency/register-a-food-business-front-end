//////// IMPORTANT ///////////////////////////////////////////////
// This custom _document file is based on the official Zeit (Next.js) example of Next with Emotion:
// https://github.com/zeit/next.js/blob/master/examples/with-emotion/pages/_document.js
// The injectGlobal CSS styles can be edited if required, as well as the page title.
// Any other changes should not be undertaken without an understanding of how the custom _document.js file works.
//////// IMPORTANT ///////////////////////////////////////////////

import Document, { Head, Main, NextScript } from "next/document";
import { extractCritical } from "emotion-server";
import { hydrate, injectGlobal } from "react-emotion";
import "normalize.css/normalize.css";

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined" && typeof __NEXT_DATA__ !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

injectGlobal`
  html, body {
    font-family: sans-serif;
    font-size: 19px;
    color: #0b0c0c;
  }

  .bold {
    font-weight: bold;
  }
`;

export default class MyDocument extends Document {
  static getInitialProps({ renderPage, req }) {
    const page = renderPage();
    const styles = extractCritical(page.html);
    const gtmAuth = process.env.GTM_AUTH;
    const switches = req.session.switches;
    return { ...page, ...styles, gtmAuth, switches };
  }

  constructor(props) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = ids;
    }
  }

  render() {
    return (
      <html>
        <Head>
          {/* Begin Google Tag Manager and Google cookie deletion script */}
          {this.props.switches && this.props.switches.cookiesRejected ? (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                if (typeof window !== "undefined") {
                  var googleCookies = document.cookie.split(';').filter(function(c) {
                    return c.trim().indexOf('_g') === 0;
                  }).map(function(c) {
                    return c.trim();
                  });

                  googleCookies.forEach(function(cookie) {
                    console.log(cookie);
                    var cookieName = cookie.substr(0, cookie.indexOf('='));
                    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                  })
                }
                `
              }}
            />
          ) : (
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '${
              this.props.gtmAuth
            }';f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PKW3XC7');
            `
              }}
            />
          )}
          {/* End Google Tag Manager script */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
            charSet="UTF-8"
          />
          <meta name="format-detection" content="telephone=no" />
          <title>Register a food business</title>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
