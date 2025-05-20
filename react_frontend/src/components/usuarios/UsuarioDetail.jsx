import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UsuarioService from '../../services/UsuarioService';

const UsuarioDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const data = await UsuarioService.getUsuarioById(id);
        setUsuario(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching usuario details');
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id]);

  const handleDelete = async () => {
    try {
      await UsuarioService.deleteUsuario(id);
      navigate('/usuarios');
    } catch (err) {
      setError('Error deleting usuario');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="spinner-border inline-block w-4 h-4 border-2 rounded-full text-indigo-500" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-xs text-gray-600">Cargando detalles...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="rounded-md bg-red-50 p-4 my-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-3 w-3 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-2">
          <h3 className="text-xs font-medium text-red-800">{error}</h3>
        </div>
      </div>
    </div>
  );

  if (!usuario) return (
    <div className="bg-yellow-50 p-4 rounded-md">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-3 w-3 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-2">
          <h3 className="text-xs font-medium text-yellow-800">Usuario no encontrado</h3>
          <div className="mt-2 text-xs text-yellow-700">
            <p>No se ha encontrado el usuario solicitado.</p>
          </div>
          <div className="mt-3">
            <button
              type="button"
              onClick={() => navigate('/usuarios')}
              className="inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Volver al listado
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg leading-6 font-medium text-gray-900">Detalle de Usuario</h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Información detallada del usuario</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate('/usuarios')}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Volver
          </button>
          <button
            onClick={() => navigate(`/usuarios/edit/${id}`)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Eliminar
          </button>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">ID</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{usuario.id}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Nombre</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{usuario.nombre}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{usuario.email}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Teléfono</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{usuario.telefono || 'No disponible'}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Dirección</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{usuario.direccion || 'No disponible'}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default UsuarioDetail;