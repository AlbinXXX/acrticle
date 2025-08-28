import { useParams } from 'react-router';
import { useArticle } from '../hooks/useArticles';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const ArticlePage = () => {
  const { slug } = useParams();
  const { article, loading, error } = useArticle(slug);

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <LoadingSpinner message="Loading article..." />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <div className="p-6">
          <ErrorMessage message={error || 'Article not found'} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <article className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow mt-6">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          Published on {new Date(article.created_at).toLocaleDateString()}
        </p>
        {article.introduction && (
          <p className="text-lg text-gray-700 mb-6 font-medium">
            {article.introduction}
          </p>
        )}
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {article.content}
        </div>
      </article>
    </div>
  );
};

export default ArticlePage;
