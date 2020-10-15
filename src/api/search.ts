import axios from 'axios';

export const getSearchedProducts = async (key: string, query: string, page = 1) => {
  const response = await axios.get(`https://outfit-md.herokuapp.com/search/?q=${query}&page=${page}`)
  return response.data
}