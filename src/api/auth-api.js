import axiosClient from './axios-client';

export const login = async payload => {
  return await axiosClient.post('/auth/login', payload);
};
