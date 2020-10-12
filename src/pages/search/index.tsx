import React, { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import HeaderLayout from "components/HeaderLayout/HeaderLayout";
import FooterLayout from "components/FooterLayout/FooterLayout";
import { getSearchedProducts } from 'api/search';
import Router, { useRouter } from 'next/router';
import style from './search.module.css'
import { Col, Row } from 'antd';
import Link from 'next/link';
import { Product } from 'interfaces/interfaces';

export default function Search({ query }) {
  const [input, setInput] = useState<string>()

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore
  } = useInfiniteQuery(['getSearchedProducts', query.q],
    getSearchedProducts,
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
    <div className={style.wrap}>
      <input
        type="text"
        onChange={e => setInput(e.target.value)}
        className={style.searchInput}
      />
      <button onClick={() => { Router.push(`/search/?q=${input}`) }}>Caută</button>
      {status === 'loading' ? (
        !query.q ? null : <p>Loading...</p>
      ) : status === 'error' ? (
        !query.q ? null : <span>:</span>
      ) : (
            <div>
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
      </div>
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
