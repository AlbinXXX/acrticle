import { Link, useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';

const Header = () => {
  const { isAuthenticated, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home page as per requirement 13
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <nav className="flex space-x-4">
        <Link to="/" className="text-blue-600 font-semibold">Home</Link>
        {isAuthenticated() && (
          <Link to="/admin/articles" className="text-blue-600 font-semibold">Manage Articles</Link>
        )}
      </nav>
      
      {isAuthenticated() ? (
        <button 
          onClick={handleLogout}
          className="text-blue-600 font-semibold hover:text-blue-800"
        >
          Logout
        </button>
      ) : (
        <Link to="/auth/login" className="text-blue-600 font-semibold">Login</Link>
      )}
    </header>
  );
};

export default Header;
