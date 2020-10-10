import React, { useRef, useState, useContext } from "react";
import Router, { useRouter } from "next/router";
import axios from 'axios';
import HeaderLayout from "components/HeaderLayout/HeaderLayout";
import FooterLayout from "components/FooterLayout/FooterLayout";
import style from './product.module.css'
import { Divider, Carousel, Avatar, Modal, Button } from "antd";
import { RightOutlined, LeftOutlined, UserOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { ContextProps, AppContext } from "context/AppContext";

export default function Product({ product, user }: any) {
  const ctx: ContextProps | null = useContext(AppContext);
  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }

  const NextArrow = (e: any) => {
    const { onClick } = e;
    return <button className={style.nextArrow} onClick={onClick}><RightOutlined /></button>
  }
  const PrevArrrow = (e: any) => {
    const { onClick } = e;
    return <button className={style.backArrow} onClick={onClick}><LeftOutlined /></button>
  }
  function confirm() {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Sigur stergeti postarea',
      okText: 'Sterge Postarea',
      cancelText: 'Anuleaza',
      onOk: () => deletePost(),
    });
  }
  const deletePost = async () => {
    const response = await axios.delete(`https://reactive.loca.lt/product/${product._id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
    if (response.status == 200) {
      Router.push(`/profile/${ctx.userDetails && ctx.userDetails.userId}`)
    }
  }
  return (
    <>
      <HeaderLayout />
      <div className={style.container}>
        <div className={style.imagesWrap}>
          {product.imagesUrl.map((image: string, key: number) => (
            <img
              src={`https://s3.eu-central-1.amazonaws.com/outfit.md/${image}`}
              alt="product image"
              className={style.image}
            />
          ))}
        </div>
        <div className={style.carouselWrap}>
          <Carousel arrows={true} nextArrow={<NextArrow />} prevArrow={<PrevArrrow />}>
            {product.imagesUrl.map((image: string, key: number) => (
              <img
                src={`https://s3.eu-central-1.amazonaws.com/outfit.md/${image}`}
                alt="product image"
                className={style.image}
              />
            ))}
          </Carousel>
        </div>
        <div className={style.descriptionContainer}>
          <h2>{product.title}</h2>
          <p>{product.content}</p>
          <div className={style.piceWrap}>
            <span>Preț:</span>
            <span>{product.price}</span>
          </div>
          <Divider className={style.divider} />
          <div className={style.piceWrap}>
            <span>Mărime:</span>
            <span>{product.size}</span>
          </div>
          <Divider className={style.divider} />
          <div className={style.piceWrap}>
            <span>Condiție:</span>
            <span>{product.condition}</span>
          </div>
          <Divider className={style.divider} />
          <div className={style.deleteButtonWrap}>
            <p>Adaugat {product.createdAt.split("T")[0]}</p>
            <Button onClick={confirm} danger>Sterge</Button>
          </div>
          <div className={style.buyButtton}>
            {product.contactNumber}
          </div>
          {user &&
            <div className={style.pofileWrap}>
              <Avatar size={50} icon={<UserOutlined />} />
              <div>
                <p className={style.username}>{user.username}</p>
                <p className={style.location}>{user.location[0]}, {user.location[1]}</p>
              </div>
            </div>
          }
        </div>
      </div>
      <FooterLayout />
    </>
  );
}

export async function getServerSideProps({ params }: any) {
  const response = await axios.get(`https://reactive.loca.lt/product/${params.id}`)
  return {
    props: {
      product: response.data.product[0],
      user: response.data.user
    }
  }
}

