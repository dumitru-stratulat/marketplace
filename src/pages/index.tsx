import React, { useContext } from "react";
import HeaderLayout from "components/HeaderLayout/HeaderLayout";
import FooterLayout from "components/FooterLayout/FooterLayout";
import { getHomeProducts } from 'api/home';
import { Row, Col } from 'antd';
import { Product } from 'interfaces/interfaces'
import Link from 'next/link';
import style from './index.module.css';
import { AppContext } from "context/AppContext";
import { useInfiniteQuery } from "react-query";
import { getSearchedProducts } from "api/search";

export default function HomePage({ randomProducts, latestProducts }) {
  return (
    <>
      <HeaderLayout />
      <div>
        <div className={style.imageContent}>
          <div className={style.imageContentParagraph}>
            <p>
              CUMPĂRĂ HAINE MAI AVANTAJOS
            </p>
            <p>
              VINDE RAPID ȘI UȘOR
            </p>
          </div>

          <div className={style.leftImage}></div>
          <img src={require('../../public/images/homebg.jpeg')} alt="backgroundimage" className={style.mainImage} />
        </div>
        <div className={style.mainTextContainer}>
          <h1 className={style.header1}>
            CUMPĂRĂ HAINE MAI AVANTAJOS
          </h1>
          <h1 className={style.header1}>
            VINDE RAPID ȘI UȘOR
          </h1>
        </div>
        <h1 className={style.header2} >Recent adăugate</h1>
        <Row
          justify="center"
          className={style.wrap}
          gutter={[{ xs: 1, sm: 1, md: 10, lg: 10, xl: 10 }, { xs: 10, sm: 10 }]}
        >
          {latestProducts.map((product: Product, key: number) => (
            <Col
              key={key}
              xs={{ span: 8 }}
              sm={{ span: 8 }}
              md={{ span: 6 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Link href='/product/[id]' as={`/product/${product._id}`}>
                <a >
                  <img src={`${process.env.AWS_ENDPOINT}${product.imagesUrl[0]}`} className={style.image} />
                </a>
              </Link>
              <p className={style.price}>{product.price} lei</p>
            </Col>
          ))}
        </Row>
        <h2 className={style.header2}>Diverse</h2>

        <Row
          justify="center"
          className={style.wrap}
        >
          {randomProducts.map((product: Product, key: number) => (
            <Col
              key={key}
              xs={{ span: 8 }}
              sm={{ span: 8 }}
              md={{ span: 8 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Link href='/product/[id]' as={`/product/${product._id}`}>
                <a >
                  <img src={`${process.env.AWS_ENDPOINT}${product.imagesUrl[0]}`} className={style.image} />
                </a>
              </Link>
              <p className={style.price}>{product.price} lei</p>
            </Col>
          ))}
        </Row>
      </div>
      <FooterLayout />
    </>
  )
};

export async function getServerSideProps() {
  const profileData = await getHomeProducts();
  return {
    props: {
      randomProducts: profileData.randomProducts,
      latestProducts: profileData.latestProducts
    }
  }
}

