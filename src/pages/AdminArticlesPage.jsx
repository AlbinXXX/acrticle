import { Link } from 'react-router';
import { useArticles } from '../hooks/useArticles';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const ArticleRow = ({ article, onDelete }) => (
  <tr className="border-t">
    <td className="p-4">{article.title}</td>
    <td className="p-4">
      {new Date(article.created_at).toLocaleDateString()}
    </td>
    <td className="p-4 space-x-2">
      <Link 
        to={`/admin/articles/edit/${article.slug}`}
        className="text-blue-600 hover:text-blue-800"
      >
        Edit
      </Link>
      <button 
        onClick={() => onDelete(article.slug)}
        className="text-red-600 hover:text-red-800"
      >
        Delete
      </button>
    </td>
  </tr>
);

const AdminArticlesPage = () => {
  const { articles, loading, error, deleteArticle } = useArticles();

  const handleDelete = async (slug) => {
    if (!confirm('Are you sure you want to delete this article?')) {
      return;
    }

    const success = await deleteArticle(slug);
    if (!success) {
      alert('Failed to delete article');
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <LoadingSpinner message="Loading articles..." />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Articles</h1>
          <Link 
            to="/admin/articles/create"
            className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
          >
            Create Article
          </Link>
        </div>
        
        {error && (
          <ErrorMessage message={error} className="mb-4" />
        )}
        
        <table className="w-full bg-white shadow rounded-2xl">
          <thead>
            <tr className="text-left border-b">
              <th className="p-4">Title</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <ArticleRow 
                key={article.slug} 
                article={article} 
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
        
        {articles.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            No articles found. <Link to="/admin/articles/create" className="text-blue-600">Create your first article</Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminArticlesPage;
