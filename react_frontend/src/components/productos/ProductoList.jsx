import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductoService from '../../services/ProductoService';
import { useNotification } from '../../context/NotificationContext';

const ProductoList = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await ProductoService.getAllProductos();
        setProductos(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching productos');
        showError('No se pudieron cargar los productos');
        setLoading(false);
      }
    };

    fetchProductos();
  }, [showError]);

  const handleDelete = async (id) => {
    try {
      await ProductoService.deleteProducto(id);
      setProductos(productos.filter(producto => producto.id !== id));
      showSuccess('Producto eliminado exitosamente');
    } catch (err) {
      setError('Error deleting producto');
      showError('Error al eliminar el producto');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-48 bg-gray-50">
      <div className="text-center">
        <div className="spinner-border inline-block w-4 h-4 border-2 rounded-full text-indigo-500" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-xs text-gray-600">Cargando productos...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="rounded-md bg-red-50 p-3 my-3">
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

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-3 py-4 sm:px-4 flex justify-between items-center">
        <div>
          <h2 className="text-base leading-6 font-medium text-gray-900">Productos</h2>
          <p className="mt-1 max-w-2xl text-xs text-gray-500">Listado de todos los productos</p>
        </div>
        <Link to="/productos/new" className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <svg className="-ml-0.5 mr-1.5 h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Nuevo Producto
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        {productos.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productos.map(producto => (
                <tr key={producto.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">{producto.id}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">{producto.nombre}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">${producto.precio}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">{producto.stock}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-right text-xs font-medium">
                    <Link to={`/productos/${producto.id}`} className="text-indigo-600 hover:text-indigo-900 mr-2">Ver</Link>
                    <Link to={`/productos/edit/${producto.id}`} className="text-amber-600 hover:text-amber-900 mr-2">Editar</Link>
                    <button 
                      onClick={() => handleDelete(producto.id)} 
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-6 text-center">
            <p className="text-sm text-gray-500">No hay productos disponibles</p>
            <Link to="/productos/new" className="mt-3 inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Agregar un producto
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductoList;