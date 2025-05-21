import axios from 'axios';
// import usuariosData from '../data/usuarios.json';

// API URL for future use with a real backend
const API_URL = 'http://localhost:3000/api';

// Helper to simulate delay like in a real API call
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const UsuarioService = {
  // Get all usuarios
  getAllUsuarios: async () => {
    try {
      // Simulate API call delay
      await delay(300);
      return usuariosData.usuarios;
    } catch (error) {
      console.error('Error fetching usuarios:', error);
      throw error;
    }
  },


  getUsuarioById: async (id) => {
    try {
      await delay(200);
      const usuario = usuariosData.usuarios.find(u => u.id === parseInt(id));

      if (!usuario) {
        throw new Error(`Usuario with id ${id} not found`);
      }

      return usuario;
    } catch (error) {
      console.error(`Error fetching usuario with id ${id}:`, error);
      throw error;
    }
  },

  createUsuario: async (usuarioData) => {
    try {
      // Simulate API call delay
      await delay(500);
      
      // In a real app, this would be handled by the backend
      // This is just a simulation for the frontend
      const newId = Math.max(...usuariosData.usuarios.map(u => u.id)) + 1;
      const newUsuario = {
        id: newId,
        ...usuarioData
      };
      
      // Add to local data (would be saved in a real API)
      usuariosData.usuarios.push(newUsuario);
      
      return newUsuario;
    } catch (error) {
      console.error('Error creating usuario:', error);
      throw error;
    }
  },

  // Update an existing usuario (simulated)
  updateUsuario: async (id, usuarioData) => {
    try {
      // Simulate API call delay
      await delay(500);
      
      const index = usuariosData.usuarios.findIndex(u => u.id === parseInt(id));
      
      if (index === -1) {
        throw new Error(`Usuario with id ${id} not found`);
      }
      
      // Update the usuario in our local data
      const updatedUsuario = {
        ...usuariosData.usuarios[index],
        ...usuarioData,
        id: parseInt(id) // Ensure ID remains the same
      };
      
      usuariosData.usuarios[index] = updatedUsuario;
      
      return updatedUsuario;
    } catch (error) {
      console.error(`Error updating usuario with id ${id}:`, error);
      throw error;
    }
  },

  // Delete a usuario (simulated)
  deleteUsuario: async (id) => {
    try {
      // Simulate API call delay
      await delay(400);
      
      const index = usuariosData.usuarios.findIndex(u => u.id === parseInt(id));
      
      if (index === -1) {
        throw new Error(`Usuario with id ${id} not found`);
      }
      
      // Remove from our local data
      const deletedUsuario = usuariosData.usuarios[index];
      usuariosData.usuarios.splice(index, 1);
      
      return { success: true, deletedUsuario };
    } catch (error) {
      console.error(`Error deleting usuario with id ${id}:`, error);
      throw error;
    }
  }
};

export default UsuarioService;