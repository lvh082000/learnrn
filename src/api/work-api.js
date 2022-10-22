import axiosClient from './axios-client';

export const createWork = async payload => {
  return await axiosClient.post('/work/create', payload);
};

export const getWorks = async () => {
  return await axiosClient.get('/work/list');
};

export const deleteWork = async payload => {
  return await axiosClient.delete('/work/delete', payload);
};

export const updateWork = async payload => {
  return await axiosClient.patch('/work/update', payload);
};
