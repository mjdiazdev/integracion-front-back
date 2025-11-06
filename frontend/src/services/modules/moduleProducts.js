import api from '../api.js';

export const productService = {
  async getAll() {
    const res = await api.get('/products');
    return res.data;
  },
  async getById(id) {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },
  async create(product) {
    const res = await api.post('/products', product);
    return res.data;
  },
  async update(id, product) {
    const res = await api.put(`/products/${id}`, product);
    return res.data;
  },
  async remove(id) {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  }
};
