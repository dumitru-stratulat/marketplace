import React from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';
import style from './category.module.css';
import { Product } from 'interfaces/interfaces';
import Link from 'next/link';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import FooterLayout from 'components/FooterLayout/FooterLayout';
import { useInfiniteQuery } from 'react-query';
import { getProductsByCategory } from 'api/category';

export interface Query {
  gender: string;
  category: string;
}
export default function Category({ query }) {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore
  } = useInfiniteQuery(['getProductsByCategory', query],
    getProductsByCategory,
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
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
            <Row
              justify="center"
              className={style.wrap}
              gutter={[{ xs: 1, sm: 1, md: 10, lg: 10, xl: 10 }, { xs: 10, sm: 10 }]}
            >
              {data.map((data, key: number) => (
                data.data.map((product: Product, key: number) => (
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
                ))
              ))}
            </Row>
          )
      }
      <div>
        <button
          ref={loadMoreButtonRef}
          onClick={() => fetchMore()}
          disabled={!canFetchMore || isFetchingMore}
        >
          {isFetchingMore
            ? 'Loading more...'
            : canFetchMore
              ? 'Load More'
              : 'Nothing more to load'}
        </button>
      </div>
      <div>
        {isFetching && !isFetchingMore ? 'Background Updating...' : null}
      </div>
      <FooterLayout />
    </div>
  )
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      query
    }
  }
}