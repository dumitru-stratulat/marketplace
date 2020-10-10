import axios from 'axios';

export const getHomeProducts = async () => {
  const response = await axios.get(`https://reactive.loca.lt/feed`)
  return response.data
}