  import axios from 'axios';

axios.defaults.baseURL =
  'https://pixabay.com/api/?key=32810217-d4150f11c342a4e2afb80e8cd&image_type=photo&orientation=horizontal';

export const  getImage = async (query, page) => {
  try {
    const response = await axios.get(`&per_page=12&page=${page}&q=${query}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};