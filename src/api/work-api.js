import axiosClient from './axios-client';

export const createWork = async payload => {
  return await axiosClient.post('/work/create', payload);
};

export const getWorks = async () => {
  return await axiosClient.get('/work/list');
};
