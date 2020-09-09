import axios from 'axios';

export const getProfile = async (id: string) => {
  const response = await axios.get(`https://reactive.loca.lt/profile/${id}`)
  return response.data
}

// export const getProfileProducts = async (id: string) => {
//   const response = await axios.get(`https://reactive.loca.lt/profile/${id}`)
//   return response.data
// }

export const addProduct = async (title: string, content: string, category: string[], price: number) => {
  const response = await axios.post('https://reactive.loca.lt/create',
    {
      title,
      content,
      category,
      price
    },
    {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpbWEuc3RyYXR1bGF0OTkxQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVmNGZhMDIxNmVjZTYwZDA1ZTFjYWYyZiIsImlhdCI6MTU5OTEzODYzNiwiZXhwIjoxNTk5MzExNDM2fQ.HX1Yuw4LTPZSRr7iWgG5xdgIWiCnlD482grZynwZEmY'
      }
    }
  )
  return response.data
}