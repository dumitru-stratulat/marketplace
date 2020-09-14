import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image, Rate, Spin, Button } from "antd";

import HeaderLayout from "components/HeaderLayout/HeaderLayout";
import FooterLayout from "components/FooterLayout/FooterLayout";
import style from "./product.module.css";

export default function Product() {
  const [data, setData] = useState<ProductData | null>();
  const [statusState, setStatusState] = useState<StatusState>({
    status: "idle",
  });

  useEffect(() => {
    const getProduct = async () => {
      try {
        setStatusState({ status: "pending" });
        const response = await axios.get(
          "https://reactive.loca.lt/product/5f573c687a3d7f23509b52fd",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setData(response.data[0]);
        console.log("getProduct -> response.data[0]", response.data[0]);
        setStatusState({ status: "success" });
      } catch (err) {
        setStatusState({ status: "error", message: err.response.data.message });
        console.log(
          "getProduct -> err.response.data.message",
          err.response.data.message
        );
      }
    };
    getProduct();
  }, []);

  const productComponent = !data ? (
    <h4 className={style.error}>{statusState.message}</h4>
  ) : (
    <div className={style.productContainer}>
      <Image
        alt="product image"
        src={`https://reactive.loca.lt/${data.imagesUrl[0]}`}
      />
      <div className={style.infoContainer}>
        <span className={style.titleSpan}>{data.title}</span>
        <Rate style={{ fontSize: "14px" }} allowHalf defaultValue={2.5} />
        <span className={style.infoSpan}>
          <span>Price</span>
          <span>{data.price}</span>
        </span>
        <span className={style.infoSpan}>
          <span>Info</span>
          <span>{data.content}</span>
        </span>
        <Button type="primary" htmlType="submit" className={style.loginButton}>
          Buy
        </Button>
      </div>
    </div>
  );

  console.log(statusState.status);
  console.log(data);

  return (
    <div className={style.container}>
      <HeaderLayout />
      <div className={style.outerContainer}>
        {statusState.status === "pending" ? (
          <Spin tip="Loading..." />
        ) : (
          productComponent
        )}
      </div>
      <FooterLayout />
    </div>
  );
}
