import { useState, useEffect } from 'react';
import { apiService } from '../utils/api';

// Custom hook for managing articles state
export const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getArticles();
      setArticles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (slug) => {
    try {
      await apiService.deleteArticle(slug);
      await fetchArticles(); // Refresh the list
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return {
    articles,
    loading,
    error,
    fetchArticles,
    deleteArticle
  };
};

// Custom hook for managing single article state
export const useArticle = (slug) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getArticle(slug);
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  return {
    article,
    loading,
    error
  };
};
