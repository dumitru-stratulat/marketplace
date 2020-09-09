import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';

export default function Profile(postData) {
  const router = useRouter();
  return (
    <div>
      Profile details
    </div>
  )
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
  const requestResponse = 1;
  return {
    props: {
      postData: requestResponse
    }
  }
}
