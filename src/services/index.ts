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
  const response = await axios.post(endPoint, body);
  return response.data;
};

export const getCurrentUser = async (token: string, endPoint: string) => {
  const response = await axios.get(endPoint, { headers: { Authorization: `Token ${token}` } });
  return response.data;
};

export const updateUser = async (body: ILoginRegister, token: string, endPoint: string) => {
  const response = await axios.put(endPoint, body, { headers: { Authorization: `Token ${token}` } });
  return response.data;
};
