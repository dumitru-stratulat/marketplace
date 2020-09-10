import axios from 'axios';

export const getProfile = async (id: string) => {
  const response = await axios.get(`https://reactive.loca.lt/profile/${id}`,
    {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpbWEuc3RyYXR1bGF0OTIzMjE5MWQyMzIzMjQyZjMyMTNAZ21haWwuY29tIiwidXNlcklkIjoiNWY0ZjgwYmZlMDdkZmFjYmYwNjBjZmVmIiwiaWF0IjoxNTk5NzI0NDkxLCJleHAiOjE1OTk4OTcyOTF9.8eGSi9FeTnq4RwL5IuOaaUx6ljq-mt3m3zk8aev6VL0'
      }
    })
  return response.data
}

export const addProduct = async (title: string, content: string, category: string, price: string, fileList: any) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  formData.append('category', category);
  formData.append('price', price);
  fileList.forEach(element => {
    formData.append('image[]', element.originFileObj);
  });

  const response = await axios.post('https://reactive.loca.lt/create',
    formData,
    {
      headers: {
        Authorization: 'Bearer' + localStorage.getItem("token")
      }
    }
  )
  return response.data
}