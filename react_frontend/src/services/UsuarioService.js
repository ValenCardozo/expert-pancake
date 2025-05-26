import axios from 'axios';

const API_URL = 'http://localhost:3003';

export const UsuarioService = {
  // Get all usuarios
  getAllUsuarios: async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data.users || response.data;
    } catch (error) {
      console.error('Error fetching usuarios:', error);
      throw error;
    }
  },


  getUsuarioById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching usuario with id ${id}:`, error);
      throw error;
    }
  },

  createUsuario: async (usuarioData) => {
    try {
      const response = await axios.post(`${API_URL}/users`, usuarioData);
      return response.data;
    } catch (error) {
      console.error('Error creating usuario:', error);
      throw error;
    }
  },

  // Update an existing usuario (simulated)
  updateUsuario: async (id, usuarioData) => {
    try {
      const response = await axios.put(`${API_URL}/users/${id}`, usuarioData);
      return response.data;
    } catch (error) {
      console.error(`Error updating usuario with id ${id}:`, error);
      throw error;
    }
  },

  // Delete a usuario (simulated)
  deleteUsuario: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting usuario with id ${id}:`, error);
      throw error;
    }
  }
};

export default UsuarioService;