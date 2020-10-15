import axios from 'axios';

export const getUserInfo = async () => {
  try {
    const response = await axios.get(
      `https://outfit-md.herokuapp.com/user`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log('erro')
    localStorage.removeItem('token');
    return err.status = 500;
  }
};
