import Document, { Head, Main, NextScript } from "next/document";
import { CacheProvider } from "@emotion/core";
import createEmotionServer from "create-emotion-server";
import createCache from "@emotion/cache";
import { ServerStyleSheet } from "styled-components";

if (typeof window === "undefined") {
  global.window = {};
}

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const gtmAuth = process.env.GTM_AUTH;
    const cookies = ctx.req && ctx.req.cookies ? ctx.req.cookies : null;
    const cache = createCache();
    const sheet = new ServerStyleSheet();

    const initialProps = ctx.renderPage((App) => (props) =>
      sheet.collectStyles(
        <CacheProvider value={cache}>
          <App {...props} />
        </CacheProvider>
      )
    );

    let { ids, css } = createEmotionServer(cache).extractCritical(
      initialProps.html
    );

    return {
      ...initialProps,
      ids,
      css,
      styles: sheet.getStyleElement(),
      gtmAuth,
      cookies
    };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          {this.props.styles}

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
            `
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

export default MyDocument;
