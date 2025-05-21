import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'

// Componentes de PrimeReact
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Sidebar } from 'primereact/sidebar';

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
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const items = [
    {
      label: 'Inicio',
      icon: 'pi pi-fw pi-home',
      url: '/'
    },
    {
      label: 'Productos',
      icon: 'pi pi-fw pi-shopping-cart',
      url: '/productos'
    },
    {
      label: 'Usuarios',
      icon: 'pi pi-fw pi-users',
      url: '/usuarios'
    }
  ];

  const start = <div className="nav-logo">Mi Aplicación</div>;
  const end = (
    <Button
      icon="pi pi-bars"
      onClick={() => setSidebarVisible(true)}
      className="p-button-text p-button-rounded p-button-plain"
      style={{ display: 'none' }}
    />
  );

  return (
    <NotificationProvider>
      <Router>
        <div className="app-container">
          <Menubar model={items} start={start} end={end} className="mb-4" />

          <Sidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)}>
            <h3>Menú</h3>
            <div className="mobile-menu">
              <Link to="/" onClick={() => setSidebarVisible(false)}>
                <i className="pi pi-home mr-2"></i>Inicio
              </Link>
              <Link to="/productos" onClick={() => setSidebarVisible(false)}>
                <i className="pi pi-shopping-cart mr-2"></i>Productos
              </Link>
              <Link to="/usuarios" onClick={() => setSidebarVisible(false)}>
                <i className="pi pi-users mr-2"></i>Usuarios
              </Link>
            </div>
          </Sidebar>

          <div className="main-content">
            <Notification />

            <Card>
              <Routes>
                <Route path="/" element={
                  <div className="text-center py-4">
                    <h1 className="font-semibold text-gray-900">Bienvenido a Mi Aplicación</h1>
                    <p className="mt-2 text-sm text-gray-600">
                      Selecciona una opción del menú para comenzar
                    </p>
                    <div className="mt-4 flex flex-col gap-3 justify-center">
                      <Link to="/productos">
                        <Button label="Ver Productos" icon="pi pi-shopping-cart" className="p-button-raised mb-2" />
                      </Link>
                      <Link to="/usuarios">
                        <Button label="Ver Usuarios" icon="pi pi-users" className="p-button-raised" />
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
            </Card>
          </div>

          <footer>
            <p>© {new Date().getFullYear()} Mi Aplicación. Todos los derechos reservados.</p>
          </footer>
        </div>
      </Router>
    </NotificationProvider>
  )
}

export default App
