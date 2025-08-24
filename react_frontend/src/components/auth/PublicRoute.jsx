import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PublicRoute = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    // Redirect to home if user is already authenticated
    return <Navigate to="/" replace />;
  }

  // Render child routes
  return <Outlet />;
};

export default PublicRoute;