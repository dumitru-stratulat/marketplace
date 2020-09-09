import React, { useRef, useEffect } from "react";
import { getProfileProducts, addProduct } from "api/profile";

import HeaderLayout from "components/HeaderLayout/HeaderLayout";
import FooterLayout from "components/FooterLayout/FooterLayout";

export default function Profile({ products }) {
  const titleInput = useRef<HTMLInputElement>(null);
  const contentInput = useRef<HTMLInputElement>(null);
  return (
    <>
      <HeaderLayout />
      <div>
        {products.products.map((product, key) => (
          <div key={key}>{product.title}</div>
        ))}
        Profile details
        <p>
          Title
          <input type="text" ref={titleInput} />
        </p>
        <p>
          Content
          <input type="text" ref={contentInput} />
        </p>
        <button onClick={() => {}}>Upload</button>
      </div>
      <FooterLayout />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const res = await getProfileProducts(params.id);
  return {
    props: {
      products: res,
    },
  };
}
