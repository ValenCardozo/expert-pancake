import axios from 'axios';
import productosData from '../data/productos.json';

// API URL for future use with a real backend
const API_URL = 'http://localhost:3000/api';

// Helper to simulate delay like in a real API call
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const ProductoService = {
  // Get all productos
  getAllProductos: async () => {
    try {
      // Simulate API call delay
      await delay(300);
      return productosData.productos;
    } catch (error) {
      console.error('Error fetching productos:', error);
      throw error;
    }
  },

  // Get a single producto by id
  getProductoById: async (id) => {
    try {
      // Simulate API call delay
      await delay(200);
      const producto = productosData.productos.find(p => p.id === parseInt(id));
      
      if (!producto) {
        throw new Error(`Producto with id ${id} not found`);
      }
      
      return producto;
    } catch (error) {
      console.error(`Error fetching producto with id ${id}:`, error);
      throw error;
    }
  },

  // Create a new producto (simulated)
  createProducto: async (productoData) => {
    try {
      // Simulate API call delay
      await delay(500);
      
      // In a real app, this would be handled by the backend
      // This is just a simulation for the frontend
      const newId = Math.max(...productosData.productos.map(p => p.id)) + 1;
      const newProducto = {
        id: newId,
        ...productoData
      };
      
      // Add to local data (would be saved in a real API)
      productosData.productos.push(newProducto);
      
      return newProducto;
    } catch (error) {
      console.error('Error creating producto:', error);
      throw error;
    }
  },

  // Update an existing producto (simulated)
  updateProducto: async (id, productoData) => {
    try {
      // Simulate API call delay
      await delay(500);
      
      const index = productosData.productos.findIndex(p => p.id === parseInt(id));
      
      if (index === -1) {
        throw new Error(`Producto with id ${id} not found`);
      }
      
      // Update the producto in our local data
      const updatedProducto = {
        ...productosData.productos[index],
        ...productoData,
        id: parseInt(id) // Ensure ID remains the same
      };
      
      productosData.productos[index] = updatedProducto;
      
      return updatedProducto;
    } catch (error) {
      console.error(`Error updating producto with id ${id}:`, error);
      throw error;
    }
  },

  // Delete a producto (simulated)
  deleteProducto: async (id) => {
    try {
      // Simulate API call delay
      await delay(400);
      
      const index = productosData.productos.findIndex(p => p.id === parseInt(id));
      
      if (index === -1) {
        throw new Error(`Producto with id ${id} not found`);
      }
      
      // Remove from our local data
      const deletedProducto = productosData.productos[index];
      productosData.productos.splice(index, 1);
      
      return { success: true, deletedProducto };
    } catch (error) {
      console.error(`Error deleting producto with id ${id}:`, error);
      throw error;
    }
  }
};

export default ProductoService;