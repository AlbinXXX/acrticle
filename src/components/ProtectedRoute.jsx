import { Navigate } from 'react-router';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
