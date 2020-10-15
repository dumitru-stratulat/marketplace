import axios from 'axios';

export const getProduct = async (productId: string) => {
  const response = await axios.get(`https://outfit-md.herokuapp.com/product/productId`,
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpbWEuc3RyYXR1bGF0OTlAZ21haWwuY29tIiwidXNlcklkIjoiNWY1YTI2MzUyYjdjNGU2N2U5Nzc5Y2I4IiwiaWF0IjoxNjAwMDg0NDY3LCJleHAiOjE2MDAyNTcyNjd9.OLW0wOo6QYmyWXi3Y71UE94BwFoddPolEcpY8jpcysM`
      }
    })
  return response.data
}