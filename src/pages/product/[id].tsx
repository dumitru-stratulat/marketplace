import React from "react";
import { useRouter } from "next/router";

import HeaderLayout from "components/HeaderLayout/HeaderLayout";
import FooterLayout from "components/FooterLayout/FooterLayout";

export default function Product() {
  const router = useRouter();
  return (
    <>
      <HeaderLayout />
      <div>Here we have product</div>
      <FooterLayout />
    </>
  );
}
