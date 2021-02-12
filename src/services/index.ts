import axios from 'axios';
import NProgress from 'nprogress';
import { AXIOS_BASE_URL } from '../helpers/constants';
import { IForm } from '../types/user';

axios.defaults.baseURL = AXIOS_BASE_URL;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

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

export const postFetch = async (body: IForm = {}, endPoint: string) => {
  const response = await axios.post(endPoint, body);
  return response.data;
};

export const getCurrentUser = async (endPoint: string) => {
  const response = await axios.get(endPoint);
  return response.data;
};

export const updateResource = async (body: IForm, endPoint: string) => {
  const response = await axios.put(endPoint, body);
  return response.data;
};

export const deleteResource = async (endPoint: string) => {
  const response = await axios.delete(endPoint);
  return response.data;
};
