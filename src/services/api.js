import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export default api;

export const authAPI = {
  register: (data) => api.post('/register', data),
  login: (data) => api.post('/login', data),
  logout: () => api.post('/logout'),
  profile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),
};

export const productAPI = {
  list: (params) => api.get('/products', { params }),
  show: (slug) => api.get(`/products/${slug}`),
  reviews: (slug) => api.get(`/products/${slug}/reviews`),
};

export const categoryAPI = {
  list: () => api.get('/categories'),
  show: (slug) => api.get(`/categories/${slug}`),
};

export const cartAPI = {
  get: () => api.get('/cart'),
  add: (data) => api.post('/cart/add', data),
  update: (itemId, data) => api.put(`/cart/items/${itemId}`, data),
  remove: (itemId) => api.delete(`/cart/items/${itemId}`),
  clear: () => api.delete('/cart'),
};

export const addressAPI = {
  list: () => api.get('/addresses'),
  create: (data) => api.post('/addresses', data),
  update: (id, data) => api.put(`/addresses/${id}`, data),
  remove: (id) => api.delete(`/addresses/${id}`),
};

export const orderAPI = {
  list: () => api.get('/orders'),
  show: (id) => api.get(`/orders/${id}`),
  create: (data) => api.post('/orders', data),
  cancel: (id) => api.post(`/orders/${id}/cancel`),
  track: (id) => api.get(`/orders/${id}/track`),
  pay: (id, gateway) => api.post(`/orders/${id}/pay`, { gateway }),
};

export const couponAPI = {
  validate: (code, subtotal) => api.post('/coupons/validate', { code, subtotal }),
};

export const wishlistAPI = {
  list: () => api.get('/wishlist'),
  toggle: (productId) => api.post('/wishlist/toggle', { product_id: productId }),
  remove: (productId) => api.delete(`/wishlist/${productId}`),
};

export const reviewAPI = {
  create: (data) => api.post('/reviews', data),
  myReviews: () => api.get('/my-reviews'),
};