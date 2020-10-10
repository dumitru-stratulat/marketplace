import axios from 'axios';

export const getSearchedProducts = async (key: string, query: string, page = 1) => {
  const response = await axios.get(`https://reactive.loca.lt/search/?q=${query}&page=${page}`)
  return response.data
}