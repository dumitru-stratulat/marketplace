import axios from 'axios';
import { File } from 'interfaces/interfaces'

export const getProfile = async (key: string, query: string, page = 1) => {
  console.log(page)
  const response = await axios.get(`https://reactive.loca.lt/profile/${query}?page=${page}`)
  return response.data
}

export const addProduct = async (
  title: string,
  content: string,
  category: string[],
  price: number,
  fileList: any,
  username: string,
  condition: string,
  size: string,
  contactNumber: number
) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  formData.append('condition', condition);
  formData.append('contactNumber', contactNumber.toString());
  formData.append('size', size)
  category.forEach(element => {
    formData.append('category[]', element);
  });
  formData.append('price', price.toString());

  fileList.forEach((element: File) => {
    formData.append('image[]', element.originFileObj, `${username} ${element.name}`);
  });
  const response = await axios.post('https://reactive.loca.lt/create',
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  )
  return response.data
}