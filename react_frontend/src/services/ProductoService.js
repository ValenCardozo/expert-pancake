import axios from 'axios';

const API_URL = 'http://localhost:3003';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const ProductoService = {
  getAllProductos: async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching productos:', error);
      throw error;
    }
  },

  getProductoById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching producto with id ${id}:`, error);
      throw error;
    }
  },

  createProducto: async (productData) => {
    try {
      const response = await axios.post(`${API_URL}/products`, productData);
      return response.data;
    } catch (error) {
      console.error('Error creating producto:', error);
      throw error;
    }
  },

  updateProducto: async (id, productData) => {
    try {
      console.log('Producto data:', productData);
      const response = await axios.put(`${API_URL}/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error updating producto with id ${id}:`, error);
      throw error;
    }
  },

  deleteProducto: async (id) => {
    try {
      console.log('Deleting producto with id:', id);
      const response = await axios.delete(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting producto with id ${id}:`, error);
      throw error;
    }
  }
};

export default ProductoService;