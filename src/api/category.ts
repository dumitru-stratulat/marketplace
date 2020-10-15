import axios from 'axios';
export interface Query {
  gender: string;
  category: string;
}
export const getProductsByCategory = async (key: string, query: Query, page = 1) => {
  const response = await axios.get(`${process.env.SERVER_ENDPOINT}category/${query.gender}/${query.category}?page=${page}`)
  return response.data
}