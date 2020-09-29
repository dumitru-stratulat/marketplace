import React from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';
import style from './category.module.css';
import { Product } from 'interfaces/interfaces';
import Link from 'next/Link';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import FooterLayout from 'components/FooterLayout/FooterLayout';

export default function Category({ products }: any) {
  return (
    <div>
      <HeaderLayout />
      <Row
        justify="center"
        className={style.wrap}
        gutter={[{ xs: 1, sm: 1, md: 10, lg: 10, xl: 10 }, { xs: 10, sm: 10 }]}
      >
        {products.products.map((product: Product, key: number) => (
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
            <p className={style.price}>${product.price}</p>
          </Col>
        ))}
      </Row>
      <FooterLayout />
    </div>
  )
}

export async function getServerSideProps({ query }: any) {
  const response = await axios.get(`https://reactive.loca.lt/category/${query.gender}/${query.category}`)
  return {
    props: {
      products: response.data
    }
  }
}