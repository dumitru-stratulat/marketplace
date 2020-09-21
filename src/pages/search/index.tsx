import React, { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import HeaderLayout from "components/HeaderLayout/HeaderLayout";
import FooterLayout from "components/FooterLayout/FooterLayout";
import { getSearchedProducts } from 'api/search';
import Router, { useRouter } from 'next/router';
import style from './search.module.css'
import { Col, Row } from 'antd';
import Link from 'next/Link';

export default function Search(params: any) {
  const [input, setInput] = useState()
  const { query: { q: query } } = useRouter();

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore
  }: any = useInfiniteQuery(['getSearchedProducts', query],
    getSearchedProducts,
    {
      getFetchMore: () => {
        // if (lastGroup.page_current + 1 > lastGroup.page_total) {
        //   return false;
        // } else {
        //   return lastGroup.page_current + 1;
        // }
        return 1;
      }
    })

  const loadMoreButtonRef = React.useRef<HTMLButtonElement | null>(null);
  return (
    <div className={style.wrap}>
      <input
        type="text"
        onChange={e => setInput(e.target.value)}
        className={style.searchInput}
      />
      <button onClick={() => { Router.push(`/search/?q=${input}`) }}>search</button>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
            <div>
              <Row
                justify="center"
                className={style.wrap}
                gutter={[{ xs: 1, sm: 1, md: 10, lg: 10, xl: 10 }, { xs: 10, sm: 10 }]}
              >
                {data[0].map((product: any, key: number) => (
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
            </div>
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
    </div>
  )
}
