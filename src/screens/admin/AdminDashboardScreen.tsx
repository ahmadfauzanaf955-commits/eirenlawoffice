import React, { useState, useEffect } from 'react';
import { Article, ArticleStats } from '../../types';
import { articleService } from '../../services/articleService';
import ArticlePreviewModal from '../../components/admin/ArticlePreviewModal';
import EirenLogo from '../../components/EirenLogo';

interface AdminDashboardScreenProps {
  onCreateNew: () => void;
  onEditArticle: (articleId: string) => void;
  onLogout: () => void;
  onViewPublicSite: () => void;
}

export default function AdminDashboardScreen({
  onCreateNew,
  onEditArticle,
  onLogout,
  onViewPublicSite,
}: AdminDashboardScreenProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [stats, setStats] = useState<ArticleStats>({
    totalPublished: 0,
    totalDraft: 0,
    totalScheduled: 0,
    totalArchived: 0,
    totalCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Preview and Delete modals
  const [previewArticle, setPreviewArticle] = useState<Article | null>(null);
  const [deleteConfirmArticle, setDeleteConfirmArticle] = useState<Article | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await articleService.getAdminArticles({
        status: statusFilter,
        search: searchQuery.trim() || undefined,
      });
      setArticles(data.articles);
      setStats(data.stats);
    } catch (err: any) {
      setError(err.message || 'Failed to load article records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchArticles();
  };

  const handleTogglePublish = async (article: Article) => {
    try {
      setActionInProgress(article.id);
      const newStatus = article.status === 'published' ? 'draft' : 'published';
      await articleService.updateArticleStatus(article.id, newStatus);
      setNotification({
        message: `Article ${newStatus === 'published' ? 'published to live site' : 'unpublished to draft'}.`,
        type: 'success',
      });
      fetchArticles();
    } catch (err: any) {
      setNotification({ message: err.message || 'Failed to update status', type: 'error' });
    } finally {
      setActionInProgress(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmArticle) return;
    try {
      setActionInProgress(deleteConfirmArticle.id);
      await articleService.deleteArticle(deleteConfirmArticle.id);
      setNotification({ message: 'Article deleted permanently.', type: 'success' });
      setDeleteConfirmArticle(null);
      fetchArticles();
    } catch (err: any) {
      setNotification({ message: err.message || 'Failed to delete article', type: 'error' });
    } finally {
      setActionInProgress(null);
    }
  };

  // Status badge styling
  const renderStatusBadge = (status: Article['status']) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-label-caps uppercase tracking-wider font-bold bg-[#edf7ed] text-[#1e4620] border border-[#c8e6c9]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2e7d32]"></span>
            Published
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-label-caps uppercase tracking-wider font-bold bg-[#fff8e1] text-[#795548] border border-[#ffe082]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f57f17]"></span>
            Draft
          </span>
        );
      case 'scheduled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-label-caps uppercase tracking-wider font-bold bg-[#e3f2fd] text-[#0d47a1] border border-[#bbdefb]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1976d2]"></span>
            Scheduled
          </span>
        );
      case 'archived':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-label-caps uppercase tracking-wider font-bold bg-[#f5f5f5] text-[#616161] border border-[#e0e0e0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9e9e9e]"></span>
            Archived
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f8] flex flex-col">
      {/* Top CMS Header */}
      <header className="bg-white border-b border-[#eae7e7] sticky top-0 z-40 shadow-xs">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={onViewPublicSite}
              className="focus:outline-none cursor-pointer"
              title="Return to Public Website"
            >
              <EirenLogo size="sm" />
            </button>
            <div className="hidden sm:block h-6 w-px bg-[#eae7e7]"></div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#b51c00]"></span>
              <span className="font-label-caps text-xs uppercase tracking-wider font-bold text-[#1b1b1b]">
                Article Management System
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onViewPublicSite}
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-label-caps uppercase tracking-wider text-[#5e5e5e] hover:text-[#b51c00] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              <span>View Live Insights</span>
            </button>

            <button
              onClick={onCreateNew}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#b51c00] hover:bg-[#8f1600] text-white text-xs font-label-caps uppercase tracking-wider transition-colors shadow-xs cursor-pointer font-bold"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Create New Article</span>
            </button>

            <button
              onClick={onLogout}
              className="p-2 text-[#5e5e5e] hover:text-[#1b1b1b] transition-colors cursor-pointer"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-6 lg:px-12 py-10 space-y-8">
        {/* Notification Banner */}
        {notification && (
          <div
            className={`p-4 border-l-4 text-xs font-body-md flex items-center justify-between ${
              notification.type === 'success'
                ? 'bg-[#edf7ed] border-[#2e7d32] text-[#1e4620]'
                : 'bg-[#fff1ee] border-[#b51c00] text-[#b51c00]'
            }`}
          >
            <span>{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="text-xs uppercase font-label-caps font-bold cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* 1. KPI SUMMARY CARDS */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-6 border border-[#eae7e7] shadow-xs">
            <span className="font-label-caps text-[10px] uppercase text-[#5e5e5e] tracking-wider block">
              Published Articles
            </span>
            <span className="font-display-hero-mobile text-3xl font-bold text-[#b51c00] mt-1 block">
              {stats.totalPublished}
            </span>
            <span className="text-[11px] text-[#8c8c8c] block mt-1">Live on public Insights page</span>
          </div>

          <div className="bg-white p-6 border border-[#eae7e7] shadow-xs">
            <span className="font-label-caps text-[10px] uppercase text-[#5e5e5e] tracking-wider block">
              Draft Publications
            </span>
            <span className="font-display-hero-mobile text-3xl font-bold text-[#1b1b1b] mt-1 block">
              {stats.totalDraft}
            </span>
            <span className="text-[11px] text-[#8c8c8c] block mt-1">In review or unreleased</span>
          </div>

          <div className="bg-white p-6 border border-[#eae7e7] shadow-xs">
            <span className="font-label-caps text-[10px] uppercase text-[#5e5e5e] tracking-wider block">
              Scheduled Queue
            </span>
            <span className="font-display-hero-mobile text-3xl font-bold text-[#1b1b1b] mt-1 block">
              {stats.totalScheduled}
            </span>
            <span className="text-[11px] text-[#8c8c8c] block mt-1">Awaiting target publish time</span>
          </div>

          <div className="bg-white p-6 border border-[#eae7e7] shadow-xs">
            <span className="font-label-caps text-[10px] uppercase text-[#5e5e5e] tracking-wider block">
              Archived Repository
            </span>
            <span className="font-display-hero-mobile text-3xl font-bold text-[#5e5e5e] mt-1 block">
              {stats.totalArchived}
            </span>
            <span className="text-[11px] text-[#8c8c8c] block mt-1">Unpublished past editions</span>
          </div>
        </section>

        {/* 2. TABLE TOOLBAR & FILTERS */}
        <section className="bg-white border border-[#eae7e7] shadow-xs overflow-hidden">
          <div className="p-6 border-b border-[#eae7e7] flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Status Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: `All (${stats.totalCount})` },
                { id: 'published', label: `Published (${stats.totalPublished})` },
                { id: 'draft', label: `Drafts (${stats.totalDraft})` },
                { id: 'scheduled', label: `Scheduled (${stats.totalScheduled})` },
                { id: 'archived', label: `Archived (${stats.totalArchived})` },
              ].map((tab) => {
                const isActive = statusFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id)}
                    className={`px-3 py-1.5 text-xs font-label-caps uppercase tracking-wider transition-colors cursor-pointer border ${
                      isActive
                        ? 'bg-[#1b1b1b] text-white border-[#1b1b1b] font-bold'
                        : 'bg-[#fcf9f8] text-[#5e5e5e] border-[#eae7e7] hover:border-[#1b1b1b] hover:text-[#1b1b1b]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#fcf9f8] border border-[#eae7e7] pl-9 pr-4 py-2 text-xs font-body-md text-[#1b1b1b] placeholder-[#8c8c8c] focus:outline-none focus:border-[#b51c00]"
              />
              <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[#5e5e5e] text-[16px]">
                search
              </span>
            </form>
          </div>

          {/* 3. ARTICLES MANAGEMENT DATA TABLE */}
          {loading ? (
            <div className="p-16 text-center space-y-3">
              <div className="inline-block w-8 h-8 border-2 border-[#b51c00] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-label-caps uppercase text-[#5e5e5e]">
                Loading article repository...
              </p>
            </div>
          ) : error ? (
            <div className="p-12 text-center text-xs text-[#b51c00]">
              <p>{error}</p>
              <button
                onClick={fetchArticles}
                className="mt-3 px-4 py-1.5 bg-[#1b1b1b] text-white font-label-caps uppercase"
              >
                Retry
              </button>
            </div>
          ) : articles.length === 0 ? (
            <div className="p-16 text-center space-y-3">
              <span className="material-symbols-outlined text-4xl text-[#8c8c8c]">
                folder_open
              </span>
              <h3 className="font-headline-sm text-base font-bold text-[#1b1b1b]">
                No Articles in Current View
              </h3>
              <p className="font-body-sm text-xs text-[#5e5e5e] max-w-sm mx-auto">
                No articles match your current status filter. Select another filter or create your first legal insight.
              </p>
              <button
                onClick={onCreateNew}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-[#b51c00] text-white text-xs font-label-caps uppercase tracking-wider"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Create New Article</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f6f3f2] border-b border-[#eae7e7] text-[11px] font-label-caps uppercase tracking-wider text-[#5e5e5e]">
                    <th className="py-3.5 px-6 font-bold">Article Title &amp; Slug</th>
                    <th className="py-3.5 px-4 font-bold">Practice Area</th>
                    <th className="py-3.5 px-4 font-bold">Author</th>
                    <th className="py-3.5 px-4 font-bold">Status</th>
                    <th className="py-3.5 px-4 font-bold">Last Updated</th>
                    <th className="py-3.5 px-6 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eae7e7] text-xs font-body-md">
                  {articles.map((art) => {
                    const isBusy = actionInProgress === art.id;
                    return (
                      <tr
                        key={art.id}
                        className="hover:bg-[#fcf9f8] transition-colors group"
                      >
                        {/* Title & Slug */}
                        <td className="py-4 px-6 max-w-md">
                          <div className="font-bold text-[#1b1b1b] group-hover:text-[#b51c00] transition-colors">
                            {art.title}
                          </div>
                          <div className="text-[11px] text-[#8c8c8c] font-mono mt-0.5">
                            /insights/{art.slug}
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-4 text-[#5e5e5e] whitespace-nowrap">
                          {art.category}
                        </td>

                        {/* Author */}
                        <td className="py-4 px-4 text-[#5e5e5e] whitespace-nowrap">
                          {art.authorName}
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          {renderStatusBadge(art.status)}
                        </td>

                        {/* Last Updated */}
                        <td className="py-4 px-4 text-[#5e5e5e] whitespace-nowrap text-[11px]">
                          {new Date(art.updatedAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right whitespace-nowrap space-x-2">
                          {/* Live Preview */}
                          <button
                            onClick={() => setPreviewArticle(art)}
                            title="Preview Article"
                            className="p-1.5 text-[#5e5e5e] hover:text-[#1b1b1b] hover:bg-[#f0eded] transition-colors cursor-pointer inline-flex items-center"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              visibility
                            </span>
                          </button>

                          {/* Edit Article */}
                          <button
                            onClick={() => onEditArticle(art.id)}
                            title="Edit Article"
                            className="p-1.5 text-[#5e5e5e] hover:text-[#b51c00] hover:bg-[#fff1ee] transition-colors cursor-pointer inline-flex items-center"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              edit
                            </span>
                          </button>

                          {/* Quick Publish/Unpublish toggle */}
                          <button
                            disabled={isBusy}
                            onClick={() => handleTogglePublish(art)}
                            title={art.status === 'published' ? 'Unpublish to Draft' : 'Publish Live'}
                            className={`p-1.5 transition-colors cursor-pointer inline-flex items-center ${
                              art.status === 'published'
                                ? 'text-[#795548] hover:bg-[#fff8e1]'
                                : 'text-[#2e7d32] hover:bg-[#edf7ed]'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {art.status === 'published' ? 'unpublished' : 'check_circle'}
                            </span>
                          </button>

                          {/* Delete Article */}
                          <button
                            disabled={isBusy}
                            onClick={() => setDeleteConfirmArticle(art)}
                            title="Delete Article"
                            className="p-1.5 text-[#8c8c8c] hover:text-[#b51c00] hover:bg-[#fff1ee] transition-colors cursor-pointer inline-flex items-center"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              delete
                            </span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirmArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white border border-[#eae7e7] p-8 max-w-md w-full space-y-4 shadow-xl">
            <div className="w-10 h-1 bg-[#b51c00]"></div>
            <h3 className="font-headline-sm text-lg font-bold text-[#1b1b1b]">
              Confirm Permanent Deletion
            </h3>
            <p className="font-body-sm text-xs text-[#5e5e5e] leading-relaxed">
              Are you sure you want to permanently delete{' '}
              <strong className="text-[#1b1b1b]">&ldquo;{deleteConfirmArticle.title}&rdquo;</strong>?
              This action cannot be undone and will immediately remove it from all indexes.
            </p>
            <div className="pt-4 border-t border-[#eae7e7] flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmArticle(null)}
                className="px-4 py-2 border border-[#eae7e7] text-xs font-label-caps uppercase text-[#1b1b1b] hover:bg-[#eae7e7] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-[#b51c00] hover:bg-[#8f1600] text-white text-xs font-label-caps uppercase font-bold cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      <ArticlePreviewModal
        article={previewArticle}
        isOpen={Boolean(previewArticle)}
        onClose={() => setPreviewArticle(null)}
        onPublish={
          previewArticle && previewArticle.status !== 'published'
            ? () => {
                handleTogglePublish(previewArticle);
                setPreviewArticle(null);
              }
            : undefined
        }
      />
    </div>
  );
}
