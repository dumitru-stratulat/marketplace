import React, { useRef, useEffect } from 'react';
import { getProfileProducts, addProduct } from 'api/profile';
import { Row, Col } from 'antd';
import style from './profile.module.css'
import Link from 'next/Link';

export default function Profile({ products }) {
  const titleInput = useRef<HTMLInputElement>(null);
  const contentInput = useRef<HTMLInputElement>(null);
  console.log(products)
  return (
    <div>
      <Row justify="center" >
        {products.products.map((product, key) => (
          <Col
            xs={{ span: 8 }}
            sm={{ span: 8 }}
            md={{ span: 8 }}
            lg={{ span: 4 }}
            xl={{ span: 4 }}
          >
            <Link href='/product/[id]' as={`/product/${product._id}`}>
              <a >
                <img src={require('./logo.jpg')} className={style.image} />
              </a>
            </Link>
            <p className={style.price}>${product.price}</p>
          </Col>
        ))}
      </Row>
    </div >
  )
}

export async function getServerSideProps({ params }) {
  const res = await getProfileProducts(params.id);
  return {
    props: {
      products: res
    }
  }
}
