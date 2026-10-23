import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { articleService } from '../services/articleService';
import ArticleCard from '../components/ArticleCard';

interface InsightsScreenProps {
  onSelectArticle: (article: Article) => void;
  onOpenConsultation: (defaultDomain?: string) => void;
}

const CATEGORIES = [
  'All Insights',
  'Corporate & Commercial',
  'Transactions',
  'Regulatory & Compliance',
  'Disputes & Risk',
  'General Legal Insights',
];

export default function InsightsScreen({
  onSelectArticle,
  onOpenConsultation,
}: InsightsScreenProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Insights');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pageSize] = useState<number>(6);

  // Load articles
  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await articleService.getPublishedArticles({
        category: selectedCategory === 'All Insights' ? undefined : selectedCategory,
        search: searchQuery.trim() || undefined,
        page: currentPage,
        limit: pageSize,
      });
      setArticles(res.articles);
      setTotalCount(res.total);
    } catch (err: any) {
      console.error('Failed to load insights:', err);
      setError(err.message || 'Unable to load published articles.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, [selectedCategory, currentPage]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    loadArticles();
  };

  // Find featured article (if any, on page 1 with no filters)
  const featuredArticle =
    selectedCategory === 'All Insights' && !searchQuery.trim() && currentPage === 1
      ? articles.find((a) => a.featured)
      : undefined;

  const displayArticles = featuredArticle
    ? articles.filter((a) => a.id !== featuredArticle.id)
    : articles;

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fcf9f8]">
      {/* 1. ARCHITECTURAL HEADER SECTION */}
      <section className="w-full bg-[#fcf9f8] pt-12 pb-14 border-b border-[#eae7e7]">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[3px] bg-[#b51c00] block"></span>
                <span className="font-label-caps text-label-caps uppercase text-[#5e5e5e] tracking-widest text-xs">
                  Legal Publications &amp; Editorial Analysis
                </span>
              </div>
              <h1 className="font-display-hero text-3xl sm:text-4xl lg:text-5xl text-[#1b1b1b] tracking-tight font-bold uppercase">
                Insights
              </h1>
              <p className="font-body-lg text-[#5e5e5e] text-base sm:text-lg leading-relaxed pt-1">
                Legal perspectives on corporate matters, transactions, compliance, and business-related legal developments in Indonesia.
              </p>
            </div>

            {/* Quick Practice Consultation CTA */}
            <div className="shrink-0">
              <button
                onClick={() => onOpenConsultation('Corporate & Commercial')}
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#f0eded] text-[#1b1b1b] font-title-md text-xs uppercase tracking-wider hover:bg-[#b51c00] hover:text-white transition-colors duration-150 cursor-pointer shadow-xs"
              >
                <span>Enquire on a Legal Matter</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="mt-10 pt-6 border-t border-[#eae7e7] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`px-3.5 py-1.5 text-xs font-label-caps uppercase tracking-wider transition-colors cursor-pointer border ${
                      isSelected
                        ? 'bg-[#1b1b1b] text-white border-[#1b1b1b] font-bold'
                        : 'bg-white text-[#5e5e5e] border-[#eae7e7] hover:border-[#1b1b1b] hover:text-[#1b1b1b]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full lg:w-80">
              <input
                type="text"
                placeholder="Search articles & briefings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#eae7e7] pl-10 pr-4 py-2 text-xs font-body-md text-[#1b1b1b] placeholder-[#8c8c8c] focus:outline-none focus:border-[#b51c00] transition-colors"
              />
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#5e5e5e] text-[18px]">
                search
              </span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentPage(1);
                    loadArticles();
                  }}
                  className="absolute right-3 top-2.5 text-[#5e5e5e] hover:text-[#1b1b1b] text-xs"
                >
                  Clear
                </button>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* 2. MAIN ARTICLES CONTENT AREA */}
      <section className="w-full py-16 flex-1">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16">
          {/* Loading State */}
          {loading && (
            <div className="py-24 text-center space-y-4">
              <div className="inline-block w-8 h-8 border-2 border-[#b51c00] border-t-transparent rounded-full animate-spin"></div>
              <p className="font-label-caps text-xs text-[#5e5e5e] uppercase tracking-wider">
                Loading legal insights...
              </p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="p-8 bg-white border border-[#eae7e7] text-center max-w-xl mx-auto my-12 space-y-3">
              <span className="material-symbols-outlined text-[#b51c00] text-[36px]">
                error_outline
              </span>
              <h3 className="font-headline-sm text-lg font-bold text-[#1b1b1b]">
                Unable to Retrieve Articles
              </h3>
              <p className="font-body-sm text-xs text-[#5e5e5e]">{error}</p>
              <button
                onClick={loadArticles}
                className="mt-3 px-4 py-2 bg-[#1b1b1b] text-white text-xs font-label-caps uppercase tracking-wider hover:bg-[#b51c00] transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Empty State (Exact specified copy) */}
          {!loading && !error && articles.length === 0 && (
            <div className="p-12 sm:p-16 bg-white border border-[#eae7e7] text-center max-w-2xl mx-auto my-12 space-y-4">
              <div className="w-12 h-1 bg-[#b51c00] mx-auto mb-2"></div>
              <h3 className="font-headline-md text-xl font-bold text-[#1b1b1b]">
                No Publications Found
              </h3>
              <p className="font-body-md text-[#5e5e5e] text-sm leading-relaxed max-w-lg mx-auto">
                No articles have been published yet. Check back for future insights from Eiren Law Office.
              </p>
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Insights');
                    setCurrentPage(1);
                  }}
                  className="mt-4 px-4 py-2 bg-[#f0eded] text-[#1b1b1b] text-xs font-label-caps uppercase tracking-wider hover:bg-[#b51c00] hover:text-white transition-colors"
                >
                  Reset Search Filters
                </button>
              )}
            </div>
          )}

          {/* Loaded Articles Section */}
          {!loading && !error && articles.length > 0 && (
            <div className="space-y-12">
              {/* FEATURED ARTICLE HERO CARD */}
              {featuredArticle && (
                <div
                  onClick={() => onSelectArticle(featuredArticle)}
                  className="group relative bg-white border border-[#eae7e7] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden grid grid-cols-1 lg:grid-cols-12"
                >
                  <div className="w-full h-1 bg-[#b51c00] absolute top-0 left-0 z-10"></div>
                  
                  {/* Left Column: Cover Image */}
                  <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-[#f0eded]">
                    <img
                      src={featuredArticle.coverImageUrl}
                      alt={featuredArticle.coverImageAlt || featuredArticle.title}
                      className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-[#b51c00] text-white text-[10px] font-label-caps uppercase tracking-wider px-3 py-1 font-bold">
                      Featured Insight
                    </div>
                  </div>

                  {/* Right Column: Editorial Copy */}
                  <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs text-[#5e5e5e] font-label-caps uppercase tracking-wider text-[11px]">
                        <span className="text-[#b51c00] font-bold">{featuredArticle.category}</span>
                        <span>·</span>
                        <span>
                          {new Date(featuredArticle.publishedAt || featuredArticle.createdAt).toLocaleDateString(
                            'en-GB',
                            { day: 'numeric', month: 'short', year: 'numeric' }
                          )}
                        </span>
                        <span>·</span>
                        <span>{featuredArticle.readingTimeMinutes} min read</span>
                      </div>

                      <h2 className="font-headline-lg text-2xl lg:text-3xl font-bold text-[#1b1b1b] group-hover:text-[#b51c00] transition-colors leading-tight">
                        {featuredArticle.title}
                      </h2>

                      <p className="font-body-md text-[#5e5e5e] text-sm sm:text-base leading-relaxed line-clamp-4">
                        {featuredArticle.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#eae7e7] flex items-center justify-between text-[#b51c00] font-title-md text-xs uppercase tracking-wider group-hover:text-[#1b1b1b] transition-colors">
                      <span className="font-bold">Read Complete Analysis</span>
                      <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* GRID OF PUBLISHED ARTICLES */}
              {displayArticles.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-1 bg-[#b51c00] block"></span>
                      <span className="font-label-caps text-label-caps text-[#5e5e5e] uppercase text-xs">
                        {selectedCategory === 'All Insights' ? 'Recent Publications' : selectedCategory} ({totalCount})
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayArticles.map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        onSelect={onSelectArticle}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* PAGINATION CONTROLS */}
              {totalPages > 1 && (
                <div className="pt-10 border-t border-[#eae7e7] flex items-center justify-between">
                  <button
                    disabled={currentPage <= 1}
                    onClick={() => {
                      setCurrentPage((p) => Math.max(1, p - 1));
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 text-xs font-label-caps uppercase tracking-wider border border-[#eae7e7] bg-white text-[#1b1b1b] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1b1b1b] hover:text-white transition-colors"
                  >
                    Previous Page
                  </button>

                  <span className="font-label-caps text-xs text-[#5e5e5e] uppercase">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    disabled={currentPage >= totalPages}
                    onClick={() => {
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 text-xs font-label-caps uppercase tracking-wider border border-[#eae7e7] bg-white text-[#1b1b1b] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1b1b1b] hover:text-white transition-colors"
                  >
                    Next Page
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
