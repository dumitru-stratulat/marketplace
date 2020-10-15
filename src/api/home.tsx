import axios from 'axios';

export const getHomeProducts = async () => {
  const response = await axios.get(`https://outfit-md.herokuapp.com/feed`)
  return response.data
}