import axios from 'axios';
import NProgress from 'nprogress';
import { AXIOS_BASE_URL } from '../helpers/constants';
import { ILoginRegister } from '../types/user';

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

export const authService = async (body: ILoginRegister, endPoint: string) => {
  try {
    const response = await axios.post(endPoint, body);
    return response.data;
  } catch (error) {
    throw new Error(error.response.status);
  }
};

export const getUser = async (token: string, endPoint: string) => {
  try {
    const response = await axios.get(endPoint, { headers: { Authorization: `Token ${token}` } });
    return response.data;
  } catch (error) {
    throw new Error(error.response.status);
  }
};
