import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useArticle } from '../hooks/useArticles';
import { apiService } from '../utils/api';
import Header from '../components/Header';
import ArticleForm from '../components/ArticleForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const EditArticlePage = () => {
  const { slug } = useParams();
  const { article, loading: initialLoading, error: fetchError } = useArticle(slug);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');

    try {
      await apiService.updateArticle(slug, formData);
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

  if (initialLoading) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <LoadingSpinner message="Loading article..." />
      </div>
    );
  }

  if (fetchError || !article) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <div className="p-6">
          <ErrorMessage message={fetchError || 'Article not found'} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Article</h1>
        
        <ArticleForm
          initialData={{
            title: article.title || '',
            introduction: article.introduction || '',
            content: article.content || '',
            slug: article.slug || ''
          }}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
          error={error}
          isEditing={true}
        />
      </main>
    </div>
  );
};

export default EditArticlePage;
