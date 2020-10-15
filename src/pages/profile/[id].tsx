import React, { useRef, useEffect } from 'react';
import { getProfile } from 'api/profile';
import { Row, Col, Avatar } from 'antd';
import Link from 'next/link';
import style from './profile.module.css'
import { User, Product } from 'interfaces/interfaces'
import HeaderLayout from "components/HeaderLayout/HeaderLayout";
import FooterLayout from "components/FooterLayout/FooterLayout";
import { UserOutlined } from '@ant-design/icons';
import { useInfiniteQuery } from 'react-query';
import { getSearchedProducts } from 'api/search';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Profile({ user }) {
  const { query } = useRouter();
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore
  }: any = useInfiniteQuery(['getProfile', query.id],
    getProfile,
    {
      getFetchMore: (lastGroup) => {
        if (lastGroup.currentPage * 20 + 1 > lastGroup.totalItems) {
          return false;
        } else {
          return lastGroup.currentPage + 1;
        }
      }
    })
  const loadMoreButtonRef = React.useRef<HTMLButtonElement | null>(null);
  return (
    <div>
      <HeaderLayout />
      <div className={style.profileContainer}>
        <div className={style.profileWrap}>
          <Avatar size={110} style={{ backgroundColor: '#ffd77e' }} icon={<UserOutlined />} />
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
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
            <Row justify="center" >
              {data.map((data, key: number) => (
                data.data.map((product: Product, key: number) => (
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
                ))
              ))}
            </Row>
          )
      }
      <div className="loadButtonWrap">
        <button
          ref={loadMoreButtonRef}
          onClick={() => fetchMore()}
          disabled={!canFetchMore || isFetchingMore}
          className="loadButton"
        >
          {isFetchingMore
            ? 'Se incarcă...'
            : canFetchMore
              ? 'Încarcă mai mult'
              : 'Nu sunt rezultate'}
        </button>
      </div>
      <div>
        {isFetching && !isFetchingMore ? 'Background Updating...' : null}
      </div>
      <FooterLayout />
    </div >
  )
}

export async function getServerSideProps({ params }) {
  const { user } = await getProfile('key', params.id);
  return {
    props: {
      user
    }
  }
}
