import instance from '../api';

const setToken = (token: string) => {
  localStorage.setItem('token', token);
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const getToken = () => {
  return localStorage.getItem('token');
};
const removeToken = () => {
  localStorage.removeItem('token');
  instance.defaults.headers.common.Authorization = null;
};

export { setToken, getToken, removeToken };
