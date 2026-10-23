import { Article, ArticleFormData, ArticleStats, AdminUser, AuthResponse } from '../types';

const TOKEN_KEY = 'eiren_admin_token';
const USER_KEY = 'eiren_admin_user';

export function getAdminToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAdminAuth(token: string, user: AdminUser) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {
    // ignore
  }
}

export function clearAdminAuth() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch {
    // ignore
  }
}

export function getStoredAdminUser(): AdminUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Helper for fetch with auth
async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getAdminToken();
  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  return fetch(url, { ...options, headers });
}

export const articleService = {
  // Public API
  async getPublishedArticles(params: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<{
    articles: Article[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    categories: string[];
  }> {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'All' && params.category !== 'All Insights') {
      query.set('category', params.category);
    }
    if (params.search) query.set('search', params.search);
    if (params.page) query.set('page', params.page.toString());
    if (params.limit) query.set('limit', params.limit.toString());

    const res = await fetch(`/api/articles?${query.toString()}`);
    if (!res.ok) {
      throw new Error('Failed to load published insights');
    }
    return res.json();
  },

  async getArticleBySlug(
    slug: string,
    previewToken?: string
  ): Promise<{ article: Article; relatedArticles: Article[] }> {
    const headers: Record<string, string> = {};
    const token = previewToken || getAdminToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`/api/articles/${encodeURIComponent(slug)}`, { headers });
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error('Article not found or not published');
      }
      throw new Error('Failed to load article');
    }
    return res.json();
  },

  // Admin Auth API
  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Invalid credentials');
    }

    setAdminAuth(data.token, data.user);
    return data;
  },

  async getMe(): Promise<AdminUser> {
    const res = await fetchWithAuth('/api/auth/me');
    if (!res.ok) {
      clearAdminAuth();
      throw new Error('Session expired');
    }
    const data = await res.json();
    return data.user;
  },

  async logout(): Promise<void> {
    try {
      await fetchWithAuth('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    } finally {
      clearAdminAuth();
    }
  },

  // Admin CMS CRUD API
  async getAdminArticles(params: {
    status?: string;
    search?: string;
  } = {}): Promise<{ articles: Article[]; stats: ArticleStats }> {
    const query = new URLSearchParams();
    if (params.status && params.status !== 'all') query.set('status', params.status);
    if (params.search) query.set('search', params.search);

    const res = await fetchWithAuth(`/api/admin/articles?${query.toString()}`);
    if (!res.ok) {
      if (res.status === 401) {
        clearAdminAuth();
        throw new Error('Unauthorized');
      }
      throw new Error('Failed to fetch articles');
    }
    return res.json();
  },

  async getAdminArticle(id: string): Promise<Article> {
    const res = await fetchWithAuth(`/api/admin/articles/${encodeURIComponent(id)}`);
    if (!res.ok) {
      throw new Error('Failed to fetch article details');
    }
    const data = await res.json();
    return data.article;
  },

  async createArticle(data: ArticleFormData): Promise<Article> {
    const res = await fetchWithAuth('/api/admin/articles', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.error || 'Failed to create article');
    }
    return result.article;
  },

  async updateArticle(id: string, data: Partial<ArticleFormData>): Promise<Article> {
    const res = await fetchWithAuth(`/api/admin/articles/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.error || 'Failed to update article');
    }
    return result.article;
  },

  async updateArticleStatus(
    id: string,
    status: 'draft' | 'published' | 'scheduled' | 'archived'
  ): Promise<Article> {
    const res = await fetchWithAuth(`/api/admin/articles/${encodeURIComponent(id)}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.error || 'Failed to update status');
    }
    return result.article;
  },

  async deleteArticle(id: string): Promise<void> {
    const res = await fetchWithAuth(`/api/admin/articles/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const result = await res.json().catch(() => ({}));
      throw new Error(result.error || 'Failed to delete article');
    }
  },

  async uploadCoverImage(base64Data: string, filename?: string): Promise<{ url: string }> {
    const res = await fetchWithAuth('/api/admin/upload', {
      method: 'POST',
      body: JSON.stringify({ base64Data, filename }),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.error || 'Failed to upload image');
    }
    return result;
  },
};
