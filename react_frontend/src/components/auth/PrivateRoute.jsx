import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/inicio-sesion" replace />;
  }

  // Render child routes
  return <Outlet />;
};

export default PrivateRoute;