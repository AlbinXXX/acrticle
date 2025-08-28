import { Link } from 'react-router';
import { useArticles } from '../hooks/useArticles';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const ArticleCard = ({ article }) => (
  <Link
    to={`/${article.slug}`}
    className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition-shadow"
  >
    <h2 className="text-xl font-bold mb-2">{article.title}</h2>
    <p className="text-gray-600 mb-2 line-clamp-3">
      {article.introduction || 'Click to read more...'}
    </p>
    <span className="text-sm text-gray-400">
      {new Date(article.created_at).toLocaleDateString()}
    </span>
  </Link>
);

//primary Home page
const HomePage = () => {
  const { articles, loading, error } = useArticles();

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <LoadingSpinner message="Loading articles..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <div className="p-6">
          <ErrorMessage message={`Error: ${error}`} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
        {articles.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">
            No articles found.
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
