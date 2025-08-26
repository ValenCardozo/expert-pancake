import axios from 'axios';

const API_URL = 'http://localhost:3003';

export const UsuarioService = {
  getAllUsuarios: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.users || response.data;
    } catch (error) {
      console.error('Error fetching usuarios:', error);
      throw error;
    }
  },

  getUsuarioById: async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching usuario with id ${id}:`, error);
      throw error;
    }
  },

  createUsuario: async (usuarioData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/users`, usuarioData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating usuario:', error);
      throw error;
    }
  },

  // Update an existing usuario (simulated)
  updateUsuario: async (id, usuarioData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/users/${id}`, usuarioData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating usuario with id ${id}:`, error);
      throw error;
    }
  },

  // Delete a usuario (simulated)
  deleteUsuario: async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error deleting usuario with id ${id}:`, error);
      throw error;
    }
  },

  // Update user role
  updateUserRole: async (id, roleData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/users/${id}/role`, roleData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating role for user with id ${id}:`, error);
      throw error;
    }
  }
};

export default UsuarioService;