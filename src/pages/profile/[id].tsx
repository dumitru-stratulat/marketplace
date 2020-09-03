import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const addProduct = async (title: string, content: string) => {
  const response = await axios.post('https://old-crab-12.loca.lt/feed/product',
    {
      title,
      content
    },
    {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpbWEuc3RyYXR1bGF0OTkxQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVmNGZhMDIxNmVjZTYwZDA1ZTFjYWYyZiIsImlhdCI6MTU5OTA1Mzg1NywiZXhwIjoxNTk5MjI2NjU3fQ.QgITlakldl_4jpMZSfRNo8OBY5IVcYWVGJ-jdLemYss'
      }
    }
  )
}

export default function Profile({ products }) {
  const titleInput = useRef<HTMLInputElement>(null);
  const contentInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  console.log(products)
  return (
    <div>
      {products.products.map((product, key) => (
        <div key={key}>{product.title}</div>
      ))}
      Profile details
      <p>
        Title
        <input type="text" ref={titleInput} />
      </p>
      <p>
        Content
        <input type="text" ref={contentInput} />
      </p>
      <button onClick={() => {
        addProduct(
          titleInput.current!.value,
          contentInput.current!.value
        )
      }}>
        Upload
      </button>
    </div>
  )
}
const getProfileProducts = async () => {
  const response = await axios.get('https://old-crab-12.loca.lt/feed/products')
  return response.data
}

export async function getStaticPaths() {

  return {
    paths: [
      { params: { id: "1" } }
    ],
    fallback: false
  }
}

export async function getStaticProps(ctx) {
  //request
  console.log('gettstaticpropss 1')
  const data = await getProfileProducts();
  console.log(data)
  return {
    props: {
      products: data
    }
  }
}
