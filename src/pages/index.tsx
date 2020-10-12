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
  const ctx = useContext(AppContext);

  return (
    <>
      <HeaderLayout />
      <div>
        <div className={style.imageContent}>
          <h3 className={style.imageContentHeader3}>
            CUMPĂRĂ.VINDE
          </h3>
          <div className={style.imageContentParagraph}>
            <p>
              Platformă gratuită
            </p>
            <p>
              pentru vînzare cumpărare
            </p>
            <p>
              a articolilor de îmbrăcăminte
            </p>
          </div>

          <div className={style.leftImage}></div>
          <img src={require('../../public/images/homebg.jpg')} alt="backgroundimage" className={style.mainImage} />
        </div>
        <div className={style.mainTextContainer}>
          <h1 className={style.header1}>
            CUMPĂRĂ.VINDE
          </h1>
          <h1 className={style.header1}>
            Platformă gratuită
          </h1>
          <h1 className={style.header1}>
            pentru vînzare cumpărare
          </h1>
          <h1 className={style.header1}>
            a articolilor de îmbrăcăminte
          </h1>
        </div>
        <h1 className={style.header2} >Cele mai recente</h1>
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
                  <img src={`https://s3.eu-central-1.amazonaws.com/outfit.md/${product.imagesUrl[0]}`} className={style.image} />
                </a>
              </Link>
              <p className={style.price}>{product.price} lei</p>
            </Col>
          ))}
        </Row>
        <h2 className={style.header2}>Random</h2>

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
                  <img src={`https://s3.eu-central-1.amazonaws.com/outfit.md/${product.imagesUrl[0]}`} className={style.image} />
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

