import api from '../api.js';

export const productService = {
  async getAll() {
    const res = await api.get('/productos');
    return res.data;
  },
  async getById(id) {
    const res = await api.get(`/productos/${id}`);
    return res.data;
  },
  async create(product) {
    const res = await api.post('/productos', product);
    return res.data;
  },
  async update(id, product) {
    const res = await api.put(`/productos/${id}`, product);
    return res.data;
  },
  async remove(id) {
    const res = await api.delete(`/productos/${id}`);
    return res.data;
  }
};
