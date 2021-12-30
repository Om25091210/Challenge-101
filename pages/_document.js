import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

import React from 'react';
import themeOptions from '@components/theme/theme-options';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const path = require('path');
    const { readdirSync, readFileSync, lstatSync } = require('fs');

    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    const { req: request = {} } = ctx;
    const { cookies = {} } = request || {};
    const initialProps = await Document.getInitialProps(ctx);

    /* Colors */
    const themeBaseDirPath = path.join(
      process.cwd(),
      '/public/assets/css/dash'
    );
    let themeMap = {};
    if (lstatSync(themeBaseDirPath).isDirectory()) {
      const themeDirs = readdirSync(themeBaseDirPath);
      for (const fi of themeDirs) {
        const fileName = fi.replace(/_([^-]*)-[^.]*\.css$/g, '$1');
        themeMap[fileName] = readFileSync(`${themeBaseDirPath}/${fi}`, 'utf8');
      }

      global.themeCss = themeMap;
    }
    return {
      ...initialProps,
      theme: cookies['g-theme'],
      themeMap
    };

    try {
      const { theme, themeMap } = this.props;
      const themeFileName = themeOptions[theme] || themeOptions.LIGHT;
      const themeCss = themeMap ? themeMap[themeFileName] : '';

      ctx.renderPage = () =>
        originalRenderPage({
          // eslint-disable-next-line react/display-name
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />)
        });

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const { theme, themeMap } = this.props;
    const themeFileName = themeOptions[theme] || themeOptions.LIGHT;
    const themeCss = themeMap ? themeMap[themeFileName] : '';
    /* eslint-disable react/no-danger, jam3/no-sanitizer-with-danger */
    return (
      <Html>
        <Head>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
          <script src="/assets/js/dash/bootstrap.bundle.min.js" />

          <script src="/assets/js/dash/jquery.mCustomScrollbar.js" />
          <script src="/assets/js/dash/slick.js" />
          <script src="/assets/js/dash/jquery.fancybox.js" />
          <script src="/assets/js/dash/jquery.fancybox-media.js" />
        </Head>
        <body>
          {themeCss ? (
            <style
              dangerouslySetInnerHTML={{
                __html: `${themeCss} `
              }}
            />
          ) : null}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
