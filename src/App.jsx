import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import LoginPage from './pages/LoginPage';
import AdminArticlesPage from './pages/AdminArticlesPage';
import CreateArticlePage from './pages/CreateArticlePage';
import EditArticlePage from './pages/EditArticlePage';

function App() {
  return (
    //User provider warps the entire application just like discussed in class
    <UserProvider>
      <Router>
        <Routes>
          {/* Public routes for accessing articles */}
          <Route path="/" element={<HomePage />} />
          <Route path="/:slug" element={<ArticlePage />} />
          
          {/* Auth routes for logging in */}
          <Route path="/auth/login" element={<LoginPage />} />
          
          {/* Protected admin routes */}
          <Route 
            path="/admin/articles" 
            element={
              <ProtectedRoute>
                <AdminArticlesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/articles/create" 
            element={
              <ProtectedRoute>
                <CreateArticlePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/articles/edit/:slug" 
            element={
              <ProtectedRoute>
                <EditArticlePage />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
