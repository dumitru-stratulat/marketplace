import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import "antd/dist/antd.css";

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Marketplace</title>
      <meta name="description" content="Marketplace" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <Component {...pageProps} />
  </>
);

export default App;
