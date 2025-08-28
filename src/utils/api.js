export const API_BASE_URL = 'http://test.besnikselimi.com:8000';

// API Service class for better organization and separation of concerns
class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const token = localStorage.getItem('auth_token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  // Articles API methods
  async getArticles() {
    return this.request('/articles');
  }

  async getArticle(slug) {
    return this.request(`/articles/${slug}`);
  }

  async createArticle(articleData) {
    return this.request('/articles', {
      method: 'POST',
      body: JSON.stringify(articleData),
    });
  }

  async updateArticle(slug, articleData) {
    return this.request(`/articles/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(articleData),
    });
  }

  async deleteArticle(slug) {
    return this.request(`/articles/${slug}`, {
      method: 'DELETE',
    });
  }

  // Auth API methods
  async login(email, password) {
    return this.request('/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }
}

// Export singleton instance
export const apiService = new ApiService(API_BASE_URL);

// Backward compatibility
export const apiRequest = (endpoint, options) => apiService.request(endpoint, options);
