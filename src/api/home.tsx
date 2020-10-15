import axios from 'axios';

export const getHomeProducts = async () => {
  const response = await axios.get(`${process.env.SERVER_ENDPOINT}feed`)
  return response.data
}