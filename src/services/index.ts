import axios from 'axios';
import NProgress from 'nprogress';
import { AXIOS_BASE_URL } from '../helpers/constants';

axios.defaults.baseURL = AXIOS_BASE_URL;

const fetchData = async (url: string) => {
  try {
    NProgress.start();
    const response = await axios(url);
    return response.data;
  } catch (error) {
    return false;
  } finally {
    NProgress.done();
  }
};

// eslint-disable-next-line import/prefer-default-export
export { fetchData };
