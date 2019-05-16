import axios from 'axios';

const setToken = (token: string) => {
  localStorage.setItem('token', token);
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const getToken = () => {
  return localStorage.getItem('token');
};
const removeToken = () => {
  localStorage.removeItem('token');
  axios.defaults.headers.common.Authorization = null;
};

export { setToken, getToken, removeToken };
