import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { apiService } from '../utils/api';
import ErrorMessage from '../components/ErrorMessage';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await apiService.login(email, password);
      
      // Assuming the API returns { token: "...", user: {...} }
      login(data.user || { email }, data.token || data.access_token);
      
      // Redirect to admin page
      navigate('/admin/articles');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        
        {error && (
          <ErrorMessage message={error} className="mb-4" />
        )}
        
        <label className="block mb-4">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border rounded p-2 focus:outline-none focus:border-blue-500"
            required
          />
        </label>
        
        <label className="block mb-6">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border rounded p-2 focus:outline-none focus:border-blue-500"
            required
          />
        </label>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-xl disabled:opacity-50 hover:bg-blue-700"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
