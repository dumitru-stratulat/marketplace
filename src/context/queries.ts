import axios from 'axios';

export const getUserInfo = async () => {
  try {
    const response = await axios.get(
      `https://reactive.loca.lt/user`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    return err.status = 500;
  }
};
