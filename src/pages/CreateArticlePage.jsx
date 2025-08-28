import { useState } from 'react';
import { useNavigate } from 'react-router';
import { apiService } from '../utils/api';
import Header from '../components/Header';
import ArticleForm from '../components/ArticleForm';

const CreateArticlePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');

    try {
      await apiService.createArticle(formData);
      navigate('/admin/articles');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/articles');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create New Article</h1>
        
        <ArticleForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
          error={error}
          isEditing={false}
        />
      </main>
    </div>
  );
};

export default CreateArticlePage;
