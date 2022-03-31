import api from '../utils/api';

export const fetchUsers = async () => {
  const res = await api.get('/users');
  return res.data;
};

export const fetchUserById = async (id) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};
export const addUser = async (user) => {
  const res = await api.post('/users', user);
  return res.data;
};
export const editUser = async (id, data) => {
  const res = await api.patch(`/users/${id}`, data);
  return res.data;
};
