import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => <Html className="dark">
  <Head>
    <meta name="description" content="My NextJS Template" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
  </Head>

  <body>
    <Main />
    <NextScript />
  </body>
</Html>;

export default Document;
