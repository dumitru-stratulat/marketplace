import React, { useRef, useEffect } from 'react';
import { getProfile } from 'api/profile';
import { Row, Col } from 'antd';
import Link from 'next/Link';
import style from './profile.module.css'
import { User, Product } from 'interfaces/interfaces'
import HeaderLayout from "components/HeaderLayout/HeaderLayout";
import FooterLayout from "components/FooterLayout/FooterLayout";

export default function Profile({ user, products }: { user: User, products: Product[] }) {
  return (
    <div>
      <HeaderLayout />
      <div className={style.profileContainer}>
        <div className={style.profileWrap}>
          <img src={require('./logo.jpg')} alt="" className={style.profilePicture} />
          <div>
            <h1>{user.profileTitle}</h1>
            <p>{user.username}</p>
            <p>Chisinau,Moldova</p>
          </div>
        </div>
        <p>
          {user.profileDescription}
        </p>
      </div>
      <Row justify="center" >
        {products.map((product: Product, key: number) => (
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
      <FooterLayout />
    </div >
  )
}

export async function getServerSideProps({ params }: any) {
  const profileData = await getProfile(params.id);
  return {
    props: {
      user: profileData.user,
      products: profileData.products
    }
  }
}
