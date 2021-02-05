import axios from 'axios';
import NProgress from 'nprogress';
import { AXIOS_BASE_URL } from '../helpers/constants';

axios.defaults.baseURL = AXIOS_BASE_URL;

export const fetchData = async (url: string) => {
  try {
    NProgress.start();
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.status);
  } finally {
    NProgress.done();
  }
};

export const authenticate = async (body: any) => {
  try {
    const response = await axios.post('/users/login', body);
    return response.data;
  } catch (error) {
    throw new Error(error.response.status);
  }
};
