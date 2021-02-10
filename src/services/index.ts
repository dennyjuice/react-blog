import axios from 'axios';
import NProgress from 'nprogress';
import { AXIOS_BASE_URL } from '../helpers/constants';
import { IForm } from '../types/user';

axios.defaults.baseURL = AXIOS_BASE_URL;

export const fetchData = async (url: string) => {
  try {
    NProgress.start();
    const token = localStorage.getItem('token');
    const response = await axios.get(url, token ? { headers: { Authorization: `Token ${token}` } } : {});
    return response.data;
  } catch (error) {
    throw new Error(error.response.status);
  } finally {
    NProgress.done();
  }
};

export const postFetch = async (body: IForm = {}, endPoint: string, token: string = '') => {
  const response = await axios.post(endPoint, body, token ? { headers: { Authorization: `Token ${token}` } } : {});
  return response.data;
};

export const getCurrentUser = async (endPoint: string, token: string) => {
  const response = await axios.get(endPoint, { headers: { Authorization: `Token ${token}` } });
  return response.data;
};

export const updateResource = async (body: IForm, endPoint: string, token: string) => {
  const response = await axios.put(endPoint, body, { headers: { Authorization: `Token ${token}` } });
  return response.data;
};

export const deleteResource = async (endPoint: string, token: string) => {
  const response = await axios.delete(endPoint, { headers: { Authorization: `Token ${token}` } });
  return response.data;
};
