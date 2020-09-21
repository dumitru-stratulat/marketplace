import React from "react";
import HeaderLayout from "components/HeaderLayout/HeaderLayout";
import FooterLayout from "components/FooterLayout/FooterLayout";
import { getHomeProducts } from 'api/home';
import { Row, Col } from 'antd';
import { Product } from 'interfaces/interfaces'
import Link from 'next/Link';
import style from './index.module.css';

export default function HomePage({ randomProducts, latestProducts }: any) {
  return (
    <>
      <HeaderLayout />
      <div>
        <div className={style.imageContent}>
          <h1 className={style.imageContentHeader}>Discover unique fashion </h1>
          <div className={style.leftImage}></div>
          <img src={require('../../public/images/homebg.jpeg')} alt="backgroundimage" className={style.mainImage} />
        </div>
        <div className={style.mainTextContainer}>
          <h1 className={style.header1}>
            BUY.SELL
          </h1>
          <h1 className={style.header1}>
            DISCOVER UNIQUE
          </h1>
          <h1 className={style.header1}>
            FASHION
          </h1>
          <h2>
            Whatever your style. Find it on site
          </h2>
        </div>
        <h1 className={style.header2} >Latest products</h1>
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
                  <img src={`http://localhost:8080/${product.imagesUrl[0]}`} className={style.image} />
                </a>
              </Link>
              <p className={style.price}>${product.price}</p>
            </Col>
          ))}
        </Row>
        <h2 className={style.header2}>Product we love</h2>
        <Row justify="center" >
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
                  <img src={`http://localhost:8080/${product.imagesUrl[0]}`} className={style.image} />
                </a>
              </Link>
              <p className={style.price}>${product.price}</p>
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

