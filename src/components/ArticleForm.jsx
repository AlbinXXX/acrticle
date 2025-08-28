import { useState } from 'react';
import ErrorMessage from './ErrorMessage';

const ArticleForm = ({ 
  initialData = { title: '', introduction: '', content: '', slug: '' },
  onSubmit,
  onCancel,
  loading = false,
  error = '',
  isEditing = false 
}) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Auto-generate slug from title only when creating new article
    if (name === 'title' && !isEditing) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({
        ...prev,
        slug: slug
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow">
      {error && (
        <ErrorMessage message={error} className="mb-4" />
      )}
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Slug *
        </label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          required
          disabled={isEditing}
        />
        {isEditing && (
          <p className="text-sm text-gray-500 mt-1">Slug cannot be changed when editing</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Introduction
        </label>
        <textarea
          name="introduction"
          value={formData.introduction}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          placeholder="Brief introduction or summary of the article"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Content *
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="10"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          required
          placeholder="Main content of the article"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Article' : 'Create Article')}
        </button>
        
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ArticleForm;
