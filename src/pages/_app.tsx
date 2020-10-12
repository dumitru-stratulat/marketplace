import React, { useContext, useEffect } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import "antd/dist/antd.css";
import { AppContext, AppProvider } from "context/AppContext";
import "styles/loadButton.css"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Marketplace</title>
        <meta name="description" content="Marketplace" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}
export default App;
