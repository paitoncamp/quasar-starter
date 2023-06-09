import { $axios } from 'boot/axios';

export default {
  login: (credentials) => $axios.post('/auth/login', credentials),
  register: (data) => $axios.post('/register', data),
  forgotPassword: (email) => $axios.post('/forgot-password', email),
  logout: () => $axios.get('/auth/logout'),
};
