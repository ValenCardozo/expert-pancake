import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'

// Componentes de Productos
import ProductoList from './components/productos/ProductoList';
import ProductoDetail from './components/productos/ProductoDetail';
import ProductoForm from './components/productos/ProductoForm';

// Componentes de Usuarios
import UsuarioList from './components/usuarios/UsuarioList';
import UsuarioDetail from './components/usuarios/UsuarioDetail';
import UsuarioForm from './components/usuarios/UsuarioForm';

// Context
import { NotificationProvider } from './context/NotificationContext';
import Notification from './components/Notification';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <NotificationProvider>
      <Router>
        <div className="app-container min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-2 sm:px-4">
              <div className="flex justify-between h-14">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <span className="text-indigo-600 font-bold text-base">Mi Aplicación</span>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                    <Link to="/" className="px-2 py-1 text-sm font-medium text-gray-900 rounded-md">
                      Inicio
                    </Link>
                    <Link to="/productos" className="px-2 py-1 text-sm font-medium text-gray-900 rounded-md">
                      Productos
                    </Link>
                    <Link to="/usuarios" className="px-2 py-1 text-sm font-medium text-gray-900 rounded-md">
                      Usuarios
                    </Link>
                  </div>
                </div>
                
                {/* Menú mobile */}
                <div className="-mr-2 flex items-center sm:hidden">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                    onClick={toggleMobileMenu}
                  >
                    <span className="sr-only">Abrir menú principal</span>
                    <svg
                      className={`${mobileMenuOpen ? 'hidden' : 'block'} h-4 w-4`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                    <svg
                      className={`${mobileMenuOpen ? 'block' : 'hidden'} h-4 w-4`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <div className={`${mobileMenuOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
            <div className="pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                to="/productos" 
                className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Productos
              </Link>
              <Link 
                to="/usuarios" 
                className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Usuarios
              </Link>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4">
            <Notification />
            
            <div className="bg-white shadow rounded-lg p-2 sm:p-4">
              <Routes>
                <Route path="/" element={
                  <div className="text-center py-4">
                    <h1 className="text-lg font-semibold text-gray-900">Bienvenido a Mi Aplicación</h1>
                    <p className="mt-2 text-sm text-gray-600">
                      Selecciona una opción del menú para comenzar
                    </p>
                    <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
                      <Link to="/productos" className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                        Ver Productos
                      </Link>
                      <Link to="/usuarios" className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                        Ver Usuarios
                      </Link>
                    </div>
                  </div>
                } />

                {/* Rutas de Productos */}
                <Route path="/productos" element={<ProductoList />} />
                <Route path="/productos/:id" element={<ProductoDetail />} />
                <Route path="/productos/new" element={<ProductoForm />} />
                <Route path="/productos/edit/:id" element={<ProductoForm />} />

                {/* Rutas de Usuarios */}
                <Route path="/usuarios" element={<UsuarioList />} />
                <Route path="/usuarios/:id" element={<UsuarioDetail />} />
                <Route path="/usuarios/new" element={<UsuarioForm />} />
                <Route path="/usuarios/edit/:id" element={<UsuarioForm />} />
              </Routes>
            </div>
          </div>
          
          <footer className="bg-white mt-4 py-3 text-center text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Mi Aplicación. Todos los derechos reservados.</p>
          </footer>
        </div>
      </Router>
    </NotificationProvider>
  )
}

export default App
