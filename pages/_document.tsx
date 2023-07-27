import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html prefix="og: https://ogp.me/ns#">
        <Head />
        <title>{'Food & Wellness Diary'}</title>
        <link rel="icon" href="/diary.ico" />

        <meta property="og:title" content={'Food and Wellness Diary'} />
        <meta
          property="og:description"
          content="One step at a time. Towards wellness."
        />
        <meta
          property="og:image"
          content={`${process.env.VERCEL_DOMAIN || ''}/api/og`}
        />
        <meta
          property="og:site_name"
          content={'Food and Wellness Diary'}
        ></meta>
        <meta
          property="og:url"
          content={`${process.env.VERCEL_DOMAIN || ''}/`}
        />
        <meta property="og:type" content="website" />
        <body>
          <Main />
          <NextScript />
          <div id="modal-root"></div>
        </body>
      </Html>
    );
  }
}
