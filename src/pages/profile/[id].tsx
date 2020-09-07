import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

import HeaderLayout from "components/HeaderLayout/HeaderLayout";
import FooterLayout from "components/FooterLayout/FooterLayout";

export default function Profile(postData) {
  const router = useRouter();
  return (
    <>
      <HeaderLayout />
      <div>Profile details</div>
      <FooterLayout />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }],
    fallback: false,
  };
}

export async function getStaticProps(ctx) {
  //request
  const requestResponse = 1;
  return {
    props: {
      postData: requestResponse,
    },
  };
}
