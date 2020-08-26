import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import FooterLauout from 'components/FooterLayout/FooterLayout';

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Marketplace</title>
      <meta name="description" content="Marketplace" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <HeaderLayout />
    <Component {...pageProps} />
    <FooterLauout />
  </>
);

export default App;
