import { useState, useContext } from 'react'
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

// Componentes de Auth
import LoginForm from './layouts/auth/LoginForm';
import RegisterForm from './layouts/auth/RegisterForm';
import PrivateRoute from './components/auth/PrivateRoute';
import PublicRoute from './components/auth/PublicRoute';
import RoleBasedRoute from './components/auth/RoleBasedRoute';
import UserRoleManagement from './components/admin/UserRoleManagement';

import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Notification from './components/Notification';

const AppContent = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const getMenuItems = () => {
    const baseItems = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        url: '/'
      }
    ];

    console.log('EL USUARIO', user);
    if (user) {
      const authItems = [
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

      if (user.role === 'admin') {
        authItems.push({
          label: 'Panel Admin',
          icon: 'pi pi-fw pi-cog',
          url: '/admin/usuarios'
        });
      }

      authItems.push({
        label: 'Cerrar Sesión',
        icon: 'pi pi-fw pi-sign-out',
        command: () => logout()
      });

      return [...baseItems, ...authItems];
    } else {
      // Menu for unauthenticated users
      const unauthItems = [
        {
          label: 'Iniciar Sesión',
          icon: 'pi pi-fw pi-sign-in',
          url: '/inicio-sesion'
        },
        {
          label: 'Registrarse',
          icon: 'pi pi-fw pi-user-plus',
          url: '/registro'
        }
      ];

      return [...baseItems, ...unauthItems];
    }
  };

  const items = getMenuItems();
  const start = <div className="nav-logo">Mi Aplicación</div>;
  const end = (
    <Button
      icon="pi pi-bars"
      onClick={() => setSidebarVisible(true)}
      className="p-button-text p-button-rounded p-button-plain"
      style={{ display: 'none' }}
    />
  );

  // Mobile sidebar items (condicional)
  const getMobileSidebarItems = () => {
    if (user) {
      return (
        <>
          <Link to="/" onClick={() => setSidebarVisible(false)}>
            <i className="pi pi-home mr-2"></i>Inicio
          </Link>
          <Link to="/productos" onClick={() => setSidebarVisible(false)}>
            <i className="pi pi-shopping-cart mr-2"></i>Productos
          </Link>
          <Link to="/usuarios" onClick={() => setSidebarVisible(false)}>
            <i className="pi pi-users mr-2"></i>Usuarios
          </Link>
          {user.role === 'admin' && (
            <Link to="/admin/usuarios" onClick={() => setSidebarVisible(false)}>
              <i className="pi pi-cog mr-2"></i>Panel Admin
            </Link>
          )}
          <a href="#" onClick={() => { setSidebarVisible(false); logout(); }}>
            <i className="pi pi-sign-out mr-2"></i>Cerrar Sesión
          </a>
        </>
      );
    } else {
      return (
        <>
          <Link to="/" onClick={() => setSidebarVisible(false)}>
            <i className="pi pi-home mr-2"></i>Inicio
          </Link>
          <Link to="/inicio-sesion" onClick={() => setSidebarVisible(false)}>
            <i className="pi pi-sign-in mr-2"></i>Iniciar Sesión
          </Link>
          <Link to="/registro" onClick={() => setSidebarVisible(false)}>
            <i className="pi pi-user-plus mr-2"></i>Registrarse
          </Link>
        </>
      );
    }
  };

  return (
    <div className="app-container">
      <Menubar model={items} start={start} end={end} className="mb-4" />

      <Sidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)}>
        <h3>Menú</h3>
        <div className="mobile-menu">
          {getMobileSidebarItems()}
        </div>
      </Sidebar>

      <div className="main-content">
        <Notification />

        <Card>
          <Routes>
            {/* Ruta principal - accesible a todos */}
            <Route path="/" element={
              <div className="text-center py-4">
                <h1 className="font-semibold text-gray-900">Bienvenido a Mi Aplicación</h1>
                <p className="mt-2 text-sm text-gray-600">
                  {user 
                    ? "Explora las opciones disponibles en el menú superior"
                    : "Inicia sesión o regístrate para comenzar"
                  }
                </p>
                <div className="mt-4 flex flex-col gap-3 justify-center">
                  {user ? (
                    <>
                      <Link to="/productos">
                        <Button label="Ver Productos" icon="pi pi-shopping-cart" className="p-button-raised mb-2" />
                      </Link>
                      <Link to="/usuarios">
                        <Button label="Ver Usuarios" icon="pi pi-users" className="p-button-raised" />
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/inicio-sesion">
                        <Button label="Iniciar Sesión" icon="pi pi-sign-in" className="p-button-raised mb-2" />
                      </Link>
                      <Link to="/registro">
                        <Button label="Registrarse" icon="pi pi-user-plus" className="p-button-raised" />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            } />

            {/* Rutas públicas */}
            <Route element={<PublicRoute />}>
              <Route path="/inicio-sesion" element={<LoginForm />} />
              <Route path="/registro" element={<RegisterForm />} />
            </Route>

            {/* Rutas protegidas */}
            <Route element={<PrivateRoute />}>
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
              
              {/* Rutas de Admin - solo accesibles por admins */}
              <Route element={<RoleBasedRoute allowedRoles={['admin']} />}>
                <Route path="/admin/usuarios" element={<UserRoleManagement />} />
              </Route>
            </Route>
          </Routes>
        </Card>
      </div>

      <footer>
        <p>© {new Date().getFullYear()} Mi Aplicación. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <NotificationProvider>
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </NotificationProvider>
  )
}

export default App
