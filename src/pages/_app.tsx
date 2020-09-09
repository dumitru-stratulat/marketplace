import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import FooterLayout from 'components/FooterLayout/FooterLayout';
import "antd/dist/antd.css";

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Marketplace</title>
      <meta name="description" content="Marketplace" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <HeaderLayout />
    <Component {...pageProps} />
    <FooterLayout />
  </>
);

export default App;
